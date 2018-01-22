module latte {

    /**
     *
     */
    export class CollectionEvent<T>{

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Initializes the event
         */
        constructor(item: T, itemIndex: number = -1, cancellable: boolean = false) {
            this._item = item;
            this._cancellable = cancellable;
            this._itemIndex = itemIndex;
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
        private _cancel: boolean = null;

        /**
         * Gets or sets a value indicating if the event can be cancelled
         *
         * @returns {boolean}
         */
        get cancel(): boolean {
            return this._cancel;
        }

        /**
         * Gets or sets a value indicating if the event can be cancelled
         *
         * @param {boolean} value
         */
        set cancel(value: boolean) {
            this._cancel = value;
        }

        /**
         * Property field
         */
        private _cancellable: boolean;

        /**
         * Gets a value indicating if the event is cancellable
         *
         * @returns {boolean}
         */
        get cancellable(): boolean {
            return this._cancellable;
        }

        /**
         * Property field
         */
        private _item: T;

        /**
         * Gets the item of the event
         *
         * @returns {any}
         */
        get item(): T {
            return this._item;
        }

        /**
         * Property field
         */
        private _itemIndex: number;

        /**
         * Gets the index of the item concerning the event
         *
         * @returns {number}
         */
        get itemIndex(): number {
            return this._itemIndex;
        }


        //endregion

    }

}