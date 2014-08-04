/**
 * 2014(c) Goplek
 * JMMP
 * Makes code of latte.ui present on project
 */

var css = require('./latte-css');
var ts =  require('./latte-ts');
var latte =  require('./latte');
var path = require('path');
var strings = require('./latte-strings');
var lmodule = require('./latte-module');
var records = require('./latte-records');
var fs = require('fs');


//region Argument check

var module_name;
var minimize = false;
var verbose = false;

for(var i = 2; i < process.argv.length; i++){

    var param = process.argv[i];

    if(param.charAt(0) == '-'){

        if(param === '--minimize') {
            minimize = true;

        }else if(param === '--verbose') {
            verbose  = true;
        }
    }else {
        module_name = param;
    }
}

if(typeof module_name == 'undefined' || module_name.indexOf('--') === 0){
    console.log("\nUsage:\nnode make [options] module-name\n\nWhere module-name can be:" +
        "\nOptions" +
        "\n" +
        "\n--minimize\tMinimizes the javascript result using Google Closure Compiler" +
        "\n--verbose \tEchoes information about what script is doing" +
        "\n" +
        "\nModule Name: " +
        "\n\t_core      Core module" +
        "\n\t_app       App module" +
        "\n\t[module-name] Module name in datalatte/ folder" +
        "\n\n");
    process.exit();
}
//endregion

/**
 * Create module and records generators
 */
var module = new lmodule.Module(module_name);
var phpGenerator = new records.PhpRecordsGenerator(module);
var tsGenerator = new records.TsRecordsGenerator(module);

if(!fs.existsSync(module.path)) {
    console.log("Module " +  module_name + " does not exist in " + module.path);
    process.exit();
}

//region Folder paths
var langPath = path.join(module.path, 'lang');
var tsPath = path.join(module.path, 'ts');
var supportPath = path.join(module.path, 'support');
var tsIncludePath = path.join(supportPath, 'ts-include');
var phpPath = path.join(module.path, 'php');
var releasesPath = path.join(__dirname, '../html/datalatte-files/releases');
var releasePath = path.join(releasesPath, module_name);
var releaseSupportPath = path.join(releasePath, 'support');
//endregion

//region File paths
var jsFile = path.join(tsIncludePath, module_name + '.js');
var tsDStrings = path.join(tsIncludePath, module_name + '.strings.d.ts');
var decFile = path.join(tsIncludePath, module_name + '.d.ts');
var jsFinalFile = path.join(releasePath, module_name + '.js');
var cssFile = path.join(releasePath, module_name + '.css');
//endregion

//region Create folders if necessary

if(!fs.existsSync(releasesPath)) {
    fs.mkdirSync(releasesPath);
}

if(!fs.existsSync(releasePath)){
    fs.mkdirSync(releasePath);
}

latte.supermkdir(tsIncludePath);

//endregion

//region Out funcitons
var doing = function(str){ if(verbose) process.stdout.write(str) }
var done = function(){ if(verbose) console.log("Done") }
//endregion

// Perform copy of include files
ts.copyIncludes(module);


module.beforeMake(function(){

    // 1. Generate php records code
    doing("PHP Records\t\t\t")
    phpGenerator.generateCode(function(phpCode){
        done()

        // 2. Write php records code

        latte.writeFileIfNew(path.join(module.path, '/support/records.php'), phpCode, function(){


            // 3. Generate TypeScript records code
            doing("TypeScript Records\t")
            tsGenerator.generateCode(phpPath, function(tsCode){

                // 4. Write TypeScript records code
                latte.writeFileIfNew(path.join(tsIncludePath, '/records.ts'), tsCode, function(){
                    done();

                    // 5. Create Strings files
                    doing("Strings files\t\t");
                    strings.createStringsFiles(langPath, tsDStrings, releasePath, function(){
                        done()

                        // 6. Generate CSS file
                        doing("CSS\t\t\t\t\t");
                        css.generateCss(tsPath, cssFile, function(){
                            done()

                            // 7. Compile JS file
                            doing("Typescript compile\t");

                                ts.compileDirectory(tsIncludePath, tsPath, jsFile, function(){
                                    done()

                                    // Move .js to release
                                    fs.renameSync(jsFile, jsFinalFile);

                                    // 8. Export files
                                    doing("Files export\t\t");
                                    module.exportFiles(releaseSupportPath, function(){
                                        done()

                                        // 9. Minimize
                                        if(minimize) {
                                            doing("Minimizing\t\t\t")
                                            var gcc = require('./gcc-rest');
                                            // Set Closure Compiler parameters
                                            gcc.params({
                                                compilation_level: "WHITESPACE_ONLY"
                                            });

                                            // Add files that should be compiled
                                            gcc.addFiles(jsFinalFile);

                                            // Replace code before compiling
                                            gcc.replace(/'use strict';/g, '');

                                            // Compile and write output to compiled.js
                                            gcc.output(jsFinalFile)

                                            gcc.callback = function(){
                                                done()

                                                // After make
                                                module.afterMake(function(){

                                                    // End point if minimization

                                                });
                                            }
                                        }else{
                                            // After make
                                            module.afterMake(function(){

                                                // End point if no minimization

                                            });
                                        }
                                    })
                                });
                            });
                        });
                })
            });
        })

    });

});

