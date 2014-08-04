/**
 * Created by josemanuel on 7/1/14.
 */
module latte {

    /**
     *
     */
    export class DrawingImage {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         * Creates image
         */
        constructor(image: HTMLImageElement) {
            this._image = image;
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
        private _image:HTMLImageElement;

        /**
         * Gets the HTML Image object
         *
         * @returns {HTMLImageElement}
         */
        public get image():HTMLImageElement {
            return this._image;
        }

        /**
         * Gets the size of the image
         *
         * @returns {Size}
         */
        public get size():Size {
            return new Size(this.image.width, this.image.height);
        }


        //endregion

    }

}