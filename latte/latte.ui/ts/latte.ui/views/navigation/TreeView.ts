module latte{
    /**
     * Renders a view that contains only TreeItems
     **/
    export class TreeView extends View{

        /**
         *
         **/
        private _defaultGlyphCollapse: Glyph;

        /**
         *
         **/
        private _defaultGlyphCollapseSelected: Glyph;

        /**
         *
         **/
        private _defaultGlyphExpand: Glyph;

        /**
         *
         **/
        private _defaultGlyphExpandSelected: Glyph;

        /**
         *
         **/
        private _navigating: boolean;

        /**
         *
         **/
        private _navigatingCurrent: number;

        /**
         *
         **/
        private _navigatingPath: Array<string> = [];

        /**
         *
         **/
        private _selectedItem: TreeItem;

        /**
         *
         */
        private _addItem: LatteEvent;

        /**
         *
         */
        private _removeItem: LatteEvent;

        /**
         * Items of view
         **/
        items: Collection<TreeItem>;

        /**
         * Raised when an item of the view is selected
         **/
        itemSelected: LatteEvent;

        /**
         * Raised when the items of an item are loaded. This event is manually
         * triggered, it is raised when <c>TreeItem.reportItemsLoaded</c> is invoked.
         **/
        itemItemsLoaded: LatteEvent;


        /**
         * Creates the item
         **/
        constructor(){


            super();
            this.element.addClass('tree');
            UiElement.disableTextSelection(this.element);

            this.itemSelected = new LatteEvent(this);
            this.itemItemsLoaded = new LatteEvent(this);

            this.items = new Collection<TreeItem>(
                this.onAddItem,
                this.onRemoveItem, this);


        }

        /**
         *
         **/
        public informSelectedItem(item: TreeItem){

            if(!(item instanceof TreeItem))
                throw new InvalidArgumentEx('item');

            this._selectedItem = item;
            this.onItemSelected(item);

        }

        /**
         * Advances in the navigation to a specific node path
         **/
        private _navigateToSection(items: Collection<TreeItem>, index: number){


            if(index >= this._navigatingPath.length){
                this._navigating = false;
                return;
            }

            this._navigatingCurrent = index;


            // Find node in items
            for(var i = 0; i < items.count; i++){

                // Item found
                if(items[i].text == this._navigatingPath[index]){

                    // If doesn't have items and it may, we must wait.
                    var mustWait = items.item(i).items.count == 0 && items.item(i).hasItems;

                    // If not expanded
                    if(!items[i].expanded){
                        // Expand
                        items[i].expanded = (true);

                    }

                    if(!mustWait){
                        // Immediately navigate to next section
                        this._navigateToSection(items[i].items, index + 1);
                    }

                    // If its the last node
                    if(index == this._navigatingPath.length - 1){
                        // Select it
                        this._navigating = false;
                        items.item(i).selected = true;
                        items.item(i).onClick();

                    }

                }

            }


        }

        /**
         *
         **/
        private onAddItem(item: TreeItem){

            item.appendTo(this.container);
            item._updateGlyph();

        }

        /**
         *
         **/
        private onRemoveItem(item: TreeItem){

            item.element.detach();

        }

        /**
         * Goes to the specified path. Path is an array with names of nodes to visit.
         The path is in the format of the path found in <c>latte.Navigation.path</c>
         **/
        navigateToPath(path: Array<string>){

            // Select first node
            this._navigating = true;
            this._navigatingCurrent = 0;
            this._navigatingPath = path;
            this._navigateToSection(this.items, 0);

        }

        /**
         * Raises the <c>itemItemsLoaded</c> event
         **/
        onItemItemsLoaded(item: TreeItem){

            if(!(item instanceof TreeItem))
                throw new InvalidArgumentEx('item');

            if(this._navigating)
                this._navigateToSection(item.items, this._navigatingCurrent + 1);
            this.itemItemsLoaded.raise(item);

        }

        /**
         * Raises the <c>itemSelected</c> event
         **/
        onItemSelected(item: TreeItem){

            if(!(item instanceof TreeItem))
                throw new InvalidArgumentEx('item');

            this.itemSelected.raise(item);

        }

        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        public get addItem():LatteEvent {
            if(!this._addItem){
                this._addItem = new LatteEvent(this);
            }
            return this._addItem;
        }

        /**
         * Gets or sets the default glyph for collapse
         **/
        get defaultGlyphCollapse(): Glyph{
            return this._defaultGlyphCollapse;
        }

        /**
         * Gets or sets the default glyph for collapse
         **/
        set defaultGlyphCollapse(value: Glyph){


            this._defaultGlyphCollapse = value;


        }

        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        get defaultGlyphCollapseSelected(): Glyph{
            return this._defaultGlyphCollapseSelected;
        }

        /**
         * Gets or sets the default glyph for collapse when item is selected
         **/
        set defaultGlyphCollapseSelected(value: Glyph){


            this._defaultGlyphCollapseSelected = value;


        }

        /**
         * Gets or sets the default glyph for expand
         **/
        get defaultGlyphExpand(): Glyph{
            return this._defaultGlyphExpand;
        }

        /**
         * Gets or sets the default glyph for expand
         **/
        set defaultGlyphExpand(value: Glyph){


            this._defaultGlyphExpand = value;


        }

        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        get defaultGlyphExpandSelected(): Glyph{
            return this._defaultGlyphExpandSelected;
        }

        /**
         * Gets or sets the default glyph for expand when item is selected
         **/
        set defaultGlyphExpandSelected(value: Glyph){


            this._defaultGlyphExpandSelected = value;


        }

        /**
         * Gets a value indicating if the tree view is currently in the process
         of navigating to a specific node.
         **/
        get navigating(): boolean{

            return this._navigating;

        }

        /**
         * Gets the current navigation path as a string
         **/
        get path(): any{


            if(this.selectedItem instanceof TreeItem){
                return this.selectedItem.path;
            }

            return "/";

        }

        /**
         * Gets or sets the item who is selected on the tree
         **/
        get selectedItem(): TreeItem{
            return this._selectedItem;
        }

        /**
         * Gets or sets the item who is selected on the tree
         **/
        set selectedItem(item: TreeItem){


            item.selected = true;



        }

        /**
         * Gets an event raised when an item is removed from tree
         *
         * @returns {LatteEvent}
         */
        public get removeItem():LatteEvent {
            if(!this._removeItem){
                this._removeItem = new LatteEvent(this);
            }
            return this._removeItem;
        }
    }
}