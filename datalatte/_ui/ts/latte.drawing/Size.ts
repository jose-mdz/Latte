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
         * Gets a value indicating if the size has no compnents assigned or initialized
         *
         * @returns {boolean}
         */
        public get isEmpty():boolean {
            return this._height == null && this._width == null;
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