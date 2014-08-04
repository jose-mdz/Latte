/**
 * Created by josemanuel on 7/1/14.
 */
module latte {

    /**
     *
     */
    export class ColorIconItem extends IconItem {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor(color: Color, size: number = 16) {
            super();

            this.u = 1;
            this.v = 1;
            this.size = size;
            this.color = color;
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _color:Color = null;

        /**
         * Gets or sets the color of the icon
         *
         * @returns {Color}
         */
        public get color():Color {
            return this._color;
        }

        /**
         * Gets or sets the color of the icon
         *
         * @param {Color} value
         */
        public set color(value:Color) {
            this._color = value;
            this.css('background', value.toString());
        }

        //endregion

    }

}