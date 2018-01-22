module latte{
    /**
     * Presents an input method for picking a date
     **/
    export class DatePickerItem extends ValueItem<DateTime>{

        //region Fields

        /**
         *
         **/
        private _dateButton: ButtonItem;

        private lastDate: DateTime;

        //endregion

        /**
         *
         **/
        constructor(){
            super();

            this.element.addClass('date-picker');

            this._dateButton = new ButtonItem();
            this._dateButton.dropdownVisible = true;
            this._dateButton.faceVisible = false;
            this._dateButton.glyph = LinearIcon.chevron_down.goSmall();
            this._dateButton.appendTo(this.element);
            this._dateButton.element.css({marginRight: 15});

            //this.element.clear();

            this._dateButton.loadItems.add(( ) => {
                this._dateButton.items.add(this.dateItem);
            });

            this.value = DateTime.today;

            // this.nullable = true;
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
         * Raises the <c>dateVisible</c> event
         */
        onDateVisibleChanged(){
            if(this._dateVisibleChanged){
                this._dateVisibleChanged.raise();
            }

            this.dateButton.visible = this.dateVisible;
        }

        /**
         * Raises the <c>isNull</c> event
         */
        onIsNullChanged(){
            if(this._isNullChanged){
                this._isNullChanged.raise();
            }

            // log(`isNull ${this.isNull}`);

            this.dateButton.enabled = !this.isNull;

            if(this._hourCombo) {
                this.hourCombo.enabled = this.minuteCombo.enabled = !this.isNull;
            }

            if(this.isNull) {
                this.setValue(null, false);
            }else{
                this.setValue(this.lastDate || DateTime.now, false);
            }
        }

        /**
         * Raises the <c>nullable</c> event
         */
        onNullableChanged(){
            if(this._nullableChanged){
                this._nullableChanged.raise();
            }

            this.checkbox.visible = !!this.nullable;
            this._dateButton.enabled = this.nullable ? this.checkbox.value : true;

            this.checkbox.value = this.value && this.value.thisEpoch;
            this._isNull = !this.checkbox.value;
            this.dateButton.enabled = !this._isNull;
        }

        /**
         * Raises the <c>timeVisible</c> event
         */
        onTimeVisibleChanged(){
            if(this._timeVisibleChanged){
                this._timeVisibleChanged.raise();
            }

            if(this.timeVisible) {

                //region Check if controls must be created
                if(!this._hourCombo) {

                    let colon = new UiText(' : ');
                    colon.css({
                        'float': 'left',
                        marginTop: 5,
                        marginLeft: 2,
                        marginRight: 3
                    });

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
         * Override.
         */
        onValueChanged(){
            super.onValueChanged();

            // log(`Changed ${this.value}`);

            if(!this.value) {
                this.dateButton.text = strings.pleaseSelect;

            }else{

                // Remember last date
                this.lastDate = this.value.thisEpoch ? this.value : null;

                this.dateButton.text = this.value.thisEpoch ?
                    sprintf("%s / %s / %s", this.value.day, this.value.monthString, this.value.year) :
                    strings.pleaseSelect;

                // Update time combos
                if(this.timeVisible){
                    this._hourCombo.value = this.value.timeOfDay.hours;
                    this._minuteCombo.value = this.value.minute;

                    this._hourCombo.button.text = this.zeroPad(this.value.timeOfDay.hours);
                    this._minuteCombo.button.text = this.zeroPad(this.value.minute);
                }

                // Set dateItem if this epoch
                if(this.value.thisEpoch) {
                    this.dateItem.selectionStart = this.dateItem.selectionEnd = this.value;
                }

            }

            if(this.nullable) {

                this.checkbox.value = this.value && this.value.thisEpoch;
                // this.checkbox.value = (!!this.value) || (this.value && this.value.thisEpoch);
                // this.checkbox.value = !!this.value;
            }

        }

        //endregion

        //region Events

        /**
         * Back field for event
         */
        private _dateVisibleChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the dateVisible property changes
         *
         * @returns {LatteEvent}
         */
        get dateVisibleChanged(): LatteEvent{
            if(!this._dateVisibleChanged){
                this._dateVisibleChanged = new LatteEvent(this);
            }
            return this._dateVisibleChanged;
        }

        /**
         * Back field for event
         */
        private _isNullChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the isNull property changes
         *
         * @returns {LatteEvent}
         */
        get isNullChanged(): LatteEvent{
            if(!this._isNullChanged){
                this._isNullChanged = new LatteEvent(this);
            }
            return this._isNullChanged;
        }

        /**
         * Back field for event
         */
        private _nullableChanged: LatteEvent;

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
         * Back field for event
         */
        private _timeVisibleChanged: LatteEvent;

        /**
         * Gets an event raised when the value of the timeVisible property changes
         *
         * @returns {LatteEvent}
         */
        get timeVisibleChanged(): LatteEvent{
            if(!this._timeVisibleChanged){
                this._timeVisibleChanged = new LatteEvent(this);
            }
            return this._timeVisibleChanged;
        }

        //endregion

        //region Properties

        /**
         * Property field
         */
        private _dateVisible: boolean = true;

        /**
         * Gets or sets a value indicating if the date part should be visible
         *
         * @returns {boolean}
         */
        get dateVisible(): boolean{
            return this._dateVisible;
        }

        /**
         * Gets or sets a value indicating if the date part should be visible
         *
         * @param {boolean} value
         */
        set dateVisible(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._dateVisible;

            // Set value
            this._dateVisible = value;

            // Trigger changed event
            if(changed){
                this.onDateVisibleChanged();
            }
        }

        /**
         * Gets the date button
         *
         * @returns {ButtonItem}
         */
        get dateButton(): ButtonItem {
            return this._dateButton;
        }

        /**
         * Property field
         */
        private _isNull: boolean = false;

        /**
         * Gets or sets a value indicating if the date is null
         *
         * @returns {boolean}
         */
        get isNull(): boolean{
            return this._isNull;
        }

        /**
         * Gets or sets a value indicating if the date is null
         *
         * @param {boolean} value
         */
        set isNull(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._isNull;

            // Set value
            this._isNull = value;

            // Trigger changed event
            if(changed){
                this.onIsNullChanged();
            }
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

            // Trigger changed event
            if(changed){
                this.onNullableChanged();
            }
        }

        /**
         * Property field
         */
        private _timeVisible: boolean = false;

        /**
         * Gets or sets a value indicating if the time part should be visible
         *
         * @returns {boolean}
         */
        get timeVisible(): boolean{
            return this._timeVisible;
        }

        /**
         * Gets or sets a value indicating if the time part should be visible
         *
         * @param {boolean} value
         */
        set timeVisible(value: boolean){

            // Check if value changed
            let changed: boolean = value !== this._timeVisible;

            // Set value
            this._timeVisible = value;

            // Trigger changed event
            if(changed){
                this.onTimeVisibleChanged();
            }
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
        get dateItem():DateItem {
            if (!this._dateItem) {

                this._dateItem = new DateItem();
                this._dateItem.selectionChanged.add(() => {

                    if(this.timeVisible){
                        this.value = DateTime.fromDateAndTime(this.dateItem.selectionStart, (this.value || DateTime.today).timeOfDay);

                    }else{
                        this.value = this.dateItem.selectionStart;
                    }

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
        get checkbox():CheckboxItem {
            if (!this._checkbox) {
                this._checkbox = new CheckboxItem();
                this._checkbox.valueChanged.add(() => this.isNull = !this._checkbox.value);
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
        get hourCombo():ComboItem {
            if (!this._hourCombo) {
                this._hourCombo = new ComboItem();
                this._hourCombo.button.loadItems.add(() => {
                    let hours: {[number: number]: string} = {};
                    for(let i = 0; i <= 23; i++){
                        hours[i] = this.zeroPad(i);
                    }
                    this._hourCombo.options = hours;
                });
                this._hourCombo.value = 0;
                this._hourCombo.button.dropdownVisible = false;
                this._hourCombo.valueChanged.add(() => {
                    this.value = new DateTime(this.value.year, this.value.month, this.value.day,
                        parseInt(this._hourCombo.value, 10), parseInt(this._minuteCombo.value, 10));
                });
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
        get minuteCombo():ComboItem {
            if (!this._minuteCombo) {
                this._minuteCombo = new ComboItem();
                this._minuteCombo.button.loadItems.add(() => {
                    let minutes: {[number: number]: string} = {};
                    for(let i = 0; i <= 59; i++){
                        minutes[i] = this.zeroPad(i);
                    }
                    this._minuteCombo.options = minutes;
                });
                this._minuteCombo.value = 0;
                this._minuteCombo.button.dropdownVisible = false;
                this._minuteCombo.valueChanged.add(() => {
                    this.value = new DateTime(this.value.year, this.value.month, this.value.day,
                        parseInt(this._hourCombo.value, 10), parseInt(this._minuteCombo.value, 10));
                });
            }
            return this._minuteCombo;
        }

        //endregion
    }
}