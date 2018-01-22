module latte{

    /**
     * Represents a call to a remote procedure
     */
    export class RemoteCall<T> implements ICall{

        //region Fields
        private _className: string = null;
        private _method: string = null;
        private _id: number = 0;
        private _params: any = null;
        private _returns: T = null;
        private _success: LatteEvent = null;
        private _failure: LatteEvent = null;
        private _response: RemoteResponse<T>;
        //endregion

        /**
         * Creates the procedure with optional parameters
         * @param moduleName
         * @param className
         * @param method
         * @param params
         * @param id
         * @param returns
         */
        constructor(moduleName: string = null, className: string = null, method: string = null, params: any = null, id: number = 0, returns: T = null){

            if(moduleName) this.moduleName = moduleName;
            if(className) this.className = className;
            if(method) this.method = method;
            if(params) this.params = params;
            if(id) this.id = id;
            if(returns) this.returns = returns;

        }

        //region Methods
        /**
         * Gets the marshalled call
         */
        marshall(): IDataRemoteCall{
            return {
                moduleName: this.moduleName,
                className: this.className,
                method: this.method,
                id: this.id,
                params: this.params
            };
        }

        /**
         * Raises the <c>failure</c> event
         */
        onFailure(errorDescription: string, errorCode: string){
            if(this._failure instanceof LatteEvent){
                this._failure.raise(errorDescription, errorCode);
            }
        }

        /**
         * Raises the <c>success</c> event
         * @param data
         */
        onSuccess(data: T){
            if(this._success instanceof LatteEvent){
                this._success.raise(data);
            }
        }

        /**
         * Reports a response from server to the call
         *
         * @param responseData
         */
        respond(responseData: IRemoteResponse){
            var response = new RemoteResponse<T>(this, responseData);
            this.response = response;
        }

        /**
         * Creates a Message object and sends the call, additionally handlers for success and failure may be added.
         */
        send(success: (data: T) => void = null, failure: (errorDescription: string) => void = null): Message{

            this.withHandlers(success, failure);

            // Create message
            var m = new Message();

            // Add this call to message
            m.calls.push(this);

            // Send the message
            m.send();

            return m;
        }

        /**
         * Creates a Message object and sends the call, showing a loader with the specified text
         * @param loaderText
         * @param success
         * @param failure
         */
        sendWithLoader(loaderText: string, success: (data: T) => void = null, failure: () => void = null){

            var m = this.send(success, failure);

            LoadInfo.instance.start(loaderText);

            m.responseArrived.add(()=>{
                LoadInfo.instance.end();
            });

            return m;

        }

        /**
         * Gets a string representation of the call
         * @returns {*|string}
         */
        toString(){
            var idpart = this.id > 0 ? sprintf("<%s>", this.id) :  '';
            var paramspart = [];

            for(var i in this.params){
                var a = this.params[i];
                paramspart.push(i + ' = ' +  (_isArray(a) || _isObject(a) ? JSON.stringify(a) : String(a) ));
            }

            return sprintf("%s%s.%s(%s)", this.className, idpart, this.method, paramspart.join(', '));
        }

        /**
         * Adds handlers for success and/or failure and returns the call object
         * @param success
         * @param failure
         * @returns {latte.RemoteCall}
         */
        withHandlers(success: (data: T) => void = null, failure: (errorDescription: string) => void = null): RemoteCall<any>{

            // Add success handler
            if(success){
                this.success.add(success);
            }

            // Add failed handler
            if(failure){
                this.failure.add(failure);
            }

            return this;
        }
        //endregion

        //region Properties
        /**
         * Gets or sets the name of the class where the procedure is located
         * @returns {string}
         */
        get className(): string{
            return this._className;
        }

        /**
         * Gets or sets the name of the class where the procedure is located
         * @param value
         */
        set className(value: string){
            this._className = value;
        }

        /**
         * Gets or sets the name of the remote procedure to be called
         * @returns {string}
         */
        get method(): string{
            return this._method;
        }

        /**
         * Gets an event raised when the call fails
         * @returns {LatteEvent}
         */
        get failure(): LatteEvent{
            if(!(this._failure instanceof LatteEvent)){
                this._failure = new LatteEvent(this);
            }
            return this._failure;
        }

        /**
         * Gets or sets the name of the remote procedure to be called
         * @param value
         */
        set method(value: string){
            this._method = value;
        }

        /**
         * Property field
         */
        private _something:string = null;

        /**
         * Gets or sets something
         *
         * @returns {string}
         */
        public get something():string {
            return this._something;
        }

        /**
         * Gets or sets something
         *
         * @param {string} value
         */
        public set something(value:string) {
            this._something = value;
        }

        /**
         * Property field
         */
        private _moduleName:string = null;

        /**
         * Gets or sets the module name
         *
         * @returns {string}
         */
        public get moduleName():string {
            return this._moduleName;
        }

        /**
         * Gets or sets the module name
         *
         * @param {string} value
         */
        public set moduleName(value:string) {
            this._moduleName = value;
        }

        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @returns {number}
         */
        get id(): number{
            return this._id;
        }

        /**
         * Gets or sets the id of the object instance where procedure should be called
         * @param value
         */
        set id(value: number){
            this._id = value;
        }

        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @returns {*}
         */
        get params(): any{
            return this._params;
        }

        /**
         * Gets or sets an object representing the parameters to use when calling the remote procedure
         * @param value
         */
        set params(value: any){
            this._params = value;
        }

        /**
         * Gets or sets the response of the message
         *
         * @returns {RemoteResponse}
         */
        get response(): RemoteResponse<T>{
            return this._response;
        }

        /**
         * Gets or sets the response of the message
         *
         * @param value
         */
        set response(value: RemoteResponse<T>){
            this._response = value;

            if(value.logs.length > 0) {
                log(sprintf("Log: " + this.toString()))
                for (var i = 0; i < value.logs.length; i++) {
                    log('    ' + value.logs[i]);
                }
            }

            if(value.warnings.length > 0) {
                log("Warnings: " + sprintf(this.toString()))
                for (var i = 0; i < value.warnings.length; i++) {
                    if(console && console.warn){
                        console.warn('    ' +  value.warnings[i])
                    }else{
                        log('    ' + value.warnings[i]);
                    }
                }
            }

            if(value.success){
                this.onSuccess(value.data);
            //}else{
            //    this.onFailure(value.errorCode, value.errorDescription);
            }
        }

        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        get returns(): T{
            return this._returns;
        }

        /**
         * Gets or sets the type of data returned by the remote procedure
         * @param value
         */
        set returns(value: T){
            this._returns = value;
        }

        /**
         * Gets an event raised when message arrives successfully
         */
        get success(): LatteEvent{
            if(!(this._success instanceof LatteEvent)){
                this._success = new LatteEvent(this);
            }
            return this._success;
        }
        //endregion

    }

}