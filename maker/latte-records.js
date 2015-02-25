/**
 * 2014(c) Goplek
 * JMMP
 * Generates Records files for datalatte code
 */

var latte = require('./latte');
var mod = require('./latte-module');
var ref = require('./latte-reflection');

/**
 * Converts the name of a database table to a class name
 *
 * @param tableName
 * @returns {string}
 */
exports.tableNameToClassName = function (tableName){
    var r = '';
    var convertToUpper = false;
    tableName = String(tableName);

    for(var i = 0; i < tableName.length; i++){
        var char = tableName.charAt(i);

        if(char == '_'){
            convertToUpper = true;
        }else{
            if(convertToUpper){
                convertToUpper = false;
                r += char.toUpperCase();
            }else{
                r += char.toLowerCase();
            }
        }
    }

    return r;
};

//region PhpRecordsGenerator

/**
 *
 * @param module
 * @constructor
 */
exports.PhpRecordsGenerator = function(module){

    if(!(module instanceof mod.Module)){
        throw "module should be of type Module (latte-module.js)";
    }

    // Assign module
    this.module = module;

}

/**
 * Generates the code for the records of the module
 *
 * @param callback
 */
exports.PhpRecordsGenerator.prototype.generateCode = function(callback){

    var _this = this;

    if(_this.module.hasConnection()){
        _this.module.getRecords(function(records){

            // If records found
            if(records.length){

                // Create code for them
                _this.recordsCode(records, function(code){
                    callback.call(null, code);
                })
            }else{
                callback.call(null);
            }

        })
    }else{
        callback.call(null);
    }

};

/**
 * Generates records of the specified tables
 *
 * @param {array} tables
 * @param {function} callback (recordsCode: string)
 */
exports.PhpRecordsGenerator.prototype.recordsCode = function(tables, callback){

    if(!(tables instanceof Array)){
        throw "tables must be an array";
    }

    var served = 0;
    var code = '<' + '?' + 'php ';

    for(var i = 0; i < tables.length; i++){

        this.recordCodeOf(tables[i], function(recordCode){
            code += '\n' + recordCode;

            if(++served == tables.length){
                callback.call(null, code);
            }
        });

    }

}

/**
 * Creates the php record of specified table
 *
 * @param {string} table
 * @param {function} callback (recordCode: string)
 */
exports.PhpRecordsGenerator.prototype.recordCodeOf = function(table, callback){

    var code = "class %sBase extends DataRecord{\n\t%s\n}";
    var className = exports.tableNameToClassName(table);
    var body  = '';
    var module = this.module;
    var makePairs = function(arr){
        var r = [];
        for(var i = 0; i < arr.length; i++){
            r.push(sprintf('"%s" => $this->%s', arr[i], arr[i]));
        }
        return r;
    };

    this.module.query(sprintf("describe `%s`", table), function(err, rows, fields){

        if(err)
        throw err;

        var tableFields = [];
        var allRows = [];
        var primKey = [];
        var keys = [];
        var justFields = [];
        var checks = [];

        // Scan fields
        for(var i = 0; i < rows.length; i++){
            var field = rows[i][fields[0].name];

            if(rows[i]['Extra'] == 'auto_increment') {
                primKey.push(field);

            }else if(rows[i]['Key'] == 'PRI') {
                keys.push(field);
            }else {
                justFields.push(field);
            }

            tableFields.push(field);

        }

        (function(arr){
            for(var i = 0; i < arr.length; i++){
                checks.push(sprintf("isset($this->%s)", arr[i]));
            }
        })(keys.concat(primKey));

        for(var i = 0; i < tableFields.length; i++){
            allRows.push(sprintf("$t.%s AS '$t.%s'", tableFields[i], tableFields[i]));
        }

        var fieldDeclaration =  sprintf('public $%s;', tableFields.join(', $'));
        var all =               sprintf('public static function all($t = "%s"){ return array("%s"); }', table, allRows.join('", "'));
        var gettable =          sprintf('public static function gettable(){ return "%s"; }', table);
        var getautokey =        sprintf("public function getAutoKey(){ return array( %s ); }", makePairs(primKey).join(', '));
        var getkeys =           sprintf("public function getKeys(){ return array( %s ); }", makePairs(keys).join(', '));
        var getfields =         sprintf("public function getFields(){ return array( %s ); }", makePairs(justFields).join(', '));
        var isinserted =        sprintf("public function isInserted(){ return %s; }", checks.length ? checks.join(' && ') : 1);
        var getmodule =         sprintf("public function getModule(){ return '%s'; }", module.name);

        body = [fieldDeclaration, all, gettable, getautokey, getkeys, getfields, getmodule, isinserted].join('\n\t');

        callback.call(null, sprintf(code, className, body));
    });

}

