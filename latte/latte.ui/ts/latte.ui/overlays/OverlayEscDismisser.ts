module latte {

    /**
     * Dismisses the overlay when the user press the ESC key
     */
    export class OverlayEscDismisser extends OverlayDismisser {

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
                if(e.keyCode == Key.ESCAPE) {
                    this.execute();
                }
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Override.
         */
        install(){
            window.addEventListener('keydown', this.handler);
        }

        /**
         * Override.
         */
        uninstall(){
            window.removeEventListener('keydown', this.handler);
        }
        //endregion

        //region Events
        //endregion

        //region Properties

        //endregion

    }

}