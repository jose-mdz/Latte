module latte{
    /**
     * Allows user to pick a time
     **/
    export class TimePickerItem extends DatePickerItem{


        /**
         *
         **/
            constructor(){

            super();
            this.element.addClass('time-picker');

            this.dateVisible = false;
            this.timeVisible = true;

        }

        /**
         * Gets or sets the value of the item
         **/
        getValue(): TimeSpan{
            return this.date.timeOfDay;
        }

        setValue(value: TimeSpan){
            //var timeVal = TimeSpan.fromString(value);

            super.setValue(new DateTime(1, 1, 1, value.hours, value.minutes, value.seconds));
        }

    }
}