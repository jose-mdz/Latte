/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class Size {

        //region Static

        /**
         * Returns an empty size
         * @returns {latte.Size}
         */
        static empty(): Size{
            return new Size(null, null);
        }

        /**
         * Returns a size of zero width and zero height
         * @returns {latte.Point}
         */
        static zero(): Size{
            return new Size(0, 0);
        }
        //endregion

        //region Fields
        //endregion

        /**
         * Creates a new Size, optionally sets its Width and Height components
         */
        constructor(width: number = null, height: number = null) {
            if(width !== null) {
                this._width = width;
            }

            if(height !== null) {
                this._height = height;
            }
        }

        //region Private Methods
        //endregion

        //region Methods
        /**
         * Gets a value indicating if the size contains the specified size.
         * @param size
         */
        contains(size: Size): boolean{
            return this.width >= size.width && this.height >= size.height;
        }

        /**
         * Inflates the size on the specified width and height
         *
         * @param width
         * @param height
         * @returns {latte.Size}
         */
        inflate(width: number, height: number): Size{
            return new Size(this.width + width, this.height + height);
        }

        /**
         * Inflates the size uniformly
         * @param wide
         */
        inflateUniform(wide: number){
            return new Size(this.width + wide, this.height + wide);
        }

        /**
         * Gets a scaled Size that fits in the specified target.
         * @param target
         */
        scaleToFit(target: Size): Size{
            let dh = target.width * this.height / this.width;

            if(dh > target.height) {
                return new Size( target.height * this.width / this.height, target.height);
            }

            return new Size(target.width, dh);
        }

        /**
         * Gets a scaled Size that fills the specified target.
         * @param target
         */
        scaleToFill(target: Size): Size{
            let dh = target.width * this.height / this.width;

            if(dh <= target.height) {
                return new Size( target.height * this.width / this.height, target.height);
            }

            return new Size(target.width, dh);
        }

        /**
         * Gets string representation of the size
         * @returns {string}
         */
        toString(): string{
            return sprintf("Size(%s, %s)", this._width, this._height);
        }
        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Gets the area represented by the size
         *
         * @returns {number}
         */
        get area():number {
            return this.width * this.height;
        }


        /**
         * Gets a value indicating if the size has no compnents assigned or initialized
         *
         * @returns {boolean}
         */
        public get isEmpty():boolean {
            return this._height == null && this._width == null;
        }

        /**
         * Gets a value indicating if the size is horizontal
         *
         * @returns {boolean}
         */
        get isHorizontal(): boolean {
            return this.width > this.height;
        }

        /**
         * Gets a value indicating if the size is a square
         *
         * @returns {boolean}
         */
        get isSquare(): boolean {
            return this.width == this.height;
        }


        /**
         * Gets a value indicating if the size is vertical
         *
         * @returns {boolean}
         */
        get isVertical(): boolean {
            return this.height > this.width;
        }


        /**
         * Property field
         */
        private _height:number = null;

        /**
         * Gets the Height component of the size
         *
         * @returns {number}
         */
        public get height():number {
            return this._height;
        }

        /**
         * Property field
         */
        private _width:number = null;

        /**
         * Gets the Width component of the size
         *
         * @returns {number}
         */
        public get width():number {
            return this._width;
        }


        //endregion

    }

}