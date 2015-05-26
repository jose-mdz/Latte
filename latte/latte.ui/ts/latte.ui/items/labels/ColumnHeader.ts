module latte{
    /**
     * Represents a column header
     **/
    export class ColumnHeader extends LabelItem{

        /**
         *
         **/
        private _width: number = 150;


        /**
         * Creates the Column Header
         **/
        constructor(text: string = '', width: number = 150){

            super();
            this.element.addClass('column-header');

            this.width = width;
            this.text = text;

        }

        /**
         * Gets or sets the width of the column
         **/
        get width(): number{
            return this._width;
        }

        /**
         * Gets or sets the width of the column
         **/
        set width(value: number){


            this._width = value;
            this.element.width(value);


        }
    }
}