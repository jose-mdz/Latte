module latte{
    /**
     * Allows user to pick a time
     **/
    export class TimePickerItem extends ValueItem<TimeSpan>{

        //region Private Fields
        private ignorePassToCombos:boolean = false;
        //endregion

        /**
         *
         **/
        constructor(){

            super();
            this.element.addClass('time-picker');

            this.element.append(this.hourCombo);
            this.element.append(this.minuteCombo);
            this.element.append(this.secondCombo);

        }

        //region Private Methods
        /**
         * Zero pads for dates
         * @param i
         * @returns {string}
         */
        private zeroPad(i: number): string{
            return i < 10 ? '0' + i : i.toString();
        }
        //endregion

        //region Methods
        /**
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            if(this.ignorePassToCombos) {
                this.ignorePassToCombos = false;
            }else {
                this.hourCombo.value = this.value.hours;
                this.minuteCombo.value = this.value.minutes;
                this.secondCombo.value = this.value.seconds;
            }

        }

        /**
         * Override.
         * @returns {String}
         */
        onGetValueString(): string{
            return String(this.value);
        }

        /**
         * Silently sets the hour component of the value
         * @param hours
         */
        setHourSilently(hours: number){
            this.setValueSilently(new TimeSpan(0, hours, this.value.minutes, this.value.seconds, this.value.milliseconds));
        }

        /**
         * Silently sets the hour component of the value
         * @param minutes
         */
        setMinuteSilently(minutes: number){
            this.setValueSilently(new TimeSpan(0, this.value.hours, minutes, this.value.seconds, this.value.milliseconds));
        }

        /**
         * Silently sets the hour component of the value
         * @param seconds
         */
        setSecondSilently(seconds: number){
            this.setValueSilently(new TimeSpan(0, this.value.hours, this.value.minutes, seconds, this.value.milliseconds));
        }

        /**
         * Silently sets the value without affecting the combos.
         * @param value
         */
        setValueSilently(value: TimeSpan){
            this.ignorePassToCombos = true;

            this.value = value;

        }

        //endregion

        //region Components
        /**
         * Field for hourCombo property
         */
        private _hourCombo:ComboItem;

        /**
         * Gets the hour combo item
         *
         * @returns {ComboItem}
         */
        public get hourCombo():ComboItem {
            if (!this._hourCombo) {
                this._hourCombo = new ComboItem();
                this._hourCombo.valueChanged.add(() => this.setHourSilently(this.hourCombo.value));
                this._hourCombo.button.loadItems.add(() => {
                    var hours: string[] = [];
                    for(var i = 0; i <= 23; i++){
                        hours[i] = this.zeroPad(i);
                    }
                    this._hourCombo.options = hours;
                });
                this._hourCombo.value = 0;
                this._hourCombo.button.dropdownVisible = false;
            }
            return this._hourCombo;
        }

        /**
         * Field for minuteCombo property
         */
        private _minuteCombo:ComboItem;

        /**
         * Gets the minutes combo Item
         *
         * @returns {ComboItem}
         */
        public get minuteCombo():ComboItem {
            if (!this._minuteCombo) {
                this._minuteCombo = new ComboItem();
                this._minuteCombo.valueChanged.add(() => this.setMinuteSilently(this.minuteCombo.value));
                this._minuteCombo.button.loadItems.add(() => {
                    var minutes: string[] = [];
                    for(var i = 0; i <= 59; i++){
                        minutes[i] = this.zeroPad(i);
                    }
                    this._minuteCombo.options = minutes;
                });
                this._minuteCombo.value = 0;
                this._minuteCombo.button.dropdownVisible = false;
            }
            return this._minuteCombo;
        }

        /**
         * Field for secondCombo property
         */
        private _secondCombo: ComboItem;

        /**
         * Gets the seconds combo
         *
         * @returns {ComboItem}
         */
        get secondCombo(): ComboItem {
            if (!this._secondCombo) {
                this._secondCombo = new ComboItem();
                this._secondCombo.valueChanged.add(() => this.setSecondSilently(this.secondCombo.value));
                this._secondCombo.button.loadItems.add(() => {
                    var minutes: string[] = [];
                    for(var i = 0; i <= 59; i++){
                        minutes[i] = this.zeroPad(i);
                    }
                    this._secondCombo.options = minutes;
                });
                this._secondCombo.value = 0;
                this._secondCombo.button.dropdownVisible = false;
            }
            return this._secondCombo;
        }

        //endregion

    }
}