//endregion

//region TsRecordsGenerator

/**
 * Creates the TypeScript Records Generator
 *
 * @param module
 * @constructor
 */
exports.TsRecordsGenerator = function(module){
    if(!(module instanceof mod.Module)){
        throw "module should be of type Module (latte-module.js)";
    }

    // Assign module
    this.module = module;
}

/**
 * Generates the records code for the TypeScrpt classes of a datalatte module
 *
 * @param {string} phpClassesPath Path to the folder where php classes exist
 * @param callback
 */
exports.TsRecordsGenerator.prototype.generateCode = function(phpClassesPath, callback){

    var code = '';
    var _this = this;

    if(!this.module.hasConnection()){
        callback.call(null);
        return;
    }

    //region Support methods
    var findRecordName = function(serverClasses, recordName){
        for(var i in serverClasses){
            if(typeof i === 'string'){
                if(i.replace('_', '').toLowerCase() == recordName.replace('_', '').toLowerCase()){
//                    console.log(sprintf("%s => %s", recordName, i))
                    return i;
                }
            }
        }
    }
    //endregion

    // Get records of system
    _this.module.getRecords(function(records){

        // Get php classes info
        _this.getPhpClassesInfo(phpClassesPath, function(phpClasses){

            var attendedClasses = {};
            var served = 0;

            // Scan records
            for(var i = 0; i < records.length; i++){

                // Get class name for table
                var className = exports.tableNameToClassName(records[i]);
                var recordName = findRecordName(phpClasses, records[i]);

                // Mark record as attended
                attendedClasses[recordName] = true;

                // Produce code of record
                _this.recordCodeOf(records[i], phpClasses[recordName], recordName, function(recordCode){
                    code += recordCode + '\n';

                    // If all records served
                    if(++served == records.length){

                        // Check for undispatched classes
                        for(var i in phpClasses){
                            if(typeof attendedClasses[i] == 'undefined') {
                                code += _this.classCodeOf(phpClasses[i]);
                            }
                        }

                        // Callback!
                        callback.call(null, sprintf("module latte{\n\t%s\n}", code));
                    }
                });
            }

            if(!records.length) {
                // Check for undispatched classes
                for(var i in phpClasses){
                    if(typeof attendedClasses[i] == 'undefined') {
                        code += _this.classCodeOf(phpClasses[i]);
                    }
                }

                // Callback!
                callback.call(null, sprintf("module latte{\n\t%s\n}", code));
            }
        })

    });

};

/**
 * Gets an object containing the information of all php classes
 *
 * @param {string} classesPath Path to the folder where php classes are
 * @return {object} Information about php classes
 */
exports.TsRecordsGenerator.prototype.getPhpClassesInfo = function(classesPath, callback){

    var phpClasses = {};

    latte.walk(classesPath, '.php', function(err, files){

        for(var i = 0; i < files.length; i++){

            var info = ref.phpFileInfo(files[i]);

            if(info && info.name) {
                phpClasses[info.name] = info;
            }
        }

        callback.call(null, phpClasses);

    });

};

