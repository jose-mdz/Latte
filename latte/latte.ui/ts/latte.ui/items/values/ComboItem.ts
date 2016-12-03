module latte{
    /**
     * Presents a method for choosing options from a combobox.
     Combo options are presented as the button's items.
     The button's items tag value is assumed to be the value of the combobox.
     **/
    export class ComboItem extends ValueItem<any>{

        /**
         *
         **/
        private _options: any;

        /**
         * Button who hosts the combo
         **/
        button: ButtonItem;

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('combo');

            this.button = new ButtonItem();
            this.button.text = strings.pleaseSelect;
            this.button.appendTo(this.element);


        }

        /**
         * Override
         * @returns {any}
         */
        onGetValueString(): string{
            var item: Item;

            while((item = this.button.items.next())){
                if(item.tag == this.value){
                    return (<ButtonItem>item).text;
                }
            }

            return '';
        }

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            this.button.text = this.value === null ? strings.pleaseSelect : this.valueString;
        }

        /**
         * Gets or sets the options of the combo
         **/
        get options(): any{
            return this._options;
        }

        /**
         * Gets or sets the options of the combo
         **/
        set options(options: any){


            var __this = this;

            if(!_isArray(options) && !_isObject(options))
                throw new InvalidArgumentEx('options', options);

            this.button.items.clear();

            for(var i in options){
                var b = new ButtonItem();
                b.text = options[i].toString();
                b.tag = i;
                b.click.add(function(){
                    __this.value = this.tag;
                    __this.button.text = this.text;
                });
                this.button.items.add(b);
            }

            this._options = options;


        }

    }
}