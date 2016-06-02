/**
 * Created by josemanuel on 7/25/14.
 */

/**
 * Created by josemanuel on 3/7/14.
 */
var fs = require('fs');
var path = require('path');

var modules = fs.readdirSync(path.join(__dirname, '../../../'));
var apiTree = {};

for(var i = 0; i < modules.length; i++){
    var moduleName = modules[i]; if(moduleName.charAt(0) == '.') continue;

    console.log("Module: " + moduleName);

    var codeFile = path.join(__dirname, '../../../' + moduleName + '/support/ts-include/' + moduleName + '.d.ts');

    if(!fs.existsSync(codeFile)) continue;

    var code = fs.readFileSync(codeFile, 'utf8');
    var localTree = {};
    apiTree[moduleName] = localTree;

    (function(code, tree){

        var lines = code.split('\n');

        var currentClass = null;
        var currentComment = '';
        var readingComment = false;
        var useComment = function(){ var tmp = currentComment; currentComment = ''; return cleanComment(tmp); };

        console.log("\n\n" + code.length + " chars\n")

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

        function cleanComment(comment){

            comment = comment.trim();
            comment = comment.substr(1, comment.length - 2);
            var lines = comment.split('\n');

            for(var i = 0; i < lines.length; i++){
                var line = lines[i];

                while(line.length > 0 && line.charAt(0) == '*'){
                    line = line.substr(1);
                }

                lines[i] = line;
            }

            return lines.concat('\n');
        };

        for(var lineIndex = 0; lineIndex < lines.length; lineIndex++){

            var line = lines[lineIndex].trim();
            var lineIsClass = false;

            //region Comment process

            if(line.indexOf('/*') >= 0){
                readingComment = true;
                currentComment = '';
            }

            if(readingComment){
                currentComment += line + '\n';
            }

            if(line.indexOf('*/') >= 0 ){
                readingComment = false;
            }


            //endregion

            //region Class process

            if (line.indexOf('class ') == 0) {
                var classParts = line.match(/class\s+(\w+)/i);
                if(classParts[1]){
                    currentClass = classParts[1];
                    tree[currentClass] = {
                        name: currentClass,
                        source: line,
                        description: useComment(),
                        methods: {},
                        properties: {}
                    };
                    lineIsClass = true;
                    console.log(sprintf("class %s", currentClass));
                }
            }
            //endregion

            if (!readingComment && !lineIsClass) { //region Class member process


                var itemParts = line.match(/(public\s+|private\s+)?(static\s*)?(get\s+|set\s+)?(\w+)(\s*\()?/i);

                if (line.indexOf('public ') === 0
                    || line.indexOf('private ') === 0
                    || line.indexOf('static ') === 0
                    || line.indexOf('constructor(') === 0
                    || (itemParts && itemParts[4])) {

                    // console.log("MEMBER(" + itemParts[4]+ "): " + line)

                    if (currentClass) {
                        if (itemParts && itemParts[4]) {
                            if (itemParts[5] && itemParts[5].trim() == '(') {

                                //region Process Method
                                tree[currentClass].methods[itemParts[4]] = {

                                    description: useComment(),
                                    source: line,
                                    isPublic: line.indexOf('private') !== 0,
                                    isStatic: line.indexOf('static ') >= 0

                                };
                                //endregion

                            } else {
                                //region Process Property
                                var typeMatch = line.match(/:\s*([\w\.<>\[\]]+)/i);


                                tree[currentClass].properties[itemParts[4]] = {
                                    description: useComment(),
                                    source: line,
                                    isPublic: line.indexOf('private') !== 0,
                                    isStatic: line.indexOf('static ') >= 0,
                                    type: (typeMatch && typeMatch[1] ? typeMatch[1] : '[unrecognized]')
                                };

                                //endregion
                            }

                        }
                    }

                }
                //endregion
            }

        }


    })(code, localTree);

    fs.writeFileSync(path.join(__dirname, '../js/api.js'), 'var apiStructure = ' + JSON.stringify(apiTree));
}

