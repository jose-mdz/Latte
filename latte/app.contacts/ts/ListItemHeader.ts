/**
 * Created by josemanuel on 5/29/15.
 */
module latte {

    /**
     *
     */
    export class ListItemHeader extends ListItemHeaderBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the header with the specified text
         */
        constructor(text: string = null) {
            super();

            if(text) {
                this.text = text;
            }
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