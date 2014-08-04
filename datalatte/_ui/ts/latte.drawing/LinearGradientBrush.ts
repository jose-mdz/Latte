/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class LinearGradientBrush extends Brush {

        //region Static
        //endregion

        //region Fields

        private stops: {position: number; color: Color}[] = [];

        //endregion

        /**
         *
         */
        constructor(a: Point, b: Point, stops: {position: number; color: Color}[] = []) {
            super();

            this.pointA = a;
            this.pointB = b;

            this.stops = stops;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Adds a stop to the gradient
         * @param position
         * @param color
         */
        addStop(position: number, color: Color){
            this.stops.push({
                position: position,
                color: color
            });
        }

        /**
         * Applies the brush on the specified context
         * @param c
         */
        applyOn(c: DrawingContext){

            var g = c.context.createLinearGradient(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);

            for (var i = 0; i < this.stops.length; i++) {
                g.addColorStop(this.stops[i].position, this.stops[i].color.toString());
            }

            c.context.fillStyle = g;
        }
        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _pointA:Point = null;

        /**
         * Gets or sets the point A of gradient
         *
         * @returns {Point}
         */
        public get pointA():Point {
            return this._pointA;
        }

        /**
         * Gets or sets the point A of gradient
         *
         * @param {Point} value
         */
        public set pointA(value:Point) {
            this._pointA = value;
        }

        /**
         * Property field
         */
        private _pointB:Point = null;

        /**
         * Gets or sets the B point of gradient
         *
         * @returns {Point}
         */
        public get pointB():Point {
            return this._pointB;
        }

        /**
         * Gets or sets the B point of gradient
         *
         * @param {Point} value
         */
        public set pointB(value:Point) {
            this._pointB = value;
        }
        //endregion

    }

}