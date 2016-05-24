module latte{
    /**
     *
     **/
    export class CheckboxItem extends ValueItem{

        /**
         *
         **/
        private _value: boolean;

        /**
         * Label for checkbox
         **/
        label: LabelItem;

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('checkbox');

            this.label = new LabelItem();
            this.label.appendTo(this);

            this.element.click(() => {
                this.value = !this.value;
            });

            this.value = false;

        }

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

        /**
         * Gets or sets the checked state of checkbox
         **/
        get value(): boolean{
            return this._value;
        }

        /**
         * Gets or sets the checked state of checkbox
         **/
        set value(value: boolean){


            if(!_isBoolean(value)){

                var t:any = value;
 
                if(t == 1) {
                    value = true;

                }else if(t == 0 || t == "" || t == null){
                    value = false;
                }else{
                    throw new InvalidArgumentEx('value', value);
                }

            }


            var changed = value !== this._value;

            if(value){
                this.label.icon = Glyph.checked;
            }else{
                this.label.icon = Glyph.unchecked;
            }

            this._value = value;


            if(changed){
                this.onValueChanged();
            }

        }
    }
}
