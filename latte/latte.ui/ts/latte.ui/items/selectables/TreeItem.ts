module latte{
    /**
     * Renders an Item that may contains more <c>TreeItem</c>s and shows them as a tree.
     **/
    export class TreeItem extends Item{

        //region Static
        /**
         * Global level expand glyph loader
         * @type {any}
         */
        static globalExpandGlyph: (item: TreeItem) => IconItem = null;

        /**
         * Global level collapse glyph loader
         * @type {any}
         */
        static globalCollapseGlyph: (item: TreeItem) => IconItem = null;
        //endregion

        /**
         *
         **/
        private _expandOnSelect: boolean = true;

        /**
         *
         **/
        private _expanded: boolean;

        /**
         *
         **/
        private _glyph: Glyph;

        /**
         *
         **/
        private _icon: IconItem;

        /**
         *
         **/
        private _level: number = 0;

        /**
         *
         **/
        private _parent: TreeItem;

        /**
         *
         **/
        private _selected: boolean;

        /**
         *
         **/
        private _selectedIcon: IconItem;

        /**
         *
         **/
        private _willLoadItems: boolean;

        /**
         *
         **/
        faceElement: JQuery;

        /**
         *
         **/
        glyphElement: JQuery;

        /**
         *
         **/
        iconElement: JQuery;

        /**
         *
         **/
        levelElement: JQuery;

        /**
         *
         **/
        textElement: JQuery;

        /**
         *
         **/
        items: Collection<TreeItem>;

        /**
         * Pointer to the element where items are placed
         **/
        itemsElement: JQuery;

        /**
         * Raised when user clicks the item
         **/
        click: LatteEvent;

        /**
         * Raised when children items need to be loaded
         **/
        loadItems: LatteEvent;

        /**
         * Raised when the <c>selected</c> property value changes
         **/
        selectedChanged: LatteEvent;

        /**
         * Creates the item
         **/
        constructor(){

            super();
            var item = this;

            // Init
            UiElement.disableTextSelection(this.element);

            this.click = new LatteEvent(this);
            this.loadItems = new LatteEvent(this);
            this.selectedChanged = new LatteEvent(this);

            // Update glyph when loadItems handler is added
            this.loadItems.handlerAdded.add( () => {
                //this.glyph = Glyph.expand;
                this._updateGlyph();
                });

            this.element.addClass('tree-item');

            this.faceElement = Item.selectable().appendTo(this.element);
            this.levelElement = $('<div>').addClass('level').appendTo(this.faceElement);
            this.glyphElement = $('<div>').addClass('glyph').appendTo(this.faceElement);
            this.iconElement =  $('<div>').addClass('icon').appendTo(this.faceElement);
            this.textElement =  $('<div>').addClass('text').appendTo(this.faceElement);
            this.faceElement.clear();

            this.itemsElement = $('<div>').addClass('items-container').hide().appendTo(this.element);

            this.items = new Collection<TreeItem>(
                this._onAddItem,
                this._onRemoveItem, this);

            this.glyphElement
                .click((evt) => {
                    item.expanded = !item.expanded;
                    evt.stopPropagation();
                });

            this.faceElement
                .click(() => {
                    this.selected = true;
                    this.onClick();
                });

        }

        /**
         *
         **/
        private _onAddItem(item: TreeItem){

            item.level = this.level + 1;
            item._parent = this;


            this.itemsElement.append(item.element);
            item._updateGlyph();

        }

        /**
         *
         **/
        private _onRemoveItem(item: TreeItem){

            item._parent = null;
            item.element.remove();

        }

        /**
         *
         **/
        public _updateGlyph(){


            if(this.hasItems){
                if(this.expanded){

                    if(TreeItem.globalCollapseGlyph) {
                        this.glyph = TreeItem.globalCollapseGlyph(this);
                    }else {
                        if(this.treeView && this.treeView.defaultGlyphCollapse){
                            if(this.selected && this.treeView.defaultGlyphCollapseSelected)
                                this.glyph = this.treeView.defaultGlyphCollapseSelected.clone();
                            else
                                this.glyph = this.treeView.defaultGlyphCollapse.clone();
                        }else{
                            this.glyph = Glyph.collapse;
                        }
                    }



                }else{

                    if(TreeItem.globalExpandGlyph) {
                        this.glyph = TreeItem.globalExpandGlyph(this);
                    }else {
                        if(this.treeView && this.treeView.defaultGlyphExpand){
                            if(this.selected && this.treeView.defaultGlyphExpandSelected)
                                this.glyph = this.treeView.defaultGlyphExpandSelected.clone();
                            else
                                debugger;
                            this.glyph = this.treeView.defaultGlyphExpand.clone();
                        }else{
                            // debugger;
                            this.glyph = Glyph.expand;
                        }
                    }


                }
            }

        }

        /**
         * Deletes the node from its parent
         **/
        deleteFromParent(){


            if(this.parent){
                this.parent.items.remove(this);
            }else{
                if(this.treeView){
                    this.treeView.items.remove(this);
                }else{
                    throw new InvalidCallEx();
                }
            }


        }

        /**
         * Raises the <c>click</c> event
         **/
        onClick(){

            this.click.raise();

        }

        /**
         * Raises the <c>loadItems</c> event
         **/
        onLoadItems(){

            this.loadItems.raise();

        }

        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(){

            this.selectedChanged.raise();

            if(this.selectedIcon){

                if(this.selected){
                    this.selectedIcon.appendTo(this.iconElement.empty());
                }else{
                    this.icon.appendTo(this.iconElement.empty());
                }
            }

            this._updateGlyph();

        }

        /**
         * Reports to the <c>TreeView</c> that items have been loaded
         so it can trigger the <c>itemItemsLoaded</c>
         **/
        reportItemsLoaded(){

            var tree = this.treeView;

            if(tree instanceof TreeView){
                tree.onItemItemsLoaded(this);
            }

        }

        /**
         * Returns the top most parent of the item
         **/
        topParent(): TreeItem{

            if(_undef(this.parent)){
                return this;
            }else{
                return this.parent.topParent();
            }

        }

        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        get expandOnSelect(): boolean{
            return this._expandOnSelect;
        }

        /**
         * Gets or sets a value indicating if the item will react to select as a gesture to alternate its <c>expand</c> state
         Default is <c>true</c>
         **/
        set expandOnSelect(value: boolean){


            if(typeof value != 'boolean')
                throw new InvalidArgumentEx('value');

            this._expandOnSelect = value;



        }

        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        get expanded(): boolean{
            return this._expanded;
        }

        /**
         * Gets or sets a value indicating if the item is currently expanded, this is, showing its child items
         **/
        set expanded(value: boolean){


            if(this.hasItems){
                if(!_isBoolean(value))
                    throw new InvalidArgumentEx('value');

                this._expanded = value;

                if(value){
                    this.itemsElement.show();
                    this.onLoadItems();
                }else{
                    this.itemsElement.hide();
                }

                this._updateGlyph();

            }



        }

        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        get glyph(): IconItem{
            return this._glyph;
        }

        /**
         * Gets or sets the glyph of the item. Glyph is changed automatically when <c>expanded()</c> is invoked
         **/
        set glyph(value: IconItem){


            this.glyphElement.empty().append(value.element);

            this._glyph = value;

        }

        /**
         * Gets a value indicating if the item contains child items or a handler for <c>loadItems</c> has been set
         **/
        get hasItems(): boolean{

            return this.items.length > 0 || (_isArray(this.loadItems.handlers) && this.loadItems.handlers.length > 0);

        }

        /**
         * Gets or sets the icon of the item
         **/
        get icon(): IconItem{
            return this._icon;
        }

        /**
         * Gets or sets the icon of the item
         **/
        set icon(value: IconItem){


            if(!(value instanceof IconItem))
                throw new InvalidArgumentEx('value');

            this._icon = value;

            // Append icon
            value.appendTo(this.iconElement.empty());



        }

        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        get level(): number{
            return this._level;
        }

        /**
         * Gets or sets the level of the item. The level specifies the indent of the item.
         **/
        set level(value: number){

            this._level = value;

            this.levelElement.width(value * 16);

        }

        /**
         * Gets the parent <c>TreeItem</c> of this item
         **/
        get parent(): TreeItem{

            return this._parent;

        }

        /**
         * Gets the navigation path as a string
         **/
        get path(): any{

            var r = [];

            var item: TreeItem = this;

            while(item != null){
                r.push(item.text);
                item = item.parent;
            }

            r.reverse();

            return "/"  + r.join("/");

        }

        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        get selected(): boolean{
            return this._selected;
        }

        /**
         * Gets or sets a value indicaing if the item is currently selected
         **/
        set selected(value: boolean){


            var changed = value !== this._selected;

            this._selected = value;

            if(value){

                // Get TreeView
                var tv = this.treeView;

                if (tv) {

                    //region Unselect siblings of all tree
                    var tabOf = (len) => {
                        var s = '';
                        for (var i = 0; i < len; i++) s += '-';
                        return s;
                    }
                    var unselect = (item:TreeItem, tab = 0) => {


                        if (item !== this && item.selected) {
                            item.selected = false;
                        }

                        for (var i = 0; i < item.items.length; i++) {
                            unselect(item.items[i], tab + 1);
                        }

                    };

                    for (var i = 0; i < tv.items.length; i++) {
                        unselect(tv.items[i]);
                    }

                    //endregion

                }

                // Select face
                this.faceElement.addClass('selected');

                // Expand if needed
                if(this.expandOnSelect && !this.expanded){
                    this.expanded = true;
                }

                // Inform tree view selection
                if(tv){
                    tv.informSelectedItem(this);
                }
            }else{
                this.faceElement.removeClass('selected');
            }

            if(changed){
                this.onSelectedChanged();
            }


        }

        /**
         * Gets or sets the icon of the item when selected
         **/
        get selectedIcon(): IconItem{
            return this._selectedIcon;
        }

        /**
         * Gets or sets the icon of the item when selected
         **/
        set selectedIcon(value: IconItem){


            if(!(value instanceof IconItem))
                throw new InvalidArgumentEx('value');

            this._selectedIcon = value;

            // Append icon
            if(this.selected){
                value.appendTo(this.iconElement.empty());
            }



        }

        /**
         * Gets or sets the text of the item
         **/
        get text(): string{
            return this.textElement.html();
        }

        /**
         * Gets or sets the text of the item
         **/
        set text(value: string){
            this.textElement.html(value);
        }

        /**
         * Gets the <c>TreeView</c> item who contains this item, if any
         **/
        get treeView(): TreeView{

            var t = this.element.parents('.latte-view.tree');

            if(t.length){
                return t.data('instance');
            }else{
                return null;
            }

        }
    }
}
