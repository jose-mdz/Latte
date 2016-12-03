/**
 * Created by josemanuel on 12/23/13.
 */
module latte{


    /**
     * Shows a selectable radio button
     */
    export class RadioItem extends ValueItem<boolean>{

        //region Fields

        /**
         * Label for radio
         **/
        label: LabelItem;
        //endregion

        /**
         * Creates the RadioItem
         * @param text
         * @param value
         */
        constructor(text: string = null, value: boolean = null){
            super();
            this.element.addClass('radio');

            // Label
            this.label = new LabelItem();
            this.label.appendTo(this);

            this.addEventListener('click', () => this.value = !this.value);

            // Initialize Value
            if(_isBoolean(value)){
                this.value = value;
            }else {
                this.value = false;
            }

            if(text){
                this.text = text;
            }

        }

        //region Methods
        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            if(this.value){
                this.label.icon = Glyph.checkedRadio;
            }else{
                this.label.icon = Glyph.uncheckedRadio;
            }
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


    }

}