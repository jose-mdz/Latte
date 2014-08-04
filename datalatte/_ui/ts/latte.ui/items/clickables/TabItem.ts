module latte{
    /**
     * Represents a selectable tab
     **/
    export class TabItem extends ButtonItem{

        private _active: boolean;

        private _contentSide: Side;

        /**
         * Raised when the value of the <c>active</c> property changes
         */
        activeChanged: LatteEvent;

        /**
         * Raised when the value of the <c>
         */
        contentSideChanged: LatteEvent;

        /**
         * Creates the tab
         **/
        constructor(text: string = '', icon: IconItem = null, click: Function = null, tab: any = null){

            super(text, icon, click);

            this.activeChanged = new LatteEvent(this);

            this.element.addClass('tab');

            // Init me
            this.faceVisible = false;
            this.flatSide = Side.BOTTOM;

        }

        private _applyActiveProperties(){
            if(this.active){
                this.addClass('active');
                this.openSide = this.contentSide;
            }else{
                this.removeClass('active');
                this.openSide = null;
            }
        }

        /**
         * Raises the activeChanged event.
         */
        onActiveChanged(){
            this.activeChanged.raise();
        }

        /**
         * Gets a value indicating if the tab is currently active.
         * @returns {boolean}
         */
        get active(): boolean{
            return this._active;
        }

        /**
         * Sets a value indicating if the tab is currently active.
         * @param value
         */
        set active(value: boolean){

            var changed = value !== this._active;

            this._active = value;

            this._applyActiveProperties();

            if(changed){
                this.onActiveChanged();
            }
        }

        /**
         * Gets the side where content is shown. So tab is drawn accordingly.
         *
         * @returns {Side}
         */
        get contentSide(): Side{
            return this._contentSide;
        }

        /**
         * Sets the side where content is shown. So tab is drawn accordingly.
         * @param value
         */
        set contentSide(value: Side){
            this._contentSide = value;

            // Set the flat side of tab
            this.flatSide = value;

            // Reload active properties
            this._applyActiveProperties();

        }
    }
}