module latte{
    /**
     * Label with value property
     **/
    export class LabelValueItem extends ValueItem<string>{

        /**
         * Label for text displaying
         **/
        label: LabelItem;

        /**
         * Creates the item
         **/
        constructor(){

            super();
            this.element.addClass('label-value');

            this.label = new LabelItem();
            this.label.appendTo(this.element);


        }

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            this.label.text = this.value;
        }

    }
}