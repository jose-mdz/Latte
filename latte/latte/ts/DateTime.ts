module latte{
    /**
     * Represents a specific date and time
     **/
    export class DateTime{

        //region Static
        
        /**
         * Amount of days in months of a non-leap year
         **/
        static monthDays: Array<number> = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /**
         * Amount of days in months of leap year
         **/
        static monthDaysLeapYear: Array<number> = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /**
         * Returns the absolute number of days on the specified day-month-year
         **/
        static absoluteDays(year: number, month: number, day: number): number{


            let div = function(a, b) { return Math.floor(a / b); };
            let arr = DateTime.isLeapYear(year) ?
                [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] :
                [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            let num = year - 1;
            let num2 = ((((((num * 365) + div(num, 4)) - div(num, 100)) + div(num,400)) + arr[month - 1]) + day) - 1;
            return num2;

        }

        /**
         * Returns the amount of days in the specified month of the specified year
         **/
        static daysInMonth(year: number, month: number): number{

            if(DateTime.isLeapYear(year)){
                return DateTime.monthDaysLeapYear[month];
            }else{
                return DateTime.monthDays[month];
            }

        }

        /**
         * Returns a DateTime object from the specifed date and time components
         **/
        static fromDateAndTime(date: DateTime, time: TimeSpan): DateTime{


            if(!(date instanceof DateTime))
                throw new InvalidArgumentEx('date');

            if(!(time instanceof TimeSpan))
                throw new InvalidArgumentEx('time');

            return new DateTime(date.year, date.month, date.day,
                time.hours, time.minutes, time.seconds, time.milliseconds);

        }

        /**
         * Returns a DateTime object from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): DateTime{

            let d = new DateTime();
            d._span = TimeSpan.fromMilliseconds(milliseconds);
            return d;

        }

        /**
         * Creates a DateTime object from the specified string.
         String should be in the format <c>yyyy-mm-dd hh:mm:ss</c>
         **/
        static fromString(dateTimeString: string): DateTime{


            if(!_isString(dateTimeString))
                throw new InvalidArgumentEx('dateTimeString', dateTimeString);

            if(dateTimeString.length === 0)
                return new DateTime();

            let year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0;
            let parts = dateTimeString.split(' ');
            let dateParts = parts.length > 0 ? parts[0].split('-') : [];
            let timeParts = parts.length > 1 ? parts[1].split(':') : [];

            if(dateParts.length === 3){
                year = parseInt(dateParts[0], 10);
                month = parseInt(dateParts[1], 10);
                day = parseInt(dateParts[2], 10);
            }

            if(timeParts.length === 3){
                hour = parseInt(timeParts[0], 10);
                minute = parseInt(timeParts[1], 10);
                second = parseInt(timeParts[2], 10);
            }

            if(year <= 0) year = 1;
            if(month <= 0) month = 1;
            if(day <= 0) day = 1;

            return new DateTime(year, month, day, hour, minute, second);

        }

        /**
         * Returns a value indicating if the specified year is leap year
         **/
        static isLeapYear(year: number): boolean{

            if (( (year % 4 == 0) && (year % 100 != 0) ) || (year % 400 == 0)){
                return true;
            }

            return false;

        }

        /**
         * Gets a DateTime representing the current millisecond
         **/
        static get now(): DateTime{

            let d = new Date();
            return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());

        }

        /**
         * Gets a DateTime representing the current day without time component
         **/
        static get today(): DateTime{

            let d = new Date();
            return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate());

        }

        /**
         * Gets a DateTime representing the day of tomorrow without time component
         **/
        static get tomorrow(): DateTime{

            let d = new Date();
            return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(1);

        }

        /**
         * Gets the unix epoch
         * @returns {latte.DateTime}
         */
        static get epoch(): DateTime{
            return new DateTime(1970, 1, 1);
        }

        /**
         * Gets a DateTime representing the day of yesterday without time component
         **/
        static get yesterday(): DateTime{

            let d = new Date();
            return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(-1);

        }
        //endregion

        //region Fields
        _span: TimeSpan;
        //endregion

        /**
         * Creates the DateTime object
         **/
        constructor(year: number = 1, month: number = 1, day: number = 1, hour: number = 0, minute: number = null, second: number = null, millisecond: number = null){

            // Calculate days
            let days = DateTime.absoluteDays(year, month, day);

            // Calculate TimeSpan
            this._span = new TimeSpan(days, hour, minute, second, millisecond);

        }

        //region Private Methods
        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n: number): string{

            return n <= 9 ? '0' + n.toString() : n.toString();

        }

        /**
         * Returns the specified element of date.
         Possible values for <c>what</c> are: <c>year</c> | <c>month</c> | <c>dayyear</c> | <c>day</c>
         **/
        private fromTimeSpan(what: string): number{


            let div = function(a, b){ return Math.floor(a/b); };
            let num2: number = this._span.days;
            let num3: number = div(num2, 146097);

            num2 -= num3 * 146097;

            let num4 = div(num2, 36524);

            if(num4 == 4){
                num4 = 3;
            }

            num2 -= num4 * 36524;

            let num5 = div(num2, 1461);

            num2 -= num5 * 1461;

            let num6 = div(num2, 365);

            if(num6 == 4){
                num6 = 3;
            }

            if(what=="year"){
                return (((((num3 * 400) + (num4 * 100)) + (num5 * 4)) + num6) + 1);
            }

            num2 -= num6 *365;

            if(what=="dayyear"){
                return (num2 + 1);
            }

            let arr = ((num6 == 3) && ((num5 != 24) || (num4 ==3))) ?
                [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] :
                [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

            let index = num2 >> 6;

            while(num2 >= arr[index]){
                index++;
            }

            if(what=="month"){
                return index;
            }

            return ((num2 - arr[index -1]) + 1);


        }
        //endregion

        //region Methods
        
        /**
         * Returns the result of adding the specified timespan to this date
         **/
        add(timespan: TimeSpan): DateTime{

            return DateTime.fromMilliseconds(this._span.millis + timespan.millis);

        }

        /**
         * Returns the result of adding the specified amount of days to this date
         **/
        addDays(days: number): DateTime{

            return DateTime.fromMilliseconds(this._span.millis + days * 86400000);

        }

        /**
         * Returns the result of adding the specified amount of hours to this date
         **/
        addHours(hours: number): DateTime{

            return DateTime.fromMilliseconds(this._span.millis + hours * 3600000);

        }

        /**
         * Returns the result of adding the specified amount of milliseconds to this date
         **/
        addMilliseconds(milliseconds: number): DateTime{

            return DateTime.fromMilliseconds(this._span.millis + milliseconds);

        }

        /**
         * Returns the result of adding the specified amount of minutes to this date
         **/
        addMinutes(minutes: number): DateTime{

            return DateTime.fromMilliseconds(this._span.millis + minutes * 60000);

        }

        /**
         * Returns the result of adding the specified amount of months to this date
         **/
        addMonths(months: number): DateTime{


            let year = this.year;
            let month = this.month;
            let day = this.day;
            let newMonth = month - 1 + months;

            if(newMonth < 0){
                month = 12 + (newMonth + 1) % 12;
                year += Math.ceil((newMonth - 11) / 12);
            }else{
                month = newMonth % 12 + 1;
                year += Math.floor(newMonth / 12);
            }

            if(year < 1 || year > 9999){
                throw new InvalidArgumentEx('months');
            }else{

                let daysInMonth = DateTime.daysInMonth(year, month);

                if(day > daysInMonth) day = daysInMonth;

                return new DateTime(year, month, day);
            }

        }

        /**
         * Returns the result of adding the specified amount of seconds to this date
         **/
        addSeconds(seconds: number): DateTime{

            return new DateTime(this._span.millis + seconds * 1000);

        }

        /**
         * Returns the result of adding the specified amount of years to this date
         **/
        addYears(years: number): DateTime{

            return this.addMonths(years * 12);

        }

        /**
         * Returns the result of comparing this datetime to the specified datetime
         **/
        compareTo(datetime: DateTime): number{

            return this._span.compareTo(datetime._span);

        }

        /**
         * Gets a value indicating if the specified datetime is equals to this datetime
         **/
        equals(datetime: DateTime): boolean{

            return this._span.equals(datetime._span);

        }

        /**
         * Returns a value indicating if the date is contained in the range specified by the arguments
         **/
        onRange(start: DateTime, end: DateTime): boolean{

            return this.compareTo(start) >= 0 && this.compareTo(end) <= 0;

        }

        /**
         * Returns the result of subtracting the specified datetime to this datetime
         **/
        subtractDate(datetime: DateTime): TimeSpan{

            if(!(datetime instanceof DateTime)) throw new InvalidArgumentEx('datetime');
            return TimeSpan.fromMilliseconds(this._span.millis - datetime._span.millis);

        }

        /**
         * Returns the result of subtracting the specified timespan to this datetime
         **/
        subtractTime(timespan: TimeSpan): DateTime{

            if(!(timespan instanceof TimeSpan)) throw new InvalidArgumentEx('timespan');
            return DateTime.fromMilliseconds(this._span.millis - timespan.millis);

        }

        /**
         * Returns a relative representatio of the date, like "Yesterday 10:00AM"
         **/
        toRelativeString(withTime: boolean = false){


            let now = DateTime.now;
            let today = DateTime.today;
            let yesterday = DateTime.yesterday;
            let tomorrow = DateTime.tomorrow;
            let timePart = this._zeroPad(this.hour) + ':' + this._zeroPad(this.minute);
            let datePart = "";
            let d = this.date;
            let t = this.timeOfDay;
            let diff;

            if(this.date.equals(today)) {
                diff = now.timeOfDay.subtract(t);

                let hours = Math.ceil(diff.totalHours);
                let minutes = Math.ceil(diff.totalMinutes);

                if (diff.totalSeconds < 60) {
                    return strings.justNow;

                } else if (diff.totalMinutes == 1) {
                    return strings.oneMinuteAgo;

                } else if (minutes < 60) {
                    return sprintf(strings.SMinutesAgo, minutes);

                } else if (hours == 1) {
                    return strings.oneHourAgo;

                } else {
                    return sprintf(strings.SHoursAgo, hours);
                }
            }else if (d.equals(tomorrow)){
                datePart = strings.tomorrow;

            }else if(d.equals(yesterday)){
                datePart = strings.yesterday;

            }else if(this.compareTo(today) < 0) {
                timePart = '';
                diff = today.subtractDate(this);

                let days = Math.ceil(diff.totalDays);
                let weeks = Math.ceil(days / 7);
                let years = Math.ceil(weeks / 51);

                if (days < 7) {
                    datePart = sprintf(strings.SDaysAgo, days);

                } else if (weeks == 1) {
                    datePart = strings.oneWeekAgo;

                } else if (weeks < 51) {
                    datePart = sprintf(strings.SWeeksAgo, weeks);

                } else if (years == 1) {
                    datePart = strings.oneYearAgo;

                } else {
                    datePart = sprintf(strings.SYearsAgo, years);
                }
            }else if(this.compareTo(today) > 0){
                timePart = '';
                diff = today.subtractDate(this);

                let weekd = this.dayOfWeekString;
                let days = Math.abs(Math.ceil(diff.totalDays));
                let weeks = Math.ceil(days / 7);
                let years = Math.ceil(weeks / 51);

                if(days < 8) {
                    datePart = sprintf(strings.nextWeekDayS, weekd);

                }else if (weeks < 51) {
                    datePart = sprintf(strings.SWeeksFromNow, weeks);

                }else if (years == 1){
                    datePart = strings.oneYearFromNow;

                }else{
                    datePart = sprintf(strings.SYearsFromNow, years);
                }

            }else{
                return this.toString();
            }

            if((this.minute == 0 && this.hour == 0) || withTime === false) {
                timePart = '';
            }

            return timePart ? datePart + ' ' + timePart : datePart;


        }

        /**
         * Returns a formatted string
         **/
        toFormattedString(format: string = null): string{
            return Culture.formatShortDate(this);
        }

        /**
         * Gets the DateTime as a string
         **/
        toString(includeTime = true): string{


            if(isNaN(this.year)) return '';

            let t = this.timeOfDay;
            let r = this.year + '-' + this._zeroPad(this.month) + '-' + this._zeroPad(this.day);

            if(includeTime){
                r += ' ' + this._zeroPad(t.hours) + ":" + this._zeroPad(t.minutes) + ':'
                    + this._zeroPad(t.seconds);
            }

            return r;

        }

        /**
         * Gets a value of the object
         * @returns {number}
         */
        valueOf(): number{
            if(!this.thisEpoch) {
                return 0;
            }else {
                return this._span.millis;
            }
        }
        //endregion

        //region Properties
        
        /**
         * Gets the day of this datetime
         **/
        get day(): number{

            return this.fromTimeSpan("day");

        }

        /**
         * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
         **/
        get dayOfWeek(): number{

            return (this._span.days + 1) % 7;

        }

        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekString(): string{
            let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek]];
        }

        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekStringShort(): string{
            let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek] + 'Short'];
        }

        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        get dayOfWeekStringInitial(): string{
            let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return strings[days[this.dayOfWeek] + 'Initial'];
        }

        /**
         * Gets the day of year datetime
         **/
        get dayOfYear(): number{

            return this.fromTimeSpan("dayyear");

        }

        /**
         * Gets the comparer value of the date
         *
         * @returns {number}
         */
        get comparer():number {
            return this._span.totalMilliseconds;
        }

        /**
         * Returns just the date component of this datetime
         **/
        get date(): DateTime{

            return new DateTime(this.year, this.month, this.day);

        }

        /**
         * Gets the hour of the datetime
         **/
        get hour(): number{

            return this._span.hours;

        }

        /**
         * Gets the millisecond of the date
         **/
        get millisecond(): number{

            return this._span.milliseconds;

        }

        /**
         * Gets the minute of the time
         **/
        get minute(): number{

            return this._span.minutes;

        }

        /**
         * Gets the month of the date
         **/
        get month(): number{

            return this.fromTimeSpan("month");

        }

        /**
         * Gets the name of the month of the date
         **/
        get monthString(): string{

            return strings["january february march april may june july august september october november december".split(" ")[this.month - 1]];

        }

        /**
         * Gets the name of the month of the date
         **/
        get monthStringShort(): string{

            return strings["january february march april may june july august september october november december".split(" ")[(this.month - 1)] + 'Short'];

        }

        /**
         * Gets the name of the month of the date
         **/
        get monthStringInitial(): string{

            return strings["january february march april may june july august september october november december".split(" ")[(this.month - 1)] + 'Initial'];

        }

        /**
         * Gets the second of the date
         **/
        get second(): number{

            return this._span.seconds;

        }

        /**
         * Gets the time component of this datetime
         **/
        get timeOfDay(): TimeSpan{

            return TimeSpan.fromMilliseconds(this._span.millis % 86400000);

        }

        /**
         * Gets a value indicating if the date is after the unix epoch
         *
         * @returns {boolean}
         */
        get thisEpoch(): boolean {
            return this.compareTo(new DateTime(2, 1, 1)) > 0;
        }

        /**
         * Gets the week number of date. First week of year is 1
         **/
        get weekOfYear(): number{


            let oneJan = new DateTime(this.year, 1, 1);

            return Math.ceil((this.dayOfYear + oneJan.dayOfWeek) / 7);

        }

        /**
         * Gets the year of the date
         **/
        get year(): number{

            return this.fromTimeSpan("year");

        }
        //endregion
    }
}