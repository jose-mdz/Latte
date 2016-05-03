/**
 * Created by josemanuel on 5/26/15.
 */
module latte {

    /**
     *
     */
    export class LoadInfo {

        //region Static
        /**
         * Field for instance property
         */
        private static _instance:LoadInfo;

        /**
         * Gets the load mechanism singleton.
         *
         * @returns {LoadMechanism}
         */
        static get instance():LoadInfo {
            if (!this._instance) {
                this._instance = new LoadInfo();
            }
            return this._instance;
        }

        //endregion

        //region Fields
        //endregion

        /**
         * @private
         */
        constructor() {

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Ends a loading process
         */
        end(){
            this.onLoadingEnd();
        }

        /**
         * Raises the <c>loadingStart</c> event
         */
        onLoadingStart(){
            if(this._loadingStart){
                this._loadingStart.raise();
            }else {
                //log("Loading: " + this.loadingText);
            }
        }

        /**
         * Raises the <c>loadingEnd</c> event
         */
        onLoadingEnd(){
            if(this._loadingEnd){
                this._loadingEnd.raise();
            }else {
                //log(this.loadingText  + "-> Done.");
            }
        }

        /**
         * Raises the <c>loadingText</c> event
         */
        onLoadingTextChanged(){
            if(this._loadingTextChanged){
                this._loadingTextChanged.raise();
            }
        }

        /**
         * Starts a loading process
         * @param text
         */
        start(text: string){
            this.loadingText = text;
            this.onLoadingStart();
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _loadingStart: LatteEvent;

        /**
         * Gets an event raised when the loading starts
         *
         * @returns {LatteEvent}
         */
        get loadingStart(): LatteEvent{
            if(!this._loadingStart){
                this._loadingStart = new LatteEvent(this);
            }
            return this._loadingStart;
        }

        /**
         * Back field for event
         */
        private _loadingEnd: LatteEvent;

        /**
         * Gets an event raised when the loading ends
         *
         * @returns {LatteEvent}
         */
        get loadingEnd(): LatteEvent{
            if(!this._loadingEnd){
                this._loadingEnd = new LatteEvent(this);
            }
            return this._loadingEnd;
        }

        /**
         * Back field for event
         */
        private _loadingTextChanged: LatteEvent

        /**
         * Gets an event raised when the value of the loadingText property changes
         *
         * @returns {LatteEvent}
         */
        get loadingTextChanged(): LatteEvent{
            if(!this._loadingTextChanged){
                this._loadingTextChanged = new LatteEvent(this);
            }
            return this._loadingTextChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _loadingText: string = null;

        /**
         * Gets or sets the text of the load information
         *
         * @returns {string}
         */
        get loadingText(): string{
            return this._loadingText;
        }

        /**
         * Gets or sets the text of the load information
         *
         * @param {string} value
         */
        set loadingText(value: string){

            // Check if value changed
            var changed: boolean = value !== this._loadingText;

            // Set value
            this._loadingText = value;

            // Trigger changed event
            if(changed){
                this.onLoadingTextChanged();
            }
        }

        //endregion

    }

}