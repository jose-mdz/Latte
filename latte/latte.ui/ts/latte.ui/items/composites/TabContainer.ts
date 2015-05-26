module latte{
    export class TabContainer extends ItemStack{

        tabToolbar: TabToolbar;

        tabs: Collection<TabItem>;

        content: Collection<Item>;

        selectedTabChanged: LatteEvent;

        constructor(){
            super();

            this.element.addClass('tab-container');

            // Create elements
            this.tabToolbar = new TabToolbar();
            this.tabToolbar.faceVisible = false;

            // Init collections
            this.tabs = new Collection<TabItem>(this.onTabAdded, this.onTabRemoved, this);
            this.content = new Collection<Item>(this.onContentAdded, this.onContentRemoved, this);

            // Init events
            this.selectedTabChanged = new LatteEvent(this)

            this.tabToolbar.selectedTabChanged.add(() => {
                this.onSelectedTabChanged();
            });

        }

        private updateVisibility(){

            var index = this.tabs.indexOf(this.selectedTab);
            var item = this.content[index];

            for(var i = 0; i < this.content.length; i++){
                var checker = this.content[i];

                if(checker === item){
                    checker.element.show();
                }else{
                    checker.element.hide();
                }
            }

        }

        /**
         *
         **/
        onTabAdded(tab: TabItem){

            this.tabToolbar.tabs.add(tab);

            this.onLayout();
        }

        /**
         *
         **/
        onTabRemoved(tab: TabItem){

            this.tabToolbar.tabs.remove(tab);

        }

        /**
         *
         * @param item
         */
        onContentAdded(item: Item){
            this.contentSide = this.contentSide;

            item.addClass('content');
        }

        /**
         *
         * @param item
         */
        onContentRemoved(item: Item){
//            this.contentSide = this.contentSide;
        }

        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(){

            this.updateVisibility();

            this.selectedTabChanged.raise();
        }

        /**
         * Gets or sets the selected tab of the view
         **/
        get selectedTab(): TabItem{
            return this.tabToolbar.selectedTab;
        }

        /**
         * Gets or sets the selected tab of the view
         **/
        set selectedTab(value: TabItem){

            this.tabToolbar.selectedTab = value;

            this.onSelectedTabChanged();
        }

        /**
         * Gets the side where content should be relative to the tabs
         * @returns {Side}
         */
        get contentSide(): Side{
            return this.tabToolbar.contentSide;
        }

        /**
         * Sets the side where content should be relative to the tabs
         * @param value
         */
        set contentSide(value: Side){
            this.tabToolbar.contentSide = value;

            // Clear classes
            this.element.removeClass('content-at-top content-at-bottom content-at-left content-at-right');

            // Set class
            switch(value){
                case Side.TOP: this.element.addClass('content-at-top'); break;
                case Side.BOTTOM: this.element.addClass('content-at-bottom');  break;
                case Side.LEFT: this.element.addClass('content-at-left');  break;
                case Side.RIGHT: this.element.addClass('content-at-right');  break;
            }

            // Clear stack items
            this.items.clear();

            var addViews = () =>{
                for(var i = 0; i < this.content.length; i++){
                    this.items.add(this.content[i]);
                }
            };

            if(value == Side.BOTTOM){

                // Toolbar first
                this.items.add(this.tabToolbar);

                // Add views
                addViews();

            }else if(value == Side.TOP){

                // Views first
                addViews();

                // Toolbar last
                this.items.add(this.tabToolbar);
            }

            this.updateVisibility();
        }

    }
}