module latte{
    /**
     * Represents a color
     **/
    export class Color{

        //region Static

        /**
         * Creates a color from the hexadecimal value.
         * It may contain the <c>#</c> symbol at the beginning of the string.
         **/
        static fromHex(hexColor: string): latte.Color{


            // Check is string
            if(!_isString(hexColor) || hexColor.length == 0)
                throw new latte.InvalidArgumentEx('hexColor', hexColor);

            // Remove #
            if(hexColor.charAt(0) == '#') hexColor = hexColor.substr(1);

            // Check length
            if(!(hexColor.length == 3 || hexColor.length == 6 || hexColor.length == 9))
                throw new latte.InvalidArgumentEx('hexColor', hexColor);

            var c = new latte.Color();

            var toDecimal = function(hex){ return parseInt(hex, 16); };

            // If three digits
            if(hexColor.length == 3){
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(0)));
                c.g = (toDecimal(hexColor.charAt(1) + hexColor.charAt(1)));
                c.b = (toDecimal(hexColor.charAt(2) + hexColor.charAt(2)));
            }else{
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(1)));
                c.g = (toDecimal(hexColor.charAt(2) + hexColor.charAt(3)));
                c.b = (toDecimal(hexColor.charAt(4) + hexColor.charAt(5)));

                if(hexColor.length == 9)
                    c.a = (toDecimal(hexColor.charAt(6) + hexColor.charAt(7)));
            }

            return c;

        }

        /**
         * Field for black property.
         */
        private static _black:Color;

        /**
         * Gets the black color
         */
        static get black():Color {
            if (!this._black) {
                this._black = new Color(0,0,0);
            }
            return this._black;
        }

        /**
         * Field for white property.
         */
        private static _white:Color;

        /**
         * Gets the white color
         */
        static get white():Color {
            if (!this._white) {
                this._white = new Color(255, 255, 255);
            }
            return this._white;
        }

        /**
         * Field for red property.
         */
        private static _red:Color;

        /**
         * Gets the red color
         */
        static get red():Color {
            if (!this._red) {
                this._red = new Color(255, 0, 0);
            }
            return this._red;
        }

        /**
         * Field for green property.
         */
        private static _green:Color;

        /**
         * Gets the green color
         */
        static get green():Color {
            if (!this._green) {
                this._green = new Color(0, 128, 0);
            }
            return this._green;
        }

        /**
         * Field for blue property.
         */
        private static _blue:Color;

        /**
         * Gets the blue color
         */
        static get blue():Color {
            if (!this._blue) {
                this._blue = new Color(0, 0, 255);
            }
            return this._blue;
        }

        /**
         * Field for transparent property.
         */
        private static _transparent:Color;

        /**
         * Gets the transparent color
         */
        static get transparent():Color {
            if (!this._transparent) {
                this._transparent = new Color(0, 0, 0, 0);
            }
            return this._transparent;
        }

        //endregion

        /**
         * Creates the color from the specified RGB and Aplha components.
         **/
        constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255){

            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        //region Methods

        /**
         * Returns the color as a hex string
         **/
        toHexString(): string{

            var d = function(s){ if(s.length == 1) return '0' + s; return s; };

            if(this.a != 255){
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16))+ d(this.a.toString(16));
            }else{
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16));
            }

        }

        /**
         * Returns the color as a string
         **/
        toString(): string{

            if(this.isTransparent){
                return 'transparent';

            }else if(this.a != 255){
                return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";

            }else{
                return this.toHexString();
            }

        }

        //endregion

        //region Properties

        /**
         *
         **/
        private _a: number = 255;

        /**
         * Gets r sets the Alpha component of color, from 0 to 255
         * @returns {number}
         */
        get a(): number{
            return this._a;
        }

        /**
         * Gets or sets the Aplha component of color, from 0 to 255.
         **/
        set a(value: number){


            if(value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);

            this._a = value;

        }

        /**
         *
         **/
        private _b: number;

        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        get b(): number{

                return this._b;

        }

        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        set b(value: number){


            if(value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);

            this._b = value;

        }

        /**
         *
         **/
        private _g: number;

        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        get g(): number{

                return this._g;

        }

        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        set g(value: number){

            if(value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);

            this._g = value;

        }

        /**
         * Returns a copy of the color with the specified alpha between 0 and 255.
         *
         * @param alpha
         */
        fade(alpha: number): Color{
            return new Color(this.r, this.g, this.b, alpha);
        }

        /**
         * Returns a copy of the color with the specified alpha between 0 and 1.
         *
         * @param alpha
         */
        fadeFloat(alpha: number): Color{
            return new Color(this.r, this.g, this.b, alpha * 255);
        }

        /**
         * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        get isDark(): boolean{
            return this.perceivedLuminosity > 0.5;
        }

        /**
         * Gets a value indicating if the color is a light color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        get isLight(): boolean{
            return this.perceivedLuminosity <= 0.5;
        }

        /**
         * Gets a value indicating if the color is transparent.
         **/
        get isTransparent(): boolean{
            return this.a === 0;
        }

        /**
         * Returns the perceived luminosity
         * @returns {number}
         */
        get perceivedLuminosity(): number{

            // Preceived Luminosity
            var a = 1 - (this.r * 0.299 + this.g * 0.587 + this.b * 0.114) / 255;

            return a;

        }

        /**
         *
         **/
        private _r: number;

        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        get r(): number{

                return this._r;

        }

        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        set r(value: number){


            if(value < 0 || value > 255)
                throw new latte.InvalidArgumentEx('value', value);

            this._r = value;

        }
        //endregion

    }
}