/**
 * Created by josemanuel on 3/5/14.
 */

var path = require('path');
var fs = require('fs');

/**
 * Gets an information object about the specified php file.
 * It assumes code contains only one declaration of a class.
 *
 * @param filePath
 * @returns {*}
 */
exports.phpFileInfo = function(filePath){

    var code = fs.readFileSync(filePath, 'utf8');
    return exports.phpCodeInfo(code);
};

/**
 * Gets an information object about the specified php code.
 * It assumes code contains only one declaration of a class.
 *
 * */
exports.phpCodeInfo = function(code){


    var info = {
        name: '',
        type: '',
        extend: '',
        implement: '',
        constructor: '',
        description: '',
        methods: {},
        properties: {},
        events: {}
    };

    var comment = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
    var fn = /([\w+\s*]*)function\s*(\w+)\s*(\([^\)]*\))/g;
    var typeMatch = /[\w\\\\|]+\[?\]?/g;
    var property = /(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)?\s*(var|public|private|static)+\s*(var|public|private|static)?\s*(\$\w+)/g;


    //region Extract header
    var headMatches = code.match(/(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)?\s*(class|interface)\s*(\w+)\s*(extends\s+[\w\\\\|]+\[?\]?)?\s*(implements\s+[\w\\\\|]+\[?\]?)?\s*\{/i);

    if(headMatches && headMatches.length){
        info.description = getCommentDescription(headMatches[1]);
        info.type = headMatches[3];
        info.name = headMatches[4];
        info.extend = headMatches[5];
        info.implement = headMatches[6];
    }
    //endregion

    //region Extract properties

    var propertyMatches = code.match(property);

    if(propertyMatches && propertyMatches.length) {

        for(var i = 0; i < propertyMatches.length; i++){

            var propertyMatch = propertyMatches[i].match(new RegExp(property.source, 'i'));
            var pinfo = {};

            var comm = propertyMatch[1];
            var attrib1 = propertyMatch[3];
            var attrib2 = propertyMatch[4];
            var prop = propertyMatch[5];
            pinfo.description = getCommentDescription(comm);

            // Get type
            if(comm){
                var tm = comm.match(new RegExp(sprintf("@var\\s+(%s)", typeMatch.source)));
                pinfo.type = tm && tm.length ? tm[1] : '';
            }

            pinfo.attributes = [];

            if(attrib1) {
                pinfo.attributes.push(attrib1);
            }

            if(attrib2 && attrib1 != attrib2) {
                pinfo.attributes.push(attrib2);
            }

            info.properties[prop] = pinfo;

        }

    }
    //endregion

    //region Extract methods

    var functionregex = sprintf("(%s)?\\s*%s", comment.source, fn.source);
    var m = code.match(new RegExp(functionregex, 'g'));

    if(m && m.length) {

        for(var i = 0; i < m.length; i++){

            var mm = m[i].match(new RegExp(functionregex, 'i'));
            var minfo = { attributes: [] };
            var comment = mm[1];
            var method = mm[4];
            var atts = mm[3].split(' ');

            for(var j = 0; j < atts.length; j++){
                if(atts[j].trim()){
                    minfo.attributes.push(atts[j]);
                }
            }

            //Extract params from code
            minfo.params = {};
            minfo.name = mm[4];
            var params = mm[5].replace('(', '').replace(')', '').split(',');

            for(var j = 0; j < params.length; j++){
                var param = String(params[j]).trim();
                if(param){
                    minfo.params[param] = {};
                }
            }

            minfo = getPhpMethodInfo(comment, minfo);

            if(method == '__construct') {
                info.constructor = minfo;
            }else {
                info.methods[method] = minfo;
            }


        }

    }

    //endregion

    return info;

//    console.log(JSON.stringify(info));

}

/**
 * Clears the line of comment (Removes comment marks)
 */
function cleanCommentLine(line){
    line = line.replace('/*', '', line);
    line = line.replace('*/', '', line);
    line = line.trim();

    if(line.charAt(0) == '*'){
        line = line.substr(1);
    }

    return line;
}

/**
 * Gets the description part of a JSDoc or PHPDoc comment
 * @param comment
 * @returns {string}
 */
function getCommentDescription(comment){

    var lines = (comment || '').split('\n');
    var desc = [];

    for(var i = 0; i < lines.length; i++){
        var line = cleanCommentLine(lines[i]);

        if(line.trim().charAt(0) != '@'){
            desc.push(line);
        }
    }

    return desc.join('\n');

}

/**
 * Gets an info object for the specified method's PHPDoc
 * @param string phpdoc
 * @param object info
 * @returns object Detailed info
 */
function getPhpMethodInfo(phpdoc, info){

    var description = [];
    var lines = (phpdoc || '').split('\n');

//    console.log(info); //process.exit();

    for(var i = 0; i < lines.length; i++){
        var line = cleanCommentLine(lines[i]);
        var l = line.trim();

        // If comment
        if(l.charAt(0) != '@') {
            description.push(line);

        }else if(l.indexOf('@param') === 0) {

            var pname = '';
            var pdesc = [];
            var ptype = '';
            var parts = line.split(' ');

            for(var j = 0; j < parts.length; j++){
                var part = parts[j];

                if(part.trim() == '@param') {
                    continue;
                }

                if(!ptype) {
                    ptype = part;

                }else if(!pname) {
                    pname = part;

                }else {
                    pdesc.push(part);
                }
            }

            var trueName = pname;

            // Check if optional
            for(var param in info.params){
                var data = info.params[param];
                var parts = param.trim().split('=');

                if(parts.length > 1 && parts[0].trim() == pname) {
                    trueName = param;
                    break;
                }
            }

            info.params[trueName] = {};
            info.params[trueName].name = pname;
            info.params[trueName].type = ptype;
            info.params[trueName].description = pdesc.join(' ').trim();

        } else if(l.indexOf('@returns') === 0 || l.indexOf('@return') === 0) {

            var matches = line.match(new RegExp(sprintf("@returns?\\s*(%s)\\s*(.*)?", '[\\w\\\\|\\<\\>]+\\[?\\]?'), 'i'));

            if(matches && matches.length > 2){
                info.returns = matches[1];

                if(matches[2]){
                    info.returnsdescription = matches[2];
                }

            }

        }else if(l.indexOf('@variable-params') === 0) {
            info.attributes.push('variable-params');

        }else if(l.indexOf('@remote') === 0) {
            info.attributes.push('remote');

        }else if(l.indexOf('@deprecated') === 0) {
            info.attributes.push('deprecated');

        }else if(l.indexOf('@throws') === 0) {
            var matches = line.match(/@throws\s*({.+})\s*(.*)?/i);

            if(!(info.throws instanceof Array)) {
                info.throws = [];
            }

            if(matches){
                info.throws.push({
                    type: matches[1],
                    description: matches[2]
                });
            }


        }
    }

    info.description = description.join('\n');

//    console.log(info); process.exit();

    return info;

}

/**
 * Sprintf for javascript
 *
 * var a = sprintf("%s = %s", "Hello", "World"); // a is "Hello World"
 */
function sprintf(){
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