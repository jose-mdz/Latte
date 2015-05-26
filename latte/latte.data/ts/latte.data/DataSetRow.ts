module latte{
    /**
     * Represents a row of data for <c>DataSet</c>
     **/
    export class DataSetRow{

        /**
         *
         **/
        private _dataSet: any;

        /**
         *
         **/
        private _readOnly: boolean;

        /**
         *
         **/
        private _tag: any;


        /**
         * Creates the row of data. Optionally sets the array of data
         **/
        constructor(public data: Array<any> = []){

            if(data)
                this.data = data;
            else
                this.data = [];


        }

        /**
         * Gets the data as an array of specified positions. Undefined positions will be set to null
         **/
        getDataArray(columns: number): Array<any>{

            var a = [];

            for(var i = 0; i < columns; i++)
                if(_undef(this.data[i]))
                    a[i] = null;
                else
                    a[i] = this.data[i];

            return a;

        }

        /**
         * Gets a value indicating if there is a value at the specified index
         **/
        hasValueAt(index: number): boolean{

            return !_undef(this.data[index]);

        }

        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        get readOnly(): boolean{
                return this._readOnly;


        }
        /**
         * Gets or sets a value indicating if the row is read-only
         **/
        set readOnly(value: boolean){


            this._readOnly = value;

        }

        /**
         * Gets or sets the value at the specified position
         **/
        get tag(): any{

                return this._tag;


        }
        /**
         * Gets or sets the value at the specified position
         **/
        set tag(value: any){

            this._tag = value;

        }

        /**
         * Gets or sets the value at the specified position
         **/
        getValueAt(index: number): any{
            return this.data[index];
        }

        /**
         * Gets or sets the value at the specified position
         **/
        setValueAt(index: number, value: any){
            this.data[index] = value;
        }
    }
}