module latte{

    /**
     *
     */
    export class RemoteResponse<T>{

        //region Fields
        private _call: RemoteCall<T> = null;
        private _response: IRemoteResponse;
        private _errorCode: number = -1;
        private _errorDescription: string = null;
        private _success: boolean = false;
        private _data: T;
        //endregion

        /**
         * Creates the response
         * @param call
         * @param responseText
         */
        constructor(call: RemoteCall<T>, response: IRemoteResponse){

            this._call = call;
            this._response = response;

            this.unmarshall();
        }

        //region Private Methods
        /**
         * Unpacks the response text to indicate attributes
         */
        private unmarshall(){

            for(var i in this.response){
                this['_' + i] = this.response[i];
            }

            // log("Response: ")
            // log(this.response)

            if(this.success === true){
                this._data = DataRecord.scanAndConvert(this.data);
            }else{
                log("Error on call: " + this.call.toString());
                log(sprintf("(%s) - %s", this.errorCode, this.errorDescription));
                this.call.onFailure(this.errorDescription, String(this.errorCode));
            }


        }
        //endregion

        //region Properties
        /**
         * Gets the call who originated this response
         * @returns {RemoteCall}
         */
        get call(): RemoteCall<T>{
            return this._call;
        }

        /**
         * Gets the error code returned (if any)
         * @returns {number}
         */
        get errorCode(): number{
            return this._errorCode;
        }

        /**
         * Gets the error description returned (if any)
         * @returns {string}
         */
        get errorDescription(): string{
            return this._errorDescription;
        }

        /**
         * Property field
         */
        private _logs:Array<string> = [];

        /**
         * Gets or sets the logs array in response
         *
         * @returns {Array<string>}
         */
        public get logs():Array<string> {
            return this._logs;
        }

        /**
         * Gets or sets the logs array in response
         *
         * @param {Array<string>} value
         */
        public set logs(value:Array<string>) {
            this._logs = value;
        }

        /**
         * Gets the literal response from server
         * @returns {string}
         */
        get response(): IRemoteResponse{
            return this._response;
        }

        /**
         * Gets
         * @returns {T}
         */
        get data(): T{
            return this._data;
        }

        /**
         * Gets a value indicating if the call was a success
         * @returns {boolean}
         */
        get success(): boolean{
            return this._success;
        }

        /**
         * Property field
         */
        private _warnings:Array<string> = [];

        /**
         * Gets or sets
         *
         * @returns {Array<string>}
         */
        public get warnings():Array<string> {
            return this._warnings;
        }

        /**
         * Gets or sets
         *
         * @param {Array<string>} value
         */
        public set warnings(value:Array<string>) {
            this._warnings = value;
        }


        //endregion

    }
}