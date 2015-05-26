/**
 * Created by josemanuel on 3/21/14.
 */
module latte {

    /**
     * Used to model swatches on the palettes
     */
    export interface ColorPickerSwatch{

        /**
         * Bounds of swatch in canvas
         */
        bounds: Rectangle;

        /**
         * Color of swatch
         */
        color: Color;
    }

    /**
     *
     */
    export class ColorPicker extends ItemStack {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            // Structure
            var wrapper = new Item();
            wrapper.element.append(this.canvas);
            this.items.add(wrapper);

            this.items.add(this.toolbar);
            this.toolbar.sideItems.addArray([
                this.lblIndicator,
                this.txtHex
            ])

            // Init selection
            this.color = Color.transparent;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Handles mouse move on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseMove(screenX: number, screenY: number){

            var swatch = this.swatchAt(screenX, screenY);

            if(swatch) {
//                console.log(swatch.color.toString());
            }

        }

        /**
         * Handles mouse down on canvas
         * @param screenX
         * @param screenY
         */
        canvasMouseDown(screenX: number, screenY: number){

            var swatch = this.swatchAt(screenX, screenY);

            if(swatch) {
                this.color = swatch.color;
            }

        }

        /**
         * Draws the palette
         */
        drawPalette(){

            var canvasWidth = this.canvas.width();
            var canvasHeight = this.canvas.height();

            this.context.clearRect(0, 0, canvasWidth, canvasHeight);

            var swatchSize = canvasWidth / 20;

            //region Swatches

            this._swatches = [];

            var selectedSwatch: ColorPickerSwatch = null;

            // Adds a swatch to the palette
            var swatch = (x: number, y: number, color: string) => {

                var r = new Rectangle(x * swatchSize, y *swatchSize, swatchSize, swatchSize);
                var colorObj = (color == 'transparent' ?Color.transparent : Color.fromHex(color));
                this.context.fillStyle = color;
                this.context.fillRect(r.left, r.top, r.width, r.height);

                var swatch: ColorPickerSwatch = {
                    bounds: r,
                    color: colorObj
                }

                this.swatches.push(swatch);

                if(colorObj.isTransparent) {
                    this.context.lineWidth = 3;
                    this.context.strokeStyle = 'red';
                    this.context.beginPath();
                    this.context.moveTo(r.right, r.top);
                    this.context.lineTo(r.left, r.bottom);
                    this.context.stroke();
                    this.context.lineWidth = 1;
                }

                if(!selectedSwatch && colorObj.toString() == this.color.toString()) {
                    selectedSwatch = swatch;
                }
            }

            var swatchGroup = (x, y, initialRed) => {

                var startX = x;
                var startY = y;
                var colorValues = ['0', '3', '6', '9', 'C', 'F'];
                var r = colorValues[initialRed];
                var g = '0';
                var b = '0';

                for(var j = 0; j < colorValues.length; j++){
                    b = colorValues[j];
                    for(var i = 0; i < colorValues.length; i++){
                        g = colorValues[i];
                        swatch(startX + i, startY + j, sprintf('#%s%s%s%s%s%s', r, r, g, g, b, b));
                    }
                    g = colorValues[0];

                }
            }

            swatchGroup(2, 0, 0);
            swatchGroup(8, 0, 1);
            swatchGroup(14, 0, 2);
            swatchGroup(2, 6, 3);
            swatchGroup(8, 6, 4);
            swatchGroup(14, 6, 5);

            swatch(0, 0, '#000000');
            swatch(0, 1, '#333333');
            swatch(0, 2, '#666666');
            swatch(0, 3, '#999999');
            swatch(0, 4, '#CCCCCC');
            swatch(0, 5, '#FFFFFF');
            swatch(0, 6, '#FF0000');
            swatch(0, 7, '#00FF00');
            swatch(0, 8, '#0000FF');
            swatch(0, 9, '#FFFF00');
            swatch(0, 10, '#00FFFF');
            swatch(0, 11, '#FF00FF');

            for(var i = 0; i <= 10; i++) swatch(1, i, '#000');

            swatch(1, 11, 'transparent');

            //endregion

            //region Grid

            this.context.strokeStyle = 'black';

            var gridX = 0;
            var gridY = 0;

            for(var i = 0; i < Math.ceil(canvasWidth / swatchSize) + 1; i++){
                this.context.beginPath();
                this.context.moveTo(i * swatchSize, 0);
                this.context.lineTo(i * swatchSize, canvasHeight);
                this.context.stroke();
            }

            for(var i = 0; i < Math.ceil(canvasHeight / swatchSize) + 1; i++){
                this.context.beginPath();
                this.context.moveTo(0, i * swatchSize);
                this.context.lineTo(canvasWidth, i * swatchSize);
                this.context.stroke();
            }

            //endregion

            //region Mark Selection
            if(selectedSwatch) {
                this.context.lineWidth = 2;
                this.context.strokeStyle = 'white';
                this.context.strokeRect(selectedSwatch.bounds.left, selectedSwatch.bounds.top,
                    selectedSwatch.bounds.width, selectedSwatch.bounds.height);
                this.context.lineWidth = 1;
            }
            //endregion

        }

