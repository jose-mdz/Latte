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
        static fromHex(hexColor: string): Color{

            if(_isString(hexColor)) {
                if(hexColor.toLowerCase() == 'white') {
                    hexColor = '#FFF';
                }

                if(hexColor.toLowerCase() == 'black') {
                    hexColor = '#000';
                }

                if(hexColor.toLowerCase() == 'gray') {
                    hexColor = '#777';
                }

                if(hexColor.length == 0) {
                    hexColor = '#000';
                }
            }

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
         * Gets the RGB (Red, Green, Blue) components from a CMYK namespace
         * @param c
         * @param m
         * @param y
         * @param k
         * @returns number[]
         */
        static cmykToRgb(c: number, m: number, y: number, k: number): number[]{
            return [
                255 * (1 - c) * (1 - k),
                255 * (1 - m) * (1 - k),
                255 * (1 - y) * (1 - k)
            ]
        }

        /**
         * HSV to RGB color conversion
         *
         * H runs from 0 to 360 degrees
         * S and V run from 0 to 100
         *
         * Ported from the excellent java algorithm by Eugene Vishnevsky at:
         * http://www.cs.rit.edu/~ncs/color/t_convert.html
         */
        static hsvToRgb(h, s, v) {
            var r, g, b;
            var i;
            var f, p, q, t;

            // Make sure our arguments stay in-range
            h = Math.max(0, Math.min(360, h));
            s = Math.max(0, Math.min(100, s));
            v = Math.max(0, Math.min(100, v));

            // We accept saturation and value arguments from 0 to 100 because that's
            // how Photoshop represents those values. Internally, however, the
            // saturation and value are calculated from a range of 0 to 1. We make
            // That conversion here.
            s /= 100;
            v /= 100;

            if(s == 0) {
                // Achromatic (grey)
                r = g = b = v;
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }

            h /= 60; // sector 0 to 5
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));

            switch(i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;

                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;

                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;

                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;

                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;

                default: // case 5:
                    r = v;
                    g = p;
                    b = q;
            }

            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        /**
         * Gets the CMYK (Cyan, Magenta, Yellow and Key Black) components from a RGB namespace
         * @param red
         * @param green
         * @param blue
         * @returns {number[]}
         */
        static rgbToCmyk(red: number, green: number, blue: number): number[]{
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var k = 1 - Math.max(r, g, b);
            var ck = 1 - k;
            return [
                (1 - r - k) / ck,
                (1 - g - k) / ck,
                (1 - b - k) / ck,
                k
            ]
        }

        /**
         * Gets the HSV (Hue, Saturation, Value) components from a RGB namespace
         * @param red
         * @param green
         * @param blue
         * @returns {number[]}
         */
        static rgbToHsv(red: number, green: number, blue: number): number[]{
            var rr, gg, bb;
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var h = 0;
            var s = 0;
            var v = Math.max(r, g, b);
            var diff = v - Math.min(r, g, b);
            var diffc = (c) => { return (v - c) / 6 / diff + 1 / 2 }

            if(diff == 0) {
                h = s = 0;
            }else {
                s = diff / v;
                rr = diffc(r);
                gg = diffc(g);
                bb = diffc(b);

                if(r === v) {
                    h = bb - gg;
                }else if(g === v) {
                    h = (1 / 3) + rr - bb;
                }else if(b === v) {
                    h = (2 / 3) + gg - rr;
                }
            }

            if(h < 0) {
                h += 1;
            }else if(h > 1) {
                h -= 1;
            }

            return [
                Math.round(h * 360),
                Math.round(s * 100),
                Math.round(v * 100)
            ];
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
         * Gets or sets the Cyan component of the CMKYK namespace
         *
         * @returns {number}
         */
        get c():number {
            return (1 - (this.r / 255) - this.k) / (1 - this.k);
        }

        /**
         * Gets or sets the Cyan component of the CMKYK namespace
         *
         * @returns {number}
         */
        set c(value: number){
            this.r = 255 * (1 - value) * (1 - this.k);
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
         * Gets the K (Black Key) component of the CMKYK namespace
         *
         * @returns {number}
         */
        get k():number {
            return 1 - Math.max(this.r / 255, this.g / 255, this.b / 255);
        }

        /**
         * Gets the Magenta component of the CMYK namespace
         *
         * @returns {number}
         */
        get m():number{
            return (1 - (this.g / 255) - this.k) / (1 - this.k);
        }

        /**
         * Gets the Yellow component of the CMYK namespace
         *
         * @returns {number}
         */
        get y():number {
            return (1 - (this.b / 255) - this.k) / (1 - this.k);
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
         * Returns the perceived luminosity (https://en.wikipedia.org/wiki/Luminous_intensity)
         *
         *
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