/**
 * Gets the TypeScript record of specified table.
 *
 * @param {string} table
 * @param {object} phpClassInfo
 * @param {function} callback (recordCode: string)
 */
exports.TsRecordsGenerator.prototype.recordCodeOf = function(table, phpClassInfo, recordName, callback){

    var codeResult = '';
    var _this = this;

    //region Support Methods
    var printout = function(str){ codeResult += str + '\n' };

    var hasAttribute = function(atts, attribute){
        for(var i in atts)
            if(atts[i] == attribute)
                return true;
        return false;
    };

    var isStatic = function(atts){
        return hasAttribute(atts, 'static');
    }

    var isPrivate = function(atts){
        return hasAttribute(atts, 'private');
    }

    var isRemote = function(atts){
        return hasAttribute(atts, 'remote');
    }

    var resolveType = function(type){

        if(typeof type == 'string') {
            type = type.replace("=", '').replace("?", '');
            type = type.replace('object', 'any');
            type = type.replace('type', 'any');
            type = type.replace('mixed', 'any');
            type = type.replace('int', 'number');
            type = type.replace('function', 'GenericCallback');
            type = type.replace('jQuery', 'JQuery');
            type = type.replace('*', 'any');
            type = type.replace('boolean', 'bool');
            type = type.replace('bool', 'boolean');


            if(type.indexOf('(') >= 0){
                return "any";
            }



            return type;
        }



        return 'any';
    };

    var dumpMethodCode = function(recordName, name, method){

        if(!isRemote(method.attributes)) return;

        var stic = '';
        var pvt = '';
        var params = [];
        var paramParams = [];
        var idr = isStatic(method.attributes) ? '' :  ", this.recordId";
        var generic = "<" + (method.returns || 'any') + ">";

        if(isStatic(method.attributes)) stic = 'static ';
        if(isPrivate(method.attributes)) pvt = 'private ';

        for(var param in method.params){
            var paramName = param.replace('$', '');
            var indexOfSpace = paramName.indexOf(' ');
            var paramType = resolveType(method.params[param].type) || 'any';
            var initer = '';

            if(indexOfSpace > 0){
                initer = paramName.substr(indexOfSpace);
                paramName = paramName.substr(0, indexOfSpace);
            }

            params.push(paramName + ': ' + paramType + '' + initer);
            paramParams.push(paramName + ": " + paramName);
        }

        printout("\n\t\t/*");
        printout("\t\t * Remote Method. " + method.description);
        printout("\t\t */");
        printout("\t\t" + stic + pvt + name + "(" + params.join(', ') + "): RemoteCall" + generic + "{");
        printout("\t\t\treturn new RemoteCall" + generic + "('" + this.module.name + "', '" + recordName + "', '" + name + "', {" + paramParams.join(', ') + "} "+ idr + ");");
        printout("\t\t}");
    };
    //endregion

    this.module.query(sprintf("DESCRIBE `%s`", table), function(err, tableRows){

        var fieldNames = '';
        var className = exports.tableNameToClassName(table);
        var recordData = phpClassInfo;


        printout("\texport class " + className + 'Base extends DataRecord{');

        printout("\n\t\t/* Name of Php record */");
        printout("\t\t_recordType: string = '" + recordName + "';");
        printout("\n\t\t/* Name of Module where record lives*/");
        printout("\t\t_moduleName: string = '" + _this.module.name + "';");

        for(var j = 0; j < tableRows.length; j++){

            var row = tableRows[j];
            var f = row.Field;
            fieldNames += f + ": this." + f + "" + (j == tableRows.length - 1 ? '' : ', ');

            printout("\n\t\t/**");
            printout("\t\t * Database field: " + row.Type);
            printout("\t\t */");
            printout("\t\t" +  f + ': any;');

            if(row.Extra == 'auto_increment'){
                printout("\n\t\t/**\n\t\t* Gets the name of the autoincrement field\n\t\t**/\n\t\tonGetRecordIdName(): string { return '" + f + "'; }");
            }

        }

//                    printout("\n\t\tgetFields(): any { return {" + fieldNames +  "}; } ");


        if(recordData && recordData.methods){
            for(var method in recordData.methods){
                dumpMethodCode.call(_this, recordName, method, recordData.methods[method]);
            }
        }

        // Echo getFields
        printout("\t}");


        callback.call(this, codeResult);


    });

};

