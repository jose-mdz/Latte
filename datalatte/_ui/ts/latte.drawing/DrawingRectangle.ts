/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class DrawingRectangle {

        //region Static

        /**
         * Creates a new Rectangle from the specified left, top, right and bottom coordinates
         * @param left
         * @param top
         * @param right
         * @param bottom
         * @returns {latte.DrawingRectangle}
         */
        static fromLTRB(left: number = 0, top: number = 0, right: number = 0, bottom : number = 0): DrawingRectangle{

            var r = new DrawingRectangle();

            r.top = top;
            r.left = left;

            r.sizeBottom(bottom);
            r.sizeRight(right);

            return r;

        }

        /**
         * Creates a new Rectangle from the specifed location and size
         * @param location
         * @param size
         * @returns {latte.DrawingRectangle}
         */
        static fromLocationSize(location: Point, size: Size): DrawingRectangle{
            return new DrawingRectangle(location.x, location.y, size.width, size.height);
        }

        /**
         * Creates a new Rectangle from the specified points as corners
         * @param a
         * @param b
         */
        static fromPoints(a: Point, b: Point): DrawingRectangle{
            return DrawingRectangle.fromLTRB(
                Math.min(a.x, b.x),
                Math.min(a.y, b.y),
                Math.max(a.x, b.x),
                Math.max(a.y, b.y)
            );
        }

        /**
         * Gets the intersection of two rectangles
         * @param a
         * @param b
         */
        static intersect(a: DrawingRectangle, b: DrawingRectangle): DrawingRectangle{
            var n = Math.max(a.left, b.left);
            var n1 = Math.min(a.right, b.right);
            var n2 = Math.max(a.top, b.top);
            var n3 = Math.min(a.bottom, b.bottom);

            if(n1 < n || n3 < n2) {
                return new DrawingRectangle();
            }else{
                return new DrawingRectangle(n, n2, n1-n, n3-n2);
            }

        }


        /**
         * Returns the result of the union of the two rectangles
         * @param a
         * @param b
         * @returns {latte.DrawingRectangle}
         */
        static union(a: DrawingRectangle, b: DrawingRectangle): DrawingRectangle{
            var num = Math.min(a.left, b.left);
            var num1 = Math.max(a.left + a.width, b.left + b.width);
            var num2 = Math.min(a.top, b.top);
            var num3 = Math.max(a.top + a.height, b.top + b.height);
            return new DrawingRectangle(num, num2, num1 - num, num3 - num2);
        }

        //endregion

        //region Fields
        //endregion

        /**
         * Creates a new Rectangle by specifiyng its location and size
         * @param left
         * @param top
         * @param width
         * @param height
         */
        constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0) {
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }

        //region Private Methods
        //endregion

        //region Method

        /**
         * Creates a copy of the rectangle
         * @returns {DrawingRectangle}
         */
        clone(): DrawingRectangle{
            return DrawingRectangle.fromLocationSize(this.location, this.size);
        }

        /**
         * Returns a value indicating if the specified point is contained in the rectangle
         * @param p
         */
        containsPoint(p: Point){
            return this.left <= p.x && this.right >= p.x && this.top <= p.y && this.bottom >= p.y;
        }

        /**
         * Returns a value indicating if the rectangle fits in the specified container
         *
         * @param r
         * @returns {boolean}
         */
        fitsIn(r: DrawingRectangle){
            return this.width <= r.width && this.height <= r.height;
        }

        /**
         * Inflates the rectangle
         * @param width
         * @param height
         */
        inflate(width: number, height: number){
            this.left -= width;
            this.top -= height;
            this.width += width * 2;
            this.height += height * 2;
        }

        /**
         * Gets a value indicating if the rectangle intersects with the specified rectangle
         * @param r
         * @returns {boolean}
         */
        intersectsWidth(r: DrawingRectangle): boolean{
            if(r.left >= this.right
                || this.left >= r.right
                || r.top >= this.bottom
            ) {
                return false;
            }else {
                return this.top < r.bottom;
            }
        }

        /**
         * Offsets the rectangle
         * @param x
         * @param y
         */
        offset(x: number, y: number){
            this.left += x;
            this.top += y;
        }

        /**
         * Changes the position of the rectangle to match the specified Bottom
         * @param bottom
         */
        positionBottom(bottom: number){
            this.top = bottom - this.height;
        }

        /**
         * Changes the position of the rectangle to match the specified Right
         * @param right
         */
        positionRight(right: number){
            this.left = right - this.width;
        }

        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        sizeBottom(bottom: number){
            this.height = bottom - this.top;
        }

        /**
         * Changes the size of the rectangle to match the specified Right
         * @param right
         */
        sizeRight(right: number){
            this.width = right - this.left;
        }

        /**
         * Scales the rectangle to fit the specified size
         * @param size
         */
        scaleToFit(size: Size): DrawingRectangle{

            var outer = DrawingRectangle.fromLocationSize(this.location, size);
            var inner = this;
            var resizeFactor = inner.aspectRatio >= outer.aspectRatio ?
                (outer.width / inner.width) : (outer.height / inner.height);

            var newWidth = inner.width * resizeFactor;
            var newHeight = inner.height * resizeFactor;
            var newLeft = outer.left + (outer.width - newWidth) / 2;
            var newTop = outer.top + (outer.height - newHeight) / 2;

            return new DrawingRectangle(newLeft, newTop, newWidth, newHeight);

        }

        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToHeight(height: number): DrawingRectangle{
            return new DrawingRectangle(this.left, this.top, height * this.width / this.height, height);
        }

        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToWidth(width: number): DrawingRectangle{
            return new DrawingRectangle(this.left, this.top, width, width * this.height / this.width);
        }

        //endregion

        //region Properties

        /**
         * Gets the aspect ratio of the rectangle
         *
         * @returns {number}
         */
        public get aspectRatio():number {
            return this.width / this.height;
        }

        /**
         * Gets or sets the center point of the rectangle
         *
         * @returns {DrawingPoint}
         */
        public get center():Point {
            return new Point(this.centerX, this.centerY);
        }

        /**
         * Gets or sets the center point of the rectangle
         *
         * @param {DrawingPoint} value
         */
        public set center(value:Point) {
            this.centerX = value.x;
            this.centerY = value.y;
        }

        /**
         * Gets or sets the X center of the rectangle
         *
         * @returns {number}
         */
        public get centerX():number {
            return this.left + this.width / 2;
        }

        /**
         * Gets or sets the X center of the rectangle
         *
         * @param {number} value
         */
        public set centerX(value:number) {
            this.left = value - this.width / 2;
        }

        /**
         * Gets or sets the Y center of the rectangle
         *
         * @returns {number}
         */
        public get centerY():number {
            return  this.top + this.height / 2;
        }

        /**
         * Gets or sets the Y center of the rectangle
         *
         * @param {number} value
         */
        public set centerY(value:number) {
            this.top = value - this.height / 2;
        }

        /**
         * Gets the Bottom coordinate
         *
         * @returns {number}
         */
        public get bottom():number {
            return this.top + this.height;
        }

        /**
         * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
         *
         * @returns {DrawingRectangle}
         */
        public get bounds():DrawingRectangle {
            return new DrawingRectangle(this.left, this.top, this.width, this.height);
        }

        /**
         * Gets or sets the bounds of rectangle. Use this property to copy out or in the coordinates of the rectangle
         *
         * @param {DrawingRectangle} value
         */
        public set bounds(value:DrawingRectangle) {
            this.location = value.location;
            this.size = value.size;
        }

        /**
         * Property field
         */
        private _height:number = 0;

        /**
         * Gets or sets the Height of the rectangle
         *
         * @returns {number}
         */
        public get height():number {
            return this._height;
        }

        /**
         * Gets or sets the Height of the rectangle
         *
         * @param {number} value
         */
        public set height(value:number) {
            this._height = value;
        }

        /**
         * Property field
         */
        private _left:number = 0;

        /**
         * Gets or sets the Left coordinate
         *
         * @returns {number}
         */
        public get left():number {
            return this._left;
        }

        /**
         * Gets or sets the Left coordinate
         *
         * @param {number} value
         */
        public set left(value:number) {
            this._left = value;
        }

        /**
         * Gets the location of the rectangle
         *
         * @returns {DrawingPoint}
         */
        public get location():Point {
            return new Point(this.left, this.top);
        }

        /**
         * Gets or sets the location of the rectangle
         *
         * @returns {DrawingPoint}
         */
        public set location(p: Point){
            this.left = p.x;
            this.top = p.y;
        }

        /**
         * Gets the Right coordinate
         *
         * @returns {number}
         */
        public get right():number {
            return this.left + this.width;
        }

        /**
         * Property field
         */
        private _top:number = 0;

        /**
         * Gets or sets the Top coordinate
         *
         * @returns {number}
         */
        public get top():number {
            return this._top;
        }

        /**
         * Gets or sets the size of the rectangle
         *
         * @returns {DrawingSize}
         */
        public get size():Size {
            return new Size(this.width, this.height);
        }

        /**
         * Gets or sets the size of the rectangle
         * @param value
         */
        public set size(value: Size){
            this.width = value.width;
            this.height = value.height;
        }

        /**
         * Property field
         */
        private _tag:any = null;

        /**
         * Gets or sets a tag for the object
         *
         * @returns {any}
         */
        public get tag():any {
            return this._tag;
        }

        /**
         * Gets or sets a tag for the object
         *
         * @param {any} value
         */
        public set tag(value:any) {
            this._tag = value;
        }

        /**
         * Gets or sets the Top coordinate
         *
         * @param {number} value
         */
        public set top(value:number) {
            this._top = value;
        }

        /**
         * Gets the top left point
         *
         * @returns {Point}
         */
        public get topLeft():Point {
            return new Point(this.left, this.top);
        }

        /**
         * Gets the top right point
         *
         * @returns {Point}
         */
        public get topRight():Point {
            return new Point(this.right, this.top);
        }

        /**
         * Gets the bottom left point
         *
         * @returns {Point}
         */
        public get bottomLeft():Point {
            return new Point(this.left, this.bottom);
        }

        /**
         * Gets the bottom right point
         *
         * @returns {Point}
         */
        public get bottomRight():Point {
            return new Point(this.right, this.bottom);
        }

        /**
         * Gets a value indicating if the rectangle is horizontal
         *
         * @returns {boolean}
         */
        public get isHorizontal():boolean {
            return this.height < this.width;
        }

        /**
         * Gets a value indicating if the rectangle is a square
         *
         * @returns {boolean}
         */
        public get isSquare():boolean {
            return this.height == this.width;
        }

        /**
         * Gets a value indicating if the rectangle is vertical
         *
         * @returns {boolean}
         */
        public get isVertical():boolean {
            return this.height > this.width;
        }

        /**
         * Property field
         */
        private _width:number = 0;

        /**
         * Gets or sets the Width of the rectangle
         *
         * @returns {number}
         */
        public get width():number {
            return this._width;
        }

        /**
         * Gets or sets the Width of the rectangle
         *
         * @param {number} value
         */
        public set width(value:number) {
            this._width = value;
        }



        //endregion

    }

}