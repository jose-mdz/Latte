/**
 * 2014(c) Goplek
 * JMMP
 * Generates Css files for latte.ui code
 */

var fs = require('fs');
var latte = require('./latte');

/**
 * Creates the CSS file of the files in specified directory
 *
 * @param {string} directory
 * @param {string} outFile
 * @param {() => undefined} callback
 */
exports.generateCss = function(directory, outFile, callback){

    var cssBuffer = '';
    var attended = 0;

    latte.walk(directory, '.css', function(err, paths){

        for(var i in paths){

            fs.readFile(paths[i], 'utf8', function(err, data){

                cssBuffer += data;

                if(++attended == paths.length){

                    latte.writeFileIfNew(outFile, cssBuffer,
                        function(){
                            if(typeof callback == 'function'){
                                callback.call(this);
                            }
                        });
                }
            });
        }

        if(paths.length == 0){
            callback.call(this);
        }

    });

};