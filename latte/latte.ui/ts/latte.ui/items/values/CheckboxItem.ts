module latte{
    /**
     *
     **/
    export class CheckboxItem extends ValueItem<boolean>{


        //region Static

        /**
         * Global checked icon getter
         */
        static globalCheckedIconGetter: () => IconItem  = () => Glyph.checked;

        /**
         * Global unchecked icon getter
         */
        static globalUncheckedIconGetter: () => IconItem = () => Glyph.unchecked;


        //endregion

        //region Fields

        checkedIconGetter: () => IconItem  = null;
        uncheckedIconGetter: () => IconItem  = null;

        //endregion

        /**
         * Creates the item
         **/
        constructor(){

            super();

            this.element.addClass('checkbox');

            this.label.appendTo(this);

            this.value = false;

            this.addEventListener('click', () => this.value = !this.value);

        }

        //region Methods


        /**
         * Gets the icon for the specified value
         * @returns {latte.IconItem}
         */
        getIconForValue(value: boolean): IconItem{
            if(value) {
                return this.checkedIconGetter ? this.checkedIconGetter() : CheckboxItem.globalCheckedIconGetter();
            }
            return this.uncheckedIconGetter ? this.uncheckedIconGetter() : CheckboxItem.globalUncheckedIconGetter();
        }

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            let value = this.value;

            if(!_isBoolean(value) && _isString(value) && _isNumeric(value)) {
                this.value = !!parseInt(<any>value);
            }

            this.label.icon = this.getIconForValue(this.value);

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
