/**
 * Created by josemanuel on 3/22/15.
 */
module latte {

    /**
     *
     */
    export class ItemOverlay extends Overlay {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the overlay
         */
        constructor(item: Item) {
            super();

            if(item) {
                this.item = item;
            }
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
        private _item: Item = null;

        /**
         * Gets or sets the item of the overlay
         *
         * @returns {Item}
         */
        get item(): Item{
            return this._item;
        }

        /**
         * Gets or sets the item of the overlay
         *
         * @param {Item} value
         */
        set item(value: Item){

            // Check if value changed
            var changed: boolean = value !== this._item;

            // Set value
            this._item = value;

            // Trigger changed event
            if(changed){
                this.onItemChanged();
            }
        }

        /**
         * Back field for event
         */
        private _itemChanged: LatteEvent

        /**
         * Gets an event raised when the value of the item property changes
         *
         * @returns {LatteEvent}
         */
        get itemChanged(): LatteEvent{
            if(!this._itemChanged){
                this._itemChanged = new LatteEvent(this);
            }
            return this._itemChanged;
        }

        /**
         * Raises the <c>item</c> event
         */
        onItemChanged(){
            if(this._itemChanged){
                this._itemChanged.raise();
            }

            this.element.clear().append(this.item.element);
        }
        //endregion

    }

}