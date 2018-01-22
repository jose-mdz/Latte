module latte{
    /**
     * Reprsents a Rectangle
     **/
    export class Rectangle{


        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        static fromLRTB(left: number, right: number, top: number, bottom: number): Rectangle{

            let r = new Rectangle(left, top);
            r.right = right;
            r.bottom = bottom;
            return r;

        }

        /**
         * Creates a rectangle from the specified object (top, left, width, height)
         * @param obj
         */
        static fromObject(obj: any): Rectangle{
           return new Rectangle(obj.left, obj.top, obj.width, obj.height);
        }

        /**
         * Creates a rectangle from the specified object (top, left, width, height)
         * @param obj
         */
        static fromObjectLFTB(obj: any): Rectangle{
           return Rectangle.fromLRTB(obj.left, obj.right, obj.top, obj.bottom);
        }

        /**
         * Creates a rectangle of the specified rectangle
         * @param {HTMLElement} e
         * @returns {latte.Rectangle}
         */
        static fromElement(e: HTMLElement): Rectangle{
            return Rectangle.fromObject(e.getBoundingClientRect());
        }

        /**
         * Height of rectangle
         **/
        private _height: number;

        /**
         * Left of rectangle
         **/
        private _left: number;

        /**
         * Top of rectangle
         **/
        private _top: number;

        /**
         * Width of rectangle
         **/
        private _width: number;

        /**
         *
         */
        private _tag: any;

        /**
         * Creates a rectangle with the specified left, top, width and height.
         **/
        constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0){

            this.top = top;
            this.left = left;
            this.width = width;
            this.height = height;

        }

        /**
         * Returns a rectangle of positive width and height, by changing its coordinates and preserving width and height
         */
        absolute(): Rectangle{
            let width = Math.abs(this.width);
            let height = Math.abs(this.height);
            let left = this.width < 0 ? this.right : this.left;
            let top = this.height < 0 ? this.bottom : this.top;
            return new Rectangle(left, top, width, height);
        }

        /**
         * Returns the result of centering this into the specified container
         **/
        centerOn(container: Rectangle): Rectangle{

            let c = new Rectangle( container.left + (container.width - this.width) / 2,
                container.top + (container.height - this.height) / 2, this.width, this.height );
            return c;

        }

        /**
         * Gets a value indicating if the specified point is contained
         **/
        contains(x: number, y: number): boolean{

            return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;

        }

        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        containsRectangle(rectangle: Rectangle): boolean{

            return this.contains( rectangle.left, rectangle.top) && this.contains( rectangle.right, rectangle.bottom);

        }

        /**
         * Compares this rectangle with the specified rectangle and returns the result
         * @param r
         * @returns {boolean}
         */
        equals(r: Rectangle): boolean{
            if(!r) return false;
            return this.left == r.left && this.top == this.top && this.width == r.width && this.height == r.height;
        }

        /**
         * Returns the result of inflating the rectangle vertically and horizontally on each edge.
         **/
        inflate(horizontal: number, vertical: number): Rectangle{


            // Check arguments
            if(!_isNumber(horizontal)) throw new InvalidArgumentEx('horizontal', horizontal);
            if(!_isNumber(vertical)) throw new InvalidArgumentEx('vertical', vertical);

            return Rectangle.fromLRTB(this.left - horizontal, this.right + horizontal,
                this.top - vertical, this.bottom + vertical);

        }

        /**
         * Returns the rectangle result of intersecting this with passed rectangle
         **/
        intersection(rectangle: Rectangle): Rectangle{

            let a = this;
            let b = rectangle;
            let x1 = Math.max(a.left, b.left);
            let x2 = Math.min(a.right, b.right);
            let y1 = Math.max(a.top, b.top);
            let y2 = Math.min(a.bottom, b.bottom);

            if(x2 => x1 && y2 >= y1) {
                return new Rectangle(x1, y1, x2 - x1, y2 - y1);
            }

            return new Rectangle();

        }

        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        intersects(rectangle: Rectangle): boolean{
            let thisX = this.left;
            let thisY = this.top;
            let thisW = this.width;
            let thisH = this.height;
            let rectX = rectangle.left;
            let rectY = rectangle.top;
            let rectW = rectangle.width;
            let rectH = rectangle.height;
            return (rectX < thisX + thisW) && (thisX < (rectX + rectW)) && (rectY < thisY + thisH) && (thisY < rectY + rectH);
        }

        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToHeight(height: number): Rectangle{
            return new Rectangle(this.left, this.top, height * this.width / this.height, height);
        }

        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToWidth(width: number): Rectangle{
            return new Rectangle(this.left, this.top, width, width * this.height / this.width);
        }

        /**
         * Returns a string describing the rectangle
         **/
        toString(): string{

            return "Rectangle: " + [this._left, this._top, this._width, this._height].join(', ');

        }

        /**
         * Gets a rectangle representing the union of this rectangle and the passed one
         **/
        union(rectangle: Rectangle): Rectangle{

            return Rectangle.fromLRTB(
                Math.min(this.left, rectangle.left),
                Math.max(this.right, rectangle.right),
                Math.min(this.top, rectangle.top),
                Math.max(this.bottom, rectangle.bottom)
            );

        }

        /**
         * Gets the area of the rectangle
         *
         * @returns {number}
         */
        get area(): number {
            return this.width * this.height;
        }


        /**
         * Gets or sets the right side of the rectangle
         **/
        get bottom(): number{
            return this._top + this._height;
        }

        /**
         * Gets or sets the right side of the rectangle
         **/
        set bottom(value: number){

            this._height = value - this._top;



        }

        /**
         * Gets or sets the center of the rectangle
         * @returns {latte.Point}
         */
        get center(): Point{
            return new Point(this.left + this.width / 2, this.top + this.height / 2);
        }

        /**
         * Gets or sets the center of the rectangle
         * @param value
         */
        set center(value: Point){
            this.left = value.x - this.width / 2;
            this.top = value.y - this.height / 2;
        }

        /**
         * Gets or sets the height of the rectangle
         **/
        get height(): number{
            return this._height;
        }

        /**
         * Gets or sets the height of the rectangle
         **/
        set height(value: number){


            this._height = value;


        }

        /**
         * Gets a value indicating if the rectangle is empty
         *
         * @returns {boolean}
         */
        get isEmpty(): boolean {
            return this.area == 0 && this.left == 0 && this.top == 0;
        }


        /**
         * Gets or sets the left of the rectangle
         **/
        get left(): number{
            return this._left;
        }

        /**
         * Gets or sets the left of the rectangle
         **/
        set left(value: number){

            this._left = value;


        }

        /**
         * Gets the location of the rectangle
         *
         * @returns {Point}
         */
        get location(): Point {
            return new Point(this.left, this.top);
        }

        /**
         * Gets or sets the right side of the rectangle
         **/
        get right(): number{
            return this._left + this._width;
        }

        /**
         * Gets or sets the right side of the rectangle
         **/
        set right(value: number){


            this._width = value - this._left;


        }

        /**
         * Gets the size of the rectangle
         *
         * @returns {Size}
         */
        get size():Size {
            return new Size(this.width, this.height);
        }

        /**
         * Gets or sets a tag
         * @returns {any}
         */
        get tag(): any{
            return this._tag;
        }

        /**
         * Gets or sets a tag
         * @param value
         */
        set tag(value: any){
            this._tag = value;
        }

        /**
         * Gets or sets the top of the rectangle
         **/
        get top(): number{
            return this._top;
        }

        /**
         * Gets or sets the top of the rectangle
         **/
        set top(value: number){


            this._top = value;


        }

        /**
         * Gets or sets the width of the rectangle
         **/
        get width(): number{
            return this._width;
        }

        /**
         * Gets or sets the width of the rectangle
         **/
        set width(value: number){


            this._width = value;


        }
    }
}