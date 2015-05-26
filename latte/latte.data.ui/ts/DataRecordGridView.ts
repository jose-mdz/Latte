module latte{
    /**
     * Hanldles insertions, updates and deletion of <c>DataRecords</c>
     **/
    export class DataRecordGridView extends GridView{

        /**
         *
         **/
        private _metadata: any;

        /**
         *
         **/
        public _recordType: string;

        /**
         * Collection of records on the grid
         **/
        records: Collection<DataRecord>;


        /**
         *
         **/
        constructor(){
            super();

            this.records = new Collection<DataRecord>(this._onAddRecord, this._onRemoveRecord, this);
        }

        /**
         *
         **/
        private _onAddRecord(record: DataRecord){

            // Add row
            var row: GridViewRow = new GridViewRow();
            var colIndex = 0;
            var col = null;

            if(this.records.count === 1){

                // Clear columns
                this.columns.clear();

                // Add columns
                var metadata = record.getMetadata();
                if(metadata && metadata.fields){
                    for(var i in metadata.fields){
                        var f = metadata.fields[i];
                        var c = new GridViewColumn();
                        c.name = f.text || i;
                        c.type = f.type || 'string';
                        this.columns.add(c);
                    }

                    this.recordType = record.recordType;
                    this._metadata = metadata;
                    this.allowNewRows = metadata['can-insert'] === true;
                }
            }

            while( (col = this.columns.next()) ){
                row.setValueAt(colIndex, record[col.tag]);
                colIndex++;
            }

            row.tag = record;
            row.readOnly = this._metadata['can-update'] !== true;

            // Point to row
            record.tags._recordDataGridViewRow = row;

            this.rows.add(row);



        }

        /**
         *
         **/
        private _onRemoveRecord(record: DataRecord){

            if(!(record.tags._recordDataGridViewRow instanceof DataSetRow))
                throw new Ex();

            this.rows.remove(record.tags._recordDataGridViewRow);

        }

        /**
         * Applies the values on row to the speified record
         **/
            applyValues(row: DataSetRow, record: DataRecord){


            for(var i = 0; i < this.columns.count; i++){

                var column = this.columns.item(i);
                var name = column.tag;

                record[name] = row.hasValueAt(i) ? row.getValueAt(i) : null;
            }

        }

        /**
         * Prepares items for context item showing
         **/
            onContextItemsShow(){

            super.onContextItemsShow();

            var cell = this.selectedCell;
            var row = this.rows.item(cell.data('rowIndex'));
            var record = row ? row.tag : null;
            var meta = record ? record.getMetadata() : null;

            this._actionRemoveRow.enabled = meta && meta['can-delete'] === true;


        }

        /**
         * Raises the <c>rowsAdded</c> event.
         **/
            onRowsAdded(dataset: DataSet){

            super.onRowsAdded(dataset);

            for(var i = 0; i < dataset.rows.count; i++){
                var row = dataset.rows.item(i);
                var record = new DataRecord();

                record.recordType = this.recordType;
                record.metadata = this._metadata;

                this.applyValues(row, record);

                row.tag = record;

                record.insert(function(){ sprintf("Inserted: " + record.recordId) });
            }

            this.confirmRowsAdded();

        }

        /**
         * Raises the <c>rowsChanged</c> event.
         **/
            onRowsChanged(dataset: DataSet){

            super.onRowsChanged(dataset);

            for(var i = 0; i < dataset.rows.count; i++){
                var row = dataset.rows.item(i);
                var record = row.tag;

                this.applyValues(row, record);

                record.update(function(){ sprintf("Updated: " + record.recordId) });
            }

            this.confirmRowsChanged();

        }

        /**
         * Raises the <c>rowsRemoved</c> event.
         **/
            onRowsRemoved(dataset: DataSet){

            super.onRowsRemoved(dataset);

            for(var i = 0; i < dataset.rows.count; i++){
                var row = dataset.rows.item(i);
                var record = row.tag;

                record.remove(function(){ sprintf("Removed: " + record.recordId) });
            }

            this.confirmRowsRemoved();

        }

        /**
         * Gets or sets the recordType of the grid
         **/
        get recordType(): string{
            return this._recordType;
        }

        /**
         * Gets or sets the recordType of the grid
         **/
        set recordType(value: string){


            this._recordType = value;


        }
    }
}