/**
 * Created by josemanuel on 8/8/14.
 */
module latte {

    /**
     *
     */
    export class ExplorerTreeItem extends TreeItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _record:DataRecord = null;

        /**
         * Gets or sets the record of the tree item
         *
         * @returns {DataRecord}
         */
        public get record():DataRecord {
            return this._record;
        }

        /**
         * Gets or sets the record of the tree item
         *
         * @param {DataRecord} value
         */
        public set record(value:DataRecord) {
            this._record = value;
        }

        //endregion

    }

}