/**
 * Gets the TypeScript record of the specified phpClass, given it is not a DataRecord
 *
 * @param {object} phpClassInfo
 * @returns {string}
 */
exports.TsRecordsGenerator.prototype.classCodeOf = function(phpClassInfo){

    var codeResult = '';

    //region Support Methods
    var printout = function(str){ codeResult += str + '\n' };

    var hasAttribute = function(atts, attribute){
        for(var i in atts)
            if(atts[i] == attribute)
                return true;
        return false;
    };

    var hasRemoteMethods = function(phpClassInfo){
        for(var m in phpClassInfo.methods){
            if(isRemote(phpClassInfo.methods[m].attributes))
                return true;

        }
        return false;
    }

    var isStatic = function(atts){
        return hasAttribute(atts, 'static');
    }

    var isPrivate = function(atts){
        return hasAttribute(atts, 'private');
    }

    var isRemote = function(atts){
        return hasAttribute(atts, 'remote');
    }

    var resolveType = function(type){

        if(typeof type == 'string') {
            type = type.replace("=", '').replace("?", '');
            type = type.replace('object', 'any');
            type = type.replace('type', 'any');
            type = type.replace('int', 'number');
            type = type.replace('function', 'GenericCallback');
            type = type.replace('jQuery', 'JQuery');
            type = type.replace('*', 'any');
            type = type.replace('boolean', 'bool');
            type = type.replace('bool', 'boolean');


            if(type.indexOf('(') >= 0){
                return "any";
            }



            return type;
        }



        return 'any';
    };

    var dumpMethodCode = function(recordName, name, method){

        if(!isRemote(method.attributes)) return;

        var stic = '';
        var pvt = '';
        var params = [];
        var paramParams = [];
        var idr = isStatic(method.attributes) ? '' :  ", this.recordId";
        var generic = "<" + (method.returns || 'any') + ">";

        if(isStatic(method.attributes)) stic = 'static ';
        if(isPrivate(method.attributes)) pvt = 'private ';

        for(var param in method.params){
            var paramName = param.replace('$', '');
            var indexOfSpace = paramName.indexOf(' ');
            var paramType = resolveType(method.params[param].type) || 'any';
            var initer = '';

            if(indexOfSpace > 0){
                initer = paramName.substr(indexOfSpace);
                paramName = paramName.substr(0, indexOfSpace);
            }

            params.push(paramName + ': ' + paramType + '' + initer);
            paramParams.push(paramName + ": " + paramName);
        }

        printout("\n\t\t/*");
        printout("\t\t * Remote Method. " + method.description);
        printout("\t\t */");
        printout("\t\t" + stic + pvt + name + "(" + params.join(', ') + "): RemoteCall" + generic + "{");
        printout("\t\t\treturn new RemoteCall" + generic + "('" + this.module.name + "', '" + recordName + "', '" + name + "', {" + paramParams.join(', ') + "} "+ idr + ");");
        printout("\t\t}");
    };
    //endregion

    if(!hasRemoteMethods(phpClassInfo)){
        return codeResult;
    }

    printout("\n\t\t/*");
    printout("\t\t * " + phpClassInfo.description);
    printout("\t\t */");
    printout("\texport class " + phpClassInfo.name + '{');

    for(var method in phpClassInfo.methods){
        dumpMethodCode.call(this, phpClassInfo.name, method, phpClassInfo.methods[method]);
    }

    printout("\t}");

    return codeResult;
}

//endregion

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
