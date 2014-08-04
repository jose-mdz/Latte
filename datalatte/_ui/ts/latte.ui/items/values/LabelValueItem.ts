module latte{
    /**
     * Label with value property
     **/
    export class LabelValueItem extends ValueItem{

        /**
         * Label for text displaying
         **/
        label: LabelItem;

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('label-value');

            this.label = new LabelItem();
            this.label.appendTo(this.element);


        }

        /**
         * Gets or sets the value
         **/
        get value(): any{
            return this.label.text;
        }

        /**
         * Gets or sets the value
         **/
        set value(value: any){


            this.label.text = value;


        }
    }
}