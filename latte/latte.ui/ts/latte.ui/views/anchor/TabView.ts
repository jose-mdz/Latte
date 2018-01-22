module latte{
    /**
     * Represents a Tabbed View.
     *
     * Add tabs and views to its collections to obtain "Tabbed View" behavior
     **/
    export class TabView extends AnchorView{

        /**
         * Toolbar where tabs are stored
         */
        tabToolbar: TabToolbar;

        /**
         * Collection of tabs
         **/
        tabs: Collection<TabItem>;

        /**
         * Collection of views.
         View will be activated when tab changed if matches index of tab.
         **/
        views: Collection<View>;

        /**
         * Raised when a tab is selected
         **/
        selectedTabChanged: LatteEvent;

        /**
         * Creates the view
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('tab');

            this.tabToolbar = new TabToolbar();
            this.anchorTop = this.tabToolbar;

            // Init collections
            this.tabs = new Collection<TabItem>(this.onTabAdded, this.onTabRemoved, this);
            this.views = new Collection<View>();

            // Init events
            this.selectedTabChanged = new LatteEvent(this)

            this.tabToolbar.selectedTabChanged.add(() => {
                this.onSelectedTabChanged();
            });

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
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(){

            // Get index to show view
            var index = this.tabs.indexOf(this.selectedTab);

            // Show View
            if(this.views[index] instanceof View){
                this.view = this.views[index];
            }

            this.selectedTabChanged.raise();
        }

        /**
         * Override
         */
        onAnchorTopChanged(){
            super.onAnchorTopChanged();
            this.tabToolbar.contentSide = Side.BOTTOM;
        }

        /**
         * Override
         */
        onAnchorRightChanged(){
            super.onAnchorRightChanged();
            this.tabToolbar.contentSide = Side.LEFT;
        }

        /**
         * Override
         */
        onAnchorBottomChanged(){
            super.onAnchorBottomChanged();
            this.tabToolbar.contentSide = Side.TOP;
        }

        /**
         * Override
         */
        onAnchorLeftChanged(){
            super.onAnchorLeftChanged();
            this.tabToolbar.contentSide = Side.LEFT;
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
         * Property field
         */
        private _tabsSide: Side = Side.AUTO;

        /**
         * Gets or sets the side of the tabs
         *
         * @returns {Side}
         */
        public get tabsSide():Side {
            return this._tabsSide;
        }

        /**
         * Gets or sets the side of the tabs
         *
         * @param {Side} value
         */
        public set tabsSide(value:Side) {
            this._tabsSide = value;

            this.anchorTop    = null;
            this.anchorRight  = null;
            this.anchorBottom = null;
            this.anchorLeft   = null;

            switch(value){
                case Side.AUTO:
                case Side.TOP:      this.anchorTop = this.tabToolbar; break;
                case Side.RIGHT:    this.anchorRight = this.tabToolbar; break;
                case Side.BOTTOM:   this.anchorBottom = this.tabToolbar; break;
                case Side.LEFT:     this.anchorLeft = this.tabToolbar; break;
            }
        }
    }
}