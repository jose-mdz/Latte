/**
 * Created by josemanuel on 5/12/14.
 */
module latte {


    /**
     *
     */
    export class Point {

        //region Static

        /**
         * Gets the distance between two points
         * @param a
         * @param b
         */
        static distance(a: Point, b: Point): number{
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y , 2));
        }

        /**
         * Returns an empty point
         * @returns {latte.Point}
         */
        static empty(): Point{
            return new Point(null, null);
        }

        /**
         * Returns a point situated on the origin
         * @returns {latte.Point}
         */
        static origin(): Point{
            return new Point(0, 0);
        }

        //endregion

        //region Fields
        //endregion

        /**
         * Creates a new point, optionally
         */
        constructor(x: number = null, y: number = null) {
            if(x !== null) {
                this._x = x;
            }

            if(y !== null) {
                this._y = y;
            }
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Returns the offset operation of the point
         *
         * @param x
         * @param y
         * @returns {latte.Point}
         */
        offset(x: number, y: number): Point{
            return new Point(this.x + x, this.y + y);
        }

        /**
         * Gets string representation of the point
         * @returns {string}
         */
        toString(): string{
            return sprintf("Point(%s, %s)", this._x, this._y);
        }

        //endregion

        //region Events

        //endregion

        //region Properties

        /**
         * Gets a value indicating if the point is empty (No value has been set)
         *
         * @returns {boolean}
         */
        public get isEmpty():boolean {
            return this._x == null || this._y == null;
        }


        /**
         * Property field
         */
        private _x:number = null;

        /**
         * Gets or sets the X of the point
         *
         * @returns {number}
         */
        public get x():number {
            return this._x || 0;
        }

        /**
         * Property field
         */
        private _y:number = null;

        /**
         * Gets the Y coordinate of the point
         *
         * @returns {number}
         */
        public get y():number {
            return this._y || 0;
        }

        //endregion

    }

}