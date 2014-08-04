/**
 * Created by josemanuel on 5/12/14.
 */
module latte {

    /**
     *
     */
    export class DrawingElement extends DrawingRectangle {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Draws the element
         * @param c
         */
        draw(c: DrawingContext){

        }

        /**
         * Updates the element
         */
        update(){

        }

        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _hidden:boolean = false;

        /**
         * Gets or sets a value indicating if the element is currently hidden
         *
         * @returns {boolean}
         */
        public get hidden():boolean {
            return this._hidden;
        }

        /**
         * Gets or sets a value indicating if the element is currently hidden
         *
         * @param {boolean} value
         */
        public set hidden(value:boolean) {
            this._hidden = value;
        }

        /**
         * Property field
         */
        private _paused:boolean = false;

        /**
         * Gets or sets a value indicating if the element is paused
         *
         * @returns {boolean}
         */
        public get paused():boolean {
            return this._paused;
        }

        /**
         * Gets or sets a value indicating if the elment is paused
         *
         * @param {boolean} value
         */
        public set paused(value:boolean) {
            this._paused = value;
        }

        //endregion

    }

}