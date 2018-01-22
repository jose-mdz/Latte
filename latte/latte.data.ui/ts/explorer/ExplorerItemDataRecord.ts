/**
 * Created by josemanuel on 8/11/14.
 */
module latte {

    /**
     *
     */
    export class ExplorerItemDataRecord<T extends DataRecord> extends ExplorerItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(r: DataRecord = null) {
            super();

            if(r) {
                this.record = <T>r;
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Creates a list view item for the record
         */
        createListViewItem(): ListViewItem{

            var item = super.createListViewItem();

            // // var item = new ListViewItem();
            // var columns: string[] = this.getColumns();
            //
            // item.icon = this.getIcon();
            //
            // for (var i = 0; i < columns.length; i++) {
            //     var s:string = columns[i];
            //
            //     item.addColumn(this.getColumnWithFor(s));
            //     item.setItem(i, this.getItemForColumn(s));
            // }

            return item;
        }

        /**
         * Gets the name for the item
         *
         * @returns {string}
         */
        getName(): string{
            return this.record ? this.record.toString() : this.toString();
        }

        /**
         * Gets the name of the columns that go in the lists
         * This are names of fields, described in metadata of record.
         */
        getColumns(): string[]{

            if(!this.record) {
                return [];
            }

            var result: string[] = [];
            var metadata: any = this.record.getMetadata();

            if(metadata.fields) {
                for(var i in metadata.fields){
                    result.push(i)
                }
            }

            return result;
        }

        /**
         * Gets the width of the specified column
         *
         * @param name
         */
        getColumnWithFor(name: string){
            return 200;
        }

        /**
         * Gets an item for the column
         *
         * @param name
         */
        getItemForColumn(name: string): Item{

            var value = this.record[name];

            if(this.record[name + 'String']) {
                value = this.record[name + 'String'];
            }

            return new LabelItem(value);
        }

        /**
         * Gets the detail view of the item
         *
         * @returns {latte.DataRecordFormItem}
         */
        getDetailView(): View{

            var d = new DataRecordFormView(this.record);

            return d;
        }

        /**
         * Synchronizes UI Items to reflect possible changes
         */
        syncUI(){

            super.syncUI();

            if(this.listViewItem) {

                var item: ListViewItem = this.listViewItem;
                var columns: string[] = this.getColumns();

                for (var i = 0; i < columns.length; i++) {

                    var s:string = columns[i];

                    if(!item.columns[i]){
                        item.addColumn(this.getColumnWithFor(s));
                    }

                    item.setItem(i, this.getItemForColumn(s));
                }
            }

        }

        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _record:T = null;

        /**
         * Gets or sets the record of the item
         *
         * @returns {DataRecord}
         */
        public get record():T {
            return this._record;
        }

        /**
         * Gets or sets the record of the item
         *
         * @param {DataRecord} value
         */
        public set record(value:T) {
            this._record = value;
        }
        //endregion

    }

}