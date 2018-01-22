module latte{
    /**
     * Represents an item that is selectable
     **/
    export class SelectableItem extends Item{

        //region Static
        /**
         * Creates a SelectableItem with an inner item
         * @param {latte.Item} item
         */
        static fromInnerItem(innerItem: Item, tag: any = null): SelectableItem{
            let item = new SelectableItem();

            item.innerItem = innerItem;

            if(tag) {
                item.tag = tag;
            }

            return item;
        }
        //endregion

        //region Fields

        private lastItem: Item;
        //endregion


        /**
         * Creates the selectable
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('selectable');

            // Init handlers
            this.element.mouseover((e) => {this._thisMouseOver(e)});
            this.element.mouseout((e) => {this._thisMouseOut(e)});
            this.element.click((e) => {this._thisClick(e)});
            this.element.mousedown((e) => {this._thisMouseDown(e)});

        }

        //region Private Methods

        /**
         *
         **/
        private _thisClick(e){

            // Select
            this.selected = true;

        }

        /**
         *
         **/
        private _thisMouseDown(e){

            if(!this.enabled) return;

            // Remove hover flag
            this.element.removeClass('hover');

        }

        /**
         *
         **/
        private _thisMouseOut(e){

            if(!this.enabled) return;

            this.element.removeClass('hover pressed');

        }

        /**
         *
         **/
        private _thisMouseOver(e){

            if(!this.enabled) return;

            this.element.addClass('hover');

        }
        //endregion

        //region Methods

        /**
         * Raises the <c>innerItem</c> event
         */
        onInnerItemChanged(){
            if(this._innerItemChanged){
                this._innerItemChanged.raise();
            }

            if(this.lastItem) {
                this.lastItem.raw.remove();
            }

            if(this.innerItem) {
                this.raw.appendChild(this.innerItem.raw);
            }
        }

        /**
         * Raises the <c>selected</c> event
         */
        onSelectedChanged(){
            if(this._selectedChanged) {
                this._selectedChanged.raise();
            }

            this.ensureClass('selected', this.selected);
        }

        /**
         * Sets a value indicating if the item is currently selected.
         * Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         */
        setSelected(value: boolean = false, raiseEvent: boolean = false){

            if(raiseEvent) {
                this.selected = value;
            }else{
                this._selected = value;
                this.ensureClass('selected', this.selected);
            }

        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _innerItemChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the innerItem property changes
         *
         * @returns {LatteEvent}
         */
        get innerItemChanged(): LatteEvent{
            if(!this._innerItemChanged){
                this._innerItemChanged = new LatteEvent(this);
            }
            return this._innerItemChanged;
        }

        /**
         * Back field for event
         */
        private _selectedChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the selected property changes
         *
         * @returns {LatteEvent}
         */
        get selectedChanged(): LatteEvent{
            if(!this._selectedChanged){
                this._selectedChanged = new LatteEvent(this);
            }
            return this._selectedChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _innerItem: Item = null;

        /**
         * Gets or sets the hosted inner item of this item
         *
         * @returns {Item}
         */
        get innerItem(): Item{
            return this._innerItem;
        }

        /**
         * Gets or sets the hosted inner item of this item
         *
         * @param {Item} value
         */
        set innerItem(value: Item){

            // Check if value changed
            let changed: boolean = value !== this._innerItem;

            // Set value
            this._innerItem = value;

            // Trigger changed event
            if(changed){
                this.onInnerItemChanged();
            }
        }


        /**
         * Property field
         */
        private _selected: boolean = false;

        /**
         * Gets or sets a value indicating if the item is currently selected
         *
         * @returns {boolean}
         */
        get selected(): boolean{
            return this._selected;
        }

        /**
         * Gets or sets a value indicating if the item is currently selected
         *
         * @param {boolean} value
         */
        set selected(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._selected;

            // Set value
            this._selected = value;

            // Trigger changed event
            if(changed){
                this.onSelectedChanged();
            }
        }

        //endregion

    }
}