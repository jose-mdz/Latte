module latte{

    export class ImageItem extends Item{

        /**
         *
         */
        private _autoSize: boolean = false;

        /**
         *
         */
        imageElement: JQuery;

        /**
         *
         */
        constructor(){

            super();

            this.addClass('image');

            this.imageElement = $('<img>').appendTo(this.element);

        }

        /**
         *
         * @returns {boolean}
         */
        get autoSize(): boolean{
            return this._autoSize;
        }

        /**
         *
         * @param value
         */
        set autoSize(value: boolean){
            this._autoSize = value;
        }

        /**
         *
         * @returns {string|JQuery}
         */
        get src(): string{
            return this.imageElement.attr('src');
        }

        /**
         *
         * @param value
         */
        set src(value: string){
            this.imageElement.attr('src', value);
        }
    }

}