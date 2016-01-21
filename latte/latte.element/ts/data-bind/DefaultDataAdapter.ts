/**
 * Created by josemanuel on 5/28/15.
 */
module latte {

    /**
     * Represents a very simple data adapter that passes the data along as strings.
     */
    export class DefaultDataAdapter implements DataAdapter<string, string> {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the adapter
         */
        constructor() {

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Transforms the value of the record into a proper value for the element
         *
         * @param value
         */
        adaptForElement(value: string): string{
            return value;
        }

        /**
         * Transforms the value of the element into a proper value for the record
         * @param value
         */
        adaptForRecord(value: string): string{
            return value;
        }

        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}