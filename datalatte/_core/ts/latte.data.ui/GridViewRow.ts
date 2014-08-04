module latte{
    /**
     * Represents a row of data on the <c>GridView</c>
     **/
    export class GridViewRow extends DataSetRow{

        /**
         * Points to the row element on grid
         **/
        element: JQuery;


        /**
         * Creates the row
         **/
            constructor(data: Array<any> = []){

            super(data);

        }
    }
}