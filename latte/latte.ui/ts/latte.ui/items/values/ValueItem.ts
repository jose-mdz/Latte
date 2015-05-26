module latte{
    /**
     * Base class for items who capture values from user.

     Classes who inherits from ValueItem must implement <c>value</c> method
     and initialize the <c>input</c> property to the focusable.
     **/
    export class ValueItem extends Item{

        /**
         * Raised when value changes.
         **/
        valueChanged: LatteEvent;

        /**
         * Every ValueItem must create its own <c>input</c> element
         **/
        constructor(){


            super();
            this.element.addClass('value');

            // Events
            this.valueChanged = new LatteEvent(this);


        }

        /**
         *
         **/
        getValue(): any{
            throw new Ex();
        }

        /**
         * Gets the value as a string
         * @returns {string}
         */
        getValueString(): string{
            return this.value !== null ? this.value.toString() : '';
        }

        /**
         * Raises the <c>valueChanged</c> event
         **/
        onValueChanged(){

            this.valueChanged.raise();

        }

        /**
         *
         **/
        setValue(value: any){
            throw new Ex();
        }

        /**
         * Gets or sets the value of the item
         <b>Must be overriden</b>
         **/
        get value(): any{
            return this.getValue();
        }

        /**
         * Gets or sets the value of the item
         <b>Must be overriden</b>
         **/
        set value(value: any){


            this.setValue(value);


        }

        /**
         * Gets the value as a string
         **/
        get valueString(): any{

            return this.getValueString();

        }
    }
}