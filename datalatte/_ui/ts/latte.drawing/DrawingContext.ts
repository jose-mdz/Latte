/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    export enum TextAlign{
        START,
        END,
        LEFT,
        CENTER,
        RIGHT
    }

    export enum TextBaseline{
        TOP,
        BOTTOM,
        MIDDLE,
        ALPHABETIC
    }

    /**
     *
     */
    export class DrawingContext {

        //region Static

        /**
         * Creates the context from the specified canvas
         *
         * @param c
         * @returns {latte.DrawingContext}
         */
        static fromCanvas(c: HTMLCanvasElement): DrawingContext{
            return new DrawingContext(c.getContext('2d'));
        }

        //endregion

        //region Fields
        //endregion

        /**
         * Creates the drawing context
         */
        constructor(c: CanvasRenderingContext2D) {
            this._context = c;
        }

        //region Private Methods

        private textAlignToString(t: TextAlign): string{
            switch (t){
                case TextAlign.START: return 'start';
                case TextAlign.END: return 'end';
                case TextAlign.LEFT: return 'left';
                case TextAlign.CENTER: return 'center';
                case TextAlign.RIGHT: return 'right';
            }
            return '';
        }

        private baselineToString(b: TextBaseline): string{
            switch (b){
                case TextBaseline.TOP: return 'top';
                case TextBaseline.BOTTOM: return 'bottom';
                case TextBaseline.MIDDLE: return 'middle';
                case TextBaseline.ALPHABETIC: return 'alphabetic';
            }
            return '';
        }

        //endregion

        //region Methods

        /**
         * Clears shadowing parameters
         */
        clearShadow(){
            this.context.shadowBlur = 0;
            this.context.shadowColor = 'none';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
        }

        /**
         * Draws an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        drawArc(p: Pen, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise:boolean = false){
            p.applyOn(this);
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
            this.context.stroke();
        }

        /**
         * Draws the stroke of an ellipse
         * @param p
         * @param r
         */
        drawEllipse(p: Pen, r: DrawingRectangle){
            this.drawPath(p, DrawingPath.ellipse(r));
        }

        /**
         * Draws an image
         * @param image
         * @param bounds
         */
        drawImage(image: HTMLImageElement, bounds: DrawingRectangle, offset: DrawingRectangle = null): boolean{
            try{
                if(offset) {
                    this.context.drawImage(image, offset.left, offset.top, offset.width, offset.height, bounds.left, bounds.top, bounds.width, bounds.height);
                }else{
                    this.context.drawImage(image, bounds.left, bounds.top, bounds.width, bounds.height);
                }
                return true;
            }catch(e){
                return false;
            }
        }

        /**
         * Draws a line between two points
         * @param p
         * @param a
         * @param b
         */
        drawLine(p: Pen, a: Point, b: Point){
            p.applyOn(this);
            this.context.beginPath();
            this.context.moveTo(a.x, a.y);
            this.context.lineTo(b.x, b.y);
            this.context.stroke();
        }

        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        drawLines(p: Pen, origin: Point, ...Point){

            p.applyOn(this);

            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);

            for(var i = 2; i < arguments.length; i++){
                var pt = <Point> arguments[i];

                this.context.lineTo(pt.x, pt.y);
            }

            this.context.stroke();

        }

        /**
         * Draws the stroke of a rectangle
         * @param p
         * @param r
         */
        drawRectangle(p: Pen, r: DrawingRectangle, radius: number = 0){

            if(radius == 0) {
                p.applyOn(this);
                this.context.strokeRect(r.left, r.top, r.width, r.height);
            }else {
                this.drawPath(p, DrawingPath.roundRectangle(r, radius));
            }

        }

        /**
         * Draws the stroke of a path
         * @param p
         * @param r
         */
        drawPath(p: Pen, path: DrawingPath){
            p.applyOn(this);
            path.applyOn(this);
            this.context.stroke();
        }

        /**
         * Draws consecutive lines
         * @param p
         * @param Point
         */
        drawPolygon(p: Pen, origin: Point, ...Point){

            p.applyOn(this);

            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);

            for(var i = 2; i < arguments.length; i++){
                var pt = <Point> arguments[i];

                this.context.lineTo(pt.x, pt.y);
            }

            this.context.stroke();

        }

        /**
         * Fills an arc
         *
         * @param center
         * @param radius
         * @param startAngle
         * @param endAngle
         * @param counterClockwise
         */
        fillArc(b: Brush, center: Point, radius: number, startAngle: number, endAngle: number, counterClockwise:boolean = false){
            b.applyOn(this);
            this.context.beginPath();
            this.context.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
            this.context.fill();
        }

        /**
         * Fills an ellipse
         * @param p
         * @param r
         */
        fillEllipse(b: Brush, r: DrawingRectangle){
            this.fillPath(b, DrawingPath.ellipse(r));
        }

        /**
         * Fills consecutive lines
         * @param p
         * @param Point
         */
        fillPolygon(b: Brush, origin: Point, ...Point){

            b.applyOn(this);

            this.context.beginPath();
            this.context.moveTo(origin.x, origin.y);

            for(var i = 2; i < arguments.length; i++){
                var pt = <Point> arguments[i];

                this.context.lineTo(pt.x, pt.y);
            }
            this.context.closePath();
            this.context.fill();

        }

        /**
         * Fills a path
         * @param p
         * @param r
         */
        fillPath(b: Brush, path: DrawingPath){
            b.applyOn(this);
            path.applyOn(this);
            this.context.fill();
        }

        /**
         * Fills a rectangle
         * @param b
         * @param r
         */
        fillRectangle(b: Brush, r: DrawingRectangle, radius: number = 0){
            if(radius == 0) {
                b.applyOn(this);
                this.context.fillRect(r.left, r.top, r.width, r.height);
            }else {
                this.fillPath(b, DrawingPath.roundRectangle(r, radius));
            }

        }

        /**
         * Draws Text
         * @param b
         * @param text
         * @param p
         * @param align
         * @param baseline
         */
        fillText(b: Brush, text: string, p: Point, align: TextAlign = TextAlign.START, baseline: TextBaseline = TextBaseline.TOP, maxWidth: number = null){

            b.applyOn(this);

            this.context.textAlign = this.textAlignToString(align);
            this.context.textBaseline = this.baselineToString(baseline);

            if(_isNumber(maxWidth)) {
                this.context.fillText(text, p.x, p.y, maxWidth);
            }else {
                this.context.fillText(text, p.x, p.y);
            }

        }

        /**
         * Fills wrapped text
         * @param b
         * @param text
         * @param p
         * @param lineHeight
         * @param fitWidth
         */
        fillTextWrap(b: Brush, text: string, p: Point, lineHeight: number, fitWidth: number): DrawingRectangle{

            b.applyOn(this);
            var x = p.x;
            var y = p.y;
            var ctx = this.context;
            var r: DrawingRectangle = new DrawingRectangle(p.x, p.y, 0, 0);

            // Starts foreign code
            var draw = x !== null && y !== null;

            text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
            var sections = text.split("\n");

            var i, index, str, wordWidth, words, currentLine = 0, maxWidth = 0;

            var printNextLine = function(str) {

                var textY = y + (lineHeight * currentLine);

                if (draw) {
                    ctx.fillText(str, x, textY, fitWidth);
                }

                currentLine++;
                var strSize = ctx.measureText(str);
                wordWidth = strSize.width;

                r = DrawingRectangle.union(r, new DrawingRectangle(x, textY, fitWidth, lineHeight));

                if (wordWidth > maxWidth) {
                    maxWidth = wordWidth;
                }
            };

            for (i = 0; i < sections.length; i++) {
                words = sections[i].split(' ');
                index = 1;

                while (words.length > 0 && index <= words.length) {

                    str = words.slice(0, index).join(' ');
                    wordWidth = ctx.measureText(str).width;

                    if (wordWidth > fitWidth) {
                        if (index === 1) {
                            // Falls to this case if the first word in words[] is bigger than fitWidth
                            // so we print this word on its own line; index = 2 because slice is
                            str = words.slice(0, 1).join(' ');
                            words = words.splice(1);
                        } else {
                            str = words.slice(0, index - 1).join(' ');
                            words = words.splice(index - 1);
                        }

                        printNextLine(str);

                        index = 1;
                    } else {
                        index++;
                    }
                }

                // The left over words on the last line
                if (index > 0) {
                    printNextLine(words.join(' '));
                }

            }

            r.offset(0, -(lineHeight * 0.5));
            r.height += lineHeight * 0.5; //HACK: Heuristic

            return r;

        }

        /**
         * Restores the saved state
         */
        restoreState(){
            this.context.restore();
        }

        /**
         * Saves the current state
         */
        saveState(){
            this.context.save();
        }

        /**
         * Saves the state and clips the drawing region.
         *
         * Use restoreState() to restore the previous clipping region
         */
        setClip(p: DrawingPath){
            this.saveState();

            p.applyOn(this);

            this.context.clip();
        }

        /**
         * Sets the font of the context
         * @param fontFamily
         * @param sizeInPixels
         * @param weight
         */
        setFont(fontFamily: string, sizeInPixels: number = 10, weight: string = 'normal', style: string = 'normal'){
            this.context.font = sprintf('%s %s %s %s', style, weight, sizeInPixels + 'px', fontFamily);
        }

        /**
         * Sets the shadowing parameters
         * @param color
         * @param blur
         * @param offset
         */
        setShadow(color: Color, blur: number = 0, offset: Size = null){

            offset = offset || Size.zero();

            this.context.shadowBlur = blur;
            this.context.shadowColor = color.toString();
            this.context.shadowOffsetX = offset.width;
            this.context.shadowOffsetY = offset.height;

        }



        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _context:CanvasRenderingContext2D;

        /**
         * Gets the context to draw
         *
         * @returns {CanvasRenderingContext2D}
         */
        public get context():CanvasRenderingContext2D {
            return this._context;
        }

        /**
         * Property field
         */
        private _scaleX:number = 1;

        /**
         * Gets or sets the current X scale of the context
         *
         * @returns {number}
         */
        public get scaleX():number {
            return this._scaleX;
        }

        /**
         * Gets or sets the current X scale of the context
         *
         * @param {number} value
         */
        public set scaleX(value:number) {
            this._scaleX = value;
            this.context.scale(value, this.scaleY);
        }

        /**
         * Property field
         */
        private _scaleY:number = 1;

        /**
         * Gets or sets the current Y scale of the context
         *
         * @returns {number}
         */
        public get scaleY():number {
            return this._scaleY;
        }

        /**
         * Gets or sets the current Y scale of the context
         *
         * @param {number} value
         */
        public set scaleY(value:number) {
            this._scaleY = value;
            this.context.scale(this.scaleX, value);
        }

        //endregion

    }

}