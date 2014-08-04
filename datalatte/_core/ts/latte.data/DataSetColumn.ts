module latte{
    /**
     * Represents a column of data for <c>DataSet</c>
     **/
    export class DataSetColumn{

        /**
         *
         **/
        private _length: number;

        /**
         *
         **/
        private _name: string;

        /**
         *
         **/
        private _options: any;

        /**
         *
         **/
        private _tag: any;

        /**
         *
         **/
        private _type: string;

        /**
         * Raised when <c>options</c> value is changed.
         **/
        optionsChanged: LatteEvent;


        /**
         * Creates the column.
         Optionally specifies its name, type and length.
         **/
        constructor(name: string = '', type: string = '', length: number = 0){


            this.optionsChanged = new LatteEvent(this);

             this.name = name;
             this.type = type;
             this.length = length;


        }

        /**
         * Gets or sets the length of the column values.
         **/
        get length(): number{

                return this._length;


        }
        /**
         * Gets or sets the length of the column values.
         **/
        set length(value: number){


            this._length = value;

        }

        /**
         * Gets or sets the name of the column.
         **/
        get name(): string{
            return this._name;
        }
        /**
         * Gets or sets the name of the column.
         **/
        set name(value: string){
            this._name = value;
        }

        /**
         * Raises the <c>optionsChanged</c> event.
         **/
        onOptionsChanged(){

            this.optionsChanged.raise();

        }

        /**
         * Gets or sets the options of the column.
         **/
        get options(): any /*(any|Array)*/{

                return this._options;


        }
        /**
         * Gets or sets the options of the column.
         **/
        set options(value: any /*(any|Array)*/){


            this._options = value;
            this.onOptionsChanged();

        }

        /**
         * Gets or sets a generic tag value for the object
         **/
        get tag(): any{

                return this._tag;

        }
        /**
         * Gets or sets a generic tag value for the object
         **/
        set tag(value: any){

            this._tag = value;

        }

        /**
         * Gets or sets the type of the column values.
         **/
        get type(): string{

                return this._type;

        }
        /**
         * Gets or sets the type of the column values.
         **/
        set type(value: string){


            this._type = value;

        }
    }
}