        /**
         * Raises the <c>color</c> event
         */
        onColorChanged(){
            if(this._colorChanged){
                this._colorChanged.raise();
            }

            this.txtHex.value = this.color.toString().toUpperCase();
            this.lblIndicator.css({background: this.color.toString()});
            this.drawPalette();
        }

        /**
         * Override.
         */
        onLayout(){
            super.onLayout();

            // Get swatch size
            var swatchSize = this.element.width() / 20;

            // Adjust height to 12 swatches
            var swatchesHeight = swatchSize * 12;

            // Pass width & height
            this.canvas.attr('width', this.element.width());
            this.canvas.attr('height', swatchesHeight);

            // Redraw palette
            this.drawPalette();
        }

        /**
         * Gets the swatch at the specified point (if any)
         * @param screenX
         * @param screenY
         * @returns {*}
         */
        swatchAt(screenX: number, screenY: number){

            var offset: {top: number; left: number} = this.canvas.offset();

            var x = screenX - offset.left;
            var y = screenY - offset.top;

            for (var i = 0; i < this.swatches.length; i++) {
                var colorPickerSwatch:ColorPickerSwatch = this.swatches[i];

                if(colorPickerSwatch.bounds.contains(x, y)) {
                    return colorPickerSwatch;
                }
            }

            return null;

        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _colorChanged: LatteEvent

        /**
         * Gets an event raised when the value of the color property changes
         *
         * @returns {LatteEvent}
         */
        public get colorChanged(): LatteEvent{
            if(!this._colorChanged){
                this._colorChanged = new LatteEvent(this);
            }
            return this._colorChanged;
        }
        //endregion

        //region Components

        /**
         * Field for canvas property
         */
        private _canvas:JQuery;

        /**
         * Gets the canvas where color palette is drawn
         *
         * @returns {JQuery}
         */
        public get canvas():JQuery {
            if (!this._canvas) {
                this._canvas = jQuery('<canvas>');
                this._canvas.mousemove((e: JQueryEventObject) => { this.canvasMouseMove(e.pageX, e.pageY) });
                this._canvas.mousedown((e) => { this.canvasMouseDown(e.pageX, e.pageY) });
            }
            return this._canvas;
        }

        /**
         * Field for lblIndicator property
         */
        private _lblIndicator:LabelItem;

        /**
         * Gets the color indicator label
         *
         * @returns {LabelItem}
         */
        public get lblIndicator():LabelItem {
            if (!this._lblIndicator) {
                this._lblIndicator = new LabelItem();
                this._lblIndicator.css({
                    border: 'solid 1px black',
                    width: 50,
                    minHeight: 25,
                    marginTop: -1,
                    marginLeft: 10
                });

            }
            return this._lblIndicator;
        }

        /**
         * Field for toolbar property
         */
        private _toolbar:Toolbar;

        /**
         * Gets the toolbar
         *
         * @returns {Toolbar}
         */
        public get toolbar():Toolbar {
            if (!this._toolbar) {
                this._toolbar = new Toolbar();
            }
            return this._toolbar;
        }

        /**
         * Field for txtHex property
         */
        private _txtHex:TextboxItem;

        /**
         * Gets the textbox item
         *
         * @returns {TextboxItem}
         */
        public get txtHex():TextboxItem {
            if (!this._txtHex) {
                this._txtHex = new TextboxItem();
//                this._txtHex.width = 60;
                this._txtHex.enterPressed.add(() => {
                    this.color = Color.fromHex(this._txtHex.value);
                });
            }
            return this._txtHex;
        }


        //endregion

        //region Properties

        /**
         * Property field
         */
        private _color: Color = null;

        /**
         * Gets or sets the selected color of the picker
         *
         * @returns {Color}
         */
        public get color(): Color{
            return this._color;
        }

        /**
         * Gets or sets the selected color of the picker
         *
         * @param {Color} value
         */
        public set color(value: Color){

            // Check if value changed
            var changed: boolean = value !== this._color;

            // Set value
            this._color = value;

            // Trigger changed event
            if(changed){
                this.onColorChanged();
            }
        }

        /**
         * Field for context property
         */
        private _context:CanvasRenderingContext2D;

        /**
         * Gets the context for rendering
         *
         * @returns {CanvasRenderingContext2D}
         */
        public get context():CanvasRenderingContext2D {
            if (!this._context) {
                this._context = this.canvas.get(0).getContext('2d');
            }
            return this._context;
        }

        /**
         * Field for swatches property
         */
        private _swatches:ColorPickerSwatch[] = [];

        /**
         * Gets the swatches on the canvas
         *
         * @returns {ColorPickerSwatch[]}
         */
        public get swatches():ColorPickerSwatch[] {
            return this._swatches;
        }


        //endregion

    }

}