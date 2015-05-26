module latte{
    /**
     * Renders a Ribbon.

     Ribbons are toolbars with tabbed views of tools and a button called <c>startButton</c>.
     **/
    export class Ribbon extends Item{

        /**
         *
         **/
        private _lastWrapper: JQuery;

        /**
         *
         */
        private _selectedTab: TabItem;

        /**
         *
         **/
        collapseButton: ButtonItem;

        /**
         *
         **/
        face: JQuery;

        /**
         * Collection of items in the Ribbon
         **/
        items: Collection<Item>;

        /**
         *
         **/
        itemsContainer: JQuery;

        /**
         * Holds the pointer to the start button of the ribbon
         **/
        startButton: ButtonItem;

        /**
         * Collection of tabs in the Ribbon
         **/
        tabs: Collection<TabItem>;

        /**
         *
         **/
        tabsElement: JQuery;

        /**
         * Raised when <c>collapsed</c> value changes
         **/
        collapsedChanged: LatteEvent;

        /**
         * Raised when <c>selectedTab()</c> value changes.
         **/
        selectedTabChanged: LatteEvent;

        /**
         * Creates the Ribbon
         **/
        constructor(){

            // Init
            super();
            this.addClass('ribbon');
            var ribbon = this;

            // Events
            this.collapsedChanged = new LatteEvent(this);
            this.selectedTabChanged = new LatteEvent(this);

            // Collections
            this.items = new Collection<Item>(this._onAddItem, this._onRemoveItem, this);
            this.tabs  = new Collection<TabItem>(this._onAddTab, this._onRemoveTab, this);

            // Elements
            this.tabsElement = $('<div>').addClass('tabs').appendTo(this.element);
            this.face = $('<div>').addClass('face').appendTo(this.element);
            this.itemsContainer = $('<div>').addClass('items-container').appendTo(this.face)

            // Create start button
            this.startButton = new ButtonItem()
            this.startButton.appendTo(this.tabsElement)
            this.startButton.text = ("Untitled")
            this.startButton.dropdownVisible = false
            this.startButton.addClass('start-button');

            // Collapse button
            this.collapseButton = new ButtonItem()
            this.collapseButton.appendTo(this.element)
            this.collapseButton.faceVisible = false
            this.collapseButton.text = null
            this.collapseButton.icon = Glyph.collapseRibbon;
            this.collapseButton.click.add(() => { this.collapsed = !this.collapsed })
            this.collapseButton.addClass('collapse');

            // Wire events
            this.face.mouseleave(() => {
                if(this.collapsed){
                    this.faceVisible = false;
                }
            });

            // Initialize properties
            this.tabsElement.height(this.startButton.element.height());
            UiElement.disableTextSelection(this.element);


        }

        /**
         * Adds the item to the face of ribbon
         **/
        private _addToFace(item: Item){

            /// Check if goes on itself or it needs to be placed in wrapper
            if(this._goesWrapped(item)){

                // Goes on wrapper
                this._addWrappedItem(item);

            }else{
                item.appendTo(this.itemsContainer);
                this._cutLastWrapper();
            }

        }

        private _cutLastWrapper(){

            if(this._lastWrapper){

                var ch = this._lastWrapper.children();

                if(ch.length == 2){
                    this._lastWrapper.css('paddingTop', 13);

                }else if(ch.length == 1) {
                    this._lastWrapper.css('paddingTop', 20);
                }
            }

            this._lastWrapper = null;
        }

        /**
         * Creates a wrapper for grouping items on ribbon's face
         **/
        private _addWrappedItem(item: Item){

            if(!this._lastWrapper || (this._lastWrapper && this._lastWrapper.children().length == this.itemsInGroup)){

                if(this._lastWrapper){
                    this._cutLastWrapper();
                }

                /// Create wrapper
                this._lastWrapper = $('<div>')
                    .addClass('ribbon-wrapper')
                    .appendTo(this.itemsContainer);
            }



            item.appendTo(this._lastWrapper);

        }

        /**
         *
         **/
        private _clearTabsMarks(){

            /// Remove marks from all tabs
            var tab: ButtonItem;

            while( (tab = this.tabs.next()) ){
                //MenuOverlay.mark(tab.face);
                tab.withContext = (false);
                tab.openSide = (null);
                tab.faceVisible = (false);
            }

        }

        /**
         * Gets the tab for the specified item
         **/
        private _getItemTab(item: Item): TabItem{

            var t = null;

            /// Check tab property
            if(typeof item.tab === null) {
                console.warn("The item must have 'tab' property: ");
                log(item);
            }
            else if(item.tab instanceof ButtonItem){
                t =  item.tab;
            }
            else if(!isNaN(item.tab)){
                t = this.tabs.item(item.tab);
            }

            return t;

        }

        /**
         * Tells if the item should be wrapped
         **/
        private _goesWrapped(item: Item): boolean{

            if(item instanceof SeparatorItem){
                return false;
            }else if(item instanceof ButtonItem){
                return (<ButtonItem>item).direction != Direction.VERTICAL;
            }else{
                return true;
            }

        }

        /**
         *
         **/
        private _onAddItem(item: Item){

            /// Check tab property
            if(!item.tab) console.warn("The item must have 'tab' property: " + item);

            /// Adapt buttons for ribbon
            if(item instanceof ButtonItem){

                var b = <ButtonItem>item;

                /// Remove face
                b.faceVisible = false;

                /// Remove description
                b.description = null;

                if(b.icon &&  b.icon.size == 32){
                    b.direction = Direction.VERTICAL;
                }
            }

            /// If item belongs to selected tab
            if(this._getItemTab(item) === this.selectedTab){
                // Add the item to the face
                this._addToFace(item);
            }

        }

        /**
         *
         **/
        private _onAddTab(tab: TabItem){

//            var __this = this;

            tab.appendTo(this.tabsElement);
            tab.click.add(() => { this.selectedTab = tab} );

            this.onLayout();

        }

        /**
         *
         **/
        private _onRemoveItem(item: Item){

            /// If item belongs to selected tab
            if(this._getItemTab(item) === this.selectedTab){
                // Remove item from face
                item.element.detach();
            }

        }

        /**
         *
         **/
        private _onRemoveTab(tab: TabItem){

            tab.element.detach();

        }

        /**
         * Adds a tab with the specified text
         **/
        addTab(text: string): TabItem{

            var t = new TabItem();

            t.text = text;

            this.tabs.add(t);

            return t;

        }

        /**
         * Adds a separator on the specified tab
         * @param tab
         */
        addSeparator(tab: TabItem){
            var s = new SeparatorItem();
            s.tab = tab;
            this.items.add(s);
        }

        /**
         * Raises the <c>collapsedChanged</c> event
         **/
        onCollapsedChanged(){

            this.collapsedChanged.raise();

        }

        /**
         * Raises the <c>layout</c> event
         **/
        onLayout(){

            super.onLayout();

            if(this.tabs.count > 0){
                this.tabsElement.height(this.tabs.first.element.outerHeight() - 1);
            }else{
                this.tabsElement.height(this.startButton.height);
            }

            for (var i = 0; i < this.items.length; i++) {
                this.items[i].onLayout();
            }

        }

        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(){

            this.selectedTabChanged.raise();

        }

        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        get collapsed(): boolean{
            return this.element.hasClass('collapsed');
        }

        /**
         * Gets or sets a value indicating if the ribbon is currently collapsed
         **/
        set collapsed(value: boolean){


            if(value){
                this.addClass('collapsed');
                this.faceVisible = false;
                this.collapseButton.checked = true;
                this._clearTabsMarks();
            }else{
                this.removeClass('collapsed');
                this.collapseButton.checked = false;

                this.selectedTab = this.selectedTab;
                this.face.show().css('opacity', 1);
            }

            this.onCollapsedChanged();



        }

        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        get faceVisible(): boolean{
            return this.face.is(':visible');
        }

        /**
         * Gets or sets a value indicating if the ribbon face is visible
         **/
        set faceVisible(value: boolean){

            if(!this.collapsed) return;

//            var __this = this;
            if(value){
                this.face.show().animate(
                    { top: this.tabsElement.outerHeight(), opacity: 1}, 100, 'swing', () => { this.onLayout()});
                this.addClass('face-visible');
                this.removeClass('face-hidden');
            }else{
                this._clearTabsMarks();
                this.face.animate({ top: '-=50', opacity: 0}, 100,'swing', () => { this.face.hide(); this.onLayout(); });
                this.removeClass('face-visible');
                this.addClass('face-hidden');
            }

        }

        /**
         * Field for itemsInGroup property.
         */
        private _itemsInGroup:number = 2;

        /**
         * Gets or sets the number of items in groups
         */
        get itemsInGroup():number {
            return this._itemsInGroup;
        }

        /**
         * Gets or sets the number of items in groups
         */
        set itemsInGroup(value:number) {
            this._itemsInGroup = value;
        }



        /**
         * Gets or sets the currently selected Tab
         **/
        get selectedTab(): TabItem{
            return this._selectedTab;
        }

        /**
         * Gets or sets the currently selected Tab
         **/
        set selectedTab(tab: TabItem){


            if(!(tab instanceof ButtonItem))
                throw new InvalidArgumentEx('tab', tab);

            /// Remove marks from all tabs
            this._clearTabsMarks();

            /// Mark tab
            tab.contextAt = Side.BOTTOM;

            /// Empties items container
            this.itemsContainer.children().detach();
            this.itemsContainer.empty();

            var item;

            /// Scan items
            while( (item = this.items.next()) ){

                /// If item belongs to tab
                if(this._getItemTab(item) === tab){

                    // Add the item to the face
                    this._addToFace(item);
                }

            }

            this._cutLastWrapper();

            var changed = this._selectedTab !== tab;

            this._selectedTab = tab;

            if(this.collapsed){
                this.faceVisible = true;
            }

            if(changed){
                this.onSelectedTabChanged();
            }




        }
    }
}