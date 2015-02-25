/**
 * 2014(c) Goplek
 * JMMP
 *
 * Functions for compiling TypeScript of latte code
 */

var fs = require('fs');
var latte = require('./latte');
var mod = require('./latte-module');
var path = require('path');
var sys = require('sys');

/**
 * Copies the necessary includes of the module
 *
 * @param module
 */
exports.copyIncludes = function(module){

    if(!(module instanceof mod.Module)){
        throw "module must be an instance of latte.Module";
    }

    //region Remove existent files
    var existentFiles = latte.walkSync(module.pathTsInclude, '.ts');
    for(var i = 0; i < existentFiles.length; i++){
        fs.unlinkSync(existentFiles[i]);
    }
    //endregion

    //region Copy specified ts-includes
    var includes = module.manifest['ts-include'];

    if(includes instanceof Array) {
        for(var i = 0; i < includes.length; i++){
            latte.fileCopy(
                path.join(module.pathSupport, includes[i]),
                path.join(module.pathTsInclude, path.basename(includes[i]))
            )
        }
    }
    //endregion

    //region Copy includes because of module-includes
    var mincludes = module.manifest['module-include'];

    if(mincludes instanceof Array) {
        for(var i = 0; i < mincludes.length; i++){

            // Load included module
            var mincluded = new mod.Module(mincludes[i]);
            var files = latte.walkSync(mincluded.pathTsInclude, '.ts');

            for(var j = 0; j < files.length; j++){
//                console.log("Including: " + files[j])
                latte.fileCopy(
                    files[j],
                    path.join(module.pathTsInclude, path.basename(files[j]))
                )
            }

        }

    }
    //endregion

}

/**
 * Creates the JS file of the module by compiling the TS Code
 *
 * @param tsIncludePath Path of extra ts files to include to compiler
 * @param directory Directory of files
 * @param outFile Path of file
 */
exports.compileDirectory = function(tsIncludePath, directory, outFile, callback){

    /**
     * 1. Find *.ts files in tsPath
     */
    latte.walk(tsIncludePath, '.ts', function(err, files){

        /**
         * 2. Create references file
         */
        createTsReferencesFile(files, directory, function(){

            /**
             * 3. Compile TS
             */
            compileTs(directory, outFile, function(){
                if(typeof callback === 'function'){
                    callback.call(null);
                }
            });

        });
    });

};

/**
 * Invokes
 *
 * @param directory
 * @param outFile
 * @param callback
 */
function compileTs(directory, outFile, callback){
    var out_path = outFile;
    var all_path = path.join(directory, 'all.ts');

    //tsc -d --removeComments --target ES5 --out $outputdir/latte.js $all
    var exec = require('child_process').exec;
    var child;

    child = exec("tsc -d --target ES5 --out " + out_path + ' ' + all_path, function(error, stdout, stderr){
        if(stdout)
            sys.print(stdout);

        if(stderr){
            var err = stderr.replace(/\(([0-9]+),([0-9])+\):/g, ":$1:$2 ");

            var parts = err.split("\n");

            for(var i = 0; i < parts.length; i++){
                if(parts[i].trim()){
                    parts[i] = "(" + (i + 1) + ") at " + parts[i];
                }
            }

            sys.error(parts.join("\n"));
        }else{
            fs.unlinkSync(all_path);
        }

        if(typeof callback === 'function'){


            callback.call(this);
        }

    });
};

/**
 * Creates the references files (all.ts), based on the hierarchy of class inheritance.
 *
 * @param directory
 * @param includes Array with extra files to include
 * @param callback (filePath: string)
 */
