module latte{

    /**
     * Stack of items. It unselects siblings when a selectable within is selected
     */
    export class SelectableStack extends ItemStack{

        //region Fields

        //endregion

        /**
         * Creates the item
         */
        constructor(){

            super();
            this.element.addClass('selectable');
        }

        //region Methods
        /**
         * Clears the current selection
         */
        clearSelection(){
            for(let i = 0; i < this.items.length; i++){
                if(this.items[i] instanceof SelectableItem){
                    (<SelectableItem>this.items[i]).selected = false;
                }
            }

            this._selectedItem = null;
            this.onSelectedItemChanged();
        }

        /**
         * Adds selection handlers
         * @param item
         */
        onAddItem(item: Item){
            super.onAddItem(item);

            // // Add seleciton hook
            // if(item instanceof SelectableItem){
            //     var sel: SelectableItem = <SelectableItem>item;
            //
            //     sel.selectedChanged.add(() => {
            //
            //         if(sel.selected){
            //             this._selectedItem = sel;
            //             this.onSelectedItemChanged();
            //
            //             for(var i = 0; i < this.items.length; i++){
            //                 if(this.items[i] !== item && this.items[i] instanceof SelectableItem){
            //                     (<SelectableItem>this.items[i]).selected = false;
            //                 }
            //             }
            //         }
            //     });
            // }

            if(item instanceof SelectableItem) {
                item.selectedChanged.add(() => {
                    if(item.selected) {
                        this.selectedItem = item;
                    }
                })
            }
        }

        /**
         * Raises the <c>selectedItem</c> event
         */
        onSelectedItemChanged(){
            if(this._selectedItemChanged){
                this._selectedItemChanged.raise();
            }

            this.items.each(item => {
                if(item instanceof SelectableItem) {
                    item.selected = this.selectedItem == item;
                }
            })
        }

        /**
         * Selects next item
         */
        selectNextItem(){
            let index = 0;
            let current = this.selectedItemIndex;

            if(current < this.items.length - 1 && current >= 0) {
                index = current + 1;

            }else if(current < 0){
                debugger;
                index = 0;

            }else{
                index = this.items.length - 1;
            }

            this.selectedItem = this.items[index];
        }

        /**
         * Selects previous item
         */
        selectPreviousItem(){

            let index = 0;

            if(this.selectedItemIndex > 0) {
                index = this.selectedItemIndex - 1;
            }else{
                index = 0;
            }

            this.selectedItem = this.items[index];
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _selectedItemChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the selectedItem property changes
         *
         * @returns {LatteEvent}
         */
        get selectedItemChanged(): LatteEvent{
            if(!this._selectedItemChanged){
                this._selectedItemChanged = new LatteEvent(this);
            }
            return this._selectedItemChanged;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _selectedItem: SelectableItem = null;

        /**
         * Gets or sets the selected item
         *
         * @returns {SelectableItem}
         */
        get selectedItem(): SelectableItem{
            return this._selectedItem;
        }

        /**
         * Gets or sets the selected item
         *
         * @param {SelectableItem} value
         */
        set selectedItem(value: SelectableItem){

            // Check if value changed
            let changed: boolean = value !== this._selectedItem;

            // Set value
            this._selectedItem = value;

            // Trigger changed event
            if(changed){
                this.onSelectedItemChanged();
            }
        }

        /**
         * Gets the index of the selected item
         *
         * @returns {number}
         */
        get selectedItemIndex(): number {
            if(!this.selectedItem) {
                return -1;
            }
            return this.items.indexOf(this.selectedItem);
        }

        //endregion

    }
}