module latte{

    /**
     * Toolbar specialized on showing tabs.
     *
     * This toolbar is necessary because of the rendering styles applied to tabs to make the
     * graphical "tab" effect.
     */
    export class TabToolbar extends Toolbar{

        private _selectedTab: TabItem;

        private _contentSide: Side;

        /**
         * Collection of tabs
         */
        tabs: Collection<TabItem>;

        /**
         * Raised when a tab is selected
         **/
        selectedTabChanged: LatteEvent;

        /**
         * Creates the toolbar
         */
        constructor(){
            super();

            this.element.addClass('tab');

            // Init collection
            this.tabs = new Collection<TabItem>(this.onTabAdded, this.onTabRemoved, this);

            // Init events
            this.selectedTabChanged = new LatteEvent(this);

            this.contentSide = Side.BOTTOM;

        }

        /**
         * Raises the <c>selectedTabChanged</c> event
         **/
        onSelectedTabChanged(){

            this.selectedTabChanged.raise();

        }

        /**
         * Handles tab adding
         * @param tab
         */
        onTabAdded(tab: TabItem){
            this.items.add(tab);

            tab.contentSide = this.contentSide;

            tab.click.add(() => {
                this.selectedTab = tab;
            })
        }

        /**
         * Handles tab removing
         * @param tab
         */
        onTabRemoved(tab: TabItem){
            this.items.remove(tab);
        }

        /**
         * Gets the current content side
         * @returns {Side}
         */
        get contentSide(): Side{
            return this._contentSide;
        }

        /**
         * Sets the content side of tabs
         * @param value
         */
        set contentSide(value: Side){
            this._contentSide = value;

            // Set side of all tabs
            for(var i = 0; i < this.tabs.length; i++){
                this.tabs[i].contentSide = value;
            }

            // Clear classes
            this.element.removeClass('content-at-top content-at-bottom content-at-left content-at-right');

            // Set class
            switch(value){
                case Side.TOP: this.element.addClass('content-at-top'); break;
                case Side.BOTTOM: this.element.addClass('content-at-bottom');  break;
                case Side.LEFT: this.element.addClass('content-at-left');  break;
                case Side.RIGHT: this.element.addClass('content-at-right');  break;
            }
        }

        /**
         * Gets the selected tab of the toolbar
         * @returns {TabItem}
         */
        get selectedTab(): TabItem{
            return this._selectedTab;
        }

        /**
         * Sets the selected tab of the toolbar
         * @param value
         */
        set selectedTab(value: TabItem){
            var changed = value !== this._selectedTab;

            this._selectedTab = value;

            if(changed){

                // De-activate siblings
                for(var i = 0; i < this.tabs.length; i++){
                    var tab: TabItem = this.tabs[i];

                    if(tab !== value){
                        tab.active = false;
                    }
                }

                // Activate selected
                value.active = true;

                this.onSelectedTabChanged();
            }
        }

    }
}