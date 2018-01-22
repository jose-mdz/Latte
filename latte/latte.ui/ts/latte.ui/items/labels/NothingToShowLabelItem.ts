module latte {

    /**
     * This label shows a message indicating that there is nothing to show in some container
     */
    export class NothingToShowLabelItem extends LabelItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the label
         */
        constructor(message: string = null) {
            super();

            this.addClass('nothing-to-show');
            this.text = message || strings.nothingToShow;
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}