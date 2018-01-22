module latte{

    export interface MessageSucceededCallback {
        (data: any): void;
        (): void;
    }

    /**
     * Sends messages to objects on server.
     * <example>
     * // ( 1 )
     * // Execute method Person::computeAge() on person with id 1
     * var m1 = new Message('Person', 'computeAge', {}, 1);
     *
     * m1.send(function(){
     *   // Log result of computeAge()
     *   log(this.data);
     * });
     *
     * // ( 2 )
     * // Execute *static* method Person::count()
     * var m2 = new Message('Person', 'count');
     *
     * m2.send(function(){
     *   // Log result of count()
     *   log(this.data);
     * });
     *
     * </example>
     *
     * @class
     */
    export class Message{

        //region Static

        public static log: Message[] = [];

        /**
         * Holds the current amount of seconds to execute next retry
         **/
        private static _retryCountdown: number;

        /**
         * Pointer to message who is leading the retry mechanism
         **/
        private static _retryLeader: Message;

        /**
         * Holds the time of last retry
         **/
        private static _retryTime: number;

        /**
         * Pointer to timer who executes retry
         **/
        private static _retryTimer: Timer;

        /**
         * Path where requests are made
         */
        static get pathToRequest(): string {
            return _latteUrl() + "/request.php";
        }

        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        static sendCalls(calls: ICall[], callback: () => void = null): Message{
            let m = new Message();

            m.addCalls(calls);

            if(callback)
                m.responseArrived.add(callback);

            m.send();

            if(callback && calls.filter(c => !!c).length == 0) {
                callback();
            }

            return m;
        }

        /**
         * Assign a function to this property to be executed on global fail. Its executed on the context of the failed message
         **/
        static globalFailed: Function;

        //region Network Availability

        /**
         * Property field
         */
        private static _networkAvailable: boolean = true;

        /**
         * Gets or sets a value indicating if the Network is currently available
         *
         * @returns {boolean}
         */
        static get networkAvailable(): boolean{
            return Message._networkAvailable;
        }

        /**
         * Gets or sets a value indicating if the Network is currently available
         *
         * @param {boolean} value
         */
        static set networkAvailable(value: boolean){

            // Check if value changed
            var changed: boolean = value !== Message._networkAvailable;

            // Set value
            Message._networkAvailable = value;

            // Trigger changed event
            if(changed){
                Message.onNetworkAvailableChanged();
            }
        }

        /**
         * Back field for event
         */
        private static _networkAvailableChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the networkAvailable property changes
         *
         * @returns {LatteEvent}
         */
        static get networkAvailableChanged(): LatteEvent{
            if(!Message._networkAvailableChanged){
                Message._networkAvailableChanged = new LatteEvent(Message);
            }
            return Message._networkAvailableChanged;
        }

        /**
         * Raises the <c>networkAvailable</c> event
         */
        static onNetworkAvailableChanged(){
            if(Message._networkAvailableChanged){
                Message._networkAvailableChanged.raise();
            }
        }
        //endregion

        //endregion

        //region Fields

        /**
         *
         **/
        private _loaderText: string;

        /**
         *
         **/
        private _working: boolean;

        /**
         *
         */
        private _calls: ICall[] = [];

        /**
         *
         */
        critical: boolean;

        /**
         * Complete response of message
         **/
        response: string;

        /**
         * Executed when message response arrives, before parsing it
         **/
        _responseArrived: LatteEvent;

        /**
         * Executed when message is sent
         **/
        _sent: LatteEvent;

        /**
         * Executed when message arrives with error
         **/
        _failed: LatteEvent;

        /**
         * Executed when the network has failed
         **/
        _networkFailed: LatteEvent;
        //endregion

        /**
         * Creates the message with the specified call
         **/
        constructor(moduleName: string = null, className: string = null, method: string = null, methodArgs: any = null, id: number = 0){

            // Add first standard call
            if(className !== null){
                this.calls.push(new RemoteCall(moduleName, className, method, methodArgs, id));
            }

        }

        //region Methods
        /**
         * Adds calls to the calls array
         * @param calls
         */
        addCalls(calls: ICall[]){

            let filtered = [];

            for (let i = 0; i < calls.length; i++) {
                if(calls[i]) {
                    filtered.push(calls[i]);
                }
            }

            this._calls = this._calls.concat(filtered);
        }

        /**
         * Reacts to data arrived
         **/
        dataArrived(data: string){

            let parsed = false;
            let result: Array<IRemoteResponse> = null;

            this._working = false;

            /// Assign response
            this.response = data;

            /// Network is available
            Message.networkAvailable = true;

            /// Raise received handler
            this.onResponseArrived();

            // Check if data arrived
            if(data.length == 0){
                this.onFailed("Empty response from server");
            }

            // Try to parse JSON
            try{
                // log(data)
                result = JSON.parse(data);
                parsed = true;
            }catch(ex){}

            if(parsed && _isArray(result)){

                if(result.length !== this.calls.length){
                    this.onFailed("Different amount of response than calls");
                }

                // Report response for each sent call
                for(let i = 0; i < this.calls.length; i++){
                    this.calls[i].respond(result[i]);
                }

            }else{

                /// Raise failed event
                this.onFailed("Can't parse or response is not an array.");
            }

        }

        /**
         * Raises the failed event
         **/
        onFailed(errorDescription: string){

            // Dump error
            log(errorDescription)
            log("On call(s):");
            for(let i = 0; i < this.calls.length; i++){
                let call = this.calls[i];
                if(call) {
                    log(call.toString());
                }
            }
            log(this.response);

            if(this._failed instanceof LatteEvent){
                this.failed.raise();
            }

            if(_isFunction(Message.globalFailed)){
                Message.globalFailed.call(this, errorDescription);
            }

        }

        /**
         * Raises the networkFailed event
         **/
        onNetworkFailed(){

            /// Networks appears to be unavailable
            Message.networkAvailable = false;

            /// Raise event
            if(this._networkFailed){
                this._networkFailed.raise();
            }



            // If no retryLeader
            if(Message._retryLeader === null){

                // I am the retry leader
                Message._retryLeader = this;

            }else if(Message._retryLeader !== this){

                // This used to Add me to pendent messages and good bye.
                return;
            }


//            this.onNetworkFailed();

            /// Ensure loader is there
            LoadInfo.instance.start(strings.reconnecting);

            /// If message was critical
            if(this.critical){

                /// TODO: Hook document unload because a message send is pendent.
            }

            /// If first try
            if(Message._retryTime == 0){
                // Initialize retry time to 5 seconds
                Message._retryTime = 5;
            }else{
                // Duplicate last retry time, topped to 5 minutes
                Message._retryTime = Math.min(TimeSpan.fromMinutes(5).totalSeconds, Message._retryTime * 2);
            }

            // Initialize countdown
            Message._retryCountdown = Message._retryTime;

            // Announce countdown
            LoadInfo.instance.loadingText = (sprintf(strings.reconnectingInS, TimeSpan.fromSeconds(Message._retryCountdown).toString() ));

            if(Message._retryTimer)
                Message._retryTimer.pause();

            /// Set timer to countdown
            Message._retryTimer = new Timer(function(){
                Message._retryCountdown--;

                // Retry now?
                if(Message._retryCountdown == 0){
                    LoadInfo.instance.loadingText = strings.reconnecting;
                    Message.networkAvailable = true;
                    this.send();
                }else if(Message._retryCountdown < 0){
                    Message._retryTimer.pause();
                    LoadInfo.instance.end();
                }else{
                    /// Retry time text
                    LoadInfo.instance.loadingText = (sprintf(strings.reconnectingInS, TimeSpan.fromSeconds(Message._retryCountdown).toString() ));

                }

            }, 1000, this);

            Message._retryTimer.start();

        }

        /**
         * Raises the responseArrived event
         **/
        onResponseArrived(){

            if(this._responseArrived){
                this.responseArrived.raise();
            }
        }

        /**
         * Raises the <c>sent</c> event
         **/
        onSent(){
            if(this._sent){
                this.sent.raise();
            }
            Message.log.push(this);

            if(Message.log.length > 50){
                Message.log.shift();
            }
        }

        /**
         * Sends the message. Optionally adds event handlers for <c>succeeded</c> and <c>failed</c> events
         **/
        send(success: (data:any) => any = null, failure: (errorDesc:string) => any = null): Message{

            if(success || failure){
                if(this.calls.length !== 1){
                    throw new Ex("Can't assign handlers when more than one call in message")
                }else{
                    if(success){
                        this.calls[0].success.add(success);
                    }
                    if(failure){
                        this.calls[0].failure.add(failure);
                    }
                }
            }

            this._working = true;

            // Gather calls
            let calls: Array<IDataRemoteCall> = [];

            for(let i = 0; i < this.calls.length; i++){
                let call = this.calls[i];

                if(call) {
                    calls.push(call.marshall());
                }
            }

            //log(sprintf("Call: %s, %s", DateTime.now.toString(), JSON.stringify(calls)));

            Ajax.post(Message.pathToRequest, {
                action:     'ajax-rpc',
                calls:  JSON.stringify(calls)

            }, (data: string) => {

                /*
                 * FOR SOME ULTRA WEIRD REASON
                 * Sometimes DATA IS ARRIVING WITH AN "undefined" prefix
                 * */
                // if(data.indexOf('undefined') === 0){
                //     data = data.substr(9);
                // }

                this.dataArrived(data);

            }, (error: string) => {
                this._working = false;

                //log("Message.send() [Error]: " + error);

                this.onNetworkFailed();
            });


            this.onSent();

            return this;

        }

        /**
         * Gets a value indcating if the message is in progress
         **/
        working(){

            return this._working;

        }
        //endregion

        //region Properties
        /**
         * Gets the calls this message will make
         *
         * @returns {Array<RemoteCall>}
         */
        get calls(): ICall[]{
            return this._calls;
        }

        /**
         * Gets an event raised when the message fails by network issues or server issues
         * @returns {LatteEvent}
         */
        get failed(): LatteEvent{
            if(!this._failed){
                this._failed = new LatteEvent(this);
            }
            return this._failed;
        }

        /**
         * Gets an event raised when the network fails
         * @returns {LatteEvent}
         */
        get networkFailed(): LatteEvent{
            if(!this._networkFailed){
                this._networkFailed = new LatteEvent(this);
            }
            return this._networkFailed;
        }

        /**
         * Gets an event raised when the response arrives
         * @returns {LatteEvent}
         */
        get responseArrived(): LatteEvent{
            if(!this._responseArrived){
                this._responseArrived = new LatteEvent(this);
            }
            return this._responseArrived;
        }

        /**
         * Gets an event raised when the message is sent
         * @returns {LatteEvent}
         */
        get sent(): LatteEvent{
            if(!this._sent){
                this._sent = new LatteEvent(this);
            }
            return this._sent;
        }
        //endregion

    }
}