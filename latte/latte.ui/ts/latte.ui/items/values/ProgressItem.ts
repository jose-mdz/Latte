module latte{
    /**
     * Represents a progress bar
     **/
    export class ProgressItem extends ValueItem<number>{

        //region Fields
        /**
         *
         **/
        private _maxValue: number = 100;

        /**
         *
         **/
        private _minValue: number = 0;

        /**
         * Points to the DOM element of bar
         **/
        bar: JQuery;

        /**
         * Points to the DOM element where progress bar is contained
         **/
        container: JQuery;
        //endregion

        /**
         * Creates the progress item
         **/
        constructor(){

            super();
            this.element.addClass('progress');

            // Initialize elements
            this.container = $('<div>').addClass('container').appendTo(this.element);
            this.bar = $('<div>').addClass('bar').appendTo(this.container);

            this.onLayout(false);


        }

        //region Methods
        /**
         * Gets the percentage represented by min, max and value values.
         Value ranges from 0 to 100
         **/
        getPercentage(): number{

            var diff = this.maxValue - this.minValue;
            var curr = this.value - this.minValue;
            return Math.ceil(curr * 100 / diff);

        }

        /**
         * Raises the layout event
         **/
        onLayout(animate: boolean = true){


            var w = this.getPercentage();

            if(animate !== false && this.animated !== false)
                this.bar.animate({width: w + '%'});
            else
                this.bar.css('width', w + '%');

        }

        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            let value = this.value;

            if(value > this.maxValue){
                value = this.maxValue;
                this.bar.css('backgroundColor', 'red');

            }else {
                this.bar.css('backgroundColor', '');
            }

            if(value < this.minValue){
                value = this.minValue;
                this.container.css('borderColor', 'red');

            }else {
                this.container.css('borderColor', '');
            }

            this.onLayout();
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _animated:boolean = true;

        /**
         * Gets or sets a value indicating if the progress should be animated
         *
         * @returns {boolean}
         */
        get animated():boolean {
            return this._animated;
        }

        /**
         * Gets or sets a value indicating if the progress should be animated
         *
         * @param {boolean} value
         */
        set animated(value:boolean) {
            this._animated = value;
        }

        /**
         * Gets or sets the maximum value of the progress bar
         **/
        get maxValue(): number{
            return this._maxValue;
        }

        /**
         * Gets or sets the maximum value of the progress bar
         **/
        set maxValue(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value != this._maxValue;

            this._maxValue = value;

            if(changed) this.onLayout();


        }

        /**
         * Gets or sets the minimum value of the progress bar
         **/
        get minValue(): number{
            return this._minValue;
        }

        /**
         * Gets or sets the minimum value of the progress bar
         **/
        set minValue(value: number){


            if(!_isNumber(value))
                throw new InvalidArgumentEx('value', value);

            var changed = value != this._minValue;

            this._minValue = value;
            if(changed) this.onLayout();


        }

        //endregion

        //region Components

        //endregion
    }
}