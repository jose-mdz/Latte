module latte{
    /**
     * Shows items in a stack
     **/
    export class ItemStack extends Item{

        /**
         *
         **/
        private _padding: number;

        /**
         * Pointer to the DOM element where items are placed
         **/
        container: JQuery;

        /**
         * Collection of items in the stack
         **/
        items: Collection<Item>;

        /**
         * Raised when the items are changed
         **/
        itemsChanged: LatteEvent;

        /**
         * Creates the stack of items
         **/
        constructor(items: Array<Item> = null){

            super();
            this.element.addClass('stack');

            // Init event
            this.itemsChanged = new LatteEvent(this);

            // Init collection
            this.items = new Collection<Item>(this.onAddItem, this.onRemoveItem, this);

            // Init element
            this.container = $('<div>').addClass('container').appendTo(this.element);

            if(items){
                this.items.addArray(items);
            }

        }

        //region Methods

        /**
         * Corrects the item collection by checking the DOM items
         */
        correctCollection(){
            let children = this.container.get(0).childNodes;
            let correct = [];

            for(let i = 0; i < children.length; i++){
                let instance = $(children[i]).data('instance');

                if(instance) {
                    correct.push(instance);
                }
            }

            this.items.correctItems(correct);

        }

        /**
         *
         **/
        onAddItem(item: Item){

            item.element.appendTo(this.container);

            if(_isNumber(this.padding)){
                item.element.css('margin-bottom', this.padding);
            }

            this.onItemsChanged();

        }

        /**
         *
         **/
        onRemoveItem(item: Item){

            item.element.detach();
            this.onItemsChanged();

        }

        /**
         * Adds an item to the <c>items</c> collection
         **/
        add(item: Item){

            this.items.add(item);

        }

        /**
         * Clears all elements of collection
         **/
        clear(){

            this.items.clear();

        }

        /**
         * Raises the <c>itemsChanged</c> event
         **/
        onItemsChanged(){

            this.itemsChanged.raise();

        }

        /**
         * Overriden
         **/
        onLayout(){

            super.onLayout();

            for(var i = 0; i < this.items.count; i++){
                this.items.item(i).onLayout();
            }


        }

        /**
         * Removes an item from the <c>items</c> collection
         **/
        remove(item: Item){

            this.items.remove(item);

        }
        //endregion

        /**
         * Gets the count of <c>items</c> collection
         **/
        get count(): number{

            return this.items.count;

        }

        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        get padding(): number{
            return this._padding;
        }

        /**
         * Gets or sets the padding between items and edges of stack.
         If set to null, paddings and margins will be removed.
         Default is null.
         **/
        set padding(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value');

            // Set value
            this._padding = value;

            if(_isNumber(value)){
                // Margin of container
                this.container.css('padding', value);

                // Bottom margin of elements
                this.container.children().css('margin-bottom', value);

            }else{
                // Delete properties
                this.container.css('padding', '');
                this.container.children().css('margin-bottom', '');
            }



        }
    }
}