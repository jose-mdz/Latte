/**
 * Created by josemanuel on 2/6/14.
 */
module latte {

    /**
     *
     */
    export class Culture {

        //region Static
        /**
         * Property field
         */
        private static _current:Culture = null;

        /**
         * Gets or sets the current culture of the system
         *
         * @returns {Culture}
         */
        public static get current():Culture {
            if(!Culture._current) {
                Culture._current = Culture.enUs;
            }
            return this._current;
        }

        /**
         * Gets or sets the current culture of the system
         *
         * @param {Culture} value
         */
        public static set current(value:Culture) {
            this._current = value;
        }

        /**
         * Field for esMX property
         */
        private static _esEs:Culture;

        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        public static get esEs():Culture {
            if (!Culture._esEs) {

                var _zeroPad = (n: number): string => { return n <= 9 ? '0' + n.toString() : n.toString() };

                Culture._esEs = new Culture();
                Culture._esEs.currencyDecimals = 2;
                Culture._esEs.numberDecimalsSeparator = ',';
                Culture._esEs.numberThousandsSeparator = '.';
                Culture._esEs.currencySymbol = '$';
                Culture._esEs.shortDateFormat = 'dd/MMM/yyyy';
                Culture._esEs.longDateFormat = 'dddd, d de MMMM de yyyy';
                Culture._esEs.floatValidator = /^[\d.]+([,][\d]+)?$/;
                Culture._esEs.intValidator = /^[\d.]+$/;
                Culture._esEs.onFormatShortDate = (d: DateTime): string => {
                    return sprintf("%s/%s/%s", _zeroPad(d.day), d.monthStringShort, d.year);
                };
                Culture._esEs.onFormatLongDate = (d: DateTime): string => {
                    return sprintf("%s, %s de %s de %s", d.dayOfWeekString, d.day, d.monthString, d.year);
                };
            }
            return Culture._esEs;
        }

        /**
         * Field for esMX property
         */
        private static _esMx:Culture;

        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        public static get esMx():Culture {
            if (!Culture._esMx) {

                var _zeroPad = (n: number): string => { return n <= 9 ? '0' + n.toString() : n.toString() };

                Culture._esMx = new Culture();
                Culture._esMx.currencyDecimals = 2;
                Culture._esMx.numberDecimalsSeparator = '.';
                Culture._esMx.numberThousandsSeparator = ',';
                Culture._esMx.currencySymbol = '$';
                Culture._esMx.shortDateFormat = 'dd/MMM/yyyy';
                Culture._esMx.longDateFormat = 'dddd, d de MMMM de yyyy';
                Culture._esMx.onFormatShortDate = (d: DateTime): string => {
                    return sprintf("%s/%s/%s", _zeroPad(d.day), d.monthStringShort, d.year);
                };
                Culture._esMx.onFormatLongDate = (d: DateTime): string => {
                    return sprintf("%s, %s de %s de %s", d.dayOfWeekString, d.day, d.monthString, d.year);
                };
            }
            return Culture._esMx;
        }

        /**
         * Field for enUs property
         */
        private static _enUs:Culture;

        /**
         * Gets the English-USA Culture
         *
         * @returns {Culture}
         */
        public static get enUs():Culture {
            if (!Culture._enUs) {
                var _zeroPad = (n: number): string => { return n <= 9 ? '0' + n.toString() : n.toString() };
                Culture._enUs = new Culture();
                Culture._enUs.currencyDecimals = 2;
                Culture._enUs.numberDecimalsSeparator = '.';
                Culture._enUs.numberThousandsSeparator = ',';
                Culture._enUs.currencySymbol = '$';
                Culture._enUs.shortDateFormat = 'MMM/dd/yyyy';
                Culture._enUs.longDateFormat = 'dddd, MMMM d yyyy';
                Culture._enUs.onFormatShortDate = (d: DateTime): string => {
                    return sprintf("%s/%s/%s", d.monthStringShort, _zeroPad(d.day), d.year);
                };
                Culture._enUs.onFormatLongDate = (d: DateTime): string => {
                    return sprintf("%s, %s %s %s", d.dayOfWeekString, d.monthString, d.day, d.year);
                };

            }
            return Culture._enUs;
        }

        /**
         * Formats currency using the current culture
         * @param n
         * @returns {string}
         */
        static formatCurrency(n: number): string{
            return Culture.current.onFormatCurrency(n);
        }

        /**
         * Returns the date as a short format
         * @param d
         */
        static formatShortDate(d: DateTime): string{
            return Culture.current.onFormatShortDate(d);
        }

        /**
         * Returns the date as a short format
         * @param d
         */
        static formatLongDate(d: DateTime): string{
            return Culture.current.onFormatLongDate(d);
        }

        /**
         * Formats a number using the current Culture
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        static formatNumber(n: number, decimals: number = 0, symbol: string = ''): string{
            return Culture.current.onFormatNumber(n, decimals, symbol);
        }


        //endregion

        //region Fields

        /**
         * Short date format
         */
        shortDateFormat: string = 'dd/MM/yyyy';

        /**
         * Long date format
         */
        longDateFormat: string = 'dddd, d de MMMM de YYYY';

        /**
         * Amount of decimals to show in currency format
         */
        currencyDecimals: number = 2;

        /**
         * Separator of decimals for currency
         */
        numberDecimalsSeparator: string = '.';

        /**
         * Thousands separator for currency
         */
        numberThousandsSeparator: string = ',';

        /**
         * Symbol to use in currency
         */
        currencySymbol: string = '$';

        /**
         * Regular expression for validating floating point numbers
         * @type {RegExp}
         */
        floatValidator: RegExp = /^[\d,]+([.][\d]+)?$/;

        /**
         * Regular expression for validating integer numbers
         * @type {RegExp}
         */
        intValidator: RegExp = /^[\d,]+$/;

        //endregion

        /**
         *
         */
        constructor() {
        }

        //region Private Methods

        //endregion

        //region Methods
        /**
         * Returns the specified number as a currency
         * @param n
         */
        onFormatCurrency(n: number): string{
            return this.onFormatNumber(n, this.currencyDecimals, this.currencySymbol);
        }

        /**
         * Formats the specified number
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        onFormatNumber(n: number, decimals: number = 0, symbol: string = ''){
            let point: string = this.numberDecimalsSeparator; //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

            //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
            let separator: string = this.numberThousandsSeparator;

            let sign: string = (n < 0) ? '-' : '';

            //extracting the absolute value of the integer part of the number and converting to string
            let round: string = parseInt(Math.abs(n).toFixed(decimals)) + '';
            let length: number = round.length;
            let offset: number = ((length) > 3) ? length % 3 : 0;

            let a = sign;
            let b = symbol;
            let c = (offset ? round.substr(0, offset) + separator : '');
            let d = round.substr(offset).replace(/(\d{3})(?=\d)/g, "$1" + separator);
            //[Hack]
            let e = (decimals ? point + (Math.abs(n) - parseInt(round)).toFixed(decimals).slice(2) : '');

            return a + b + c + d + e;
        }

        /**
         * Returns the date as a long format
         * @param d
         */
        onFormatLongDate(d: DateTime): string{
            return "NotImplemented";
        }

        /**
         * Returns the date as a short format
         * @param d
         */
        onFormatShortDate(d: DateTime): string{
            return "NotImplemented";
        }


        //endregion

        //region Events
        //endregion

        //region Properties

        //endregion

    }

}