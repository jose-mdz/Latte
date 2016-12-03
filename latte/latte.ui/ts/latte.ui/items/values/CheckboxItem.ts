module latte{
    /**
     *
     **/
    export class CheckboxItem extends ValueItem<boolean>{


        /**
         * Creates the item
         **/
        constructor(){

            super();

            this.element.addClass('checkbox');

            this.label.appendTo(this);

            this.addEventListener('click', () => this.value = !this.value);

        }

        //region Methods

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            let value = this.value;

            if(!_isBoolean(value) && _isString(value) && _isNumeric(value)) {
                this.value = !!parseInt(<any>value);
            }else {
                this.label.icon = this.value ? Glyph.checked : Glyph.unchecked;
            }
        }

        /**
         * Override
         */
        serialize(): string{
            return this.value ? "1" : "0";
        }

        /**
         * Override
         */
        unserialize(value: string){
            this.value = !!parseInt(value);
        }


        //endregion

        //region Properties

        /**
         * Gets or sets the text of the checkbox
         **/
        get text(): string{
            return this.label.text;
        }

        /**
         * Gets or sets the text of the checkbox
         **/
        set text(value: string){

            this.label.text = value;

        }

        //endregion

        //region Components

        /**
         * Field for label property
         */
        private _label: LabelItem;

        /**
         * Gets the label of the checkbox
         *
         * @returns {LabelItem}
         */
        get label(): LabelItem {
            if (!this._label) {
                this._label = new LabelItem();
            }
            return this._label;
        }


        //endregion




    }
}
