module latte{
    /**
     * Represents a time interval.
     **/
    export class TimeSpan{

        _millis: number = 0;

        /**
         * Creates a TimeSpan from the specified amount of days
         **/
        static fromDays(days: number): TimeSpan{

            return new TimeSpan(days);

        }

        /**
         * Creates a TimeSpan from the specified amount of hours
         **/
        static fromHours(hours: number): TimeSpan{

            return new TimeSpan(0, hours);

        }

        /**
         * Creates a TimeSpan from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): TimeSpan{

            var t = new TimeSpan();

            t._millis = milliseconds;

            return t;

        }

        /**
         * Creates a TimeSpan from the specified amount of minutes
         **/
        static fromMinutes(minutes: number): TimeSpan{

            return new TimeSpan(0, 0, minutes);

        }

        /**
         * Creates a TimeSpan from the specified amount of seconds
         **/
        static fromSeconds(seconds: number): TimeSpan{

            return new TimeSpan(0, 0, 0, seconds);

        }

        /**
         * Creates a TimeSpan object from the specified string.
         String should be in the format <c>hh:mm:ss</c>
         **/
        static fromString(timeString: string): TimeSpan{


            var parts = timeString.split(':');
            var hours = parts.length > 0 && _isNumeric(parts[0]) ? parseInt(parts[0], 10) : 0;
            var minutes = parts.length > 1 && _isNumeric(parts[1]) ? parseInt(parts[1], 10) : 0;
            var seconds = parts.length > 2 && _isNumeric(parts[2]) ? parseInt(parts[2], 10) : 0;

            return new TimeSpan(0, hours, minutes, seconds);

        }

        /**
         * Gets a timespan with the time passed since the specified date and time
         * @param d
         */
        static timeSince(d: DateTime): TimeSpan{
            return DateTime.now.subtractDate(d);
        }

        /**
         * Creates the TimeSpan with the specified parameters. Parameters not specified will be asumed to be zero.
         **/
        constructor(days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0){

            this._millis = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

        }

        /**
         * Makes math rounding depending on the sign of the milliseconds
         **/
        private _rounder(number: number){

            if(this._millis < 0)
                return Math.ceil(number);

            return Math.floor(number);

        }

        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n: number): string{

            return n <= 9 ? '0' + n.toString : n.toString();

        }

        /**
         * Returns the result of adding the specified timespan to this timespan
         **/
        add(timespan: TimeSpan): TimeSpan{

            if(!(timespan instanceof TimeSpan))
                throw new InvalidArgumentEx('timespan');

            return TimeSpan.fromMilliseconds(this._millis + timespan._millis);

        }

        /**
         * Returns the result of adding the specified amount of hours to this timespan
         **/
        addHours(hours: number): TimeSpan{

            return this.add(new TimeSpan(0, hours));

        }

        /**
         * Returns the result of adding the specified amount of minutes to this timespan
         **/
        addMinutes(minutes: number): TimeSpan{

            return this.add(new TimeSpan(0, 0, minutes));

        }

        /**
         * Returns the result of adding the specified amount of seconds to this timespan
         **/
        addSeconds(seconds: number): TimeSpan{

            return this.add(new TimeSpan(0, 0, 0, seconds));

        }

        /**
         * Returns the result of comparing this timespan against the provided timespan
         **/
        compareTo(timespan: TimeSpan): number{

            if(!(timespan instanceof TimeSpan))
                throw new InvalidArgumentEx('timespan');

            if(this._millis  > timespan._millis) return 1;
            if(this._millis  == timespan._millis) return 0;
            if(this._millis  < timespan._millis) return -1;

            throw new Ex();

        }

        /**
         * Returns a timespan representing the actual duration of the timespan
         **/
        duration(): TimeSpan{

            return new TimeSpan(Math.abs(this._millis));

        }

        /**
         * Returns a value indicating if this timespan represents the same than the specified timespan
         **/
        equals(timespan: TimeSpan): boolean{

            if(!(timespan instanceof TimeSpan))
                throw new InvalidArgumentEx('timespan');

            return this._millis == timespan._millis;

        }

        /**
         * Negates the timespan duration
         **/
        negate(){

            this._millis *= -1;

        }

        /**
         * Returns the result of subtracting the specified timespan to this timespan
         **/
        subtract(timespan: TimeSpan): TimeSpan{

            if(!(timespan instanceof TimeSpan))
                throw new InvalidArgumentEx('timespan');

            return TimeSpan.fromMilliseconds(this._millis - timespan._millis);

        }

        /**
         * Returns this timespan as a string
         **/
        toString(): string{

            return  (this._millis < 0 ? '-' : '') +
                (this.days ? this.days + ' ' : '') +
                this._zeroPad(this.hours) + ":" +
                this._zeroPad(this.minutes) +
                (this.seconds ? ':' + this._zeroPad(this.seconds) : '') +
                (this.milliseconds ? '.' + Math.abs(this.milliseconds) : '');

        }

        /**
         * Gets the days component of the time interval represented by this object
         **/
        get days(): number{

            return this._rounder(this._millis / 86400000 );

        }

        /**
         * Gets the hours component of the time interval represented by this object
         **/
        get hours(): number{

            return this._rounder( (this._millis % (24 * 3600 * 1000)) / (3600 * 1000));

        }

        /**
         * Gets a value indicating if the total time this timespan represents is zero
         **/
        get isEmpty(): boolean{

            return this._millis == 0;

        }

        /**
         * Gets the milliseconds component of the time interval represented by this object
         **/
        get milliseconds(): number{

            return this._rounder(this._millis % 1000);

        }

        /**
         * Gets the minutes component of the time interval represented by this object
         **/
        get minutes(): number{

            return this._rounder( (this._millis % (3600 * 1000)) / (60 * 1000));

        }

        /**
         * Gets the seconds component of the time interval represented by this object
         **/
        get seconds(): number{

            return this._rounder((this._millis % 60000) / 1000);

        }

        /**
         * Gets the value of this timespan expressed in whole and fractional days
         **/
        get totalDays(): number{

            //                     86400000
            return this._millis / (86400000);

        }

        /**
         * Gets the value of this timespan expressed in whole and fractional hours
         **/
        get totalHours(): number{

            return this._millis / (3600000);

        }

        /**
         * Gets the value of this timespan expressed in milliseconds
         **/
        get totalMilliseconds(): number{

            return this._millis;

        }

        /**
         * Gets the value of this timespan expressed in whole and fractional minutes
         **/
        get totalMinutes(): number{

            return this._millis / (60 * 1000);

        }

        /**
         * Gets the value of this timespan expressed in whole and fractional seconds
         **/
        get totalSeconds(): number{

            return this._millis / 1000;

        }
    }
}