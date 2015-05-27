var latte;
(function (latte) {
    /**
     * Enumeration of Keyboard key codes
     */
    (function (Key) {
        /**
         * Backspace key
         *
         * @type {number}
         */
        Key[Key["BACKSPACE"] = 8] = "BACKSPACE";
        /**
         * Tab key
         *
         * @type {number}
         */
        Key[Key["TAB"] = 9] = "TAB";
        /**
         * Enter key
         *
         * @type {number}
         */
        Key[Key["ENTER"] = 13] = "ENTER";
        /**
         * Shift key
         *
         * @type {number}
         */
        Key[Key["SHIFT"] = 16] = "SHIFT";
        /**
         * Control key
         *
         * @type {number}
         */
        Key[Key["CONTROL"] = 17] = "CONTROL";
        /**
         * Alt key
         *
         * @type {number}
         */
        Key[Key["ALT"] = 18] = "ALT";
        /**
         * Backspace key
         *
         * @type {number}
         */
        Key[Key["PAUSE"] = 19] = "PAUSE";
        /**
         * Caps Lock key
         *
         * @type {number}
         */
        Key[Key["CAPS_LOCK"] = 20] = "CAPS_LOCK";
        /**
         * Escape key
         *
         * @type {number}
         */
        Key[Key["ESCAPE"] = 27] = "ESCAPE";
        /**
         * Page up key
         *
         * @type {number}
         */
        Key[Key["PAGE_UP"] = 33] = "PAGE_UP";
        /**
         * Page down key
         *
         * @type {number}
         */
        Key[Key["PAGE_DOWN"] = 34] = "PAGE_DOWN";
        /**
         * End key
         *
         * @type {number}
         */
        Key[Key["END"] = 35] = "END";
        /**
         * Home key
         *
         * @type {number}
         */
        Key[Key["HOME"] = 36] = "HOME";
        /**
         * Left arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_LEFT"] = 37] = "ARROW_LEFT";
        /**
         * Up arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_UP"] = 38] = "ARROW_UP";
        /**
         * Right arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
        /**
         * Down arrow key
         *
         * @type {number}
         */
        Key[Key["ARROW_DOWN"] = 40] = "ARROW_DOWN";
        /**
         * Insert key
         *
         * @type {number}
         */
        Key[Key["INSERT"] = 45] = "INSERT";
        /**
         * Delete key
         *
         * @type {number}
         */
        Key[Key["DELETE"] = 46] = "DELETE";
        /**
         * Zero key
         *
         * @type {number}
         */
        Key[Key["NUMBER_0"] = 48] = "NUMBER_0";
        /**
         * One key
         *
         * @type {number}
         */
        Key[Key["NUMBER_1"] = 49] = "NUMBER_1";
        /**
         * Two key
         *
         * @type {number}
         */
        Key[Key["NUMBER_2"] = 50] = "NUMBER_2";
        /**
         * Three key
         *
         * @type {number}
         */
        Key[Key["NUMBER_3"] = 51] = "NUMBER_3";
        /**
         * Four key
         *
         * @type {number}
         */
        Key[Key["NUMBER_4"] = 52] = "NUMBER_4";
        /**
         * Five key
         *
         * @type {number}
         */
        Key[Key["NUMBER_5"] = 53] = "NUMBER_5";
        /**
         * Siz key
         *
         * @type {number}
         */
        Key[Key["NUMBER_6"] = 54] = "NUMBER_6";
        /**
         * Seven key
         *
         * @type {number}
         */
        Key[Key["NUMBER_7"] = 55] = "NUMBER_7";
        /**
         * Eight key
         *
         * @type {number}
         */
        Key[Key["NUMBER_8"] = 56] = "NUMBER_8";
        /**
         * Nine key
         *
         * @type {number}
         */
        Key[Key["NUMBER_9"] = 57] = "NUMBER_9";
        /**
         * A key
         *
         * @type {number}
         */
        Key[Key["A"] = 65] = "A";
        /**
         * B key
         *
         * @type {number}
         */
        Key[Key["B"] = 66] = "B";
        /**
         * C key
         *
         * @type {number}
         */
        Key[Key["C"] = 67] = "C";
        /**
         * D key
         *
         * @type {number}
         */
        Key[Key["D"] = 68] = "D";
        /**
         * E key
         *
         * @type {number}
         */
        Key[Key["E"] = 69] = "E";
        /**
         * F key
         *
         * @type {number}
         */
        Key[Key["F"] = 70] = "F";
        /**
         * G key
         *
         * @type {number}
         */
        Key[Key["G"] = 71] = "G";
        /**
         * H key
         *
         * @type {number}
         */
        Key[Key["H"] = 72] = "H";
        /**
         * I key
         *
         * @type {number}
         */
        Key[Key["I"] = 73] = "I";
        /**
         * J key
         *
         * @type {number}
         */
        Key[Key["J"] = 74] = "J";
        /**
         * K key
         *
         * @type {number}
         */
        Key[Key["K"] = 75] = "K";
        /**
         * L key
         *
         * @type {number}
         */
        Key[Key["L"] = 76] = "L";
        /**
         * M key
         *
         * @type {number}
         */
        Key[Key["M"] = 77] = "M";
        /**
         * N key
         *
         * @type {number}
         */
        Key[Key["N"] = 78] = "N";
        /**
         * O key
         *
         * @type {number}
         */
        Key[Key["O"] = 79] = "O";
        /**
         * P key
         *
         * @type {number}
         */
        Key[Key["P"] = 80] = "P";
        /**
         * Q key
         *
         * @type {number}
         */
        Key[Key["Q"] = 81] = "Q";
        /**
         * R key
         *
         * @type {number}
         */
        Key[Key["R"] = 82] = "R";
        /**
         * S key
         *
         * @type {number}
         */
        Key[Key["S"] = 83] = "S";
        /**
         * T key
         *
         * @type {number}
         */
        Key[Key["T"] = 84] = "T";
        /**
         * U key
         *
         * @type {number}
         */
        Key[Key["U"] = 85] = "U";
        /**
         * V key
         *
         * @type {number}
         */
        Key[Key["V"] = 86] = "V";
        /**
         * W key
         *
         * @type {number}
         */
        Key[Key["W"] = 87] = "W";
        /**
         * X key
         *
         * @type {number}
         */
        Key[Key["X"] = 88] = "X";
        /**
         * Y key
         *
         * @type {number}
         */
        Key[Key["Y"] = 89] = "Y";
        /**
         * Z key
         *
         * @type {number}
         */
        Key[Key["Z"] = 90] = "Z";
        /**
         * Left window key
         *
         * @type {number}
         */
        Key[Key["LEFT_WINDOW"] = 91] = "LEFT_WINDOW";
        /**
         * Right window key
         *
         * @type {number}
         */
        Key[Key["RIGHT_WINDOW"] = 92] = "RIGHT_WINDOW";
        /**
         * Select key
         *
         * @type {number}
         */
        Key[Key["SELECT"] = 93] = "SELECT";
        /**
         * Numpad Zero key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_0"] = 96] = "NUMPAD_0";
        /**
         * Numpad One key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_1"] = 97] = "NUMPAD_1";
        /**
         * Numpad two key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_2"] = 98] = "NUMPAD_2";
        /**
         * Numpad 3 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_3"] = 99] = "NUMPAD_3";
        /**
         * Numpad 4 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_4"] = 100] = "NUMPAD_4";
        /**
         * Numpad 5 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_5"] = 101] = "NUMPAD_5";
        /**
         * Numpad 6 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_6"] = 102] = "NUMPAD_6";
        /**
         * Numpad 7 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_7"] = 103] = "NUMPAD_7";
        /**
         * Numpad 8 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_8"] = 104] = "NUMPAD_8";
        /**
         * Numpad 9 key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_9"] = 105] = "NUMPAD_9";
        /**
         * Numpad * key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_MULTIPLY"] = 106] = "NUMPAD_MULTIPLY";
        /**
         * Numpad + key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_ADD"] = 107] = "NUMPAD_ADD";
        /**
         * Numpad - key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_SUBTRACT"] = 109] = "NUMPAD_SUBTRACT";
        /**
         * Numpad . key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_DECIMAL_POINT"] = 110] = "NUMPAD_DECIMAL_POINT";
        /**
         * Numpad / key
         *
         * @type {number}
         */
        Key[Key["NUMPAD_DIVIDE"] = 111] = "NUMPAD_DIVIDE";
        /**
         * F1 key
         *
         * @type {number}
         */
        Key[Key["F1"] = 112] = "F1";
        /**
         * F2 key
         *
         * @type {number}
         */
        Key[Key["F2"] = 113] = "F2";
        /**
         * F3 key
         *
         * @type {number}
         */
        Key[Key["F3"] = 114] = "F3";
        /**
         * F4 key
         *
         * @type {number}
         */
        Key[Key["F4"] = 115] = "F4";
        /**
         * F5 key
         *
         * @type {number}
         */
        Key[Key["F5"] = 116] = "F5";
        /**
         * F6 key
         *
         * @type {number}
         */
        Key[Key["F6"] = 117] = "F6";
        /**
         * F7 key
         *
         * @type {number}
         */
        Key[Key["F7"] = 118] = "F7";
        /**
         * F8 key
         *
         * @type {number}
         */
        Key[Key["F8"] = 119] = "F8";
        /**
         * F9 key
         *
         * @type {number}
         */
        Key[Key["F9"] = 120] = "F9";
        /**
         * F10 key
         *
         * @type {number}
         */
        Key[Key["F10"] = 121] = "F10";
        /**
         * F11 key
         *
         * @type {number}
         */
        Key[Key["F11"] = 122] = "F11";
        /**
         * F12 key
         *
         * @type {number}
         */
        Key[Key["F12"] = 123] = "F12";
        /**
         * Num lock key
         *
         * @type {number}
         */
        Key[Key["NUM_LOCK"] = 144] = "NUM_LOCK";
        /**
         * Scroll lock key
         *
         * @type {number}
         */
        Key[Key["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
        /**
         * , key
         *
         * @type {number}
         */
        Key[Key["SEMI_COLON"] = 186] = "SEMI_COLON";
        /**
         *  = key
         *
         * @type {number}
         */
        Key[Key["EQUAL_SIGN"] = 187] = "EQUAL_SIGN";
        /**
         * , key
         *
         * @type {number}
         */
        Key[Key["COMMA"] = 188] = "COMMA";
        /**
         * - key
         *
         * @type {number}
         */
        Key[Key["DASH"] = 189] = "DASH";
        /**
         * . key
         *
         * @type {number}
         */
        Key[Key["PERIOD"] = 190] = "PERIOD";
        /**
         * / key
         *
         * @type {number}
         */
        Key[Key["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
        /**
         * Grave acccent key
         *
         * @type {number}
         */
        Key[Key["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
        /**
         * [ key
         *
         * @type {number}
         */
        Key[Key["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
        /**
         * \ key
         *
         * @type {number}
         */
        Key[Key["BACK_SLASH"] = 220] = "BACK_SLASH";
        /**
         * ] key
         *
         * @type {number}
         */
        Key[Key["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
        /**
         * ' key
         *
         * @type {number}
         */
        Key[Key["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
        /**
         * Space bar key
         * @type {number}
         */
        Key[Key["SPACEBAR"] = 32] = "SPACEBAR";
    })(latte.Key || (latte.Key = {}));
    var Key = latte.Key;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 12/12/13.
 */
var latte;
(function (latte) {
    (function (TriBool) {
        TriBool[TriBool["UNKNOWN"] = 0] = "UNKNOWN";
        TriBool[TriBool["TRUE"] = 1] = "TRUE";
        TriBool[TriBool["FALSE"] = 2] = "FALSE";
    })(latte.TriBool || (latte.TriBool = {}));
    var TriBool = latte.TriBool;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Enumerates week days
     */
    (function (WeekDay) {
        /**
         * Sunday
         *
         * @type {number}
         */
        WeekDay[WeekDay["SUNDAY"] = 0] = "SUNDAY";
        /**
         * Monday
         *
         * @type {number}
         */
        WeekDay[WeekDay["MONDAY"] = 1] = "MONDAY";
        /**
         * Tuesday
         *
         * @type {number}
         */
        WeekDay[WeekDay["TUESDAY"] = 2] = "TUESDAY";
        /**
         * Wednesday
         *
         * @type {number}
         */
        WeekDay[WeekDay["WEDNESDAY"] = 3] = "WEDNESDAY";
        /**
         * Thursday
         *
         * @type {number}
         */
        WeekDay[WeekDay["THURSDAY"] = 4] = "THURSDAY";
        /**
         * Friday
         *
         * @type {number}
         */
        WeekDay[WeekDay["FRIDAY"] = 5] = "FRIDAY";
        /**
         * Saturday
         *
         * @type {number}
         */
        WeekDay[WeekDay["SATURDAY"] = 6] = "SATURDAY";
    })(latte.WeekDay || (latte.WeekDay = {}));
    var WeekDay = latte.WeekDay;
})(latte || (latte = {}));
/*
 * DataLatte Runtime
 *
 *  Includes:
 *
 *    - Simple javascript inheritance: Class & Class.extend()
 *    - Namespacing: include()
 *
 *
 */
var latte;
(function (latte) {
    /**
     * Saves data about deprecated warns
     */
    var deprecatedWarns = {};
    /**
     * Holds a list of already included plugins
     *
     * @type {Array<string>}
     */
    latte.includedPlugins = {};
    /**
     * Tells if the passed objects are equal in its properties
     *
     * @param {object} a
     * @param {object} b
     */
    function _equalObjects(a, b) {
        if (!_isObject(a) || !_isObject(b))
            throw 'No objects';
        var p;
        for (p in a) {
            if (typeof (b[p]) == 'undefined') {
                return false;
            }
        }
        for (p in a) {
            if (a[p]) {
                switch (typeof (a[p])) {
                    case 'object':
                        if (!a[p].equals(b[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (b[p]) == 'undefined' || (p != 'equals' && a[p].toString() != b[p].toString()))
                            return false;
                        break;
                    default:
                        if (a[p] != b[p]) {
                            return false;
                        }
                }
            }
            else {
                if (b[p])
                    return false;
            }
        }
        for (p in b) {
            if (typeof (a[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    }
    latte._equalObjects = _equalObjects;
    ;
    /**
     * Returns a value indicating if the parameter is a number
     *
     * @returns {boolean}
     */
    function _isNumber(param) {
        return typeof param == 'number';
    }
    latte._isNumber = _isNumber;
    ;
    /**
     * Returns a value indicating if the parameter is a boolean
     *
     * @returns {boolean}
     */
    function _isBoolean(param) {
        return typeof param == 'boolean';
    }
    latte._isBoolean = _isBoolean;
    ;
    /**
     * Returns a value indicating if the parameter is a string
     *
     * @returns {boolean}
     */
    function _isString(param) {
        return typeof param == 'string';
    }
    latte._isString = _isString;
    ;
    /**
     * Returns a value indicating if the parameter is an Array
     *
     * @returns {boolean}
     */
    function _isArray(param) {
        return param instanceof Array;
    }
    latte._isArray = _isArray;
    ;
    /**
     * Returns a value indicating if the parameter is a Function
     *
     * @returns {boolean}
     */
    function _isFunction(param) {
        return typeof param == 'function';
    }
    latte._isFunction = _isFunction;
    ;
    /**
     * Returns a value indicating if the parameter is an Object
     *
     * @returns {boolean}
     */
    function _isObject(param) {
        return typeof param == 'object';
    }
    latte._isObject = _isObject;
    ;
    /**
     * Returns a value indicating if the parameter as string represents a numeric value
     *
     * @returns {boolean}
     */
    function _isNumeric(param) {
        var allowed = "1234567890.";
        if (!_isString(param))
            param = String(param);
        if (param.length == 0) {
            return false;
        }
        else {
            for (var i = 0; i < param.length; i++)
                if (allowed.indexOf(param.charAt(i)) < 0)
                    return false;
            return true;
        }
    }
    latte._isNumeric = _isNumeric;
    ;
    /**
     * Returns a value indicating if the parameter is undefined
     *
     * @returns {boolean}
     */
    function _undef(param) {
        return typeof param == 'undefined';
    }
    latte._undef = _undef;
    ;
    /**
     * Logs the specified data if there's a console.
     */
    function log() {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (!_undef(console) && !_undef(console.log)) {
            if (arguments['length'] == 1) {
                console.log(arguments[0]);
            }
            else {
                console.log(sprintf.apply(this, arguments));
            }
        }
    }
    latte.log = log;
    ;
    /**
     * sprintf for only %s strings
     */
    function sprintf() {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        var arg = 1, format = arguments[0], cur, next, result = [];
        for (var i = 0; i < format.length; i++) {
            cur = format.substr(i, 1);
            next = i == format.length - 1 ? '' : format.substr(i + 1, 1);
            if (cur == '%' && next == 's') {
                result.push(arguments[arg++]);
                i++;
            }
            else {
                result.push(cur);
            }
        }
        return result.join('');
    }
    latte.sprintf = sprintf;
    ;
    /**
     * Warns user about deprecated code.
     *
     * @param code
     * @param alternateUse
     */
    function warnDeprecated(code, alternateUse) {
        if (_undef(deprecatedWarns[code]) && console && console.warn) {
            deprecatedWarns[code] = true;
            console.warn(sprintf("latte: %s is deprecated. Please use %s instead", code, alternateUse));
        }
    }
    latte.warnDeprecated = warnDeprecated;
})(latte || (latte = {}));
var latte;
(function (latte) {
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
    var Ex = (function () {
        /**
         * Creates the exception object
         *
         * @param description
         */
        function Ex(description) {
            if (description === void 0) { description = ""; }
            this.description = description;
        }
        /**
         * Returns the exception as a string.
         *
         * @returns {string}
         */
        Ex.prototype.toString = function () {
            return this.description ? this.description : "Uncaught exception";
        };
        return Ex;
    })();
    latte.Ex = Ex;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/4/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Ajax = (function () {
        function Ajax() {
        }
        //region Static
        /**
         * Loads an URL
         * @param url
         * @param success
         * @param error
         */
        Ajax.get = function (url, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var xmlhttp;
            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if (latte._isFunction(success))
                            success(xmlhttp.responseText);
                    }
                    else {
                        if (latte._isFunction(error))
                            error(latte.sprintf("Error %s: %s", xmlhttp.status, url));
                    }
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        };
        /**
         * Loads an URL
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        Ajax.post = function (url, data, success, error) {
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var req;
            var params = [];
            var query = null;
            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                req = new XMLHttpRequest();
            }
            else {
                // code for IE6, IE5
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        if (latte._isFunction(success))
                            success(req.responseText);
                    }
                    else {
                        if (latte._isFunction(error))
                            error(latte.sprintf("Error %s: %s", req.status, url));
                    }
                }
            };
            var fdata = new FormData();
            for (var i in data) {
                fdata.append(i, data[i]);
            }
            req.open("POST", url);
            req.send(fdata);
            //setTimeout(() => {
            //    req.open("POST", url);
            //    req.send(fdata);
            //}, 1000);
        };
        return Ajax;
    })();
    latte.Ajax = Ajax;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     *
     */
    var Collection = (function () {
        //endregion
        /**
         *
         */
        function Collection(addCallback, removeCallback, context) {
            if (addCallback === void 0) { addCallback = null; }
            if (removeCallback === void 0) { removeCallback = null; }
            if (context === void 0) { context = null; }
            //region Static
            //endregion
            //region Fields
            this.pointer = 0;
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._context = null;
            /**
             * Property field
             */
            this._length = 0;
            if (addCallback) {
                this.addItem.add(addCallback, context);
            }
            if (removeCallback) {
                this.removeItem.add(removeCallback, context);
            }
            this.context = context;
        }
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Adds an element to the collection
         *
         * @param element
         * @param raiseEvent
         */
        Collection.prototype.add = function (element, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            this[this._length++] = element;
            if (raiseEvent) {
                this.onAddItem(element, this.length);
            }
        };
        /**
         * Adds an array of elements
         *
         * @param elements
         * @param raiseEvent
         */
        Collection.prototype.addArray = function (elements, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            for (var i = 0; i < elements.length; i++) {
                this.add(elements[i]);
            }
        };
        /**
         * Adds a collection of elements to the collection
         *
         * @param collection
         * @param raiseEvent
         */
        Collection.prototype.addCollection = function (collection, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            for (var i = 0; i < collection.length; i++) {
                this.add(collection[i]);
            }
        };
        /**
         * Clears the collection
         */
        Collection.prototype.clear = function () {
            while (this.length > 0) {
                this.removeAt(0);
            }
        };
        /**
         * Iterates through the collection, executing the handler for each item
         * @param handler
         */
        Collection.prototype.each = function (handler) {
            for (var i = 0; i < this.count; i++) {
                handler.call(this.context, this[i], i);
            }
        };
        /**
         * Gets the index of the specified element if found. -1 if not found.
         * @param item
         * @returns {number}
         */
        Collection.prototype.indexOf = function (item) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * Gets the item at the specified position
         * @param index
         * @returns {*}
         */
        Collection.prototype.item = function (index) {
            return this[index];
        };
        /**
         * Returns the object on current pointer and moves the pointer forward.
         * It returns null and resets pointer if end of collection reached.
         * @returns {*}
         */
        Collection.prototype.next = function () {
            if (this.pointer >= this.length) {
                this.pointer = 0;
                return null;
            }
            var elem = this[this.pointer];
            this.pointer++;
            return elem;
        };
        /**
         * Raises the <c>addItem</c> event
         */
        Collection.prototype.onAddItem = function (item, index) {
            if (this._addItem) {
                this._addItem.raise(item, index);
            }
        };
        /**
         * Raises the <c>removeItem</c> event
         */
        Collection.prototype.onRemoveItem = function (item, index) {
            if (this._removeItem) {
                this._removeItem.raise(item, index);
            }
        };
        /**
         * Removes the specified item from the collection
         * @param item
         * @param raiseEvent
         */
        Collection.prototype.remove = function (item, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            var buffer = [];
            var index = -1;
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                delete this[i];
                if (t === item) {
                    index = i;
                }
                else {
                    buffer.push(t);
                }
            }
            for (var i = 0; i < buffer.length; i++) {
                this[i] = buffer[i];
            }
            this._length = buffer.length;
            //endregion
            if (index >= 0) {
                if (raiseEvent) {
                    this.onRemoveItem(item, index);
                }
            }
            return this;
        };
        /**
         * Removes the item ath the specified index
         * @param index
         * @param raiseEvent
         */
        Collection.prototype.removeAt = function (index, raiseEvent) {
            if (raiseEvent === void 0) { raiseEvent = true; }
            this.remove(this[index], raiseEvent);
        };
        /**
         * Resets the internal pointer for calls to <c>next()</c> method.
         */
        Collection.prototype.resetPointer = function () {
            this.pointer = 0;
        };
        Object.defineProperty(Collection.prototype, "addItem", {
            /**
             * Gets an event raised when an item is added
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._addItem) {
                    this._addItem = new latte.LatteEvent(this);
                    this._addItem.context = this.context;
                }
                return this._addItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "removeItem", {
            /**
             * Gets an event raised when an item is removed
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._removeItem) {
                    this._removeItem = new latte.LatteEvent(this);
                    this._addItem.context = this.context;
                }
                return this._removeItem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "context", {
            /**
             * Gets or sets the context to execute methods of collection
             *
             * @returns {any}
             */
            get: function () {
                return this._context;
            },
            /**
             * Gets or sets the context to execute methods of collection
             *
             * @param {any} value
             */
            set: function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "count", {
            /**
             * Gets the count of elements in collection
             *
             * @returns {number}
             */
            get: function () {
                return this.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "first", {
            /**
             * Gets the first element of the collection
             * @returns {*}
             */
            get: function () {
                return this.length > 0 ? this[0] : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "last", {
            /**
             * Gets the last element of the collection
             * @returns {*}
             */
            get: function () {
                return (this.length > 0 ? this[this.length - 1] : null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "length", {
            /**
             * Gets the length of the collection
             *
             * @returns {number}
             */
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        return Collection;
    })();
    latte.Collection = Collection;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a color
     **/
    var Color = (function () {
        //endregion
        /**
         * Creates the color from the specified RGB and Aplha components.
         **/
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 255; }
            //endregion
            //region Properties
            /**
             *
             **/
            this._a = 255;
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        //region Static
        /**
         * Creates a color from the hexadecimal value.
         * It may contain the <c>#</c> symbol at the beginning of the string.
         **/
        Color.fromHex = function (hexColor) {
            if (latte._isString(hexColor)) {
                if (hexColor.toLowerCase() == 'white') {
                    hexColor = '#FFF';
                }
                if (hexColor.toLowerCase() == 'black') {
                    hexColor = '#000';
                }
                if (hexColor.toLowerCase() == 'gray') {
                    hexColor = '#777';
                }
                if (hexColor.length == 0) {
                    hexColor = '#000';
                }
            }
            // Check is string
            if (!latte._isString(hexColor) || hexColor.length == 0)
                throw new latte.InvalidArgumentEx('hexColor', hexColor);
            // Remove #
            if (hexColor.charAt(0) == '#')
                hexColor = hexColor.substr(1);
            // Check length
            if (!(hexColor.length == 3 || hexColor.length == 6 || hexColor.length == 9))
                throw new latte.InvalidArgumentEx('hexColor', hexColor);
            var c = new latte.Color();
            var toDecimal = function (hex) {
                return parseInt(hex, 16);
            };
            // If three digits
            if (hexColor.length == 3) {
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(0)));
                c.g = (toDecimal(hexColor.charAt(1) + hexColor.charAt(1)));
                c.b = (toDecimal(hexColor.charAt(2) + hexColor.charAt(2)));
            }
            else {
                c.r = (toDecimal(hexColor.charAt(0) + hexColor.charAt(1)));
                c.g = (toDecimal(hexColor.charAt(2) + hexColor.charAt(3)));
                c.b = (toDecimal(hexColor.charAt(4) + hexColor.charAt(5)));
                if (hexColor.length == 9)
                    c.a = (toDecimal(hexColor.charAt(6) + hexColor.charAt(7)));
            }
            return c;
        };
        Object.defineProperty(Color, "black", {
            /**
             * Gets the black color
             */
            get: function () {
                if (!this._black) {
                    this._black = new Color(0, 0, 0);
                }
                return this._black;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "white", {
            /**
             * Gets the white color
             */
            get: function () {
                if (!this._white) {
                    this._white = new Color(255, 255, 255);
                }
                return this._white;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "red", {
            /**
             * Gets the red color
             */
            get: function () {
                if (!this._red) {
                    this._red = new Color(255, 0, 0);
                }
                return this._red;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "green", {
            /**
             * Gets the green color
             */
            get: function () {
                if (!this._green) {
                    this._green = new Color(0, 128, 0);
                }
                return this._green;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "blue", {
            /**
             * Gets the blue color
             */
            get: function () {
                if (!this._blue) {
                    this._blue = new Color(0, 0, 255);
                }
                return this._blue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "transparent", {
            /**
             * Gets the transparent color
             */
            get: function () {
                if (!this._transparent) {
                    this._transparent = new Color(0, 0, 0, 0);
                }
                return this._transparent;
            },
            enumerable: true,
            configurable: true
        });
        //region Methods
        /**
         * Returns the color as a hex string
         **/
        Color.prototype.toHexString = function () {
            var d = function (s) {
                if (s.length == 1)
                    return '0' + s;
                return s;
            };
            if (this.a != 255) {
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16)) + d(this.a.toString(16));
            }
            else {
                return '#' + d(this.r.toString(16)) + d(this.g.toString(16)) + d(this.b.toString(16));
            }
        };
        /**
         * Returns the color as a string
         **/
        Color.prototype.toString = function () {
            if (this.isTransparent) {
                return 'transparent';
            }
            else if (this.a != 255) {
                return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
            }
            else {
                return this.toHexString();
            }
        };
        Object.defineProperty(Color.prototype, "a", {
            /**
             * Gets r sets the Alpha component of color, from 0 to 255
             * @returns {number}
             */
            get: function () {
                return this._a;
            },
            /**
             * Gets or sets the Aplha component of color, from 0 to 255.
             **/
            set: function (value) {
                if (value < 0 || value > 255)
                    throw new latte.InvalidArgumentEx('value', value);
                this._a = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            /**
             * Gets or sets the Blue component of color, from 0 to 255.
             **/
            get: function () {
                return this._b;
            },
            /**
             * Gets or sets the Blue component of color, from 0 to 255.
             **/
            set: function (value) {
                if (value < 0 || value > 255)
                    throw new latte.InvalidArgumentEx('value', value);
                this._b = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            /**
             * Gets or sets the Green component of color, from 0 to 255.
             **/
            get: function () {
                return this._g;
            },
            /**
             * Gets or sets the Green component of color, from 0 to 255.
             **/
            set: function (value) {
                if (value < 0 || value > 255)
                    throw new latte.InvalidArgumentEx('value', value);
                this._g = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a copy of the color with the specified alpha between 0 and 255.
         *
         * @param alpha
         */
        Color.prototype.fade = function (alpha) {
            return new Color(this.r, this.g, this.b, alpha);
        };
        /**
         * Returns a copy of the color with the specified alpha between 0 and 1.
         *
         * @param alpha
         */
        Color.prototype.fadeFloat = function (alpha) {
            return new Color(this.r, this.g, this.b, alpha * 255);
        };
        Object.defineProperty(Color.prototype, "isDark", {
            /**
             * Gets a value indicating if the color is a dark color, by checking its perceived luminosity
             *
             * @returns {boolean}
             */
            get: function () {
                return this.perceivedLuminosity > 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "isLight", {
            /**
             * Gets a value indicating if the color is a light color, by checking its perceived luminosity
             *
             * @returns {boolean}
             */
            get: function () {
                return this.perceivedLuminosity <= 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "isTransparent", {
            /**
             * Gets a value indicating if the color is transparent.
             **/
            get: function () {
                return this.a === 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "perceivedLuminosity", {
            /**
             * Returns the perceived luminosity
             * @returns {number}
             */
            get: function () {
                // Preceived Luminosity
                var a = 1 - (this.r * 0.299 + this.g * 0.587 + this.b * 0.114) / 255;
                return a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "r", {
            /**
             * Gets or sets the Red component of color, from 0 to 255.
             **/
            get: function () {
                return this._r;
            },
            /**
             * Gets or sets the Red component of color, from 0 to 255.
             **/
            set: function (value) {
                if (value < 0 || value > 255)
                    throw new latte.InvalidArgumentEx('value', value);
                this._r = value;
            },
            enumerable: true,
            configurable: true
        });
        return Color;
    })();
    latte.Color = Color;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a specific date and time
     **/
    var DateTime = (function () {
        /**
         * Creates the DateTime object
         **/
        function DateTime(year, month, day, hour, minute, second, millisecond) {
            if (year === void 0) { year = 1; }
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            if (hour === void 0) { hour = 0; }
            if (minute === void 0) { minute = null; }
            if (second === void 0) { second = null; }
            if (millisecond === void 0) { millisecond = null; }
            // Calculate days
            var days = DateTime.absoluteDays(year, month, day);
            // Calculate TimeSpan
            this._span = new latte.TimeSpan(days, hour, minute, second, millisecond);
        }
        /**
         * Returns the absolute number of days on the specified day-month-year
         **/
        DateTime.absoluteDays = function (year, month, day) {
            var div = function (a, b) {
                return Math.floor(a / b);
            };
            var arr = DateTime.isLeapYear(year) ? [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] : [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            var num = year - 1;
            var num2 = ((((((num * 365) + div(num, 4)) - div(num, 100)) + div(num, 400)) + arr[month - 1]) + day) - 1;
            return num2;
        };
        /**
         * Returns the amount of days in the specified month of the specified year
         **/
        DateTime.daysInMonth = function (year, month) {
            if (DateTime.isLeapYear(year)) {
                return DateTime.monthDaysLeapYear[month];
            }
            else {
                return DateTime.monthDays[month];
            }
        };
        /**
         * Returns a DateTime object from the specifed date and time components
         **/
        DateTime.fromDateAndTime = function (date, time) {
            if (!(date instanceof DateTime))
                throw new latte.InvalidArgumentEx('date');
            if (!(time instanceof latte.TimeSpan))
                throw new latte.InvalidArgumentEx('time');
            return new DateTime(date.year, date.month, date.day, time.hours, time.minutes, time.seconds, time.milliseconds);
        };
        /**
         * Returns a DateTime object from the specified amount of milliseconds
         **/
        DateTime.fromMilliseconds = function (milliseconds) {
            var d = new DateTime();
            d._span = latte.TimeSpan.fromMilliseconds(milliseconds);
            return d;
        };
        /**
         * Creates a DateTime object from the specified string.
         String should be in the format <c>yyyy-mm-dd hh:mm:ss</c>
         **/
        DateTime.fromString = function (dateTimeString) {
            if (!latte._isString(dateTimeString))
                throw new latte.InvalidArgumentEx('dateTimeString', dateTimeString);
            if (dateTimeString.length === 0)
                return new DateTime();
            var year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0;
            var parts = dateTimeString.split(' ');
            var dateParts = parts.length > 0 ? parts[0].split('-') : [];
            var timeParts = parts.length > 1 ? parts[1].split(':') : [];
            if (dateParts.length === 3) {
                year = parseInt(dateParts[0], 10);
                month = parseInt(dateParts[1], 10);
                day = parseInt(dateParts[2], 10);
            }
            if (timeParts.length === 3) {
                hour = parseInt(timeParts[0], 10);
                minute = parseInt(timeParts[1], 10);
                second = parseInt(timeParts[2], 10);
            }
            if (year <= 0)
                year = 1;
            if (month <= 0)
                month = 1;
            if (day <= 0)
                day = 1;
            return new DateTime(year, month, day, hour, minute, second);
        };
        /**
         * Returns a value indicating if the specified year is leap year
         **/
        DateTime.isLeapYear = function (year) {
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                return true;
            }
            return false;
        };
        Object.defineProperty(DateTime, "now", {
            /**
             * Gets a DateTime representing the current millisecond
             **/
            get: function () {
                var d = new Date();
                return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime, "today", {
            /**
             * Gets a DateTime representing the current day without time component
             **/
            get: function () {
                var d = new Date();
                return new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime, "tomorrow", {
            /**
             * Gets a DateTime representing the day of tomorrow without time component
             **/
            get: function () {
                var d = new Date();
                return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime, "yesterday", {
            /**
             * Gets a DateTime representing the day of yesterday without time component
             **/
            get: function () {
                var d = new Date();
                return (new DateTime(d.getFullYear(), d.getMonth() + 1, d.getDate())).addDays(-1);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Prepends a zero to the number if lower than 10
         **/
        DateTime.prototype._zeroPad = function (n) {
            return n <= 9 ? '0' + n.toString() : n.toString();
        };
        /**
         * Returns the specified element of date.
         Possible values for <c>what</c> are: <c>year</c> | <c>month</c> | <c>dayyear</c> | <c>day</c>
         **/
        DateTime.prototype.fromTimeSpan = function (what) {
            var div = function (a, b) {
                return Math.floor(a / b);
            };
            var num2 = this._span.days;
            var num3 = div(num2, 146097);
            num2 -= num3 * 146097;
            var num4 = div(num2, 36524);
            if (num4 == 4) {
                num4 = 3;
            }
            num2 -= num4 * 36524;
            var num5 = div(num2, 1461);
            num2 -= num5 * 1461;
            var num6 = div(num2, 365);
            if (num6 == 4) {
                num6 = 3;
            }
            if (what == "year") {
                return (((((num3 * 400) + (num4 * 100)) + (num5 * 4)) + num6) + 1);
            }
            num2 -= num6 * 365;
            if (what == "dayyear") {
                return (num2 + 1);
            }
            var arr = ((num6 == 3) && ((num5 != 24) || (num4 == 3))) ? [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] : [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
            var index = num2 >> 6;
            while (num2 >= arr[index]) {
                index++;
            }
            if (what == "month") {
                return index;
            }
            return ((num2 - arr[index - 1]) + 1);
        };
        /**
         * Returns the result of adding the specified timespan to this date
         **/
        DateTime.prototype.add = function (timespan) {
            return DateTime.fromMilliseconds(this._span.millis + timespan.millis);
        };
        /**
         * Returns the result of adding the specified amount of days to this date
         **/
        DateTime.prototype.addDays = function (days) {
            return DateTime.fromMilliseconds(this._span.millis + days * 86400000);
        };
        /**
         * Returns the result of adding the specified amount of hours to this date
         **/
        DateTime.prototype.addHours = function (hours) {
            return DateTime.fromMilliseconds(this._span.millis + hours * 3600000);
        };
        /**
         * Returns the result of adding the specified amount of milliseconds to this date
         **/
        DateTime.prototype.addMilliseconds = function (milliseconds) {
            return DateTime.fromMilliseconds(this._span.millis + milliseconds);
        };
        /**
         * Returns the result of adding the specified amount of minutes to this date
         **/
        DateTime.prototype.addMinutes = function (minutes) {
            return DateTime.fromMilliseconds(this._span.millis + minutes * 60000);
        };
        /**
         * Returns the result of adding the specified amount of months to this date
         **/
        DateTime.prototype.addMonths = function (months) {
            var year = this.year;
            var month = this.month;
            var day = this.day;
            var newMonth = month - 1 + months;
            if (newMonth < 0) {
                month = 12 + (newMonth + 1) % 12;
                year += Math.ceil((newMonth - 11) / 12);
            }
            else {
                month = newMonth % 12 + 1;
                year += Math.floor(newMonth / 12);
            }
            if (year < 1 || year > 9999) {
                throw new latte.InvalidArgumentEx('months');
            }
            else {
                var daysInMonth = DateTime.daysInMonth(year, month);
                if (day > daysInMonth)
                    day = daysInMonth;
                return new DateTime(year, month, day);
            }
        };
        /**
         * Returns the result of adding the specified amount of seconds to this date
         **/
        DateTime.prototype.addSeconds = function (seconds) {
            return new DateTime(this._span.millis + seconds * 1000);
        };
        /**
         * Returns the result of adding the specified amount of years to this date
         **/
        DateTime.prototype.addYears = function (years) {
            return this.addMonths(years * 12);
        };
        /**
         * Returns the result of comparing this datetime to the specified datetime
         **/
        DateTime.prototype.compareTo = function (datetime) {
            return this._span.compareTo(datetime._span);
        };
        Object.defineProperty(DateTime.prototype, "date", {
            /**
             * Returns just the date component of this datetime
             **/
            get: function () {
                return new DateTime(this.year, this.month, this.day);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Gets a value indicating if the specified datetime is equals to this datetime
         **/
        DateTime.prototype.equals = function (datetime) {
            return this._span.equals(datetime._span);
        };
        /**
         * Returns a value indicating if the date is contained in the range specified by the arguments
         **/
        DateTime.prototype.onRange = function (start, end) {
            return this.compareTo(start) >= 0 && this.compareTo(end) <= 0;
        };
        /**
         * Returns the result of subtracting the specified datetime to this datetime
         **/
        DateTime.prototype.subtractDate = function (datetime) {
            if (!(datetime instanceof DateTime))
                throw new latte.InvalidArgumentEx('datetime');
            return latte.TimeSpan.fromMilliseconds(this._span.millis - datetime._span.millis);
        };
        /**
         * Returns the result of subtracting the specified timespan to this datetime
         **/
        DateTime.prototype.subtractTime = function (timespan) {
            if (!(timespan instanceof latte.TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return DateTime.fromMilliseconds(this._span.millis - timespan.millis);
        };
        /**
         * Returns a relative representatio of the date, like "Yesterday 10:00AM"
         **/
        DateTime.prototype.toRelativeString = function () {
            var now = DateTime.now;
            var today = DateTime.today;
            var yesterday = DateTime.yesterday;
            var timePart = this._zeroPad(this.hour) + ':' + this._zeroPad(this.minute);
            var datePart = "";
            var d = this.date;
            var t = this.timeOfDay;
            var diff;
            if (this.date.equals(today)) {
                diff = now.timeOfDay.subtract(t);
                var hours = Math.ceil(diff.totalHours);
                var minutes = Math.ceil(diff.totalMinutes);
                if (diff.totalSeconds < 60) {
                    return strings.justNow;
                }
                else if (diff.totalMinutes == 1) {
                    return strings.oneMinuteAgo;
                }
                else if (minutes < 60) {
                    return latte.sprintf(strings.SMinutesAgo, minutes);
                }
                else if (hours == 1) {
                    return strings.oneHourAgo;
                }
                else {
                    return latte.sprintf(strings.SHoursAgo, hours);
                }
            }
            else if (d.equals(yesterday)) {
                datePart = strings.yesterday;
            }
            else if (this.compareTo(today) < 0) {
                timePart = '';
                diff = today.subtractDate(this);
                var days = Math.ceil(diff.totalDays);
                var weeks = Math.ceil(days / 7);
                var years = Math.ceil(weeks / 51);
                if (days < 7) {
                    datePart = latte.sprintf(strings.SDaysAgo, days);
                }
                else if (weeks == 1) {
                    datePart = strings.oneWeekAgo;
                }
                else if (weeks < 51) {
                    datePart = latte.sprintf(strings.SWeeksAgo, weeks);
                }
                else if (years == 1) {
                    datePart = strings.oneYearAgo;
                }
                else {
                    datePart = latte.sprintf(strings.SYearsAgo, years);
                }
            }
            else {
                return this.toString();
            }
            return datePart + ' ' + timePart;
        };
        Object.defineProperty(DateTime.prototype, "day", {
            /**
             * Gets the day of this datetime
             **/
            get: function () {
                return this.fromTimeSpan("day");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "dayOfWeek", {
            /**
             * Gets the day of week this datetime. Sunday is 0 and Saturday is 6.
             **/
            get: function () {
                return (this._span.days + 1) % 7;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "dayOfWeekString", {
            /**
             * Gets the name of the day of the week
             * @returns {*}
             */
            get: function () {
                var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                return strings[days[this.dayOfWeek]];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "dayOfYear", {
            /**
             * Gets the day of year datetime
             **/
            get: function () {
                return this.fromTimeSpan("dayyear");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "hour", {
            /**
             * Gets the hour of the datetime
             **/
            get: function () {
                return this._span.hours;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "millisecond", {
            /**
             * Gets the millisecond of the date
             **/
            get: function () {
                return this._span.milliseconds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "minute", {
            /**
             * Gets the minute of the time
             **/
            get: function () {
                return this._span.minutes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "month", {
            /**
             * Gets the month of the date
             **/
            get: function () {
                return this.fromTimeSpan("month");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "monthString", {
            /**
             * Gets the name of the month of the date
             **/
            get: function () {
                return strings["january february march april may june july august september october november december".split(" ")[this.month - 1]];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "second", {
            /**
             * Gets the second of the date
             **/
            get: function () {
                return this._span.seconds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "timeOfDay", {
            /**
             * Gets the time component of this datetime
             **/
            get: function () {
                return latte.TimeSpan.fromMilliseconds(this._span.millis % 86400000);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a formatted string
         **/
        DateTime.prototype.toFormattedString = function () {
            var datepart = latte.sprintf('%s/%s/%s', this.day, this.monthString, this.year);
            var timepart = this._zeroPad(this.hour) + ':' + this._zeroPad(this.minute);
            if (this.timeOfDay.totalSeconds > 0) {
                return latte.sprintf('%s %s', datepart, timepart);
            }
            else {
                return datepart;
            }
        };
        /**
         * Gets the DateTime as a string
         **/
        DateTime.prototype.toString = function () {
            if (isNaN(this.year))
                return '';
            var t = this.timeOfDay;
            var r = this.year + '-' + this._zeroPad(this.month) + '-' + this._zeroPad(this.day);
            if (!t.isEmpty) {
                r += ' ' + this._zeroPad(t.hours) + ":" + this._zeroPad(t.minutes) + ':' + this._zeroPad(t.seconds);
            }
            return r;
        };
        Object.defineProperty(DateTime.prototype, "weekOfYear", {
            /**
             * Gets the week number of date. First week of year is 1
             **/
            get: function () {
                var oneJan = new DateTime(this.year, 1, 1);
                return Math.ceil((this.dayOfYear + oneJan.dayOfWeek) / 7);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTime.prototype, "year", {
            /**
             * Gets the year of the date
             **/
            get: function () {
                return this.fromTimeSpan("year");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Amount of days in months of a non-leap year
         **/
        DateTime.monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        /**
         * Amount of days in months of leap year
         **/
        DateTime.monthDaysLeapYear = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return DateTime;
    })();
    latte.DateTime = DateTime;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var EventHandler = (function () {
        function EventHandler(handler, context) {
            this.handler = handler;
            this.context = context;
        }
        return EventHandler;
    })();
    latte.EventHandler = EventHandler;
    /**
     * Manages events and event handlers
     */
    var LatteEvent = (function () {
        /**
         *
         * @param context Context where
         */
        function LatteEvent(context) {
            this.context = context;
            this.handlers = [];
        }
        Object.defineProperty(LatteEvent.prototype, "handlerAdded", {
            /**
             * Gets the event for handler adding
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._handlerAdded) {
                    this._handlerAdded = new latte.LatteEvent(this);
                }
                return this._handlerAdded;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds a handler to the event
         * @param handler
         */
        LatteEvent.prototype.add = function (handler, context) {
            //            var c = context === null ? this.context : context;
            if (context === void 0) { context = null; }
            this.handlers.push(new EventHandler(handler, context));
            this.onHandlerAdded(handler);
        };
        /**
         * Raises the <c>handlerAdded</c> event
         * @param handler
         */
        LatteEvent.prototype.onHandlerAdded = function (handler) {
            this.handlerAdded.raise(handler);
        };
        /**
         * Raises the actual event handlers.
         * @param parameter
         * @returns {*}
         */
        LatteEvent.prototype.raise = function () {
            var parameter = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parameter[_i - 0] = arguments[_i];
            }
            var args = arguments;
            for (var i = 0; i < this.handlers.length; i++) {
                var evh = this.handlers[i];
                var result = evh.handler.apply(evh.context || this.context, args);
                if (typeof result !== 'undefined') {
                    return result;
                }
            }
        };
        return LatteEvent;
    })();
    latte.LatteEvent = LatteEvent;
})(latte || (latte = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var latte;
(function (latte) {
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
    var InvalidArgumentEx = (function (_super) {
        __extends(InvalidArgumentEx, _super);
        /**
         * Creates the exception
         *
         * @param argument
         * @param value
         */
        function InvalidArgumentEx(argument, value) {
            if (argument === void 0) { argument = ""; }
            if (value === void 0) { value = ""; }
            _super.call(this);
            this.argument = argument;
            this.value = value;
        }
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        InvalidArgumentEx.prototype.toString = function () {
            return "Invalid argument: " + (this.argument ? this.argument : '<no argument specified>') + (!this.value ? " ( " + this.value + ")" : '');
        };
        return InvalidArgumentEx;
    })(latte.Ex);
    latte.InvalidArgumentEx = InvalidArgumentEx;
})(latte || (latte = {}));
var latte;
(function (latte) {
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
    var InvalidCallEx = (function (_super) {
        __extends(InvalidCallEx, _super);
        /**
         * Creates the Exception
         * @param method
         */
        function InvalidCallEx(method) {
            if (method === void 0) { method = null; }
            _super.call(this);
            this.method = method;
        }
        /**
         * Returns a string explaining the exception
         *
         * @returns {string}
         */
        InvalidCallEx.prototype.toString = function () {
            return "Invalid call: " + (this.method ? this.method : '<no method specified>');
        };
        return InvalidCallEx;
    })(latte.Ex);
    latte.InvalidCallEx = InvalidCallEx;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 2/6/14.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var Culture = (function () {
        //endregion
        /**
         *
         */
        function Culture() {
            //endregion
            //region Fields
            /**
             * Short date format
             */
            this.shortDateFormat = 'dd/MM/yyyy';
            /**
             * Long date format
             */
            this.longDateFormat = 'dddd, d de MMMM de YYYY';
            /**
             * Amount of decimals to show in currency format
             */
            this.currencyDecimals = 2;
            /**
             * Separator of decimals for currency
             */
            this.numberDecimalsSeparator = '.';
            /**
             * Thousands separator for currency
             */
            this.numberThousandsSeparator = ',';
            /**
             * Symbol to use in currency
             */
            this.currencySymbol = '$';
        }
        Object.defineProperty(Culture, "current", {
            /**
             * Gets or sets the current culture of the system
             *
             * @returns {Culture}
             */
            get: function () {
                if (!Culture._current) {
                    Culture._current = Culture.esMx;
                }
                return this._current;
            },
            /**
             * Gets or sets the current culture of the system
             *
             * @param {Culture} value
             */
            set: function (value) {
                this._current = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Culture, "esMx", {
            /**
             * Gets the Español-Mexico Culture
             *
             * @returns {Culture}
             */
            get: function () {
                if (!Culture._esMx) {
                    Culture._esMx = new Culture();
                    Culture._esMx.currencyDecimals = 2;
                    Culture._esMx.numberDecimalsSeparator = '.';
                    Culture._esMx.numberThousandsSeparator = ',';
                    Culture._esMx.currencySymbol = '$';
                    Culture._esMx.shortDateFormat = 'dd/MMM/yyyy';
                    Culture._esMx.longDateFormat = 'dddd, d de MMMM de YYYY';
                }
                return Culture._esMx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Culture, "enUs", {
            /**
             * Gets the English-USA Culture
             *
             * @returns {Culture}
             */
            get: function () {
                if (!Culture._enUs) {
                    Culture._enUs = new Culture();
                    Culture._enUs.currencyDecimals = 2;
                    Culture._enUs.numberDecimalsSeparator = '.';
                    Culture._enUs.numberThousandsSeparator = ',';
                    Culture._enUs.currencySymbol = '$';
                    Culture._enUs.shortDateFormat = 'MMM/dd/yyyy';
                    Culture._enUs.longDateFormat = 'dddd, MMMM d YYYY';
                }
                return Culture._enUs;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Formats currency using the current culture
         * @param n
         * @returns {string}
         */
        Culture.formatCurrency = function (n) {
            return Culture.current.onFormatCurrency(n);
        };
        /**
         * Formats a number using the current Culture
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        Culture.formatNumber = function (n, decimals, symbol) {
            if (decimals === void 0) { decimals = 0; }
            if (symbol === void 0) { symbol = ''; }
            return Culture.current.onFormatNumber(n, decimals, symbol);
        };
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Returns the specified number as a currency
         * @param n
         */
        Culture.prototype.onFormatCurrency = function (n) {
            return this.onFormatNumber(n, this.currencyDecimals, this.currencySymbol);
        };
        /**
         * Formats the specified number
         * @param n
         * @param decimals
         * @param symbol
         * @returns {string}
         */
        Culture.prototype.onFormatNumber = function (n, decimals, symbol) {
            if (decimals === void 0) { decimals = 0; }
            if (symbol === void 0) { symbol = ''; }
            var point = this.numberDecimalsSeparator; //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)
            //if you don't want to use a thousands separator you can pass empty string as thousands_sep value
            var separator = this.numberThousandsSeparator;
            var sign = (n < 0) ? '-' : '';
            //extracting the absolute value of the integer part of the number and converting to string
            var round = parseInt(Math.abs(n).toFixed(decimals)) + '';
            var length = round.length;
            var offset = ((length) > 3) ? length % 3 : 0;
            var a = sign;
            var b = symbol;
            var c = (offset ? round.substr(0, offset) + separator : '');
            var d = round.substr(offset).replace(/(\d{3})(?=\d)/g, "$1" + separator);
            //[Hack]
            var e = (decimals ? point + (Math.abs(n) - parseInt(round)).toFixed(decimals).slice(2) : '');
            return a + b + c + d + e;
        };
        //region Static
        /**
         * Property field
         */
        Culture._current = null;
        return Culture;
    })();
    latte.Culture = Culture;
})(latte || (latte = {}));
/**
 * Created by josemanuel on 5/26/15.
 */
var latte;
(function (latte) {
    /**
     *
     */
    var LoadInfo = (function () {
        //endregion
        //region Fields
        //endregion
        /**
         * @private
         */
        function LoadInfo() {
            //endregion
            //region Properties
            /**
             * Property field
             */
            this._loadingText = null;
        }
        Object.defineProperty(LoadInfo, "instance", {
            /**
             * Gets the load mechanism singleton.
             *
             * @returns {LoadMechanism}
             */
            get: function () {
                if (!this._instance) {
                    this._instance = new LoadInfo();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        //region Private Methods
        //endregion
        //region Methods
        /**
         * Ends a loading process
         */
        LoadInfo.prototype.end = function () {
            this.onLoadingEnd();
        };
        /**
         * Raises the <c>loadingStart</c> event
         */
        LoadInfo.prototype.onLoadingStart = function () {
            if (this._loadingStart) {
                this._loadingStart.raise();
            }
            else {
                latte.log("Loading: " + this.loadingText);
            }
        };
        /**
         * Raises the <c>loadingEnd</c> event
         */
        LoadInfo.prototype.onLoadingEnd = function () {
            if (this._loadingEnd) {
                this._loadingEnd.raise();
            }
            else {
                latte.log(this.loadingText + "-> Done.");
            }
        };
        /**
         * Raises the <c>loadingText</c> event
         */
        LoadInfo.prototype.onLoadingTextChanged = function () {
            if (this._loadingTextChanged) {
                this._loadingTextChanged.raise();
            }
        };
        /**
         * Starts a loading process
         * @param text
         */
        LoadInfo.prototype.start = function (text) {
            this.loadingText = text;
            this.onLoadingStart();
        };
        Object.defineProperty(LoadInfo.prototype, "loadingStart", {
            /**
             * Gets an event raised when the loading starts
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._loadingStart) {
                    this._loadingStart = new latte.LatteEvent(this);
                }
                return this._loadingStart;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadInfo.prototype, "loadingEnd", {
            /**
             * Gets an event raised when the loading ends
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._loadingEnd) {
                    this._loadingEnd = new latte.LatteEvent(this);
                }
                return this._loadingEnd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadInfo.prototype, "loadingTextChanged", {
            /**
             * Gets an event raised when the value of the loadingText property changes
             *
             * @returns {LatteEvent}
             */
            get: function () {
                if (!this._loadingTextChanged) {
                    this._loadingTextChanged = new latte.LatteEvent(this);
                }
                return this._loadingTextChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadInfo.prototype, "loadingText", {
            /**
             * Gets or sets the text of the load information
             *
             * @returns {string}
             */
            get: function () {
                return this._loadingText;
            },
            /**
             * Gets or sets the text of the load information
             *
             * @param {string} value
             */
            set: function (value) {
                // Check if value changed
                var changed = value !== this._loadingText;
                // Set value
                this._loadingText = value;
                // Trigger changed event
                if (changed) {
                    this.onLoadingTextChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        return LoadInfo;
    })();
    latte.LoadInfo = LoadInfo;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Reprsents a Rectangle
     **/
    var Rectangle = (function () {
        /**
         * Creates a rectangle with the specified left, top, width and height.
         **/
        function Rectangle(left, top, width, height) {
            if (left === void 0) { left = 0; }
            if (top === void 0) { top = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.top = top;
            this.left = left;
            this.width = width;
            this.height = height;
        }
        /**
         * Creates a rectangle with the specified left, right, top and bottom.
         **/
        Rectangle.fromLRTB = function (left, right, top, bottom) {
            var r = new Rectangle(left, top);
            r.right = right;
            r.bottom = bottom;
            return r;
        };
        /**
         * Returns the result of centering this into the specified container
         **/
        Rectangle.prototype.center = function (container) {
            var c = new Rectangle(container.left + (container.width - this.width) / 2, container.top + (container.height - this.height) / 2, this.width, this.height);
            return c;
        };
        /**
         * Gets a value indicating if the specified point is contained
         **/
        Rectangle.prototype.contains = function (x, y) {
            return this._left <= x && this.right >= x && this._top <= y && this.bottom >= y;
        };
        /**
         * Gets a value indicating if the rectangle is contained inside this rectangle
         **/
        Rectangle.prototype.containsRectangle = function (rectangle) {
            return this.contains(rectangle.left, rectangle.top) && this.contains(rectangle.right, rectangle.bottom);
        };
        /**
         * Returns the result of inflating the rectangle vertically and horizontally on each edge.
         **/
        Rectangle.prototype.inflate = function (horizontal, vertical) {
            // Check arguments
            if (!latte._isNumber(horizontal))
                throw new latte.InvalidArgumentEx('horizontal', horizontal);
            if (!latte._isNumber(vertical))
                throw new latte.InvalidArgumentEx('vertical', vertical);
            return Rectangle.fromLRTB(this.left - horizontal, this.right + horizontal, this.top - vertical, this.bottom + vertical);
        };
        /**
         * Returns the rectangle result of intersecting this with passed rectangle
         **/
        Rectangle.prototype.intersection = function (rectangle) {
            return Rectangle.fromLRTB(Math.max(this.left, rectangle.left), Math.min(this.right, rectangle.right), Math.max(this.top, rectangle.top), Math.min(this.bottom, rectangle.bottom));
        };
        /**
         * Gets a value indicating if the rectangle intersects specified rectangle
         **/
        Rectangle.prototype.intersects = function (rectangle) {
            return this.contains(rectangle.left, rectangle.top) || this.contains(rectangle.right, rectangle.top) || this.contains(rectangle.right, rectangle.bottom) || this.contains(rectangle.left, rectangle.bottom);
        };
        /**
         * Returns a string describing the rectangle
         **/
        Rectangle.prototype.toString = function () {
            return "Rectangle: " + [this._left, this._top, this._width, this._height].join(', ');
        };
        /**
         * Gets a rectangle representing the union of this rectangle and the passed one
         **/
        Rectangle.prototype.union = function (rectangle) {
            return Rectangle.fromLRTB(Math.min(this.left, rectangle.left), Math.max(this.right, rectangle.right), Math.min(this.top, rectangle.top), Math.max(this.bottom, rectangle.bottom));
        };
        Object.defineProperty(Rectangle.prototype, "bottom", {
            /**
             * Gets or sets the right side of the rectangle
             **/
            get: function () {
                return this._top + this._height;
            },
            /**
             * Gets or sets the right side of the rectangle
             **/
            set: function (value) {
                this._height = value - this._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "height", {
            /**
             * Gets or sets the height of the rectangle
             **/
            get: function () {
                return this._height;
            },
            /**
             * Gets or sets the height of the rectangle
             **/
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "left", {
            /**
             * Gets or sets the left of the rectangle
             **/
            get: function () {
                return this._left;
            },
            /**
             * Gets or sets the left of the rectangle
             **/
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "right", {
            /**
             * Gets or sets the right side of the rectangle
             **/
            get: function () {
                return this._left + this._width;
            },
            /**
             * Gets or sets the right side of the rectangle
             **/
            set: function (value) {
                this._width = value - this._left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "tag", {
            get: function () {
                return this._tag;
            },
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
            /**
             * Gets or sets the top of the rectangle
             **/
            get: function () {
                return this._top;
            },
            /**
             * Gets or sets the top of the rectangle
             **/
            set: function (value) {
                this._top = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "width", {
            /**
             * Gets or sets the width of the rectangle
             **/
            get: function () {
                return this._width;
            },
            /**
             * Gets or sets the width of the rectangle
             **/
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        return Rectangle;
    })();
    latte.Rectangle = Rectangle;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Executes an action every specified amount of milliseconds
     **/
    var Timer = (function () {
        /**
         * Creates a timer that will call <c>callback</c> every specified amount of
         <c>milliseconds</c> on the specified <c>context</c>.
         **/
        function Timer(callback, milliseconds, context) {
            this.callback = callback;
            this.milliseconds = milliseconds;
            this.context = context;
        }
        Object.defineProperty(Timer.prototype, "callback", {
            /**
             * Gets or sets the function who will be called every tick
             **/
            get: function () {
                return this._callback;
            },
            /**
             * Gets or sets the function who will be called every tick
             **/
            set: function (value) {
                this._callback = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "context", {
            /**
             * Gets or sets the context in which the function is executed
             **/
            get: function () {
                return this._context;
            },
            /**
             * Gets or sets the context in which the function is executed
             **/
            set: function (value) {
                this._context = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "milliseconds", {
            /**
             * Gets or sets the milliseconds to sleep between calls
             **/
            get: function () {
                return this._milliseconds;
            },
            /**
             * Gets or sets the milliseconds to sleep between calls
             **/
            set: function (value) {
                this._milliseconds = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Pauses the timer
         **/
        Timer.prototype.pause = function () {
            this._paused = true;
        };
        /**
         * Starts ticking
         **/
        Timer.prototype.start = function () {
            var _this = this;
            if (this._paused === false)
                return;
            this._paused = false;
            setTimeout(function () {
                _this.tick();
            }, this.milliseconds);
        };
        /**
         * Ticks the timer. Executes the callback and programs next tick.
         **/
        Timer.prototype.tick = function () {
            var _this = this;
            // If paused, bye bye!
            if (this._paused === true)
                return;
            // Call callback
            this.callback.apply(this.context);
            // Program next tick
            setTimeout(function () {
                _this.tick();
            }, this.milliseconds);
        };
        return Timer;
    })();
    latte.Timer = Timer;
})(latte || (latte = {}));
var latte;
(function (latte) {
    /**
     * Represents a time interval.
     **/
    var TimeSpan = (function () {
        /**
         * Creates the TimeSpan with the specified parameters. Parameters not specified will be asumed to be zero.
         **/
        function TimeSpan(days, hours, minutes, seconds, milliseconds) {
            if (days === void 0) { days = 0; }
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (milliseconds === void 0) { milliseconds = 0; }
            this.millis = 0;
            this.millis = (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
        }
        /**
         * Creates a TimeSpan from the specified amount of days
         **/
        TimeSpan.fromDays = function (days) {
            return new TimeSpan(days);
        };
        /**
         * Creates a TimeSpan from the specified amount of hours
         **/
        TimeSpan.fromHours = function (hours) {
            return new TimeSpan(0, hours);
        };
        /**
         * Creates a TimeSpan from the specified amount of milliseconds
         **/
        TimeSpan.fromMilliseconds = function (milliseconds) {
            var t = new TimeSpan();
            t.millis = milliseconds;
            return t;
        };
        /**
         * Creates a TimeSpan from the specified amount of minutes
         **/
        TimeSpan.fromMinutes = function (minutes) {
            return new TimeSpan(0, 0, minutes);
        };
        /**
         * Creates a TimeSpan from the specified amount of seconds
         **/
        TimeSpan.fromSeconds = function (seconds) {
            return new TimeSpan(0, 0, 0, seconds);
        };
        /**
         * Creates a TimeSpan object from the specified string.
         String should be in the format <c>hh:mm:ss</c>
         **/
        TimeSpan.fromString = function (timeString) {
            var parts = timeString.split(':');
            var hours = parts.length > 0 && latte._isNumeric(parts[0]) ? parseInt(parts[0], 10) : 0;
            var minutes = parts.length > 1 && latte._isNumeric(parts[1]) ? parseInt(parts[1], 10) : 0;
            var seconds = parts.length > 2 && latte._isNumeric(parts[2]) ? parseInt(parts[2], 10) : 0;
            return new TimeSpan(0, hours, minutes, seconds);
        };
        /**
         * Gets a timespan with the time passed since the specified date and time
         * @param d
         */
        TimeSpan.timeSince = function (d) {
            return latte.DateTime.now.subtractDate(d);
        };
        /**
         * Makes math rounding depending on the sign of the milliseconds
         **/
        TimeSpan.prototype._rounder = function (number) {
            if (this.millis < 0)
                return Math.ceil(number);
            return Math.floor(number);
        };
        /**
         * Prepends a zero to the number if lower than 10
         **/
        TimeSpan.prototype._zeroPad = function (n) {
            return n <= 9 ? '0' + n.toString : n.toString();
        };
        /**
         * Returns the result of adding the specified timespan to this timespan
         **/
        TimeSpan.prototype.add = function (timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return TimeSpan.fromMilliseconds(this.millis + timespan.millis);
        };
        /**
         * Returns the result of adding the specified amount of hours to this timespan
         **/
        TimeSpan.prototype.addHours = function (hours) {
            return this.add(new TimeSpan(0, hours));
        };
        /**
         * Returns the result of adding the specified amount of minutes to this timespan
         **/
        TimeSpan.prototype.addMinutes = function (minutes) {
            return this.add(new TimeSpan(0, 0, minutes));
        };
        /**
         * Returns the result of adding the specified amount of seconds to this timespan
         **/
        TimeSpan.prototype.addSeconds = function (seconds) {
            return this.add(new TimeSpan(0, 0, 0, seconds));
        };
        /**
         * Returns the result of comparing this timespan against the provided timespan
         **/
        TimeSpan.prototype.compareTo = function (timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            if (this.millis > timespan.millis)
                return 1;
            if (this.millis == timespan.millis)
                return 0;
            if (this.millis < timespan.millis)
                return -1;
            throw new latte.Ex();
        };
        /**
         * Returns a timespan representing the actual duration of the timespan
         **/
        TimeSpan.prototype.duration = function () {
            return new TimeSpan(Math.abs(this.millis));
        };
        /**
         * Returns a value indicating if this timespan represents the same than the specified timespan
         **/
        TimeSpan.prototype.equals = function (timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return this.millis == timespan.millis;
        };
        /**
         * Negates the timespan duration
         **/
        TimeSpan.prototype.negate = function () {
            this.millis *= -1;
        };
        /**
         * Returns the result of subtracting the specified timespan to this timespan
         **/
        TimeSpan.prototype.subtract = function (timespan) {
            if (!(timespan instanceof TimeSpan))
                throw new latte.InvalidArgumentEx('timespan');
            return TimeSpan.fromMilliseconds(this.millis - timespan.millis);
        };
        /**
         * Returns this timespan as a string
         **/
        TimeSpan.prototype.toString = function () {
            return (this.millis < 0 ? '-' : '') + (this.days ? this.days + ' ' : '') + this._zeroPad(this.hours) + ":" + this._zeroPad(this.minutes) + (this.seconds ? ':' + this._zeroPad(this.seconds) : '') + (this.milliseconds ? '.' + Math.abs(this.milliseconds) : '');
        };
        Object.defineProperty(TimeSpan.prototype, "days", {
            /**
             * Gets the days component of the time interval represented by this object
             **/
            get: function () {
                return this._rounder(this.millis / 86400000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "hours", {
            /**
             * Gets the hours component of the time interval represented by this object
             **/
            get: function () {
                return this._rounder((this.millis % (24 * 3600 * 1000)) / (3600 * 1000));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "isEmpty", {
            /**
             * Gets a value indicating if the total time this timespan represents is zero
             **/
            get: function () {
                return this.millis == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "milliseconds", {
            /**
             * Gets the milliseconds component of the time interval represented by this object
             **/
            get: function () {
                return this._rounder(this.millis % 1000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "minutes", {
            /**
             * Gets the minutes component of the time interval represented by this object
             **/
            get: function () {
                return this._rounder((this.millis % (3600 * 1000)) / (60 * 1000));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "seconds", {
            /**
             * Gets the seconds component of the time interval represented by this object
             **/
            get: function () {
                return this._rounder((this.millis % 60000) / 1000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalDays", {
            /**
             * Gets the value of this timespan expressed in whole and fractional days
             **/
            get: function () {
                //                     86400000
                return this.millis / (86400000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalHours", {
            /**
             * Gets the value of this timespan expressed in whole and fractional hours
             **/
            get: function () {
                return this.millis / (3600000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalMilliseconds", {
            /**
             * Gets the value of this timespan expressed in milliseconds
             **/
            get: function () {
                return this.millis;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalMinutes", {
            /**
             * Gets the value of this timespan expressed in whole and fractional minutes
             **/
            get: function () {
                return this.millis / (60 * 1000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSpan.prototype, "totalSeconds", {
            /**
             * Gets the value of this timespan expressed in whole and fractional seconds
             **/
            get: function () {
                return this.millis / 1000;
            },
            enumerable: true,
            configurable: true
        });
        return TimeSpan;
    })();
    latte.TimeSpan = TimeSpan;
})(latte || (latte = {}));
var latte;
(function (latte) {
    var HEvent = (function () {
        function HEvent() {
        }
        return HEvent;
    })();
    latte.HEvent = HEvent;
})(latte || (latte = {}));
