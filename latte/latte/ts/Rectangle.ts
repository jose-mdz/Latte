module latte{
    /**
     * Reprsents a Rectangle
     **/
    export class Rectangle{


        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        static fromLRTB(left: number, right: number, top: number, bottom: number): Rectangle{

            var r = new Rectangle(left, top);
            r.right = right;r.bottom = bottom;
            return r;

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
         * Returns the result of centering this into the specified container
         **/
        center(container: Rectangle): Rectangle{

            var c = new Rectangle( container.left + (container.width - this.width) / 2,
                container.top + (container.height - this.height) / 2, this.width, this.height );
            return c;

        }

        /**
         * Gets a value indicating if the specified point is contained
         **/
        contains(x: number, y: number): boolean{

            return this._left <= x && this.right >= x
                && this._top <= y && this.bottom >= y

        }

        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        containsRectangle(rectangle: Rectangle): boolean{

            return this.contains( rectangle.left, rectangle.top)
                && this.contains( rectangle.right, rectangle.bottom);

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

            return Rectangle.fromLRTB(
                Math.max(this.left, rectangle.left),
                Math.min(this.right, rectangle.right),
                Math.max(this.top, rectangle.top),
                Math.min(this.bottom, rectangle.bottom)
            );

        }

        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        intersects(rectangle: Rectangle): boolean{

            return this.contains(rectangle.left, rectangle.top)
                || this.contains(rectangle.right, rectangle.top)
                || this.contains(rectangle.right, rectangle.bottom)
                || this.contains(rectangle.left, rectangle.bottom);

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


        get tag(): any{
            return this._tag;
        }

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