module latte{
    /**
     * Represents a column of data in the GridView
     **/
    export class GridViewColumn extends DataSetColumn{

        /**
         *
         **/
        private _header: JQuery;

        /**
         *
         **/
        private _readonly: boolean;


        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
            constructor(name: string = '', type: string = '', length: number = 0){

            super();

            if(name) this.name = name;
            if(type) this.type = type;
            if(length) this.length = length;


        }

        /**
         * Gets or sets the GridView header element this column represents
         **/
        get header(): JQuery{
            return this._header;
        }

        /**
         * Gets or sets the GridView header element this column represents
         **/
        set header(value: JQuery){


            this._header = value;


        }

        /**
         * Gets or sets a value indicating if the column is read only
         **/
        get readOnly(): boolean{
            return this._readonly;
        }

        /**
         * Gets or sets a value indicating if the column is read only
         **/
        set readOnly(value: boolean){

            this._readonly = value;


        }
    }
}