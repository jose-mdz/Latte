module latte{

    /**
     * Single element containing text
     */
    export class UiText extends UiElement{

        /**
         * Trims the text and adds ellipsis if it overpasses the limit.
         *
         * @param text
         * @param length
         * @returns {string}
         */
        static ellipsis(text: string, length: number = 50){
            if(!_isString(text) || text.length < length){
                return text;
            }

            return text.substr(0, length) + '...';
        }

        /**
         * Creates the text
         */
        constructor(text: string = null){
            super();

            this.addClass('text');

            if(text !== null){
                this.text = text;
            }
        }

        /**
         * Gets the text/html of the box
         * @returns {string}
         */
        get text(): string{
            return this.element.html();
        }

        /**
         * Sets the text/html of the box
         * @param value
         */
        set text(value: string){
            this.element.html(value);
        }

    }

}