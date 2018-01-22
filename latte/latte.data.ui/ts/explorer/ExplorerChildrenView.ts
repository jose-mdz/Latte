/**
 * Created by josemanuel on 7/3/17.
 */
module latte {

    /**
     *
     */
    export class ExplorerChildrenView extends View {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Initializes the class
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Raises the <c>explorerItem</c> event
         */
        onExplorerItemChanged(){
            if(this._explorerItemChanged){
                this._explorerItemChanged.raise();
            }
        }

        /**
         * Raises the <c>showChildren</c> event
         */
        onShowChildren(){
            if(this._showChildren){
                this._showChildren.raise();
            }
        }
        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _explorerItemChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the explorerItem property changes
         *
         * @returns {LatteEvent}
         */
        get explorerItemChanged(): LatteEvent{
            if(!this._explorerItemChanged){
                this._explorerItemChanged = new LatteEvent(this);
            }
            return this._explorerItemChanged;
        }


        /**
         * Back field for event
         */
        private _showChildren: LatteEvent;

        /**
         * Gets an event raised when the children should be shown in the view
         *
         * @returns {LatteEvent}
         */
        get showChildren(): LatteEvent{
            if(!this._showChildren){
                this._showChildren = new LatteEvent(this);
            }
            return this._showChildren;
        }
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _explorerItem: ExplorerItem = null;

        /**
         * Gets or sets the explorer item which children this view represent
         *
         * @returns {ExplorerItem}
         */
        get explorerItem(): ExplorerItem{
            return this._explorerItem;
        }

        /**
         * Gets or sets the explorer item which children this view represent
         *
         * @param {ExplorerItem} value
         */
        set explorerItem(value: ExplorerItem){

            // Check if value changed
            let changed: boolean = value !== this._explorerItem;

            // Set value
            this._explorerItem = value;

            // Trigger changed event
            if(changed){
                this.onExplorerItemChanged();
            }
        }

        //endregion

    }

}