/**
 * 2014(c) Goplek
 * JMMP
 *
 * Base functions for latte compiling
 */

var fs = require('fs');
var path = require('path');

/**
 * Creates the directories specified in path. If directories exist it will not do anything.
 *
 * @param dirpath
 */
exports.supermkdir = function(dirpath){
    var dirs = dirpath.split(path.sep);
    var cur = path.sep;

    for(var i = 0; i < dirs.length; i++){
        if(!dirs[i]) continue;
        cur += dirs[i] + path.sep;

        if(!fs.existsSync(cur)){
            fs.mkdirSync(cur);

        }
    }
};

/**
 * Copier. Creates necessary folders if not present
 *
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
exports.fileCopy = function(src, dest) {

//    console.log("Source: " + src)
//    console.log("Destin: " + dest)

    var dirname = path.dirname(dest);

    exports.supermkdir(dirname);

    // Copy file
    var contents = fs.readFileSync(src);
    fs.writeFileSync(dest, contents);
};

/**
 * Walks a directory recursively searching for '.ts' files and will call 'done' after it
 *
 * @param {string} dir
 * @param {string} extension
 * @param {(err: string, results: string[]): void} done
 */
exports.walk = function(dir, extension, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    exports.walk(file, extension, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    if(endsWith(file, extension)){
                        results.push(file);
                    }
                    next();
                }
            });
        })();
    });
};

/**
 * Walks a directory recursively searching for '.ts' files and will call 'done' after it
 *
 * @param {string} dir
 * @param {string} extension (optional)
 * @param {(err: string, results: string[]): void} done
 */
exports.walkSync = function(dir, extension) {
    var results = [];

    var files = fs.readdirSync(dir);

    for(var i = 0; i < files.length; i++){

        var file = path.join(dir, files[i]);
        var stat = fs.statSync(file);

        if(stat.isDirectory()){
            results = results.concat(exports.walkSync(file, extension));
        }else {
            if(typeof extension === 'string' && extension && file.substr(file.length - extension.length) != extension){
                continue;
            }else{
                results.push(file);
            }
        }

    }

    return results;
};

/**
 * Writes the file with fs.writeFile just in case file has new content compared to existing one
 *
 * @param {string} path         Path of file
 * @param {string} content      Contents of the file
 * @param {void} callback       Callback when done
 */
exports.writeFileIfNew = function(path, content, callback){

    fs.readFile(path, 'utf8', function(err, data){

        if(data != content){
            fs.writeFile(path, content, callback);

        }else{

            callback.call(null);
        }
    });
}

/**
 * Returns a value indicating if the specified string ends in the specified postfix
 *
 * @param string
 * @param postfix
 * @returns {boolean}
 */
function endsWith(string, postfix){
    return string.substr(string.length - postfix.length, postfix.length) === postfix;
}
