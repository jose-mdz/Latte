/**
 * Created by josemanuel on 7/3/14.
 */
module latte {

    /**
     *
     */
    export class DrawingClickable extends DrawingNode {

        //region Static
        //endregion

        //region Fields

        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Raises the <c>click</c> event
         */
        public onClick(p: Point, button: number){
            if(this._click){
                this._click.raise(p, button);
            }
        }

        /**
         * Raises the <c>doubleClick</c> event
         */
        public onDoubleClick(p: Point, button: number){
            if(this._doubleClick){
                this._doubleClick.raise(p, button);
            }
        }

        /**
         * Raises the <c>dragged</c> event
         */
        onDragged(){
            if(this._dragged){
                this._dragged.raise();
            }
        }

        /**
         * Raises the <c>mouseDown</c> event
         */
        public onMouseDown(p: Point, button: number){
            if(this._mouseDown){
                this._mouseDown.raise(p, button);
            }

            if(this.draggable) {
                this._dragOffset = new Point(p.x - this.left, p.y - this.top);
            }

            this._mouseIsDown = true;
        }

        /**
         * Raises the <c>mouseEnter</c> event
         */
        public onMouseEnter(){
            if(this._mouseEnter){
                this._mouseEnter.raise();
            }
        }

        /**
         * Raises the <c>mouseLeave</c> event
         */
        public onMouseLeave(){
            if(this._mouseLeave){
                this._mouseLeave.raise();
            }
        }

        /**
         * Raises the <c>mouseMove</c> event
         */
        public onMouseMove(p: Point, button: number){
            if(this._mouseMove){
                this._mouseMove.raise(p, button);
            }
        }

        /**
         * Raises the <c>mouseUp</c> event
         */
        public onMouseUp(p: Point, button: number){
            if(this._mouseUp){
                this._mouseUp.raise(p, button);
            }
            this._mouseIsDown = false;
        }

        /**
         * Raises the <c>mouseWheel</c> event
         */
        public onMouseWheel(p: Point, delta: number){
            if(this._mouseWheel){
                this._mouseWheel.raise(p, delta);
            }
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _click: LatteEvent

        /**
         * Gets an event raised when the node is clicked
         *
         * @returns {LatteEvent}
         */
        public get click(): LatteEvent{
            if(!this._click){
                this._click = new LatteEvent(this);
            }
            return this._click;
        }

        /**
         * Back field for event
         */
         private _doubleClick: LatteEvent

        /**
         * Gets an event raised when the user double clicks the node
         *
         * @returns {LatteEvent}
         */
        public get doubleClick(): LatteEvent{
            if(!this._doubleClick){
                this._doubleClick = new LatteEvent(this);
            }
            return this._doubleClick;
        }


        /**
         * Back field for event
         */
        private _dragged: LatteEvent;

        /**
         * Gets an event raised when the node is dragged
         *
         * @returns {LatteEvent}
         */
        get dragged(): LatteEvent{
            if(!this._dragged){
                this._dragged = new LatteEvent(this);
            }
            return this._dragged;
        }

        /**
         * Back field for event
         */
         private _mouseDown: LatteEvent

        /**
         * Gets an event raised when the node captures the mouse down
         *
         * @returns {LatteEvent}
         */
        public get mouseDown(): LatteEvent{
            if(!this._mouseDown){
                this._mouseDown = new LatteEvent(this);
            }

            return this._mouseDown;
        }

        /**
         * Back field for event
         */
         private _mouseEnter: LatteEvent

        /**
         * Gets an event raised when the mouse enters the node
         *
         * @returns {LatteEvent}
         */
        public get mouseEnter(): LatteEvent{
            if(!this._mouseEnter){
                this._mouseEnter = new LatteEvent(this);
            }
            return this._mouseEnter;
        }

        /**
         * Back field for event
         */
         private _mouseLeave: LatteEvent

        /**
         * Gets an event raised when the mouse leaves the node
         *
         * @returns {LatteEvent}
         */
        public get mouseLeave(): LatteEvent{
            if(!this._mouseLeave){
                this._mouseLeave = new LatteEvent(this);
            }
            return this._mouseLeave;
        }

        /**
         * Back field for event
         */
         private _mouseMove: LatteEvent

        /**
         * Gets an event raised when the mouse moves across the node
         *
         * @returns {LatteEvent}
         */
        public get mouseMove(): LatteEvent{
            if(!this._mouseMove){
                this._mouseMove = new LatteEvent(this);
            }
            return this._mouseMove;
        }

        /**
         * Back field for event
         */
         private _mouseUp: LatteEvent

        /**
         * Gets an event raised when the node captures the mouse up
         *
         * @returns {LatteEvent}
         */
        public get mouseUp(): LatteEvent{
            if(!this._mouseUp){
                this._mouseUp = new LatteEvent(this);
            }
            return this._mouseUp;
        }

        /**
         * Back field for event
         */
         private _mouseWheel: LatteEvent

        /**
         * Gets an event raised when the user scrolls on the element
         *
         * @returns {LatteEvent}
         */
        public get mouseWheel(): LatteEvent{
            if(!this._mouseWheel){
                this._mouseWheel = new LatteEvent(this);
            }
            return this._mouseWheel;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _draggable:boolean = false;

        /**
         * Gets or sets a value indicating if user is allowed to draw the node around.
         *
         * @returns {boolean}
         */
        get draggable():boolean {
            return this._draggable;
        }

        /**
         * Gets or sets a value indicating if user is allowed to draw the node around.
         *
         * @param {boolean} value
         */
        set draggable(value:boolean) {
            this._draggable = value;
        }

        /**
         * Property field
         */
        private _dragOffset:Point;

        /**
         * Gets the offset of dragging
         *
         * @returns {string}
         */
        get dragOffset():Point {
            return this._dragOffset;
        }


        /**
         * Property field
         */
        private _mouseHovering:boolean = false;

        /**
         * Gets or sets a value indicating if the mouse is currently hovering the node
         *
         * @returns {boolean}
         */
        public get mouseHovering():boolean {
            return this._mouseHovering;
        }

        /**
         * Gets or sets a value indicating if the mouse is currently hovering the node
         *
         * @param {boolean} value
         */
        public set mouseHovering(value:boolean) {
            this._mouseHovering = value;
        }

        /**
         * Property field
         */
        private _mouseIsDown:boolean;

        /**
         * Gets a value indicating if the mouse is currently down
         *
         * @returns {boolean}
         */
        get mouseIsDown():boolean {
            return this._mouseIsDown;
        }


        //endregion

    }

}