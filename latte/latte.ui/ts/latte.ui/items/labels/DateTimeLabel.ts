module latte{
    /**
     * Label with date time as value. When clicked swaps between relative date
     and exact date displaying.
     **/
    export class DateTimeLabel extends LabelItem{

        /**
         *
         **/
        private _relative: boolean = true;

        /**
         *
         **/
        private _value: DateTime;

        /**
         * Creates the label. Optionally it may be initialized with a date, passed
         as a <c>string</c> or a <c>latte.DateTime</c> object.
         **/
        constructor(value: any = null){

            super();

            this.addClass('datetime');

            this.element.click(() => {
                this.relative = !this.relative;
            });

            if(value)
                this.value = value;

        }

        /**
         * Updates the text of the label
         **/
        private _updateText(){

            if(this.value){
                if(this.relative){
                    this.text = this.value.toRelativeString();
                    this.tooltip = this.value.toFormattedString();
                }else{
                    this.text = this.value.toFormattedString();
                    this.tooltip = this.value.toRelativeString();
                }
            }

        }

        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        get relative(): boolean{
            return this._relative;
        }

        /**
         * Gets or sets a value indicating if the date is shown as a relative string
         **/
        set relative(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx('value');

            this._relative = value;

            this._updateText();



        }

        /**
         * Gets or sets the value of the label
         **/
        get value(): any{
            return this._value;
        }

        /**
         * Gets or sets the value of the label
         **/
        set value(value: any){


            if(_isString(value))
                value = DateTime.fromString(value);

            if(!(value instanceof DateTime))
                throw new InvalidArgumentEx('value');

            this._value = value;
            this._updateText();



        }
    }
}