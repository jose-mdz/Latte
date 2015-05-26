/**
 * Created by josemanuel on 12/23/13.
 */
module latte{


    /**
     * Shows a selectable radio button
     */
    export class RadioItem extends ValueItem{

        private _value: boolean = false;

        /**
         * Label for radio
         **/
        label: LabelItem;

        constructor(text: string = null, value: boolean = null){
            super();
            this.element.addClass('radio');

            // Label
            this.label = new LabelItem();
            this.label.appendTo(this);

            this.element.click(() => {
                if(!this.value){
                    this.value = true;
                }

            });

            // Initially unselected
            this.value = false;

            if(text){
                this.text = text;
            }

            if(_isBoolean(value)){
                this.value = value;
            }

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


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value !== this._value;

            if(value){
                this.label.icon = Glyph.checkedRadio;
            }else{
                this.label.icon = Glyph.uncheckedRadio;
            }

            this._value = value;


            if(changed){
                this.onValueChanged();
            }

        }

    }

}