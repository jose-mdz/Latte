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
module latte{

    /**
     * Saves data about deprecated warns
     */
    var deprecatedWarns: any = {}

    /**
     * Holds a list of already included plugins
     *
     * @type {Array<string>}
     */
    export var includedPlugins : Object = {};

    /**
     * Tells if the passed objects are equal in its properties
     *
     * @param {object} a
     * @param {object} b
     */
    export function _equalObjects(a, b){
        if(!_isObject(a) || !_isObject(b)) throw 'No objects';

        var p;

        for(p in a) {
            if(typeof(b[p])=='undefined') {
                return false;
            }
        }

        for(p in a) {
            if (a[p]) {
                switch(typeof(a[p])) {
                    case 'object':
                        if (!a[p].equals(b[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof(b[p])=='undefined' ||
                            (p != 'equals' && a[p].toString() != b[p].toString()))
                            return false;
                        break;
                    default:
                        if (a[p] != b[p]) {
                            return false;
                        }
                }
            } else {
                if (b[p])
                    return false;
            }
        }

        for(p in b) {
            if(typeof(a[p])=='undefined') {
                return false;
            }
        }

        return true;
    };

    /**
     * Returns a value indicating if the parameter is a number
     *
     * @returns {boolean}
     */
    export function _isNumber(param){ return typeof param == 'number'; };

    /**
     * Returns a value indicating if the parameter is a boolean
     *
     * @returns {boolean}
     */
    export function _isBoolean(param){ return typeof param == 'boolean'; };

    /**
     * Returns a value indicating if the parameter is a string
     *
     * @returns {boolean}
     */
    export function _isString(param){ return typeof param == 'string'; };

    /**
     * Returns a value indicating if the parameter is an Array, optionally specifies
     * the minimum length required to return a true value
     *
     * @returns {boolean}
     */
    export function _isArray(param, minLength = 0){ return (param instanceof Array) && param.length >= minLength; };

    /**
     * Returns a value indicating if the parameter is a Function
     *
     * @returns {boolean}
     */
    export function _isFunction(param){ return typeof param == 'function'; };

    /**
     * Returns a value indicating if the parameter is an Object
     *
     * @returns {boolean}
     */
    export function _isObject(param){ return typeof param == 'object'; };

    /**
     * Returns a value indicating if the parameter as string represents a numeric value
     *
     * @returns {boolean}
     */
    export function _isNumeric(param){
        var allowed = "1234567890.";

        if(!_isString(param))
            param = String(param);

        if(param.length == 0){
            return false;
        }else{
            for(var i = 0; i < param.length; i++)
                if (allowed.indexOf(param.charAt(i)) < 0)
                    return false;

            return true;
        }
    };

    /**
     * Gets or sets the latte Url. By default: /latte
     * @private
     */
    export function _latteUrl(value?: string){
        if(_undef(value)) {
            return window['-vendor-latte-url'] || '/latte';
        }else{
            window['-vendor-latte-url'] = value;
        }
    }

    /**
     * Returns a value indicating if the specified object is empty of properties
     * @param object
     * @returns {boolean}
     * @private
     */
    export function _empty(object){
        if(!object) return true;

        for(let i in object){
            return false;
        }
        return true;
    }

    /**
     * Returns a value indicating if the parameter is undefined
     *
     * @returns {boolean}
     */
    export function _undef(param){ return typeof param == 'undefined'; };

    /**
     * Logs the specified data if there's a console.
     */
    export function log(...any){
        if(!_undef(console) && !_undef(console.log)){
            if(arguments['length'] == 1){
                console.log(arguments[0]);
            }else{
                console.log(sprintf.apply(this, arguments));
            }
        }
    };

    /**
     * Merges the two objects
     * @param a
     * @param b
     * @private
     */
    export function _merge(a, b){
        for(var i in a){
            b[i] = a[i];
        }
        return b;
    }

    /**
     * sprintf for only %s strings
     */
    export function sprintf(...any){
        var arg = 1, format = arguments[0], cur, next, result = [];

        for(var i = 0; i < format.length; i++){

            cur = format.substr(i, 1);
            next = i == format.length - 1 ? '' : format.substr(i + 1, 1);

            if (cur == '%' && next == 's'){
                result.push(arguments[arg++]);
                i++;
            }else{
                result.push(cur);
            }
        }

        return result.join('');
    };

    /**
     * Warns user about deprecated code.
     *
     * @param code
     * @param alternateUse
     */
    export function warnDeprecated(code: string, alternateUse: string){
        if(_undef(deprecatedWarns[code]) && console && console.warn){
            deprecatedWarns[code] = true;
            console.warn(sprintf("latte: %s is deprecated. Please use %s instead", code, alternateUse));
        }
    }

}