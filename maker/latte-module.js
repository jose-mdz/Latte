/**
 * 2014(c) Goplek
 * JMMP
 * Loads module metadata
 */

var latte = require('./latte');
var path = require('path');
var fs = require('fs');
var mysql = require('mysql');

var defaultManifest = {
    'version': '0.1'
};

/**
 * Returns the manifest of the specified module
 * @returns {object}
 */
exports.manifestOf = function(module){

    //Create path to manifest
    var manifestPath = path.join(module.path, 'module.json');

    // Load manifest
    var manifest = exports.jsonAt(manifestPath);

    if(manifest) {
        return manifest;

    }else {

        console.warn(manifestPath + " not found. Defaults for manifest will be used");

        return defaultManifest;
    }


}

/**
 * Returns the contents of the file as an object.
 * File must contain a json object
 *
 * @param {string} path
 */
exports.jsonAt = function(path){

    if(fs.existsSync(path)){

        // Read manifest
        var data = fs.readFileSync(path, 'utf8');

        return JSON.parse(data);

    }

    return null;

}

/**
 * Class module
 *
 * @param name
 * @constructor
 */
exports.Module = function(name){

    this.name = name;
    this.path = path.normalize(path.join(__dirname, '../datalatte/' + name));
    this.manifest = exports.manifestOf(this);

    this.pathLang = path.join(this.path, 'lang');
    this.pathPhp = path.join(this.path, 'php');
    this.pathSupport = path.join(this.path, 'support');
    this.pathTs = path.join(this.path, 'ts');
    this.pathTsInclude = path.join(this.pathSupport, 'ts-include');

}

/**
 * Gets the names of the records of the module.
 * If no records present, warning will be emmited and all tables in database will be used.
 *
 * @param callback
 */
exports.Module.prototype.getRecords = function(callback){

    if(this.manifest.records instanceof Array){
        callback.call(null, this.manifest.records);
    }else{

        console.warn("manifest.records not present. Getting all tables of database.");

        this.module.query("show tables", function(err, rows, fields){
            var r = [];

            for(var i = 0; i < rows.length; i++){
                r.push(rows[i][fields[0].name]);
            }

            callback.call(null, r);
        });
    }

};

/**
 * Gets a value indicating if the module has a connection configured
 *
 * @return {boolean}
 */
exports.Module.prototype.hasConnection = function(){
    return typeof this.manifest.connection === 'object';
}

/**
 * Executes a query using the connection of the module
 *
 * @param {string} sql
 * @param {function} callback (err, rows, fields)
 */
exports.Module.prototype.query = function(sql, callback){

    var connectionData = this.manifest.connection;

    if(typeof this.manifest.connection['file'] == 'string') {
        var connectionPath = path.join(this.path, this.manifest.connection.file); //
        connectionData = exports.jsonAt(connectionPath);
    }

    var connection = mysql.createConnection(connectionData);

    connection.connect();

    connection.query(sql, callback);

    connection.end();
}

/**
 * Exports necessary files to specified path. If folder of path does not exist, it will be created
 * @param destPath
 * @param callback
 */
exports.Module.prototype.exportFiles = function(destPath, callback){

    var files = [];
    var fileAggegators = "ua-include-js,ua-include-css,release-export".split(',');

    // Collect files
    for(var i in fileAggegators){
        var aggregator = fileAggegators[i];

        if(this.manifest[aggregator] instanceof Array) {
            files = files.concat(this.manifest[aggregator]);
        }
    }

    for(var i = 0; i < files.length; i++){
        var origin = path.join(path.join(this.path, 'support/'), files[i]);
        var destination = path.join(destPath, files[i]);

        latte.fileCopy(origin, destination);

    }

    callback.call(null);

}

/**
 * Executes after make scripts if specified in metadata as 'after-make'
 */
exports.Module.prototype.afterMake = function(callback){


    if(this.manifest['after-make'] instanceof  Array){

        for (var i = 0; i < this.manifest['after-make'].length; i++) {
            var script = this.manifest['after-make'][i];

            var origin = path.join(path.join(this.path, 'support/'), script);

            require(origin);
        }

    }

    if(typeof callback == 'function')
    callback();

}

/**
 * Executes before make scripts if specified in metadata as 'before-make'
 */
exports.Module.prototype.beforeMake = function(callback){


    if(this.manifest['before-make'] instanceof  Array){

        for (var i = 0; i < this.manifest['before-make'].length; i++) {
            var script = this.manifest['before-make'][i];
            var origin = path.join(path.join(this.path, 'support/'), script);

            require(origin);
        }

    }

    if(typeof callback == 'function')
        callback();

}