module latte{
    /**
     * Presents an input method for picking a date
     **/
    export class DatePickerItem extends ValueItem{

        //region Fields
        /**
         *
         **/
        private _date: DateTime;

        /**
         *
         **/
        private _dateButton: ButtonItem;

        /**
         *
         **/
        private _dateVisible: boolean = true;

        /**
         *
         **/
        private _timeVisible: boolean = false;
        //endregion

        /**
         *
         **/
        constructor(){
            super();

            this.element.addClass('date-picker');

            this._dateButton = new ButtonItem();
            this._dateButton.dropdownVisible = true;
            this._dateButton.glyph = Glyph.down;
            this._dateButton.appendTo(this.element);
            this._dateButton.element.css({marginRight: 15});

            //this.element.clear();

            this._dateButton.loadItems.add(( ) => {
                this._dateButton.items.add(this.dateItem);
            });

            this.date = DateTime.today;

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

        /**
         *
         **/
        _updateTimeComponent(){
            //this.onValueChanged();
        }
        //endregion

        //region Components

        /**
         * Field for dateItem property
         */
        private _dateItem:DateItem;

        /**
         * Gets the date item
         *
         * @returns {DateItem}
         */
        public get dateItem():DateItem {
            if (!this._dateItem) {

                this._dateItem = new DateItem();
                this._dateItem.selectionChanged.add(() => {

                    var d = this.dateItem.selectionStart;

                    if(this.timeVisible){
                        this.date = DateTime.fromDateAndTime(d, this.date.timeOfDay);

                    }else{
                        this.date = this.dateItem.selectionStart;
                    }

                    this.onValueChanged();

                });
            }
            return this._dateItem;
        }

        /**
         * Field for checkbox property
         */
        private _checkbox:CheckboxItem;

        /**
         * Gets the checkbox of item
         *
         * @returns {CheckboxItem}
         */
        public get checkbox():CheckboxItem {
            if (!this._checkbox) {
                this._checkbox = new CheckboxItem();
                this._checkbox.valueChanged.add(() => {
                    this._dateButton.enabled = !!this._checkbox.value;
                });
                this.element.prepend(this.checkbox.element);
            }
            return this._checkbox;
        }

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
                this._hourCombo.valueChanged.add(() => { this.onValueChanged() });
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
                this._minuteCombo.valueChanged.add(() => { this.onValueChanged() });
                this._minuteCombo.button.loadItems.add(() => {
                    var minutes: string[] = [];
                    for(var i = 0; i <= 59; i++){
                        minutes[i] = this.zeroPad(i);
                    }
                    this._minuteCombo.options = minutes;
                })
                this._minuteCombo.value = 0;
                this._minuteCombo.button.dropdownVisible = false;
            }
            return this._minuteCombo;
        }

        //endregion

        //region Properties

        /**
         * Gets or sets the date of the picker
         **/
        get date(): DateTime{

            if(this.timeVisible)
                return latte.DateTime.fromDateAndTime(this._date, new latte.TimeSpan(0, this._hourCombo.value, this._minuteCombo.value))
            else
                return this._date;
        }

        /**
         * Gets or sets the date of the picker
         **/
        set date(value: DateTime){

            if(!(value instanceof latte.DateTime))
                throw new latte.InvalidArgumentEx('value');

            if(isNaN(value._span.millis))
                throw new latte.InvalidArgumentEx('value');

            this._date = value;
            this._dateButton.text = sprintf("%s / %s / %s", value.day, value.monthString, value.year);

            if(this.timeVisible){
                this._hourCombo.value = value.timeOfDay.hours;
                this._minuteCombo.value = value.minute;

                this._hourCombo.button.text = this.zeroPad(value.timeOfDay.hours);
                this._minuteCombo.button.text = this.zeroPad(value.minute);
            }
        }

        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        get dateVisible(): boolean{
            return this._dateVisible;
        }

        /**
         * Gets or sets a value indicating if the date part of picker should be visible
         **/
        set dateVisible(value: boolean){


            if(!_isBoolean(value))
                throw new InvalidArgumentEx();

            this._dateVisible = value;
            this._dateButton.visible = value;

        }

        /**
         * Property field
         */
        private _nullable: boolean = false;
        
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @returns {boolean}
         */
        public get nullable(): boolean{
            return this._nullable;
        }
        
        /**
         * Gets or sets a value indicating if the date may be null
         *
         * @param {boolean} value
         */
        public set nullable(value: boolean){
        
            // Check if value changed
            var changed: boolean = value !== this._nullable;
            
            // Set value
            this._nullable = value;

            if(value) {
                this.checkbox.visible = true;
                this._dateButton.enabled = this.checkbox.value;
            }else {
                this.checkbox.visible = false;
                this._dateButton.enabled = true;
            }
            
            // Trigger changed event
            if(changed){
                this.onNullableChanged();
            }
        }
        
        /**
         * Back field for event
         */
         private _nullableChanged: LatteEvent
        
        /**
         * Gets an event raised when the value of the nullable property changes
         *
         * @returns {LatteEvent}
         */
        public get nullableChanged(): LatteEvent{
            if(!this._nullableChanged){
                this._nullableChanged = new LatteEvent(this);
            }
            return this._nullableChanged;
        }
        
        /**
         * Raises the <c>nullable</c> event
         */
        public onNullableChanged(){
            if(this._nullableChanged){
                this._nullableChanged.raise();
            }
        }

        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        get timeVisible(): boolean{
            return this._timeVisible;
        }

        /**
         * Gets or sets a value indicating if the time part of picker should be visible
         **/
        set timeVisible(value: boolean){

            if(!_isBoolean(value))
                throw new InvalidArgumentEx();

            this._timeVisible = value;

            if(value) {

                //region Check if controls must be created
                if(!this._hourCombo) {

                    var colon = new UiText(' : ');
                    colon.css({
                        'float': 'left',
                        marginTop: 5,
                        marginLeft: 2,
                        marginRight: 3
                    })

                    this.element.append(this.hourCombo.element);
                    this.element.append(colon.element);
                    this.element.append(this.minuteCombo.element);
                }
                //endregion

                this.hourCombo.visible = this.minuteCombo.visible = true;

            }else if(this._hourCombo) {
                this.hourCombo.visible = this.minuteCombo.visible = false;
            }

        }

        /**
         * Gets or sets the date of the picker, as a string
         **/
        get value(): any{
            if(this._checkbox){
                if(!this.checkbox.value) {
                    return '';
                }
            }

            return this.date.toString();
        }

        /**
         * Gets or sets the date of the picker, as a string
         **/
        set value(value: any){

            if(value instanceof DateTime){
                this.date = value;
            }
            else if(_isString(value)){
                this.date = (value.length === 0 ? DateTime.now :  DateTime.fromString(value));
            }
            else if(value === null){
                this.date = DateTime.now;
            }
            else{
                throw new InvalidArgumentEx('value', value);
            }

        }
        //endregion
    }
}