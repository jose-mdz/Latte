module latte{
    /**
     * Renders a separator for various purposes.
     **/
    export class SeparatorItem extends Item{

        //region Static
        /**
         * Returns the separator with the specified tab pointer
         * @param tab
         * @returns {latte.SeparatorItem}
         */
        static withTab(tab: TabItem){
            let s = new SeparatorItem();
            s.tab = tab;
            return s;
        }
        //endregion

        /**
         *
         **/
        private _text: string;


        /**
         * Creates the separator
         **/
        constructor(){


            // Init
            super();
            this.element.addClass('separator');

        }

        /**
         * Gets or sets the text of the separator
         **/
        get text(): string{
            return this._text;
        }

        /**
         * Gets or sets the text of the separator
         **/
        set text(value: string){


            // Empty me
            this.element.empty();

            if(_isString(value)){

                var label = new LabelItem();
                label.text = value;
                label.appendTo(this.element);

                this.element.addClass('with-text');
                this.element.clear();
            }else{
                this.element.removeClass('with-text');
            }

            this._text = value;


        }
    }
}