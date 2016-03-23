module latte{

    export class Overlay extends UiElement{

        /**
         *
         */
        private _top: number;

        /**
         *
         */
        private _left: number;

        /**
         *
         */
        private _parent: UiElement;

        /**
         * Creates the overlay
         */
        constructor(){
            super();

            this.element.addClass('latte-overlay');
        }

        close(){
            this.element.remove();
        }

        /**
         * Sets the parent of the overlay, and the overlay is inserted as first node of the parent
         * @param parent
         */
        setFirstInParent(parent: UiElement){
            this._parent = parent;
            parent.element.prepend(this.element);
        }

        /**
         * Shows at the specified position of the specified element
         *
         * @param side
         * @param element
         */
        showAtSide(side: Side, uielement: UiElement){
            var r = uielement.element.rectangle();

            switch(side){
                case Side.TOP:
                    this.top = r.top - this.height;
                    this.left = r.left;
                    this.width = r.width;
                    break;
                case Side.BOTTOM:
                    this.top = r.bottom;
                    this.left = r.left;
                    this.width = r.width;
                    break;
                default:
                    throw new Ex();
            }

//            this.appendTo('body');
        }

        /**
         * Gets the left coordinate of the overlay
         * @returns {number}
         */
        get left(): number{
            return this._left;
        }

        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        set left(value: number){
            this._left = value;

            this.element.css('left', value);
        }

        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @returns {UiElement}
         */
        get parent(): UiElement{
            return this._parent;
        }

        /**
         * Gets or sets the parent element of the overlay (To inherit style and such)
         * @param value
         */
        set parent(value: UiElement){
            this._parent = value;

            this.element.detach().appendTo(value.element);
        }

        /**
         * Gets the top coordinate of the overlay
         *
         * @returns {number}
         */
        get top(): number{
            return this._top;
        }

        /**
         * Sets the top coordinate of the overlay
         *
         * @param value
         */
        set top(value: number){
            this._top = value;

            this.element.css('top', value);
        }

    }

}