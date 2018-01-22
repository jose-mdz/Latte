module latte {

    /**
     * Dismisses the overlay when the user clicks elsewhere off the overlay
     */
    export class OverlayClickDismisser extends OverlayDismisser {

        //region Static
        //endregion

        //region Fields
        handler: any;
        //endregion

        /**
         * Creates the dismisser
         */
        constructor() {
            super();

            this.handler = e => {
                this.execute();
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Override.
         */
        install(){

            // Handle click on window
            setTimeout(() => window.addEventListener('click', this.handler), 300);

            // Stop propagation when click on the overlay
            this.overlay.raw.addEventListener('click', e => e.stopPropagation());
        }

        /**
         * Override.
         */
        uninstall(){
            window.removeEventListener('click', this.handler);
        }
        //endregion

        //region Events
        //endregion

        //region Properties

        //endregion


    }

}