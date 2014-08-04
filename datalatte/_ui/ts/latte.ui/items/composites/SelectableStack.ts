module latte{

    /**
     * Stack of items. It unselects siblings when a selectable within is selected
     */
    export class SelectableStack extends ItemStack{

        private _selectedItem: SelectableItem = null;

        private _selectedItemChanged: LatteEvent;

        /**
         * Creates the item
         */
        constructor(){

            super();
            this.element.addClass('selectable');
        }

        /**
         * Clears the current selection
         */
        clearSelection(){
            for(var i = 0; i < this.items.length; i++){
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

            // Add seleciton hook
            if(item instanceof SelectableItem){
                var sel: SelectableItem = <SelectableItem>item;

                sel.selectedChanged.add(() => {

                    if(sel.selected){
                        this._selectedItem = sel;
                        this.onSelectedItemChanged();

                        for(var i = 0; i < this.items.length; i++){
                            if(this.items[i] !== item && this.items[i] instanceof SelectableItem){
                                (<SelectableItem>this.items[i]).selected = false;
                            }
                        }
                    }
                });
            }
        }

        /**
         * Raises the <c>selectedItemChanged</c> event
         */
        onSelectedItemChanged(){
            if(this._selectedItemChanged instanceof LatteEvent){
                this._selectedItemChanged.raise();
            }
        }

        /**
         * Gets the selected item of the stack
         *
         * @returns {SelectableItem}
         */
        get selectedItem(): SelectableItem{
            return this._selectedItem;
        }

        /**
         * Gets an event raised when
         * @returns {LatteEvent}
         */
        get selectedItemChanged(): LatteEvent{
            if(!this._selectedItemChanged){
                this._selectedItemChanged = new LatteEvent(this);
            }

            return this._selectedItemChanged;
        }

    }
}