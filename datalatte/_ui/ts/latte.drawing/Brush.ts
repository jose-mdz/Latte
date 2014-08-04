/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class Brush {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates the Brush
         */
        constructor(color: Color = Color.black) {

            this.color = color;

        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Applies the brush on the specified context
         * @param c
         */
        applyOn(c: DrawingContext){
            c.context.fillStyle = this.color.toString();
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
         * Gets or sets the color of the brush
         *
         * @returns {Color}
         */
        public get color():Color {
            return this._color;
        }

        /**
         * Gets or sets the color of the brush
         *
         * @param {Color} value
         */
        public set color(value:Color) {
            this._color = value;
        }

        //endregion

    }

}
