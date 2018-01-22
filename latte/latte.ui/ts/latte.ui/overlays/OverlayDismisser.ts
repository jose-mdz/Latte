module latte {

    /**
     *
     */
    export class OverlayDismisser {

        //region Static
        //endregion

        //region Fields
        private lastOverlay: Overlay;
        //endregion

        /**
         *
         */
        constructor() {

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Executes the dismisser
         */
        execute(){
            if(this.overlay) {
                this.overlay.result = false;
                this.overlay.close();
            }

            this.uninstall();
        }

        /**
         * Installs the dismisser
         */
        install(){

        }

        /**
         * Raises the <c>overlay</c> event
         */
        onOverlayChanged(){
            if(this._overlayChanged){
                this._overlayChanged.raise();
            }

            if(this.overlay) {
                this.install();
            }

        }

        /**
         * Uninstalls the dismisser
         */
        uninstall(){

        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _overlayChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the overlay property changes
         *
         * @returns {LatteEvent}
         */
        get overlayChanged(): LatteEvent{
            if(!this._overlayChanged){
                this._overlayChanged = new LatteEvent(this);
            }
            return this._overlayChanged;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _overlay: Overlay = null;

        /**
         * Gets or sets the overlay of the dismisser
         *
         * @returns {Overlay}
         */
        get overlay(): Overlay{
            return this._overlay;
        }

        /**
         * Gets or sets the overlay of the dismisser
         *
         * @param {Overlay} value
         */
        set overlay(value: Overlay){

            // Check if value changed
            let changed: boolean = value !== this._overlay;

            // Set value
            this._overlay = value;

            // Trigger changed event
            if(changed){
                this.onOverlayChanged();
            }
        }
        //endregion

    }

}