function createTsReferencesFile(includes, directory, callback){

    var ts_path = directory;
    var all_path = path.join(directory, 'all.ts');

    // Remove previously created references file
    if(fs.existsSync(all_path)){
        fs.unlinkSync(all_path);
    }

    /**
     * 1. Find *.ts files
     */
    latte.walk(ts_path, '.ts', function(err, results){

        if(err) throw err;

        var classInfo = [];
        var ignoredFiles = [];
        var served = 0;

        /**
         * 2. For each found file
         */
        for(var i = 0; i < results.length; i++){

//            console.log("FOUND: " + results[i]);

            /**
             * 3. Get Information of file
             */
            getClassInfo(results[i], function(info){

                if(info.isClass){
                    classInfo.push(info);
                }else{
                    ignoredFiles.push(info.path);
                }

                // If all files served
                if(results.length === ++served){

                    /**
                     * 4. Find references
                     */
                    findReferences(classInfo);

                    /**
                     * 5. Sort by references
                     */
                    sortByReferences(classInfo);

                    //console.log(JSON.stringify(classInfo))

                    var references = [];
                    var code = '';

                    /**
                     * 6.0 Dump include files
                     */
                    for(var j = 0; j < includes.length; j++)
                        references.push(includes[j]);

                    /**
                     * 6.1 Dump non-class files
                     */
                    for(var j = 0; j < ignoredFiles.length; j++)
                        references.push(ignoredFiles[j]);

                    /**
                     * 7. Dump sorted paths
                     */
                    for(var j = 0; j < classInfo.length; j++)
                        references.push(classInfo[j].path);

                    /**
                     * 8. Gather references for code
                     */
                    for(var j = 0; j < references.length; j++){
                        code += '\n' + '/// <reference path="' + path.resolve(references[j]) + '" />';
                    }

                    /**
                     * 9. Write references file
                     */
                    latte.writeFileIfNew(all_path, code, function(ex){
                        if(ex)throw ex;

                        if(typeof callback === 'function'){
                            callback.call(this, all_path);
                        }
                    });


                }

            });
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

/**
 * Returns a value indicating if the baseClass implements superClass
 *
 * @param baseClassInfo Information about base class
 * @param superClassInfo Information about super class
 * @param infos List of all classes info
 * @returns {boolean}
 */
var _extends = function(baseClassInfo, superClassInfo, infos){

    if(!baseClassInfo) return false;

    if(typeof infos[baseClassInfo.className] == 'undefined'){
        //console.log("NOT FOUND: " + baseClassInfo.className)
        return false;
    }

    if(baseClassInfo.extends == superClassInfo.className){
        //console.log(baseClassInfo.className + " -> " + superClassInfo.className)
        return true;
    }else{
        if(typeof baseClassInfo.extends == 'string'){
            return _extends(infos[baseClassInfo.extends], superClassInfo, infos);
        }else{
            //console.log("NOT EXTEND: " + baseClassInfo.className + " -> " + superClassInfo.className)
            return false;
        }
    }

}

/**
 * Scans the array and assigns references to class info
 *
 * @param {Array<ClassInfo>} infos
 */
function findReferences(infos){

    var metas = {};

    for(var j = 0; j < infos.length; j++) metas[infos[j].className] = infos[j];

    // Time to Count references
    for(var j = 0; j < infos.length; j++){
        for(var k = 0; k < infos.length; k++){
            if(_extends(infos[k], infos[j], metas)){
                infos[j].references++;
            }
        }

        if(endsWith(infos[j].path, 'records.ts')) infos[j].references = infos.length;
    }
};

/**
 * Returns information about the class on the specified class
 *
 * @param path
 * @param callback
 */
function getClassInfo(path, callback){

    // Read file
    fs.readFile(path, 'utf8', function(err, data){

        var result = {
            isClass: false,
            path: path,
            source: data
        };

        if(!err){

            // Get matches
//            var matches = data.match(/export\s+class\s+(\w*)(\s+extends\s+([\w|\.]*))?/i);
            var matches = data.match(/export\s+class\s+(\w*)<[\w\s,]*>(\s+extends\s+([\w|\.]*))<[\w\s,]*>?/i);

            if(matches === null) {
                matches = data.match(/export\s+class\s+(\w*)<[\w\s,]*>(\s+extends\s+([\w|\.]*))/i);
            }

            if(matches === null){
                matches =  data.match(/export\s+class\s+(\w*)(\s+extends\s+([\w|\.]*))?/i);
            }

            // Patch
            if(data) {

            }

            if(matches && matches.length > 1){

                result = {
                    isClass: true,
                    path: path,
                    className: matches[1],
                    extends: matches[3],
                    references: 0,
                    properties: {},
                    source: data
                };

                // Get properties
                matches = data.match(/get\s+\w+\s*\(\s*\)\s*:\s*[\w<>\.]+/g);

                for(var i in matches){
                    var match = matches[i];
                    var parts = match.match(/get\s+(\w+)\s*\(\s*\)\s*:\s*([\w<>\.]+)/i);

                    if(parts.length >= 2){
                        // Part 0 is match, Part 1 is first group (property name)
                        result.properties[parts[1]] = {
                            //source: match,
                            type: parts[2]
                        }
                    }
                }

            }
        }

        //console.log(result.className + " ---extends--> " + result.extends)
        callback.call(this, result);
    });
}

/**
 * Sorts the array of classes info by references count
 *
 * @param {Array<ClassInfo>} infos
 */
function sortByReferences(infos){
    // Bubble sort'em
    var swapped;
    do{

        swapped = false;

        for(var j = 0; j < infos.length - 1; j++){

            if( infos[j + 1].references > infos[j].references ){
                var tmp = infos[j];
                infos[j] = infos[j+1];
                infos[j+1] = tmp;
                swapped = true;
            }

        }
    }while(swapped);
}