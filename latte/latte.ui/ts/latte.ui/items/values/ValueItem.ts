module latte{
    /**
     * Base class for items who capture values from user.

     Classes who inherits from ValueItem must implement <c>value</c> method
     and initialize the <c>input</c> property to the focusable.
     **/
    export class ValueItem<T> extends Item{

        /**
         * Every ValueItem must create its own <c>input</c> element
         **/
        constructor(){

            super();

            this.element.addClass('value');

        }

        //region Methods

        /**
         * Override
         * @returns {String}
         */
        onGetValueString(): string{
            return String(this.value);
        }

        /**
         * Raises the <c>value</c> event
         */
        onValueChanged(){
            if(this._valueChanged){
                this._valueChanged.raise();
            }
        }

        /**
         * Sets the value of the item, optionally silently.
         * @param {T} value
         * @param {boolean} silently
         */
        setValue(value: T, silently: boolean = false){
            if(silently) {
                this._value = value;
            }else {
                this.value = value;
            }
        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _valueChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the value property changes
         *
         * @returns {LatteEvent}
         */
        get valueChanged(): LatteEvent{
            if(!this._valueChanged){
                this._valueChanged = new LatteEvent(this);
            }
            return this._valueChanged;
        }

        //endregion

        //region Properties
        /**
         * Property field
         */
        private _value: T = null;

        /**
         * Gets or sets the value this item represents
         *
         * @returns {T}
         */
        get value(): T{
            return this._value;
        }

        /**
         * Gets or sets the value this item represents
         *
         * @param {T} value
         */
        set value(value: T){

            // Check if value changed
            let changed: boolean = value !== this._value;

            // Set value
            this._value = value;

            // Trigger changed event
            if(changed){
                this.onValueChanged();
            }
        }

        /**
         * Gets the value as a string
         *
         * @returns {string}
         */
        get valueString(): string {
            return this.onGetValueString();
        }

        //endregion

    }
}