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

        public static log: Array<Message> = [];

        /**
         * Flag to indicate if network is
         **/
        private static _networkAvailable: boolean = true;

        /**
         * Pointer to messages
         **/
        private static _pendentMessages: Collection<Message> = null;

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
        static pathToRequest: string = "/latte/request.php";

        /**
         * Directly sends an array of calls
         * @param calls
         * @returns {latte.Message}
         */
        static sendCalls(calls: Array<RemoteCall<any>>): Message{
            var m = new Message();

            m.addCalls(calls);

            m.send();

            return m;
        }

        /**
         * Checks if newtowrk is currently available, according to last message sent.
         **/
        static get networkAvailable(): boolean{

            return Message._networkAvailable;

        }

        /**
         * Assign a function to this property to be executed on global fail. Its executed on the context of the failed message
         **/
        static globalFailed: Function;
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
        private _calls: Array<RemoteCall<any>> = [];

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
        constructor(moduleName: string = null, className: string = null, method: string = null, arguments: any = null, id: number = 0){

            // Add first standard call
            if(className !== null){
                this.calls.push(new RemoteCall(moduleName, className, method, arguments, id));
            }

            if(Message._pendentMessages === null)
                Message._pendentMessages = new Collection<Message>();

        }

        //region Methods
        /**
         * Adds calls to the calls array
         * @param calls
         */
        addCalls(calls: Array<RemoteCall<any>>){
            this._calls = this._calls.concat(calls);
        }

        /**
         * Reacts to data arrived
         **/
        dataArrived(data: string){

            var parsed = false;
            var result: Array<IRemoteResponse> = null;

            this._working = false;

            /// Assign response
            this.response = data;

            /// Network is available
            Message._networkAvailable = true;

            /// Raise received handler
            this.onResponseArrived();

            // Check if data arrived
            if(data.length == 0){
                this.onFailed("Empty response from server");
            }

            // Try to parse JSON
            try{
                result = JSON.parse(data);
                parsed = true;
            }catch(ex){}

            if(parsed && _isArray(result)){

                if(result.length !== this.calls.length){
                    this.onFailed("Different amount of response than calls");
                }

                // Report response for each sent call
                for(var i = 0; i < this.calls.length; i++){
                    this.calls[i].respond(result[i]);
                }

            }else{

                /// Raise failed event
                this.onFailed("Can't parse or response is not an array.");
            }

            if(Message.networkAvailable){

                if(!Message._pendentMessages){
                    Message._pendentMessages = new latte.Collection<latte.Message>();
                }

                // Send all messages
                Message._pendentMessages.each(function(m){
                    m.send();
                });

                // Clear collection
                Message._pendentMessages.clear();
            }

        }


        /**
         * Raises the failed event
         **/
        onFailed(errorDescription: string){

            // Dump error
            log(errorDescription)
            log("On call(s):");
            for(var i = 0; i < this.calls.length; i++){
                log(this.calls[i].toString());
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
            Message._networkAvailable = false;

            // If no retryLeader
            if(Message._retryLeader === null){

                // I am the retry leader
                Message._retryLeader = this;

            }else if(Message._retryLeader !== this){

                // Add me to pendent messages and good bye.
                Message._pendentMessages.add(this);
                return;
            }

            /// Raise event
            if(this._networkFailed){
                this._networkFailed.raise();
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
                    Message._networkAvailable = true;
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
        send(success: (data:any) => any = null, failure: () => any = null): Message{

            if(!Message.networkAvailable){

                // Add to pendent messages
                Message._pendentMessages.add(this);

                return this;
            }

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
            var calls: Array<IRemoteCall> = [];

            for(var i = 0; i < this.calls.length; i++){
                calls.push(this.calls[i].marshall());
            }

            //log(sprintf("Call: %s, %s", DateTime.now.toString(), JSON.stringify(calls)));

            Ajax.post(Message.pathToRequest, {
                action:     'ajax-rpc',
                calls:  JSON.stringify(calls)

            }, (data: string) => {

                /*
                 * FOR SOME ULTRA WEIRD REASON
                 * DATA IS ARRIVING WITH AN "undefined" prefix
                 * */
                if(data.indexOf('undefined') === 0){
                    data = data.substr(9);
                }

                this.dataArrived(data);

            }, (error: string) => {
                this._working = false;

                log("Message.send() [Error]: " + error);

                this.onNetworkFailed();
            });

            //$.ajax({
            //
            //    /// Use URL for DataLatte requests
            //    url: Message.pathToRequest,
            //
            //    /// Use the message as context
            //    context: this,
            //
            //    /// Mix data with headers
            //    data: {
            //        action:     'ajax-rpc',
            //        calls:  JSON.stringify(calls)
            //    },
            //
            //    /// Interpret as text to make it JSON by ourselves
            //    dataType: 'text',
            //
            //    /// Send request as POST
            //    type: 'POST',
            //
            //    /// Handle success
            //    success: function(data){
            //        this.dataArrived(data);
            //    },
            //
            //    /// Handle ajax error
            //    error: function(jqXHR, textStatus, errorThrown){
            //        this._working = false;
            //
            //        this.errorDescription = "Network error: " + textStatus;
            //        this.errorCode = 1;
            //
            //        this.onNetworkFailed();
            //    }
            //});

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
        get calls(): Array<RemoteCall<any>>{
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