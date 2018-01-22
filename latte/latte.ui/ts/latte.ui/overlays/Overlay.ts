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

        //region Private Methods

        private ensureOnTree(){
            if(this.element.parent().length == 0) {
                this.element.appendTo('body');
            }
        }

        /**
         * Handles dimisser add
         * @param {latte.OverlayDismisser} d
         */
        private onDismisserAdded(d: OverlayDismisser){
            d.overlay = this;
        }

        /**
         * Handles dismisser remove
         * @param {latte.OverlayDismisser} d
         */
        private onDismisserRemoved(d: OverlayDismisser){
            d.uninstall();
        }

        /**
         * Sets the value of isClosed
         * @param {boolean} value
         */
        protected setIsClosed(value: boolean){
            this._isClosed = value;
        }

        /**
         * Sets value of is showm
         * @param {boolean} value
         */
        protected setIsShown(value: boolean){
            this._isShown = value;
        }
        //endregion

        //region Methods

        /**
         * Closes the overlay
         */
        close(){
            this.setIsClosed(true);
            this.element.remove();
            this.dismissers.each(d => d.uninstall());
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
         * Raises the <c>result</c> event
         */
        onResultChanged(){
            if(this._resultChanged){
                this._resultChanged.raise();
            }
        }

        /**
         * Raises the <c>shown</c> event
         */
        onShown(){
            if(this._shown){
                this._shown.raise();
            }

            this.setIsShown(true);
        }

        /**
         * Shows the overlay
         */
        show(){
            this.ensureOnTree();
            this.onShown();
        }

        /**
         * Shows the overlay at a specified position
         * @param {number} left
         * @param {number} top
         */
        showAt(left: number, top: number){
            this.left = left;
            this.top = top;

            this.ensureOnTree();
            this.onShown();
        }

        /**
         * Shows at the specified position of the specified element
         *
         * @param side
         * @param element
         */
        showAtSide(side: Side, uielement: UiElement){
            let r = uielement.element.rectangle();

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

            this.ensureOnTree();
            this.onShown();
//            this.appendTo('body');
        }

        /**
         * Shows the Overlay at the viewport center
         */
        showAtVieportCenter(){

            if(this.element.parent().length == 0) {
                this.left = -100000;
                this.element.appendTo('body');
            }

            // Wait a cycle
            setTimeout(() => {

                let uaBounds = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
                let bounds = Rectangle.fromElement(this.raw);
                let centered = bounds.centerOn(uaBounds);

                this.left = centered.left;
                this.top = centered.top;

            }, 0);


            this.onShown();
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _shown: LatteEvent;

        /**
         * Gets an event raised when the overlay is shown
         *
         * @returns {LatteEvent}
         */
        get shown(): LatteEvent{
            if(!this._shown){
                this._shown = new LatteEvent(this);
            }
            return this._shown;
        }
        //endregion

        //region Properties

        /**
         * Field for dismissers property
         */
        private _dismissers: Collection<OverlayDismisser>;

        /**
         * Gets the dismissers of the overlay
         *
         * @returns {Collection<OverlayDismisser>}
         */
        get dismissers(): Collection<OverlayDismisser> {
            if (!this._dismissers) {
                let lazy: Collection<OverlayDismisser> = this._dismissers = new Collection<OverlayDismisser>(
                    d => this.onDismisserAdded(d),
                    d => this.onDismisserRemoved(d)
                );
            }
            return this._dismissers;
        }

        /**
         * Property field
         */
        private _isClosed: boolean = false;

        /**
         * Gets a value indicating if the overlay is closed
         *
         * @returns {boolean}
         */
        get isClosed(): boolean {
            return this._isClosed;
        }

        /**
         * Property field
         */
        private _isShown: boolean;

        /**
         * Gets a value indicating if the overlay is already shown
         *
         * @returns {boolean}
         */
        get isShown(): boolean {
            return this._isShown;
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
         * Back field for event
         */
        private _resultChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the result property changes
         *
         * @returns {LatteEvent}
         */
        get resultChanged(): LatteEvent{
            if(!this._resultChanged){
                this._resultChanged = new LatteEvent(this);
            }
            return this._resultChanged;
        }

        /**
         * Property field
         */
        private _result: any = null;

        /**
         * Gets or sets the result of the overlay
         *
         * @returns {any}
         */
        get result(): any{
            return this._result;
        }

        /**
         * Gets or sets the result of the overlay
         *
         * @param {any} value
         */
        set result(value: any){

            // Check if value changed
            let changed: boolean = value !== this._result;

            // Set value
            this._result = value;

            // Trigger changed event
            if(changed){
                this.onResultChanged();
            }
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
        //endregion


    }

}