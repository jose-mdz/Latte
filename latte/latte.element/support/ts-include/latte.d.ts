/// <reference path="datalatte.d.ts" />
/// <reference path="latte.strings.d.ts" />
declare module latte {
    /**
     * Enumeration of Keyboard key codes
     */
    enum Key {
        /**
         * Backspace key
         *
         * @type {number}
         */
        BACKSPACE = 8,
        /**
         * Tab key
         *
         * @type {number}
         */
        TAB = 9,
        /**
         * Enter key
         *
         * @type {number}
         */
        ENTER = 13,
        /**
         * Shift key
         *
         * @type {number}
         */
        SHIFT = 16,
        /**
         * Control key
         *
         * @type {number}
         */
        CONTROL = 17,
        /**
         * Alt key
         *
         * @type {number}
         */
        ALT = 18,
        /**
         * Backspace key
         *
         * @type {number}
         */
        PAUSE = 19,
        /**
         * Caps Lock key
         *
         * @type {number}
         */
        CAPS_LOCK = 20,
        /**
         * Escape key
         *
         * @type {number}
         */
        ESCAPE = 27,
        /**
         * Page up key
         *
         * @type {number}
         */
        PAGE_UP = 33,
        /**
         * Page down key
         *
         * @type {number}
         */
        PAGE_DOWN = 34,
        /**
         * End key
         *
         * @type {number}
         */
        END = 35,
        /**
         * Home key
         *
         * @type {number}
         */
        HOME = 36,
        /**
         * Left arrow key
         *
         * @type {number}
         */
        ARROW_LEFT = 37,
        /**
         * Up arrow key
         *
         * @type {number}
         */
        ARROW_UP = 38,
        /**
         * Right arrow key
         *
         * @type {number}
         */
        ARROW_RIGHT = 39,
        /**
         * Down arrow key
         *
         * @type {number}
         */
        ARROW_DOWN = 40,
        /**
         * Insert key
         *
         * @type {number}
         */
        INSERT = 45,
        /**
         * Delete key
         *
         * @type {number}
         */
        DELETE = 46,
        /**
         * Zero key
         *
         * @type {number}
         */
        NUMBER_0 = 48,
        /**
         * One key
         *
         * @type {number}
         */
        NUMBER_1 = 49,
        /**
         * Two key
         *
         * @type {number}
         */
        NUMBER_2 = 50,
        /**
         * Three key
         *
         * @type {number}
         */
        NUMBER_3 = 51,
        /**
         * Four key
         *
         * @type {number}
         */
        NUMBER_4 = 52,
        /**
         * Five key
         *
         * @type {number}
         */
        NUMBER_5 = 53,
        /**
         * Siz key
         *
         * @type {number}
         */
        NUMBER_6 = 54,
        /**
         * Seven key
         *
         * @type {number}
         */
        NUMBER_7 = 55,
        /**
         * Eight key
         *
         * @type {number}
         */
        NUMBER_8 = 56,
        /**
         * Nine key
         *
         * @type {number}
         */
        NUMBER_9 = 57,
        /**
         * A key
         *
         * @type {number}
         */
        A = 65,
        /**
         * B key
         *
         * @type {number}
         */
        B = 66,
        /**
         * C key
         *
         * @type {number}
         */
        C = 67,
        /**
         * D key
         *
         * @type {number}
         */
        D = 68,
        /**
         * E key
         *
         * @type {number}
         */
        E = 69,
        /**
         * F key
         *
         * @type {number}
         */
        F = 70,
        /**
         * G key
         *
         * @type {number}
         */
        G = 71,
        /**
         * H key
         *
         * @type {number}
         */
        H = 72,
        /**
         * I key
         *
         * @type {number}
         */
        I = 73,
        /**
         * J key
         *
         * @type {number}
         */
        J = 74,
        /**
         * K key
         *
         * @type {number}
         */
        K = 75,
        /**
         * L key
         *
         * @type {number}
         */
        L = 76,
        /**
         * M key
         *
         * @type {number}
         */
        M = 77,
        /**
         * N key
         *
         * @type {number}
         */
        N = 78,
        /**
         * O key
         *
         * @type {number}
         */
        O = 79,
        /**
         * P key
         *
         * @type {number}
         */
        P = 80,
        /**
         * Q key
         *
         * @type {number}
         */
        Q = 81,
        /**
         * R key
         *
         * @type {number}
         */
        R = 82,
        /**
         * S key
         *
         * @type {number}
         */
        S = 83,
        /**
         * T key
         *
         * @type {number}
         */
        T = 84,
        /**
         * U key
         *
         * @type {number}
         */
        U = 85,
        /**
         * V key
         *
         * @type {number}
         */
        V = 86,
        /**
         * W key
         *
         * @type {number}
         */
        W = 87,
        /**
         * X key
         *
         * @type {number}
         */
        X = 88,
        /**
         * Y key
         *
         * @type {number}
         */
        Y = 89,
        /**
         * Z key
         *
         * @type {number}
         */
        Z = 90,
        /**
         * Left window key
         *
         * @type {number}
         */
        LEFT_WINDOW = 91,
        /**
         * Right window key
         *
         * @type {number}
         */
        RIGHT_WINDOW = 92,
        /**
         * Select key
         *
         * @type {number}
         */
        SELECT = 93,
        /**
         * Numpad Zero key
         *
         * @type {number}
         */
        NUMPAD_0 = 96,
        /**
         * Numpad One key
         *
         * @type {number}
         */
        NUMPAD_1 = 97,
        /**
         * Numpad two key
         *
         * @type {number}
         */
        NUMPAD_2 = 98,
        /**
         * Numpad 3 key
         *
         * @type {number}
         */
        NUMPAD_3 = 99,
        /**
         * Numpad 4 key
         *
         * @type {number}
         */
        NUMPAD_4 = 100,
        /**
         * Numpad 5 key
         *
         * @type {number}
         */
        NUMPAD_5 = 101,
        /**
         * Numpad 6 key
         *
         * @type {number}
         */
        NUMPAD_6 = 102,
        /**
         * Numpad 7 key
         *
         * @type {number}
         */
        NUMPAD_7 = 103,
        /**
         * Numpad 8 key
         *
         * @type {number}
         */
        NUMPAD_8 = 104,
        /**
         * Numpad 9 key
         *
         * @type {number}
         */
        NUMPAD_9 = 105,
        /**
         * Numpad * key
         *
         * @type {number}
         */
        NUMPAD_MULTIPLY = 106,
        /**
         * Numpad + key
         *
         * @type {number}
         */
        NUMPAD_ADD = 107,
        /**
         * Numpad - key
         *
         * @type {number}
         */
        NUMPAD_SUBTRACT = 109,
        /**
         * Numpad . key
         *
         * @type {number}
         */
        NUMPAD_DECIMAL_POINT = 110,
        /**
         * Numpad / key
         *
         * @type {number}
         */
        NUMPAD_DIVIDE = 111,
        /**
         * F1 key
         *
         * @type {number}
         */
        F1 = 112,
        /**
         * F2 key
         *
         * @type {number}
         */
        F2 = 113,
        /**
         * F3 key
         *
         * @type {number}
         */
        F3 = 114,
        /**
         * F4 key
         *
         * @type {number}
         */
        F4 = 115,
        /**
         * F5 key
         *
         * @type {number}
         */
        F5 = 116,
        /**
         * F6 key
         *
         * @type {number}
         */
        F6 = 117,
        /**
         * F7 key
         *
         * @type {number}
         */
        F7 = 118,
        /**
         * F8 key
         *
         * @type {number}
         */
        F8 = 119,
        /**
         * F9 key
         *
         * @type {number}
         */
        F9 = 120,
        /**
         * F10 key
         *
         * @type {number}
         */
        F10 = 121,
        /**
         * F11 key
         *
         * @type {number}
         */
        F11 = 122,
        /**
         * F12 key
         *
         * @type {number}
         */
        F12 = 123,
        /**
         * Num lock key
         *
         * @type {number}
         */
        NUM_LOCK = 144,
        /**
         * Scroll lock key
         *
         * @type {number}
         */
        SCROLL_LOCK = 145,
        /**
         * , key
         *
         * @type {number}
         */
        SEMI_COLON = 186,
        /**
         *  = key
         *
         * @type {number}
         */
        EQUAL_SIGN = 187,
        /**
         * , key
         *
         * @type {number}
         */
        COMMA = 188,
        /**
         * - key
         *
         * @type {number}
         */
        DASH = 189,
        /**
         * . key
         *
         * @type {number}
         */
        PERIOD = 190,
        /**
         * / key
         *
         * @type {number}
         */
        FORWARD_SLASH = 191,
        /**
         * Grave acccent key
         *
         * @type {number}
         */
        GRAVE_ACCENT = 192,
        /**
         * [ key
         *
         * @type {number}
         */
        OPEN_BRACKET = 219,
        /**
         * \ key
         *
         * @type {number}
         */
        BACK_SLASH = 220,
        /**
         * ] key
         *
         * @type {number}
         */
        CLOSE_BRACKET = 221,
        /**
         * ' key
         *
         * @type {number}
         */
        SINGLE_QUOTE = 222,
        /**
         * Space bar key
         * @type {number}
         */
        SPACEBAR = 32,
    }
}
/**
 * Created by josemanuel on 12/12/13.
 */
