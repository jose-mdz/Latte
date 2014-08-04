/**
 * Created by josemanuel on 5/26/14.
 */
module latte {

    export enum DrawingPathStep{
        MOVE_TO,

        LINE_TO,

        QUADRATIC_CURVE_TO,

        ARC_TO,

        BEZIER_CURVE_TO,

        CLOSE_PATH
    }

    /**
     * Represents a path
     */
    export class DrawingPath {

        //region Static

        /**
         * Returns an elllpise path
         * @param r
         * @returns {latte.DrawingPath}
         */
        static ellipse(r: DrawingRectangle){

            var path = new DrawingPath();
            var x = r.left;
            var y = r.top;
            var w = r.width;
            var h = r.height;
            var kappa = 0.5522848;
            var ox = (w / 2) * kappa;
            var oy = (h / 2) * kappa;
            var xe = x + w;
            var ye = y + h;
            var xm = x + w / 2;
            var ym = y + h / 2;

            path.moveTo(new Point(r.left, ym));
            path.moveTo(new Point(x, ym));
            path.bezierCurveTo(new Point(x, ym - oy), new Point(xm - ox, y), new Point(xm, y));
            path.bezierCurveTo(new Point(xm + ox, y), new Point(xe, ym - oy), new Point(xe, ym));
            path.bezierCurveTo(new Point(xe, ym + oy), new Point(xm + ox, ye), new Point(xm, ye));
            path.bezierCurveTo(new Point(xm - ox, ye), new Point(x, ym + oy), new Point(x, ym));

            return path;
        }

        /**
         * Returns a path with a rounded rectangle of the specified radius
         * @param r
         * @param radius
         */
        static roundRectangle(r: DrawingRectangle, radius: number): DrawingPath{

            var path = new DrawingPath();
            var x = r.left;
            var y = r.top;
            var w = r.width;
            var h = r.height;

            path.moveTo(new Point(x + radius, y));

            path.lineTo(new Point(x + w - radius, y));
            path.quadraticCurveTo(new Point(x + w, y), new Point(x + w, y + radius));

            path.lineTo(new Point(x + w, y + h - radius));
            path.quadraticCurveTo(new Point(x + w, y + h), new Point( x + w - radius, y + h));

            path.lineTo(new Point(x + radius, y + h));
            path.quadraticCurveTo(new Point(x, y + h), new Point(x, y + h - radius));

            path.lineTo(new Point(x, y + radius));
            path.quadraticCurveTo(new Point(x, y), new Point( x + radius, y));

            path.closePath();

            return path;
        }

        /**
         * Returns a rectangle
         */
        static rectangle(r: DrawingRectangle): DrawingPath{
            var path = new DrawingPath();

            path.moveTo(r.location);
            path.lineTo(r.topRight);
            path.lineTo(r.bottomRight);
            path.lineTo(r.bottomLeft);

            return path;
        }

        //endregion

        //region Fields
        private steps: {type: DrawingPathStep; args: any[]}[] = [];
        //endregion

        /**
         * Creates the path
         */
        constructor() {
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Applies the path to the specified context
         * @param c
         */
        applyOn(c: DrawingContext){

            c.context.beginPath();

            for(var i = 0; i < this.steps.length; i++){

                var step = this.steps[i];
                var a = step.args;

                switch(step.type){
                    case DrawingPathStep.ARC_TO:
                        c.context.arcTo(a[0].x, a[0].y, a[1].x, a[1].y, a[2]);
                        break;
                    case DrawingPathStep.BEZIER_CURVE_TO:
                        c.context.bezierCurveTo(a[0].x, a[0].y, a[1].x, a[1].y, a[2].x, a[2].y);
                        break;
                    case DrawingPathStep.CLOSE_PATH:
                        c.context.closePath();
                        break;
                    case DrawingPathStep.LINE_TO:
                        c.context.lineTo(a[0].x, a[0].y);
                        break;
                    case DrawingPathStep.MOVE_TO:
                        c.context.moveTo(a[0].x, a[0].y);
                        break;
                    case DrawingPathStep.QUADRATIC_CURVE_TO:
                        c.context.quadraticCurveTo(a[0].x, a[0].y, a[1].x, a[1].y);
                        break;
                }

            }
        }

        arcTo(begin: Point, end: Point, radius: number){
            this.steps.push({type: DrawingPathStep.ARC_TO, args: [begin, end, radius]});
        }

        bezierCurveTo(controlPointA: Point, controlPointB: Point, endPoint: Point){
            this.steps.push({type: DrawingPathStep.BEZIER_CURVE_TO, args: [controlPointA, controlPointB, endPoint]});
        }

        closePath(){
            this.steps.push({type: DrawingPathStep.CLOSE_PATH, args: []});
        }

        moveTo(p: Point){
            this.steps.push({type: DrawingPathStep.MOVE_TO, args: [p]});
        }

        lineTo(p: Point){
            this.steps.push({type: DrawingPathStep.LINE_TO, args: [p]});
        }

        quadraticCurveTo(controlPoint: Point, endPoint: Point){
            this.steps.push({type: DrawingPathStep.QUADRATIC_CURVE_TO, args: [controlPoint, endPoint]});
        }

        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}