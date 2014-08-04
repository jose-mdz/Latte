/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class Pen {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates a new Pen
         */
        constructor(color: Color = Color.black, width: number = 1, dash:number[] = null) {

            this.color = color;
            this.width = width;
            this.dash = dash;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Applies the pen on the specified context
         * @param c
         */
        applyOn(c: DrawingContext){

            if(c.context.setLineDash) {
                if(this.dash && this.dash.length > 0) {
                    c.context.setLineDash(this.dash);
                }else{
                    c.context.setLineDash([]);
                }
            }

            c.context.strokeStyle = this.color.toString();
            c.context.lineWidth = this.width;
        }

        //endregion

        //region Events
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _color:Color = null;

        /**
         * Gets or sets the color of the pen
         *
         * @returns {Color}
         */
        public get color():Color {
            return this._color;
        }

        /**
         * Gets or sets the color of the pen
         *
         * @param {Color} value
         */
        public set color(value:Color) {
            this._color = value;
        }

        /**
         * Property field
         */
        private _dash:number[] = [];

        /**
         * Gets or sets the line dash (Array of numbers)
         *
         * @returns {number[]}
         */
        public get dash():number[] {
            return this._dash;
        }

        /**
         * Gets or sets the line dash (Array of numbers)
         *
         * @param {number[]} value
         */
        public set dash(value:number[]) {
            this._dash = value;
        }

        /**
         * Property field
         */
        private _width:number = 0;

        /**
         * Gets or sets the width of the pen
         *
         * @returns {number}
         */
        public get width():number {
            return this._width;
        }

        /**
         * Gets or sets the width of the pen
         *
         * @param {number} value
         */
        public set width(value:number) {
            this._width = value;
        }
        //endregion

    }

}