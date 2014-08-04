/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class CanvasView extends View {

        //region Static
        //endregion

        //region Fields
        private _loopHandler: number;
        private _dragTimeout: number;

        //endregion

        /**
         *
         */
        constructor() {
            super();

            this.addClass('canvas');

            this.container.css('overflow', 'hidden');
        }

        //region Private Methods
        /**
         * Stops the drawing process if running
         */
        private stopDrawing(){
            if(this._loopHandler) {
                clearInterval(this._loopHandler);
            }

            // Remove interval pointer
            this._loopHandler = 0;
        }

        /**
         * Starts the drawing process
         */
        private startDrawing(){

            // If interval running
            if(this._loopHandler) {
                // Stop it
                this.stopDrawing();
            }

            // Set up interval
            this._loopHandler = setInterval(() => {
                this.onFrameUpdate();
                this.onFrameDraw();
            }, this.redrawTime);
        }
        //endregion

        //region Methods

        onLayout(){
            super.onLayout();

            this.canvas.width = this.container.width();
            this.canvas.height = this.container.height();

            if(this.scene) {
                this.scene.width = this.canvas.width;
                this.scene.height = this.canvas.height;
            }

            this._canvasPosition = null;

        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
         private _frameDraw: LatteEvent

        /**
         * Gets an event raised when the frame should be drawn
         *
         * @returns {LatteEvent}
         */
        public get frameDraw(): LatteEvent{
            if(!this._frameDraw){
                this._frameDraw = new LatteEvent(this);
            }
            return this._frameDraw;
        }

        /**
         * Raises the <c>frameDraw</c> event
         */
        public onFrameDraw(){
            if(this._frameDraw){
                this._frameDraw.raise();
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if(this.scene) {
                this.scene.draw(this.drawingContext);
            }
        }

        /**
         * Back field for event
         */
         private _frameUpdate: LatteEvent

        /**
         * Gets an event raised when the frame should be updated
         *
         * @returns {LatteEvent}
         */
        public get frameUpdate(): LatteEvent{
            if(!this._frameUpdate){
                this._frameUpdate = new LatteEvent(this);
            }
            return this._frameUpdate;
        }

        /**
         * Raises the <c>frameUpdate</c> event
         */
        public onFrameUpdate(){
            if(this._frameUpdate){
                this._frameUpdate.raise();
            }
            if(this.scene) {
                this.scene.update();
            }
        }

        /**
         * Back field for event
         */
        private _pausedChanged: LatteEvent

        /**
         * Gets an event raised when the value of the paused property changes
         *
         * @returns {LatteEvent}
         */
        public get pausedChanged(): LatteEvent{
            if(!this._pausedChanged){
                this._pausedChanged = new LatteEvent(this);
            }
            return this._pausedChanged;
        }

        /**
         * Raises the <c>paused</c> event
         */
        public onPausedChanged(){
            if(this._pausedChanged){
                this._pausedChanged.raise();
            }

            if(this.paused) {
                this.stopDrawing();
            }else {
                this.startDrawing();
            }
        }

        //endregion

        //region Components
        /**
         * Field for canvas property
         */
        private _canvas:HTMLCanvasElement;

        /**
         * Gets the canvas
         *
         * @returns {HTMLCanvasElement}
         */
        public get canvas():HTMLCanvasElement {
            if (!this._canvas) {
                this._canvas = document.createElement('canvas');
                this.container.append(this._canvas);
                this._canvas.tabIndex = 0;
                this.startDrawing();

                //region Handlers
                this._canvas.addEventListener('dblclick', (e: JQueryEventObject) => {
                    if(this.scene){
                        this.scene.doubleClick(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y), e.which);
                    }
                });

                this._canvas.addEventListener('mousedown', (e: JQueryEventObject) => {
                    if(this.scene){
                        this.scene.mouseDown(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y), e.which);
                    }
                });

                this._canvas.addEventListener('mousemove', (e: JQueryEventObject) => {
                    if(this.scene){
                        this.scene.mouseMove(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y));
                    }
                });

                this._canvas.addEventListener('mouseup', (e: JQueryEventObject) => {
                    if(this.scene){
                        this.scene.mouseUp(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y), e.which);
                    }
                });

                this._canvas.addEventListener('mouseleave', (e: JQueryEventObject) => {
                    if(this.scene){
                        this.scene.mouseUp(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y), e.which);
                    }
                });

                this._canvas.addEventListener('mousewheel', (e: JQueryEventObject) => {
                    if(this.scene) {
                        this.scene.mouseWheel(new Point(e.pageX - this.canvasPosition.x, e.pageY - this.canvasPosition.y), e['wheelDelta']);
                    }
                });

                this._canvas.addEventListener('keydown', (e: JQueryEventObject) => {
                    if(this.scene) {
                        this.scene.keyDown(e.keyCode, e.metaKey);
                    }
                });

                this._canvas.addEventListener('keyup', (e: JQueryEventObject) => {
                    if(this.scene) {
                        this.scene.keyUp(e.keyCode, e.metaKey);
                    }
                });

                this._canvas.ondragover = (e) => {
                    if(this.scene) {

                        var p = new Point(e.clientX - this.canvasPosition.x, e.clientY - this.canvasPosition.y);

                        e.preventDefault();

                        if(this._dragTimeout) {
                            clearTimeout(this._dragTimeout);
                        }else {
                            this.scene.dragStart(p, e);
                        }

                        this.scene.dragOver(p, e);

                        this._dragTimeout = setTimeout(() => {
                            if(this._dragTimeout){
                                this._dragTimeout = 0;
                                this.scene.dragEnd(p, e);
                            }

                        }, 100);


                        return false;
                    }


                };

                this._canvas.ondrop = (e) => {
                    if(this.scene) {
                        var p = new Point(e.clientX - this.canvasPosition.x, e.clientY - this.canvasPosition.y);
                        this.scene.drop(p, e);
                        e.preventDefault();

                        this._dragTimeout = 0;
                        this.scene.dragEnd(p, e);

                        return false;
                    }
                };

                //endregion
            }
            return this._canvas;
        }


        /**
         * Property field
         */
        private _canvasPosition:Point;

        /**
         * Gets the canvas position
         *
         * @returns {Point}
         */
        public get canvasPosition():Point {

            if(!this._canvasPosition) {
                var offset = $(this.canvas).offset();
                this._canvasPosition = new Point(offset.left, offset.top);
            }

            return this._canvasPosition;
        }

        /**
         * Field for context property
         */
        private _context:CanvasRenderingContext2D;

        /**
         * Gets the context to draw
         *
         * @returns {CanvasRenderingContext2D}
         */
        public get context():CanvasRenderingContext2D {
            if (!this._context) {
                this._context = this.canvas.getContext('2d');
                this.redrawTime = this.redrawTime;
            }
            return this._context;
        }

        //endregion

        //region Properties

        /**
         * Field for drawingContext property
         */
        private _drawingContext:DrawingContext;

        /**
         * Gets the drawing context
         *
         * @returns {DrawingContext}
         */
        public get drawingContext():DrawingContext {
            if (!this._drawingContext) {
                this._drawingContext = new DrawingContext(this.context);
            }
            return this._drawingContext;
        }


        /**
         * Property field
         */
        private _fpsVisible:boolean = true;

        /**
         * Gets or sets a value indicating if the FPS count should be displayed
         *
         * @returns {boolean}
         */
        public get fpsVisible():boolean {
            return this._fpsVisible;
        }

        /**
         * Gets or sets a value indicating if the FPS count should be displayed
         *
         * @param {boolean} value
         */
        public set fpsVisible(value:boolean) {
            this._fpsVisible = value;
        }

        /**
         * Property field
         */
        private _paused: boolean = false;

        /**
         * Gets or sets a value indicating if the drawing process is paused
         *
         * @returns {boolean}
         */
        public get paused(): boolean{
            return this._paused;
        }

        /**
         * Gets or sets a value indicating if the drawing process is paused
         *
         * @param {boolean} value
         */
        public set paused(value: boolean){

            // Check if value changed
            var changed: boolean = value !== this._paused;

            // Set value
            this._paused = value;

            // Trigger changed event
            if(changed){
                this.onPausedChanged();
            }
        }

        /**
         * Property field
         */
        private _redrawTime:number = 1000 / 32;

        /**
         * Gets or sets the milliseconds between redraws
         *
         * @returns {number}
         */
        public get redrawTime():number {
            return this._redrawTime;
        }

        /**
         * Gets or sets the milliseconds between redraws
         *
         * @param {number} value
         */
        public set redrawTime(value:number) {
            this._redrawTime = value;

            if(!this.paused) {
                // Reset drawing process
                this.stopDrawing();
                this.startDrawing();
            }

        }

        /**
         * Property field
         */
        private _scene:DrawingScene = null;

        /**
         * Gets or sets the current scene on canvas
         *
         * @returns {DrawingScene}
         */
        public get scene():DrawingScene {
            return this._scene;
        }

        /**
         * Gets or sets the current scene on canvas
         *
         * @param {DrawingScene} value
         */
        public set scene(value:DrawingScene) {
            this._scene = value;

            value.width = this.canvas.width;
            value.height = this.canvas.height;
        }

        //endregion

    }

}