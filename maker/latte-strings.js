/**
 * 2014(c) Goplek
 * JMMP
 * Generates strings files for latte.ui code
 */

var fs = require('fs');
var latte = require('./latte');
var path = require('path');

/**
 * Creates the files of strings in the modules
 */
exports.createStringsFiles = function(stringsDirectory, tsFilePath, outDirectory, callback){

    var dir = stringsDirectory;
    var served = 0;

    latte.walk(dir, '.txt', function(err, results){

        if(!results || results.length == 0) {
            callback.call(null);
        }

        for(var i in results){
            createStringsFile(results[i], tsFilePath, outDirectory, function(){

                if(++served == results.length){
                    if(typeof callback === 'function'){
                        callback.call(null);
                    }
                }

            });
        }

    });



};

/**
 * Creates the string file of specified module path
 * @param path
 */
var createStringsFile = function(stringsPath, tsFilePath, outDirectory, callback){

//    console.log(sprintf("Creating strings file (%s, %s, %s)", stringsPath, tsDirectory, outDirectory));

    var lang = path.basename(stringsPath, '.txt');

    fs.readFile(stringsPath, 'utf8', function(err, data){

        var code = 'if(!this.strings) {this.strings = {}}';
        var interface_code = "declare module latte{ interface Strings{\n%s\n}}";
        var interface_lines = [];
        var rows = data.split('\n');

        for(var i = 0; i < rows.length; i++){
            var row = rows[i];
            var spaceIndex = row.indexOf(' ');

            if(spaceIndex > 0){
                var key = row.substr(0, spaceIndex);
                var string = row.substr(spaceIndex + 1);
                var line = '\nstrings.' + key + ' = "' + string.trim().replace(/"/g, "\\\"") + '";';
                interface_lines.push(sprintf("\t%s: string;", key));
                code += line;
            }
        }

        // Write strings JS file
        latte.writeFileIfNew(path.join(outDirectory, lang + ".js"), code, function(err){
            if(err) throw err;

            // Write TS interface file
            latte.writeFileIfNew(tsFilePath, sprintf(interface_code, interface_lines.join('\n')), function(err){
                if(err) throw err;

                if(typeof callback === 'function'){
                    callback.call(this);
                }

            });
        });


    });
};

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