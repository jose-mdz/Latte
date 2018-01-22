module latte{
    /**
     * Renders a view splitted in two. A <c>side</c> and the main <c>view</c>
     **/
    export class SplitView extends View{

        //region Fields
        /**
         *
         **/
        private _draggingSplit: Direction = Direction.NONE;

        /**
         * View where side view is contained
         **/
        sideWrap: View;

        /**
         * Splitter between <c>side</c> and <c>view</c>
         **/
        splitterElement: JQuery;
        //endregion

        /**
         * Creates the View
         **/
        constructor(){
            super();

            this.element.addClass('split');

            this.element.mousemove((e) => { this._onMouseMove(e) });
            this.element.mouseup  ((e) => { this._onMouseUp(e) });
            this.element.mousedown((e) => { this._onMouseDown(e) });

            // Initialize side container
            this.sideWrap = new View();
            this.sideWrap.addClass('side');
            this.sideWrap.appendTo(this.element);

            // Initialize splitter
            this.splitterElement = $('<div>').addClass('splitter').appendTo(this.element);

            // Initialize side
            this._side = Side.AUTO;


        }

        //region Private Methods

        /**
         *
         **/
        private _onMouseDown(e: JQueryEventObject): boolean{

            var sensor = this.splitterElement.rectangle().inflate(this.sensitivity, this.sensitivity);

            if(sensor.contains(e.pageX, e.pageY)){
                if(this.side === Side.TOP || this.side === Side.BOTTOM){
                    this._draggingSplit = Direction.VERTICAL;
                }else{
                    this._draggingSplit = Direction.HORIZONTAL;
                }
                UiElement.disableTextSelection(this.element);
                e.stopPropagation();
                return false;
            }else{
                this._draggingSplit = Direction.NONE;
            }

            return true;

        }

        /**
         *
         **/
        private _onMouseMove(e: JQueryEventObject){

            var sensor = this.splitterElement.rectangle().inflate(this.sensitivity, this.sensitivity);

            if(this._draggingSplit === Direction.NONE){
                if(sensor.contains(e.pageX, e.pageY)){
                    if(this.side === Side.TOP || this.side === Side.BOTTOM){
                        this.element.css('cursor', 'ns-resize');
                    }else{
                        this.element.css('cursor', 'ew-resize');
                    }
                }else{
                    this.element.css('cursor', 'default');
                }
            }else{

                var rect = this.element.rectangle();

                switch(this.side){
                    case Side.AUTO:
                    case Side.LEFT:
                        this.sideSize = e.pageX - rect.left;
                        break;
                    case Side.RIGHT:
                        this.sideSize = rect.right - e.pageX;
                        break;
                    case Side.TOP:
                        this.sideSize = e.pageY - rect.top;
                        break;
                    case Side.BOTTOM:
                        this.sideSize = rect.bottom - e.pageY;
                        break;
                    default:
                        throw new InvalidCallEx();
                }
            }

        }

        /**
         *
         **/
        private _onMouseUp(e: JQueryEventObject){


            if(this._draggingSplit !== Direction.NONE){
                UiElement.enableTextSelection(this.element);
            }

            this._draggingSplit = Direction.NONE;

        }
        //endregion

        //region Methods

        /**
         * Updates the layout of View
         **/
        onLayout(){

            super.onLayout();

            var side = this.side;
            var sp = this.sideVisible ? this.splitterSize : 0;
            var size = this.sideSize > 1 ?
                this.sideSize :
                (
                    side === Side.TOP || side === Side.BOTTOM ?
                        this.sideSize * this.element.height() :
                        this.sideSize * this.element.width()
                    );
            var start = {
                left: '',
                top: '',
                bottom: '',
                right: '',
                width: '',
                height: ''
            };

            if(!this.sideVisible){
                size = 0;
            }

            var sideCss: any = $.extend({}, start);
            var splitterCss: any = $.extend({}, start);
            var containerCss: any = $.extend({}, start);


            if(side === Side.TOP || side === Side.BOTTOM){
                sideCss.left = 0;
                sideCss.right = 0;
                sideCss.height = size;

                splitterCss.left = 0;
                splitterCss.right = 0;
                splitterCss.height = sp;

                containerCss.left = 0;
                containerCss.right = 0;

            }else{
                sideCss.top = 0;
                sideCss.bottom = 0;
                sideCss.width = size;

                splitterCss.top = 0;
                splitterCss.bottom = 0;
                splitterCss.width = sp;

                containerCss.top = 0;
                containerCss.bottom = 0;
            }

            switch(this.side){
                case Side.AUTO:
                case Side.LEFT:
                    sideCss.left = 0;
                    sideCss.right = 'auto';
                    splitterCss.left = size;
                    containerCss.left = size - sp + 1; // This plus one is because a misterious padding
                    containerCss.right = 0;
                    break;
                case Side.RIGHT:
                    sideCss.right = 0;
                    sideCss.left = 'auto';
                    splitterCss.right = size;
                    containerCss.right = size + sp;
                    containerCss.top = 0;
                    break;
                case Side.TOP:
                    sideCss.top = 0;
                    sideCss.bottom = 'auto';
                    splitterCss.top = size;
                    containerCss.top = size - sp;
                    containerCss.bottom = 0;
                    break;
                case Side.BOTTOM:
                    sideCss.bottom = 0;
                    sideCss.top = 'auto';
                    splitterCss.bottom = size;
                    containerCss.bottom = size + sp;
                    containerCss.top = 0;
                    break;
                default:
                    throw new InvalidCallEx();
            }

            this.sideWrap.element.css(sideCss);
            this.splitterElement.css(splitterCss);
            this.container.css(containerCss);
            this.sideWrap.onLayout();

        }

        /**
         * Raises the <c>sideVisible</c> event
         */
        onSideVisibleChanged(){
            if(this._sideVisibleChanged){
                this._sideVisibleChanged.raise();
            }

            if(this.sideVisible){
                this.sideWrap.element.show();
                this.splitterElement.show();
            }else{
                this.sideWrap.element.hide();
                this.splitterElement.hide();
            }

            this.onLayout();
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _sideVisibleChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the sideVisible property changes
         *
         * @returns {LatteEvent}
         */
        get sideVisibleChanged(): LatteEvent{
            if(!this._sideVisibleChanged){
                this._sideVisibleChanged = new LatteEvent(this);
            }
            return this._sideVisibleChanged;
        }

        //endregion

        //region Properties

        /**
         *
         **/
        private _sensitivity: number = 5;

        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        get sensitivity(): number{
            return this._sensitivity;
        }

        /**
         * Gets or sets the sensitivity radius for dragging the splitter
         **/
        set sensitivity(value: number){

            this._sensitivity = value;


        }

        /**
         *
         **/
        private _side: Side;

        /**
         * Gets or sets the side of the side view
         **/
        get side(): Side{
            return this._side;
        }

        /**
         * Gets or sets the side of the side view
         **/
        set side(value: Side){


            this._side = value;
            this.onLayout();


        }

        /**
         *
         **/
        private _sideSize: number = 200;

        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        get sideSize(): number{
            return this._sideSize;
        }

        /**
         * Gets or sets the wide of the side view.
         If value is lower than 1, then it will be taken as the percent to occupy, i.e. 0.5 = 50% of space.
         **/
        set sideSize(value: number){



            this._sideSize = value;

            this.onLayout();



        }

        /**
         * Gets or sets the side <c>View</c>
         **/
        get sideView(): View{
            return this.sideWrap.view;
        }

        /**
         * Gets or sets the side <c>View</c>
         **/
        set sideView(value: View){
            this.sideWrap.view = value;
        }

        /**
         * Property field
         */
        private _sideVisible: boolean = true;

        /**
         * Gets or sets a value indicating if the side view is visible
         *
         * @returns {boolean}
         */
        get sideVisible(): boolean{
            return this._sideVisible;
        }

        /**
         * Gets or sets a value indicating if the side view is visible
         *
         * @param {boolean} value
         */
        set sideVisible(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._sideVisible;

            // Set value
            this._sideVisible = value;

            // Trigger changed event
            if(changed){
                this.onSideVisibleChanged();
            }
        }

        /**
         *
         **/
        private _splitterSize: number = 1;

        /**
         * Gets or sets the wide of the splitterElement
         **/
        get splitterSize(): number{
            return this._splitterSize;
        }

        /**
         * Gets or sets the wide of the splitterElement
         **/
        set splitterSize(value: number){


            this._splitterSize = value;
            this.onLayout();


        }
        //endregion
    }
}