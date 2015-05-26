module latte{
    /**
     * Represents a set of structured data
     **/
    export class DataSet{

        /**
         * Columns of the dataset
         **/
        columns: Collection<DataSetColumn>;

        /**
         * Rows of data
         **/
        rows: Collection<DataSetRow>;


        /**
         * Creates the dataset
         **/
            constructor(){

            this.columns = new Collection<DataSetColumn>();
            this.rows = new Collection<DataSetRow>();

        }

        /**
         * Creates a <c>DataSet</c> from the dataset specified as a JSON object
         **/
        static fromServerObject(dataset: any): DataSet{

            var d = new DataSet();
            var i;

            for(i in dataset.fields){
                d.columns.add(new DataSetColumn(
                    dataset.fields[i].name,
                    DataSet.fromServerType(dataset.fields[i].type),
                    dataset.fields[i].length))
            }

            // Add rows
            if(_isArray(dataset.rows)){
                for(i = 0; i < dataset.rows.length; i++){
                    var arr: Array<any> = dataset.rows[i];
                    var ds = new DataSetRow(arr);
                    d.rows.add( ds );
                }
            }



            return d;

        }

        /**
         * Converts the type sent by server to a type compatible with <c>InputItem</c>
         **/
        static fromServerType(type: string): string{


            switch(type){
                case 'int': type = 'integer'; break;
                case 'blob': type = 'string'; break;
            }

            return type;

        }

        /**
         * Gets the index of the column by passing the name of the column
         **/
            getColumnIndex(columnName: string){

            var col: DataSetColumn = null;
            var i = 0;

            while( (col = this.columns.next()) ){
                if(col.name.toLowerCase() == columnName.toLowerCase()){
                    this.columns.resetPointer();
                    return i;
                }
                i++;
            }

            return null;

        }

        /**
         * Gets the data as an array of arrays
         **/
            getDataArray(){

            var a = [];

            for(var i = 0; i < this.rows.count; i++)
                a.push(this.rows.item(i).getDataArray(this.columns.count));

            return a;

        }

        /**
         * Gets the value of the specified column at the specified row index
         **/
            getValue(columnName: string, rowIndex: number): any{

            var columnIndex;

            if( (columnIndex = this.getColumnIndex(columnName)) ){
                return this.getValueAt(columnIndex, rowIndex);
            }else{
                throw new InvalidArgumentEx(columnName);
            }

        }

        /**
         * Gets the value at the specified position
         **/
            getValueAt(columnIndex: number, rowIndex: number): any{

            if(this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                return this.rows.item(rowIndex).getValueAt(columnIndex);
            else
                return null;

        }

        /**
         * Sets the value at the specified position
         **/
            setValue(columnName: string, rowIndex: number, value: any): DataSet{

            var columnIndex;

            if( (columnIndex = this.getColumnIndex(columnName)) ){
                return this.setValueAt(columnIndex, rowIndex, value);
            }

            return this;

        }

        /**
         * Sets the value at the specified position
         **/
            setValueAt(columnIndex: number, rowIndex: number, value: any): DataSet{

            if(this.rows.count > rowIndex && this.rows.item(rowIndex).hasValueAt(columnIndex))
                this.rows.item(rowIndex).setValueAt(columnIndex, value);
            else
            if(this.rows.count <= rowIndex)
                throw new InvalidArgumentEx('rowIndex', rowIndex);
            else
                throw new InvalidArgumentEx('columnIndex', columnIndex);

            return this;

        }
    }
}