declare module latte {
    enum TriBool {
        UNKNOWN = 0,
        TRUE = 1,
        FALSE = 2,
    }
}
declare module latte {
    /**
     * Enumerates week days
     */
    enum WeekDay {
        /**
         * Sunday
         *
         * @type {number}
         */
        SUNDAY = 0,
        /**
         * Monday
         *
         * @type {number}
         */
        MONDAY = 1,
        /**
         * Tuesday
         *
         * @type {number}
         */
        TUESDAY = 2,
        /**
         * Wednesday
         *
         * @type {number}
         */
        WEDNESDAY = 3,
        /**
         * Thursday
         *
         * @type {number}
         */
        THURSDAY = 4,
        /**
         * Friday
         *
         * @type {number}
         */
        FRIDAY = 5,
        /**
         * Saturday
         *
         * @type {number}
         */
        SATURDAY = 6,
    }
}
declare module latte {
    /**
     * Holds a list of already included plugins
     *
     * @type {Array<string>}
     */
    var includedPlugins: Object;
    /**
     * Tells if the passed objects are equal in its properties
     *
     * @param {object} a
     * @param {object} b
     */
    function _equalObjects(a: any, b: any): boolean;
    /**
     * Returns a value indicating if the parameter is a number
     *
     * @returns {boolean}
     */
    function _isNumber(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a boolean
     *
     * @returns {boolean}
     */
    function _isBoolean(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a string
     *
     * @returns {boolean}
     */
    function _isString(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is an Array
     *
     * @returns {boolean}
     */
    function _isArray(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is a Function
     *
     * @returns {boolean}
     */
    function _isFunction(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is an Object
     *
     * @returns {boolean}
     */
    function _isObject(param: any): boolean;
    /**
     * Returns a value indicating if the parameter as string represents a numeric value
     *
     * @returns {boolean}
     */
    function _isNumeric(param: any): boolean;
    /**
     * Returns a value indicating if the parameter is undefined
     *
     * @returns {boolean}
     */
    function _undef(param: any): boolean;
    /**
     * Logs the specified data if there's a console.
     */
    function log(...any: any[]): void;
    /**
     * Merges the two objects
     * @param a
     * @param b
     * @private
     */
    function _merge(a: any, b: any): any;
    /**
     * sprintf for only %s strings
     */
    function sprintf(...any: any[]): string;
    /**
     * Warns user about deprecated code.
     *
     * @param code
     * @param alternateUse
     */
    function warnDeprecated(code: string, alternateUse: string): void;
}
declare module latte {
    /**
     * Generic Exception class
     *
     * Usage
     * <example>
     *  if(somethingWrong){
     *      // Throw a simple exception
     *      throw new Ex()
     *  }
     * </example>
     */
    class Ex {
        private description;
        /**
         * Creates the exception object
         *
         * @param description
         */
        constructor(description?: string);
        /**
         * Returns the exception as a string.
         *
         * @returns {string}
         */
        toString(): string;
    }
}
/**
 * Created by josemanuel on 5/4/15.
 */
declare module latte {
    /**
     *
     */
    class Ajax {
        /**
         * Loads an URL
         * @param url
         * @param success
         * @param error
         */
        static get(url: string, success?: (string) => void, error?: (string) => void): void;
        /**
         * Loads an URL
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        static post(url: string, data: any, success?: (string) => void, error?: (string) => void): void;
    }
}
declare module latte {
    /**
     *
     */
    class Collection<T> {
        private pointer;
        /**
         *
         */
        constructor(addCallback?: (T, number) => void, removeCallback?: (T, number) => any, context?: any);
        /**
         * Adds an element to the collection
         *
         * @param element
         * @param raiseEvent
         */
        add(element: T, raiseEvent?: boolean): void;
        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        addArray(elements: Array<T>, raiseEvent?: boolean): void;
        /**
         * Adds a collection of elements to the collection
         *
         * @param collection
         * @param raiseEvent
         */
        addCollection(collection: Collection<T>, raiseEvent?: boolean): void;
        /**
         * Clears the collection
         */
        clear(): void;
        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        each(handler: (item: T, index: number) => any): void;
        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        indexOf(item: T): number;
        /**
         * Gets the item at the specified position
         * @param index
         * @returns {*}
         */
        item(index: number): T;
        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {*}
         */
        next(): T;
        /**
         * Raises the <c>addItem</c> event
         */
        onAddItem(item: T, index: number): void;
        /**
         * Raises the <c>removeItem</c> event
         */
        onRemoveItem(item: T, index: number): void;
        /**
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        remove(item: T, raiseEvent?: boolean): this;
        /**
         * Removes the item ath the specified index
         * @param index
         * @param raiseEvent
         */
        removeAt(index: number, raiseEvent?: boolean): void;
        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        resetPointer(): void;
        /**
         * Back field for event
         */
        private _addItem;
        /**
         * Gets an event raised when an item is added
         *
         * @returns {LatteEvent}
         */
        addItem: LatteEvent;
        /**
         * Back field for event
         */
        private _removeItem;
        /**
         * Gets an event raised when an item is removed
         *
         * @returns {LatteEvent}
         */
        removeItem: LatteEvent;
        /**
         * Property field
         */
        private _context;
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @returns {any}
         */
        /**
         * Gets or sets the context to execute methods of collection
         *
         * @param {any} value
         */
        context: any;
        /**
         * Gets the count of elements in collection
         *
         * @returns {number}
         */
        count: number;
        /**
         * Gets the first element of the collection
         * @returns {*}
         */
        first: T;
        /**
         * Gets the last element of the collection
         * @returns {*}
         */
        last: T;
        /**
         * Property field
         */
        private _length;
        /**
         * Gets the length of the collection
         *
         * @returns {number}
         */
        length: number;
    }
}
declare module latte {
    /**
     * Represents a color
     **/
    class Color {
        /**
         * Creates a color from the hexadecimal value.
         * It may contain the <c>#</c> symbol at the beginning of the string.
         **/
        static fromHex(hexColor: string): latte.Color;
        /**
         * Field for black property.
         */
        private static _black;
        /**
         * Gets the black color
         */
        static black: Color;
        /**
         * Field for white property.
         */
        private static _white;
        /**
         * Gets the white color
         */
        static white: Color;
        /**
         * Field for red property.
         */
        private static _red;
        /**
         * Gets the red color
         */
        static red: Color;
        /**
         * Field for green property.
         */
        private static _green;
        /**
         * Gets the green color
         */
        static green: Color;
        /**
         * Field for blue property.
         */
        private static _blue;
        /**
         * Gets the blue color
         */
        static blue: Color;
        /**
         * Field for transparent property.
         */
        private static _transparent;
        /**
         * Gets the transparent color
         */
        static transparent: Color;
        /**
         * Creates the color from the specified RGB and Aplha components.
         **/
        constructor(r?: number, g?: number, b?: number, a?: number);
        /**
         * Returns the color as a hex string
         **/
        toHexString(): string;
        /**
         * Returns the color as a string
         **/
        toString(): string;
        /**
         *
         **/
        private _a;
        /**
         * Gets r sets the Alpha component of color, from 0 to 255
         * @returns {number}
         */
        /**
         * Gets or sets the Aplha component of color, from 0 to 255.
         **/
        a: number;
        /**
         *
         **/
        private _b;
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Blue component of color, from 0 to 255.
         **/
        b: number;
        /**
         *
         **/
        private _g;
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Green component of color, from 0 to 255.
         **/
        g: number;
        /**
         * Returns a copy of the color with the specified alpha between 0 and 255.
         *
         * @param alpha
         */
        fade(alpha: number): Color;
        /**
         * Returns a copy of the color with the specified alpha between 0 and 1.
         *
         * @param alpha
         */
        fadeFloat(alpha: number): Color;
        /**
         * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        isDark: boolean;
        /**
         * Gets a value indicating if the color is a light color, by checking its perceived luminosity
         *
         * @returns {boolean}
         */
        isLight: boolean;
        /**
         * Gets a value indicating if the color is transparent.
         **/
        isTransparent: boolean;
        /**
         * Returns the perceived luminosity
         * @returns {number}
         */
        perceivedLuminosity: number;
        /**
         *
         **/
        private _r;
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        /**
         * Gets or sets the Red component of color, from 0 to 255.
         **/
        r: number;
    }
}
/**
 * Created by josemanuel on 2/6/14.
 */
declare module latte {
    /**
     *
     */
    class Culture {
        /**
         * Property field
         */
        private static _current;
        /**
         * Gets or sets the current culture of the system
         *
         * @returns {Culture}
         */
        /**
         * Gets or sets the current culture of the system
         *
         * @param {Culture} value
         */
        static current: Culture;
        /**
         * Field for esMX property
         */
        private static _esMx;
        /**
         * Gets the Español-Mexico Culture
         *
         * @returns {Culture}
         */
        static esMx: Culture;
        /**
         * Field for enUs property
         */
        private static _enUs;
        /**
         * Gets the English-USA Culture
         *
         * @returns {Culture}
         */
        static enUs: Culture;
        /**
         * Formats currency using the current culture
         * @param n
         * @returns {string}
         */
        static formatCurrency(n: number): string;
        /**
         * Returns the date as a short format
         * @param d
         */
        static formatShortDate(d: DateTime): string;
        /**
         * Returns the date as a short format
         * @param d
         */
        static formatLongDate(d: DateTime): string;
        /**
         * Formats a number using the current Culture
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        static formatNumber(n: number, decimals?: number, symbol?: string): string;
        /**
         * Short date format
         */
        shortDateFormat: string;
        /**
         * Long date format
         */
        longDateFormat: string;
        /**
         * Amount of decimals to show in currency format
         */
        currencyDecimals: number;
        /**
         * Separator of decimals for currency
         */
        numberDecimalsSeparator: string;
        /**
         * Thousands separator for currency
         */
        numberThousandsSeparator: string;
        /**
         * Symbol to use in currency
         */
        currencySymbol: string;
        /**
         *
         */
        constructor();
        /**
         * Returns the specified number as a currency
         * @param n
         */
        onFormatCurrency(n: number): string;
        /**
         * Formats the specified number
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        onFormatNumber(n: number, decimals?: number, symbol?: string): string;
        /**
         * Returns the date as a long format
         * @param d
         */
        onFormatLongDate(d: DateTime): string;
        /**
         * Returns the date as a short format
         * @param d
         */
        onFormatShortDate(d: DateTime): string;
    }
}
declare module latte {
    /**
     * Represents a specific date and time
     **/
    class DateTime {
        /**
         * Amount of days in months of a non-leap year
         **/
        static monthDays: Array<number>;
        /**
         * Amount of days in months of leap year
         **/
        static monthDaysLeapYear: Array<number>;
        /**
         * Returns the absolute number of days on the specified day-month-year
         **/
        static absoluteDays(year: number, month: number, day: number): number;
        /**
         * Returns the amount of days in the specified month of the specified year
         **/
        static daysInMonth(year: number, month: number): number;
        /**
         * Returns a DateTime object from the specifed date and time components
         **/
        static fromDateAndTime(date: DateTime, time: TimeSpan): DateTime;
        /**
         * Returns a DateTime object from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): DateTime;
        /**
         * Creates a DateTime object from the specified string.
         String should be in the format <c>yyyy-mm-dd hh:mm:ss</c>
         **/
        static fromString(dateTimeString: string): DateTime;
        /**
         * Returns a value indicating if the specified year is leap year
         **/
        static isLeapYear(year: number): boolean;
        /**
         * Gets a DateTime representing the current millisecond
         **/
        static now: DateTime;
        /**
         * Gets a DateTime representing the current day without time component
         **/
        static today: DateTime;
        /**
         * Gets a DateTime representing the day of tomorrow without time component
         **/
        static tomorrow: DateTime;
        /**
         * Gets a DateTime representing the day of yesterday without time component
         **/
        static yesterday: DateTime;
        _span: TimeSpan;
        /**
         * Creates the DateTime object
         **/
        constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number);
        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n);
        /**
         * Returns the specified element of date.
         Possible values for <c>what</c> are: <c>year</c> | <c>month</c> | <c>dayyear</c> | <c>day</c>
         **/
        private fromTimeSpan(what);
        /**
         * Returns the result of adding the specified timespan to this date
         **/
        add(timespan: TimeSpan): DateTime;
        /**
         * Returns the result of adding the specified amount of days to this date
         **/
        addDays(days: number): DateTime;
        /**
         * Returns the result of adding the specified amount of hours to this date
         **/
        addHours(hours: number): DateTime;
        /**
         * Returns the result of adding the specified amount of milliseconds to this date
         **/
        addMilliseconds(milliseconds: number): DateTime;
        /**
         * Returns the result of adding the specified amount of minutes to this date
         **/
        addMinutes(minutes: number): DateTime;
        /**
         * Returns the result of adding the specified amount of months to this date
         **/
        addMonths(months: number): DateTime;
        /**
         * Returns the result of adding the specified amount of seconds to this date
         **/
        addSeconds(seconds: number): DateTime;
        /**
         * Returns the result of adding the specified amount of years to this date
         **/
        addYears(years: number): DateTime;
        /**
         * Returns the result of comparing this datetime to the specified datetime
         **/
        compareTo(datetime: DateTime): number;
        /**
         * Gets the comparer value of the date
         *
         * @returns {number}
         */
        comparer: number;
        /**
         * Returns just the date component of this datetime
         **/
        date: DateTime;
        /**
         * Gets a value indicating if the specified datetime is equals to this datetime
         **/
        equals(datetime: DateTime): boolean;
        /**
         * Returns a value indicating if the date is contained in the range specified by the arguments
         **/
        onRange(start: DateTime, end: DateTime): boolean;
        /**
         * Returns the result of subtracting the specified datetime to this datetime
         **/
        subtractDate(datetime: DateTime): TimeSpan;
        /**
         * Returns the result of subtracting the specified timespan to this datetime
         **/
        subtractTime(timespan: TimeSpan): DateTime;
        /**
         * Returns a relative representatio of the date, like "Yesterday 10:00AM"
         **/
        toRelativeString(): string;
        /**
         * Gets the day of this datetime
         **/
        day: number;
        /**
         * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
         **/
        dayOfWeek: number;
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        dayOfWeekString: string;
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        dayOfWeekStringShort: string;
        /**
         * Gets the name of the day of the week
         * @returns {*}
         */
        dayOfWeekStringInitial: string;
        /**
         * Gets the day of year datetime
         **/
        dayOfYear: number;
        /**
         * Gets the hour of the datetime
         **/
        hour: number;
        /**
         * Gets the millisecond of the date
         **/
        millisecond: number;
        /**
         * Gets the minute of the time
         **/
        minute: number;
        /**
         * Gets the month of the date
         **/
        month: number;
        /**
         * Gets the name of the month of the date
         **/
        monthString: string;
        /**
         * Gets the name of the month of the date
         **/
        monthStringShort: string;
        /**
         * Gets the name of the month of the date
         **/
        monthStringInitial: string;
        /**
         * Gets the second of the date
         **/
        second: number;
        /**
         * Gets the time component of this datetime
         **/
        timeOfDay: TimeSpan;
        /**
         * Returns a formatted string
         **/
        toFormattedString(format?: string): string;
        /**
         * Gets the DateTime as a string
         **/
        toString(includeTime?: boolean): string;
        /**
         * Gets the week number of date. First week of year is 1
         **/
        weekOfYear: number;
        /**
         * Gets the year of the date
         **/
        year: number;
    }
}
declare module latte {
    class EventHandler {
        handler: Function;
        context: any;
        constructor(handler: Function, context: any);
    }
    /**
     * Manages events and event handlers
     */
    class LatteEvent {
        context: any;
        handlers: Array<EventHandler>;
        /**
         * Raised when a handler is added to the event
         */
        _handlerAdded: LatteEvent;
        /**
         *
         * @param context Context where
         */
        constructor(context: any);
        /**
         * Gets the event for handler adding
         *
         * @returns {LatteEvent}
         */
        handlerAdded: LatteEvent;
        /**
         * Adds a handler to the event
         * @param handler
         */
        add(handler: Function, context?: any): void;
        /**
         * Raises the <c>handlerAdded</c> event
         * @param handler
         */
        onHandlerAdded(handler: Function): void;
        /**
         * Raises the actual event handlers.
         * @param parameter
         * @returns {*}
         */
        raise(...parameter: any[]): any;
    }
}
declare module latte {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      if(typeof a != 'number')
     *          // Inform user that the parameter was invalid
     *          throw new InvalidArgumentEx('a');
     *
     *      return a * a;
     *
     * }
     *
     * </example>
     */
    class InvalidArgumentEx extends Ex {
        argument: string;
        value: any;
        /**
         * Creates the exception
         *
         * @param argument
         * @param value
         */
        constructor(argument?: string, value?: any);
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(): string;
    }
}
declare module latte {
    /**
     * Exception thrown when an argument of the function was invalid.
     *
     * Usage:
     * <example>
     *
     * function pow(a){
     *
     *      throw new latte.InvalidCallEx('pow')
     *
     * }
     *
     * </example>
     */
    class InvalidCallEx extends Ex {
        method: string;
        /**
         * Creates the Exception
         * @param method
         */
        constructor(method?: string);
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        toString(): string;
    }
}
/**
 * Created by josemanuel on 5/26/15.
 */
declare module latte {
    /**
     *
     */
    class LoadInfo {
        /**
         * Field for instance property
         */
        private static _instance;
        /**
         * Gets the load mechanism singleton.
         *
         * @returns {LoadMechanism}
         */
        static instance: LoadInfo;
        /**
         * @private
         */
        constructor();
        /**
         * Ends a loading process
         */
        end(): void;
        /**
         * Raises the <c>loadingStart</c> event
         */
        onLoadingStart(): void;
        /**
         * Raises the <c>loadingEnd</c> event
         */
        onLoadingEnd(): void;
        /**
         * Raises the <c>loadingText</c> event
         */
        onLoadingTextChanged(): void;
        /**
         * Starts a loading process
         * @param text
         */
        start(text: string): void;
        /**
         * Back field for event
         */
        private _loadingStart;
        /**
         * Gets an event raised when the loading starts
         *
         * @returns {LatteEvent}
         */
        loadingStart: LatteEvent;
        /**
         * Back field for event
         */
        private _loadingEnd;
        /**
         * Gets an event raised when the loading ends
         *
         * @returns {LatteEvent}
         */
        loadingEnd: LatteEvent;
        /**
         * Back field for event
         */
        private _loadingTextChanged;
        /**
         * Gets an event raised when the value of the loadingText property changes
         *
         * @returns {LatteEvent}
         */
        loadingTextChanged: LatteEvent;
        /**
         * Property field
         */
        private _loadingText;
        /**
         * Gets or sets the text of the load information
         *
         * @returns {string}
         */
        /**
         * Gets or sets the text of the load information
         *
         * @param {string} value
         */
        loadingText: string;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Point {
        /**
         * Gets the distance between two points
         * @param a
         * @param b
         */
        static distance(a: Point, b: Point): number;
        /**
         * Returns an empty point
         * @returns {latte.Point}
         */
        static empty(): Point;
        /**
         * Returns a point situated on the origin
         * @returns {latte.Point}
         */
        static origin(): Point;
        /**
         * Creates a new point, optionally
         */
        constructor(x?: number, y?: number);
        /**
         * Returns the offset operation of the point
         *
         * @param x
         * @param y
         * @returns {latte.Point}
         */
        offset(x: number, y: number): Point;
        /**
         * Gets string representation of the point
         * @returns {string}
         */
        toString(): string;
        /**
         * Gets a value indicating if the point is empty (No value has been set)
         *
         * @returns {boolean}
         */
        isEmpty: boolean;
        /**
         * Property field
         */
        private _x;
        /**
         * Gets or sets the X of the point
         *
         * @returns {number}
         */
        x: number;
        /**
         * Property field
         */
        private _y;
        /**
         * Gets the Y coordinate of the point
         *
         * @returns {number}
         */
        y: number;
    }
}
declare module latte {
    /**
     * Reprsents a Rectangle
     **/
    class Rectangle {
        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        static fromLRTB(left: number, right: number, top: number, bottom: number): Rectangle;
        /**
         * Height of rectangle
         **/
        private _height;
        /**
         * Left of rectangle
         **/
        private _left;
        /**
         * Top of rectangle
         **/
        private _top;
        /**
         * Width of rectangle
         **/
        private _width;
        /**
         *
         */
        private _tag;
        /**
         * Creates a rectangle with the specified left, top, width and height.
         **/
        constructor(left?: number, top?: number, width?: number, height?: number);
        /**
         * Returns the result of centering this into the specified container
         **/
        center(container: Rectangle): Rectangle;
        /**
         * Gets a value indicating if the specified point is contained
         **/
        contains(x: number, y: number): boolean;
        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        containsRectangle(rectangle: Rectangle): boolean;
        /**
         * Returns the result of inflating the rectangle vertically and horizontally on each edge.
         **/
        inflate(horizontal: number, vertical: number): Rectangle;
        /**
         * Returns the rectangle result of intersecting this with passed rectangle
         **/
        intersection(rectangle: Rectangle): Rectangle;
        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        intersects(rectangle: Rectangle): boolean;
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToHeight(height: number): Rectangle;
        /**
         * Returns a scaled rectangle
         * @param width
         */
        scaleToWidth(width: number): Rectangle;
        /**
         * Returns a string describing the rectangle
         **/
        toString(): string;
        /**
         * Gets a rectangle representing the union of this rectangle and the passed one
         **/
        union(rectangle: Rectangle): Rectangle;
        /**
         * Gets or sets the right side of the rectangle
         **/
        /**
         * Gets or sets the right side of the rectangle
         **/
        bottom: number;
        /**
         * Gets or sets the height of the rectangle
         **/
        /**
         * Gets or sets the height of the rectangle
         **/
        height: number;
        /**
         * Gets or sets the left of the rectangle
         **/
        /**
         * Gets or sets the left of the rectangle
         **/
        left: number;
        /**
         * Gets or sets the right side of the rectangle
         **/
        /**
         * Gets or sets the right side of the rectangle
         **/
        right: number;
        /**
         * Gets the size of the rectangle
         *
         * @returns {Size}
         */
        size: Size;
        tag: any;
        /**
         * Gets or sets the top of the rectangle
         **/
        /**
         * Gets or sets the top of the rectangle
         **/
        top: number;
        /**
         * Gets or sets the width of the rectangle
         **/
        /**
         * Gets or sets the width of the rectangle
         **/
        width: number;
    }
}
/**
 * Created by josemanuel on 5/12/14.
 */
declare module latte {
    /**
     *
     */
    class Size {
        /**
         * Returns an empty size
         * @returns {latte.Size}
         */
        static empty(): Size;
        /**
         * Returns a size of zero width and zero height
         * @returns {latte.Point}
         */
        static zero(): Size;
        /**
         * Creates a new Size, optionally sets its Width and Height components
         */
        constructor(width?: number, height?: number);
        /**
         * Inflates the size on the specified width and height
         *
         * @param width
         * @param height
         * @returns {latte.Size}
         */
        inflate(width: number, height: number): Size;
        /**
         * Inflates the size uniformly
         * @param wide
         */
        inflateUniform(wide: number): Size;
        /**
         * Gets string representation of the size
         * @returns {string}
         */
        toString(): string;
        /**
         * Gets the area represented by the size
         *
         * @returns {number}
         */
        area: number;
        /**
         * Gets a value indicating if the size has no compnents assigned or initialized
         *
         * @returns {boolean}
         */
        isEmpty: boolean;
        /**
         * Property field
         */
        private _height;
        /**
         * Gets the Height component of the size
         *
         * @returns {number}
         */
        height: number;
        /**
         * Property field
         */
        private _width;
        /**
         * Gets the Width component of the size
         *
         * @returns {number}
         */
        width: number;
    }
}
declare module latte {
    /**
     * Represents a time interval.
     **/
    class TimeSpan {
        millis: number;
        /**
         * Creates a TimeSpan from the specified amount of days
         **/
        static fromDays(days: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of hours
         **/
        static fromHours(hours: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of milliseconds
         **/
        static fromMilliseconds(milliseconds: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of minutes
         **/
        static fromMinutes(minutes: number): TimeSpan;
        /**
         * Creates a TimeSpan from the specified amount of seconds
         **/
        static fromSeconds(seconds: number): TimeSpan;
        /**
         * Creates a TimeSpan object from the specified string.
         String should be in the format <c>hh:mm:ss</c>
         **/
        static fromString(timeString: string): TimeSpan;
        /**
         * Gets a timespan with the time passed since the specified date and time
         * @param d
         */
        static timeSince(d: DateTime): TimeSpan;
        /**
         * Creates the TimeSpan with the specified parameters. Parameters not specified will be asumed to be zero.
         **/
        constructor(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
        /**
         * Makes math rounding depending on the sign of the milliseconds
         **/
        private _rounder(number);
        /**
         * Prepends a zero to the number if lower than 10
         **/
        private _zeroPad(n);
        /**
         * Returns the result of adding the specified timespan to this timespan
         **/
        add(timespan: TimeSpan): TimeSpan;
        /**
         * Returns the result of adding the specified amount of hours to this timespan
         **/
        addHours(hours: number): TimeSpan;
        /**
         * Returns the result of adding the specified amount of minutes to this timespan
         **/
        addMinutes(minutes: number): TimeSpan;
        /**
         * Returns the result of adding the specified amount of seconds to this timespan
         **/
        addSeconds(seconds: number): TimeSpan;
        /**
         * Returns the result of comparing this timespan against the provided timespan
         **/
        compareTo(timespan: TimeSpan): number;
        /**
         * Returns a timespan representing the actual duration of the timespan
         **/
        duration(): TimeSpan;
        /**
         * Returns a value indicating if this timespan represents the same than the specified timespan
         **/
        equals(timespan: TimeSpan): boolean;
        /**
         * Negates the timespan duration
         **/
        negate(): void;
        /**
         * Returns the result of subtracting the specified timespan to this timespan
         **/
        subtract(timespan: TimeSpan): TimeSpan;
        /**
         * Returns this timespan as a string
         **/
        toString(includeMilliseconds?: boolean): string;
        /**
         * Returns the timespan as a shor string, e.g. 5 minutes or 5m
         * @param shortNames
         */
        toShortString(shortNames?: boolean): string;
        /**
         * Gets the days component of the time interval represented by this object
         **/
        days: number;
        /**
         * Gets the hours component of the time interval represented by this object
         **/
        hours: number;
        /**
         * Gets a value indicating if the total time this timespan represents is zero
         **/
        isEmpty: boolean;
        /**
         * Gets the milliseconds component of the time interval represented by this object
         **/
        milliseconds: number;
        /**
         * Gets the minutes component of the time interval represented by this object
         **/
        minutes: number;
        /**
         * Gets the seconds component of the time interval represented by this object
         **/
        seconds: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional days
         **/
        totalDays: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional hours
         **/
        totalHours: number;
        /**
         * Gets the value of this timespan expressed in milliseconds
         **/
        totalMilliseconds: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional minutes
         **/
        totalMinutes: number;
        /**
         * Gets the value of this timespan expressed in whole and fractional seconds
         **/
        totalSeconds: number;
    }
}
declare module latte {
    /**
     * Executes an action every specified amount of milliseconds
     **/
    class Timer {
        /**
         *
         **/
        private _callback;
        /**
         *
         **/
        private _context;
        /**
         *
         **/
        private _milliseconds;
        /**
         *
         **/
        private _paused;
        /**
         * Creates a timer that will call <c>callback</c> every specified amount of
         <c>milliseconds</c> on the specified <c>context</c>.
         **/
        constructor(callback: Function, milliseconds: number, context: any);
        /**
         * Gets or sets the function who will be called every tick
         **/
        /**
         * Gets or sets the function who will be called every tick
         **/
        callback: Function;
        /**
         * Gets or sets the context in which the function is executed
         **/
        /**
         * Gets or sets the context in which the function is executed
         **/
        context: any;
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        /**
         * Gets or sets the milliseconds to sleep between calls
         **/
        milliseconds: number;
        /**
         * Pauses the timer
         **/
        pause(): void;
        /**
         * Starts ticking
         **/
        start(): void;
        /**
         * Ticks the timer. Executes the callback and programs next tick.
         **/
        tick(): void;
    }
}
declare module latte {
    class HEvent<T> {
    }
}
