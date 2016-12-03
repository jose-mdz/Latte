module latte{
    /**
     * Represents a column header
     **/
    export class ColumnHeader extends LabelItem{


        //region Fields
        mouseDownRect: ClientRect = null;
        mouseDownPoint: Point = null;
        bodyMouseMoveHandler: (e: MouseEvent) => any = null;
        bodyMouseUpHandler: (e: MouseEvent) => any = null;
        //endregion

        /**
         * Creates the Column Header
         **/
        constructor(text: string = '', width: number = 150){

            super();
            this.element.addClass('column-header');
            this.element.append(this.resizer);
            this.element.click(() => {if(this.sortable) this.onSortRequested()});

            this.width = width;
            this.text = text;

        }

        //region Methods

        /**
         * Handles mouse down of resizer
         * @param e
         */
        private resizer_MouseDown(e: MouseEvent){

            this.addClass('resizing');

            this.mouseDownPoint = new Point(e.clientX, e.clientY);
            this.mouseDownRect = (<HTMLDivElement>this.element.get(0)).getBoundingClientRect();

            this.bodyMouseMoveHandler = (e) => this.body_MouseMove(e);
            this.bodyMouseUpHandler = (e) => this.body_MouseUp(e);

            document.body.addEventListener('mousemove', this.bodyMouseMoveHandler);
            document.body.addEventListener('mouseup', this.bodyMouseUpHandler);
        }

        /**
         * Handles temporary body mouse up
         * @param e
         */
        private body_MouseUp(e: MouseEvent){

            this.removeClass('resizing');

            // Flush the toilet: Xin Lee.
            document.body.removeEventListener('mousemove', this.bodyMouseMoveHandler);
            document.body.removeEventListener('mouseup', this.bodyMouseUpHandler);
        }

        /**
         * Handles temporary body mouse move
         * @param e
         */
        private body_MouseMove(e){
            e.preventDefault();

            this.width = e.clientX - this.mouseDownRect.left;
        }

        /**
         * Raises the <c>autoResize</c> event
         */
        onAutoResize(){
            if(this._autoResize){
                return this._autoResize.raise();
            }
        }

        /**
         * Raises the <c>autoResizeAll</c> event
         */
        onAutoResizeAll(){
            if(this._autoResizeAll){
                this._autoResizeAll.raise();
            }
        }

        /**
         * Raises the <c>sortable</c> event
         */
        onSortableChanged(){
            if(this._sortableChanged){
                return this._sortableChanged.raise();
            }

            this.ensureClass('sortable', this.sortable);
        }

        /**
         * Raises the <c>width</c> event
         */
        onWidthChanged(){
            if(this._widthChanged){
                this._widthChanged.raise();
            }

            this.element.width(this._width);
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _autoResize: LatteEvent;

        /**
         * Gets an event raised when user requests auto resize
         *
         * @returns {LatteEvent}
         */
        get autoResize(): LatteEvent{
            if(!this._autoResize){
                this._autoResize = new LatteEvent(this);
            }
            return this._autoResize;
        }


        /**
         * Back field for event
         */
        private _autoResizeAll: LatteEvent;

        /**
         * Gets an event raised when the user requests to autoresize all columns
         *
         * @returns {LatteEvent}
         */
        get autoResizeAll(): LatteEvent{
            if(!this._autoResizeAll){
                this._autoResizeAll = new LatteEvent(this);
            }
            return this._autoResizeAll;
        }

        /**
         * Back field for event
         */
        private _sortableChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the sortable property changes
         *
         * @returns {LatteEvent}
         */
        get sortableChanged(): LatteEvent{
            if(!this._sortableChanged){
                this._sortableChanged = new LatteEvent(this);
            }
            return this._sortableChanged;
        }

        /**
         * Back field for event
         */
        private _sortRequested: LatteEvent;

        /**
         * Gets an event raised when sort is requested
         *
         * @returns {LatteEvent}
         */
        get sortRequested(): LatteEvent{
            if(!this._sortRequested){
                this._sortRequested = new LatteEvent(this);
            }
            return this._sortRequested;
        }

        /**
         * Raises the <c>sortRequested</c> event
         */
        onSortRequested(){
            if(this._sortRequested){
                return this._sortRequested.raise();
            }
        }

        /**
         * Back field for event
         */
        private _widthChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the width property changes
         *
         * @returns {LatteEvent}
         */
        get widthChanged(): LatteEvent{
            if(!this._widthChanged){
                this._widthChanged = new LatteEvent(this);
            }
            return this._widthChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _sortable: boolean = false;

        /**
         * Gets or sets a boolean indicating if the header is sortable
         *
         * @returns {boolean}
         */
        get sortable(): boolean{
            return this._sortable;
        }

        /**
         * Gets or sets a boolean indicating if the header is sortable
         *
         * @param {boolean} value
         */
        set sortable(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._sortable;

            // Set value
            this._sortable = value;

            // Trigger changed event
            if(changed){
                this.onSortableChanged();
            }
        }

        /**
         * Property field
         */
        private _width: number = 0;

        /**
         * Gets or sets the width of the header
         *
         * @returns {number}
         */
        get width(): number{
            return this._width;
        }

        /**
         * Gets or sets the width of the header
         *
         * @param {number} value
         */
        set width(value: number){

            let original = this._width;
            // Check if value changed
            let changed: boolean = value !== this._width;

            // Set value
            this._width = value;

            // Trigger changed event
            if(changed){
                this.onWidthChanged();
            }
        }

        //endregion

        //region Components
        /**
         * Field for resizer property
         */
        private _resizer: HTMLDivElement;

        /**
         * Gets the resizer of the column
         *
         * @returns {HTMLDivElement}
         */
        get resizer(): HTMLDivElement {
            if (!this._resizer) {
                this._resizer = document.createElement('div');
                this._resizer.className = 'resizer';
                this._resizer.addEventListener('mousedown', (e) => this.resizer_MouseDown(e));
                this._resizer.addEventListener('dblclick', (e) => {
                    if(e.ctrlKey || e.metaKey) {
                        this.onAutoResizeAll();
                    }else {
                        this.onAutoResize();
                    }
                });
            }
            return this._resizer;
        }

        //endregion
    }
}