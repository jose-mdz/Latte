module latte {

    /**
     * Passed to events that could be cancelled after executing a callback
     */
    export class CancellableCallbackEvent {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _callback: (handle: (cancel: boolean) => any) => any = null;

        /**
         * Gets or sets the callback to check for cancelation
         *
         * @returns {(cancel: boolean) => any}
         */
        get callback(): (handle: (cancel: boolean) => any) => any {
            return this._callback;
        }

        /**
         * Gets or sets the callback to check for cancelation
         *
         * @param {(cancel: boolean) => any} value
         */
        set callback(value: (handle: (cancel: boolean) => any) => any) {
            this._callback = value;
        }

        //endregion

    }

}