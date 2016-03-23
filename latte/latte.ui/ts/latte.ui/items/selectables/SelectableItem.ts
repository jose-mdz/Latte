module latte{
    /**
     * Represents an item that is selectable
     **/
    export class SelectableItem extends Item{

        /**
         * Raised when the <c>selected</c> property value changes
         **/
        selectedChanged: LatteEvent;


        /**
         * Creates the selectable
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('selectable');

            // Init events
            this.selectedChanged = new LatteEvent(this);

            // Init handlers
            this.element.mouseover((e) => {this._thisMouseOver(e)});
            this.element.mouseout((e) => {this._thisMouseOut(e)});
            this.element.click((e) => {this._thisClick(e)});
            this.element.mousedown((e) => {this._thisMouseDown(e)});

        }

        /**
         *
         **/
        private _thisClick(e){



        }

        /**
         *
         **/
        private _thisMouseDown(e){

            if(!this.enabled) return;

            // Remove hover flag
            this.element.removeClass('hover');

            // Select
            this.selected = true;

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

        /**
         * Raises the <c>selectedChanged</c> event
         **/
        onSelectedChanged(){

            this.selectedChanged.raise(this);

        }

        /**
         * Sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        setSelected(value: boolean = false, raiseEvent: boolean = false){

            var changed = false;

            if(value){

                // Changed flag
                changed = !this.element.hasClass('selected');

                // Select face
                this.element.addClass('selected');

            }else{

                // Changed flag
                changed = this.element.hasClass('selected');

                // Remove flag
                this.element.removeClass('selected');
            }

            // Raise event
            if(changed && raiseEvent !== false) this.onSelectedChanged();

        }

        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        get selected(): boolean{
            return this.element.hasClass('selected');
        }

        /**
         * Gets or sets a value indicaing if the item is currently selected.
         Optionally specifies if <c>selectedChanged</c> event should be raised, if not specified, event will be raised.
         **/
        set selected(value: boolean){


            this.setSelected(value, true);



        }
    }
}