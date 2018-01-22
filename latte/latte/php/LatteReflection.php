<?php

/**
 * Provides information about written code.
 * 
 * The information is provided as an array, which structure follow this pattern:
 * <example>
 *  // 
 *  // General structure of array returned by methods in this class.
 *  // 
 *  array(
 *      name => "Name of class",
 *      type => "class|interface|object",
 *      extend => "Name of base class",
 *      implement => array("InterfaceA", "InterfaceB"),
 *      description => "Description of object"
 *      constructor => array(
 *          description => "Description of constructor",
 *          params => array(
 *              paramName => array(
 *                  name => "Name of parameter"
 *                  type => "type of parameter",
 *                  description => "Description of parameter"
 *              )
 *          )
 *      ),
 *      properties => array(
 *          propName => array(
 *              attributes => array("attribute1", "attribute2"),
 *              type => "Type of property",
 *              description => "Description of property"
 *          )
 *      ),
 *      methods => array(
 *          description => "Description of constructor",
 *          attributes => array("attribute1", "attribute2")
 *          returns => "Type of return",
 *          returnsdescription => "Description of return value"
 *          params => array(
 *              paramName => array(
 *                  name => "Name of parameter"
 *                  type => "type of parameter",
 *                  description => "Description of parameter"
 *              )
 *          )
 *      )
 *  )
 * </example>
 * The structure is the same for both PHP and JavaScript classes, though, types and attributes are specific to the language.
 */

class LatteReflection {
    
    /**
     * Recursively searches for all files in directory presented by <c>$path</c>
     * 
     * @param string $path
     * @param array $files
     */
    public static function getFullFileList($path){
        
        $files = self::getFileList($path);
        
        // Prepend path to all files
        foreach($files as $i => $file){
            $files[$i] = DLString::combinePath($path, $file);
        }
        
        foreach($files as $file){
            
            // Check if is directory
            if(is_dir($file)){
                $files = array_merge($files, self::getFullFileList($file));
            }
        }
        
        return $files;
        
    }
    
    /**
     * Gets the files (and folders) of the specified path
     * 
     * @param string $directory
     * @param string $extension
     * @return array
     * @throws ErrorException
     */
    public static function getFileList($directory, $extension = ''){
        // create an array to hold directory list
        $results = array();
        
        // create a handler for the directory
        $handler = opendir($directory);
        
        if(!$handler) throw new ErrorException("Invalid directory: $directory");

        // open directory and walk through the filenames
        while ($file = readdir($handler)) {

            // if file isn't this directory or its parent, add it to the results
            if ($file != "." && $file != "..") {
                if(str($file)->endsWith($extension))
                    $results[] = $file;
            }

        }

        // tidy up: close the handler
        closedir($handler);

        // Sort by name
        asort($results);
        
        $arr = array();
        
        foreach($results as $value)
            $arr[] = $value;
        
        $results = $arr;

        // done!
        return $results;
    }
    
    /**
     * Returns a list of files from the specified diectory path
     * 
     * @param string $directory Path to read for files
     * @return array Sorted list of directories
     */
    public static function getDirectoryList($directory_path){
        // create an array to hold directory list
        $results = array();
        
        // create a handler for the directory
        $handler = opendir($directory_path);
        
        if(!$handler) throw new ErrorException("Invalid directory");

        // open directory and walk through the filenames
        while ($file = readdir($handler)) {

            // if file isn't this directory or its parent, add it to the results
            if ($file != "." && $file != "..") {
                if(is_dir(DLString::combinePath($directory_path, $file)))
                    $results[] = $file;
            }

        }

        // tidy up: close the handler
        closedir($handler);

        // Sort by name
        asort($results);
        
        $arr = array();
        
        foreach($results as $value)
            $arr[] = $value;
        
        return $arr;
    }

    /**
     * Generates an array with information about the Class or object in the specified JavaScript file
     * 
     * @param string $path
     * @return array
     */
    public static function generateJavaScriptFileInfo($path) {

        $code = file_get_contents($path);

        $namespace = '';
        $pathParts = explode('/', $path);
        
        if(sizeof($pathParts) > 1){
            $namespace = $pathParts[sizeof($pathParts) - 2];
        }
        
        return self::generateJavaScriptCodeInfo($code, $namespace);
    }

    /**
     * Generates an array with information about a PHP Class file
     * 
     * @param string $path
     * @return string
     */
    public static function generatePhpFileInfo($path) {
        $code = file_get_contents($path);

        #return tag('pre')->text(var_export(self::getPhpFileInfo($code), true))->render();
        return self::generatePhpCodeInfo($code);
    }

    /**
     * Generates an array with information about the Class in the specified piece of PHP code
     * @param string $code
     * @return string
     */
    public static function generatePhpCodeInfo($code) {

        $info = array(
            'name' => '',
            'type' => '',
            'extend' => '',
            'implement' => '',
            'constructor' => '',
            'description' => '',
            'methods' => array(),
            'properties' => array(),
            'events' => array(),
        );

        $matches = null;
        //         "/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/";
        $comment = "/\*[^*]*\*+([^/*][^*]*\*+)*/";
        $function = "([\w+\s*]*)function\s*(\w+)\s*(\([^\)]*\))";
        $class = "[\w|\.?]*\.(\w+)\s*=\s*{";
        $classContent = "[\w|\.?]*\.(\w+)\s*=\s*{(.*)}";
        $typeMatch = "[\w\\\\|]+\[?\]?";
        $var = "\\\$\w+,";
        $property = "($comment)?\s*(var|public|private|static)+\s*(var|public|private|static)*\s*(\\\$\w+)";

        /**
         * Extract initial comment and atts
         */
        preg_match_all("#($comment)?\s*(class|interface)\s*(\w+)\s*(extends\s+$typeMatch)?\s*(implements\s+$typeMatch)?\s*{#s", $code, $matches);


        if (sizeof($matches) && sizeof($matches[0])) {

            $info['description'] = self::hilightPhpExapmles(self::getCommentDescription($matches[1][0]));
            $info['type'] = $matches[3][0];
            $info['name'] = $matches[4][0];
            $info['extend'] = $matches[5][0];
            $info['implement'] = $matches[6][0];
        }

        /**
         * Extract properties
         */
        preg_match_all("#$property#s", $code, $matches);

        if (sizeof($matches) > 5) {
            foreach ($matches[5] as $i => $prop) {

                $pinfo = array();
                $comm = $matches[1][$i];
                $attrib1 = $matches[3][$i];
                $attrib2 = $matches[4][$i];
                $descrip = self::getCommentDescription($comm);

                // Get type
                preg_match_all("#@var\s+($typeMatch)#s", $comm, $tmatch);
                $type = sizeof($tmatch) > 1 && sizeof($tmatch[1]) ? $tmatch[1][0] : '';

                $pinfo['description'] = $descrip;
                $pinfo['type'] = $type;
                $pinfo['attributes'] = array();

                if ($attrib1)
                    $pinfo['attributes'][] = $attrib1;
                if ($attrib2 && $attrib1 != $attrib2)
                    $pinfo['attributes'][] = $attrib2;

                $info['properties'][$prop] = $pinfo;
            }
        }



        /**
         * Extract functions
         */
        preg_match_all("#($comment)?\s*$function#s", $code, $matches);

        if (sizeof($matches) > 5) {

            foreach ($matches[4] as $i => $method) {

                $minfo = array();
                $comment = $matches[1][$i];
                $atts = explode(' ', $matches[3][$i]);
                foreach ($atts as $att)
                    if (trim($att))
                        $minfo['attributes'][] = $att;

                // Extract params from code
                $minfo['params'] = array();
                $minfo['name'] = $method;
                $params = explode(',', str_replace(')', '', str_replace('(', '', $matches[5][$i])));
                foreach ($params as $param)
                    if (strlen(trim($param)) > 0)
                        $minfo['params'][trim($param)] = array();

                $minfo = self::getPhpMethodInfo($comment, $minfo, $type);

                if ($method == '__construct') {
                    $info['constructor'] = $minfo;
                } else {
                    $info['methods'][$method] = $minfo;
                }
            }
        }


        ksort($info['methods']);
        ksort($info['properties']);
        return $info;
    }

    private static function hilightPhpExapmles($text) {

        $example = "<example>(.*)</example>";

        preg_match_all("#$example#s", $text, $matches);

        if (sizeof($matches) && sizeof($matches[0])) {
            foreach ($matches[0] as $i => $match) {
                $code = $matches[1][$i];

                $text = str_replace($code, highlight_string('<?php' . PHP_EOL . $code . PHP_EOL . '?>', true), $text);
            }
        }

        return $text;
    }

    private static function formatJavascript($data, $options = false, $c_string = "#DD0000", $c_comment = "#FF8000", $c_keyword = "#007700", $c_default = "#0000BB", $c_html = "#0000BB", $flush_on_closing_brace = false) {

        if (is_array($options)) { // check for alternative usage
            extract($options, EXTR_OVERWRITE); // extract the variables from the array if so
        } else {
            $advanced_optimizations = $options; // otherwise carry on as normal
        }
        @ini_set('highlight.string', $c_string); // Set each colour for each part of the syntax
        @ini_set('highlight.comment', $c_comment); // Suppression has to happen as some hosts deny access to ini_set and there is no way of detecting this
        @ini_set('highlight.keyword', $c_keyword);
        @ini_set('highlight.default', $c_default);
        @ini_set('highlight.html', $c_html);

        if ($advanced_optimizations) { // if the function has been allowed to perform potential (although unlikely) code-destroying or erroneous edits
            $data = preg_replace('/([$a-zA-z09]+) = \((.+)\) \? ([^]*)([ ]+)?\:([ ]+)?([^=\;]*)/', 'if ($2) {' . "\n" . ' $1 = $3; }' . "\n" . 'else {' . "\n" . ' $1 = $5; ' . "\n" . '}', $data); // expand all BASIC ternary statements into full if/elses
        }

        $data = str_replace(array(') { ', ' }', ";", "\r\n"), array(") {\n", "\n}", ";\n", "\n"), $data); // Newlinefy all braces and change Windows linebreaks to Linux (much nicer!) 
        $data = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $data); // Regex identifies all extra empty lines produced by the str_replace above. It is quicker to do it like this than deal with a more complicated regular expression above.
        $data = str_replace("<?php", "<script>", highlight_string("<?php \n" . $data . "\n?>", true));

        $data = explode("\n", str_replace(array("<br />"), array("\n"), $data));

        # experimental tab level highlighting
        $tab = 0;
        $output = '';

        foreach ($data as $line) {
            $lineecho = $line;
            if (substr_count($line, "\t") != $tab) {
                $lineecho = str_replace("\t", "", trim($lineecho));
                $lineecho = str_repeat("\t", $tab) . $lineecho;
            }
            $tab = $tab + substr_count($line, "{") - substr_count($line, "}");
            if ($flush_on_closing_brace && trim($line) == "}") {
                $output .= '}';
            } else {
                $output .= str_replace(array("{}", "[]"), array("<span style='color:" . $c_string . "!important;'>{}</span>", "<span style='color:" . $c_string . " !important;'>[]</span>"), $lineecho . "\n"); // Main JS specific thing that is not matched in the PHP parser
            }
        }

        $output = str_replace(array('?php', '?&gt;'), array('script type="text/javascript">', '&lt;/script&gt;'), $output); // Add nice and friendly <script> tags around highlighted text

        return '<pre id="code_highlighted">' . $output . "</pre>";
    }

    private static function hilightJsExapmles($text) {

        $example = "<example>(.*)</example>";

        preg_match_all("#$example#s", $text, $matches);

        if (sizeof($matches) && sizeof($matches[0])) {
            foreach ($matches[0] as $i => $match) {
                $code = $matches[1][$i];
                $hi = '<?php' . PHP_EOL . $code . PHP_EOL . '?>';
                $hi = highlight_string($hi, true);
                $hi = str_replace('&lt;?php', '', $hi);
                $hi = str_replace('?&gt;', '', $hi);
                $text = str_replace($code, $hi, $text);
            }
        }

        return $text;
    }

    /**
     * Generates an array with information about the Class or object in the specified piece of JavaScript code
     * @param string $code
     * @return string
     */
    public static function generateJavaScriptCodeInfo($code, $namespace = '') {

        $info = array(
            'name' => '',
            'type' => '',
            'extend' => '',
            'implement' => '',
            'constructor' => '',
            'description' => '',
            'enums' => array(),
            'methods' => array(),
            'properties' => array(),
            'events' => array(),
        );

        $matches = null;
        $matchesWithOffset = null;
        $comment = "/\*.+?\*/";
        $function = "(\w+)\s*:\s*function\s*\(\s*((\w*,?\s*)*)\)";
        $property = "\*/\s*(\w+)\s*:";
        $class = "[\w|\.?]*\.(\w+)\s*=\s*{";
        $classContent = "[\w|\.?]*\.(\w+)\s*=\s*{(.*)}";

        preg_match_all("#$classContent#s", $code, $matches);

        /*
         * Extract class content
         */
//        if (sizeof($matches) > 2) {
//            $content = $matches[2][0];
//        } else {
//            $content = null;
//        }

        /**
         * Get class or object name
         */
        preg_match_all("#$class#s", $code, $matches);
        $info['name'] = ($namespace ? $namespace . '.' : '') . $matches[1][0];
        $info['namespace'] = $namespace;

        /**
         * Extract info from initial comment
         */
        preg_match_all("#($comment)\s*$class#s", $code, $matches);

        $initialComment = sizeof($matches) > 0 && sizeof($matches[1]) ? $matches[1][0] : null;

        if ($initialComment) {

            preg_match_all("#@class|@extend#s", $initialComment, $matches);
            $info['type'] = sizeof($matches) && sizeof($matches[0]) ? 'class' : 'object';

            preg_match_all("#@enum#s", $initialComment, $matches);
            $info['type'] = sizeof($matches) && sizeof($matches[0]) ? 'enum' : $info['type'];
            
            // Extends
            preg_match_all("#@extend\s+{(.+)}#s", $initialComment, $matches);

            $info['extend'] = sizeof($matches) > 1 && sizeof($matches[1]) ? $matches[1][0] : '';

            /**
             * Collect description
             */
            $desc = array();

            foreach (explode(PHP_EOL, $initialComment) as $i => $line) {
                $line = self::cleanCommentLine($line);

                if (!str(trim($line))->startsWith('@'))
                    $desc[] = $line;
            }
            $info['description'] = self::hilightJsExapmles(implode(PHP_EOL, $desc));
        }else {
            $info['type'] = 'object';
        }

        /*
         * Extract methods
         */

        preg_match_all("#$function#s", $code, $matches);
        preg_match_all("#$function#s", $code, $matchesWithOffset, PREG_OFFSET_CAPTURE);
        
        $info['functions'] = $matches;

        /// Insert methods and its parameters
        /// by analyzing the code structure
        if (sizeof($matches) > 0) {
            foreach ($matches[1] as $i => $method) {

                //if (str($method)->startsWith('_')) continue;

                $params = $matches[2][$i];
                preg_match_all("#\w+#s", $params, $pmatches);

                $info['methods'][$method] = array(
                    'name' => $method,
                    'params' => array_flip($pmatches[0]),
                    'index' => $matchesWithOffset[1][$i][1]
                );
                
            }
            ksort($info['methods']);
        }


        /// Now analize each method JSDoc to
        /// complete their name, type, description, exceptions
        foreach ($info['methods'] as $method => $struct) {

            preg_match_all("#\*/\s*$method\s*:\s*function#s", $code, $matches, PREG_OFFSET_CAPTURE);

            if (sizeof($matches) && sizeof($matches[0])
                    && sizeof($matches[0][0])) {
                // Find comment end
                $commentEnd = $matches[0][0][1];

                // Find comment
                $commentText = self::findCommentByEnd($code, $commentEnd);

                // Creates the info of method
                $minfo = self::getJsMethodInfo($commentText, $info['methods'][$method], $type);
                
                // Extract method code
                $minfo['code'] = self::getBracedCode($info['methods'][$method]['index'], $code);
                
                if(str($method)->startsWith("_"))
                    $minfo['attributes'][] = "private";

                if ($method == 'init')
                    $type = 'constructor';

                switch ($type) {
                    case 'method':
                        $info['methods'][$method] = $minfo;
                        break;

                    case 'constructor':
                        $info['constructor'] = $minfo;
                        unset($info['methods'][$method]);
                        break;

                    case 'event':
                        $info['events'][$method] = $minfo;
                        unset($info['methods'][$method]);
                        break;
                }
            }
        }

        if (!is_array($info['constructor']) && array_key_exists('init', $info['methods'])) {
            $info['constructor'] = $info['methods']['init'];
            unset($info['methods']['init']);
        }

        preg_match_all("#$property#s", $code, $matches, PREG_OFFSET_CAPTURE);

        /// Insert properties
        foreach ($matches[0] as $i => $match) {
            $propertyName = $matches[1][$i][0];

            if (array_key_exists($propertyName, $info['methods'])
                    || $propertyName == 'init')
                continue;

            $commentEnd = $match[1];
            $commentText = self::findCommentByEnd($code, $commentEnd);
            
            $pinfo = self::getJsPropertyInfo($commentText);
            
            if(str($propertyName)->startsWith('_'))
                $pinfo['attributes'][] = 'private';
            
            if(in_array('event', $pinfo['attributes'])){
                $info['events'][$propertyName] = $pinfo;
                
            }else{
                $info['properties'][$propertyName] = $pinfo;
                
            }
        }

        ksort($info['properties']);
        ksort($info);

        return $info;
    }

    private static function getJsPropertyInfo($jsdoc) {
        $info = array();

        $info['attributes'] = array();
        $info['type'] = '';

        $var = "\\\$\w+";
        $description = array();
        $lines = explode(PHP_EOL, $jsdoc);
        foreach ($lines as $i => $line)
            $lines[$i] = self::cleanCommentLine($line);
        $jsdoc = implode(PHP_EOL, $lines);

        foreach ($lines as $line) {
            $l = str(trim($line));

            // If comment
            if (!$l->startsWith('@')) {
                $description[] = $line;
                
            } elseif ($l->startsWith('@protected')) {
                $info['attributes'][] = "protected";
                
            } elseif ($l->startsWith('@static')) {
                $info['attributes'][] = "static";
                
            } elseif ($l->startsWith('@event')) {
                $info['attributes'][] = "event";
                
            } elseif ($l->startsWith('@type')) {
                preg_match_all("#@type\s*({.+})#s", $line, $matches);

                if (sizeof($matches) > 1) {
                    $info['type'] = sizeof($matches[1]) ?
                            substr($matches[1][0], 1, strlen($matches[1][0]) - 2) : '';
                }
            }
        }


        $info['description'] = trim(implode(PHP_EOL, $description));


        return $info;
    }

    /**
     * Gets the information about
     * @param type $jsdoc
     */
    private static function getPhpMethodInfo($phpdoc, $info, &$type) {

        $type = 'method';
        $description = array();
        $lines = explode(PHP_EOL, $phpdoc);
        foreach ($lines as $i => $line)
            $lines[$i] = self::cleanCommentLine($line);
        $phpdoc = implode(PHP_EOL, $lines);
        $typeMatch = "[\w\\\\|\\<\\>]+\[?\]?";

        foreach ($lines as $line) {
            $l = str(trim($line));

            // If comment
            if (!$l->startsWith('@')) {
                $description[] = $line;
            } elseif ($l->startsWith('@param')) {

                $pname = '';
                $pdesc = array();
                $ptype = '';
                $parts = explode(" ", $line);

                foreach ($parts as $part) {
                    if (trim($part) == '@param')
                        continue;

                    if (!$ptype) {
                        $ptype = $part;
                    } else if (!$pname) {
                        $pname = $part;
                    } else {
                        $pdesc[] = $part;
                    }
                }

                $trueName = $pname;

                // Check if optional
                foreach ($info['params'] as $param => $data) {
                    $parts = explode('=', trim($param));

                    if (sizeof($parts) > 1 && trim($parts[0]) == $pname) {
                        $trueName = $param;
                        break;
                    }
                }

                $info['params'][$trueName] = array();
                $info['params'][$trueName]['name'] = $pname;
                $info['params'][$trueName]['type'] = $ptype;
                $info['params'][$trueName]['description'] = trim(implode(' ', $pdesc));
            } elseif ($l->startsWith('@returns') || $l->startsWith('@return')) {
                preg_match_all("#@returns?\s*($typeMatch)\s*(.*)?#s", $line, $matches);

                if (sizeof($matches) > 2) {
                    $info['returns'] = sizeof($matches[1]) ? $matches[1][0] : '';
                    $info['returnsdescription'] = sizeof($matches[2]) ? $matches[2][0] : '';
                }
            } elseif ($l->startsWith('@variable-params')) {
                $info['attributes'][] = "variable-params";
                
            } elseif ($l->startsWith('@remote')) {
                $info['attributes'][] = "remote";
                
            } elseif ($l->startsWith('@deprecated')) {
                $info['attributes'][] = "deprecated";
                
            } elseif ($l->startsWith('@throws')) {
                preg_match_all("#@throws\s*({.+})\s*(.*)?#s", $line, $matches);

                if (sizeof($matches) > 2) {
                    if (!isset($info['throws']))
                        $info['throws'] = array();
                    $info['throws'][] = array(
                        'type' => sizeof($matches[1]) ? substr($matches[1][0], 1, strlen($matches[1][0]) - 2) : '',
                        'description' => sizeof($matches[2]) ? $matches[2][0] : '',
                    );
                }
            }
        }

        $info['description'] = trim(implode(PHP_EOL, $description));

        return $info;
    }

    /**
     * Gets the information about the method
     * @param type $jsdoc
     */
    private static function getJsMethodInfo($jsdoc, $info, &$type) {

        $type = 'method';
        $info['attributes'] = array();
        $description = array();
        $lines = explode(PHP_EOL, $jsdoc);
        foreach ($lines as $i => $line)
            $lines[$i] = self::cleanCommentLine($line);
        $jsdoc = implode(PHP_EOL, $lines);

        foreach ($lines as $line) {
            $l = str(trim($line));

            // If comment
            if (!$l->startsWith('@')) {
                $description[] = $line;
            } elseif ($l->startsWith('@param')) {
                preg_match_all("#@param\s*({.+})\s*(\w+)\s*(.*)?#s", $line, $matches);

                if (sizeof($matches) > 2) {
                    $paramName = sizeof($matches[2]) ? $matches[2][0] : '';
                    $info['params'][$paramName] = array();
                    $info['params'][$paramName]['type'] = sizeof($matches[1]) ? substr($matches[1][0], 1, strlen($matches[1][0]) - 2) : '';
                    $info['params'][$paramName]['description'] = sizeof($matches[3]) ? $matches[3][0] : '';
                }
            } elseif ($l->startsWith('@returns')) {
                preg_match_all("#@returns\s*({.+})\s*(.*)?#s", $line, $matches);

                if (sizeof($matches) > 2) {
                    $info['returns'] = sizeof($matches[1]) ? substr($matches[1][0], 1, strlen($matches[1][0]) - 2) : '';
                    $info['returnsdescription'] = sizeof($matches[2]) ? $matches[2][0] : '';
                }
            } elseif ($l->startsWith('@constructor')) {
                $type = 'constructor';
                
            } elseif ($l->startsWith('@event')) {
                $type = 'event';
                
            } elseif ($l->startsWith('@static')) {
                $info['attributes'][] = "static";
                
            } elseif ($l->startsWith('@protected')) {
                $info['attributes'][] = "protected";
                
            } elseif ($l->startsWith('@deprecated')) {
                $info['attributes'][] = "deprecated";
                
            } elseif ($l->startsWith('@private')) {
                $info['attributes'][] = "private";
                
            } elseif ($l->startsWith('@throws')) {
                preg_match_all("#@throws\s*({.+})\s*(.*)?#s", $line, $matches);

                if (sizeof($matches) > 2) {
                    if (!isset($info['throws']))
                        $info['throws'] = array();
                    $info['throws'][] = array(
                        'type' => sizeof($matches[1]) ? substr($matches[1][0], 1, strlen($matches[1][0]) - 2) : '',
                        'description' => sizeof($matches[2]) ? $matches[2][0] : '',
                    );
                }
            }
        }

        $info['description'] = trim(implode(PHP_EOL, $description));

        return $info;
    }
    
    /**
     * 
     * @param int $start
     * @param string $code
     * @return string
     */
    private static function getBracedCode($start, $code){
        $method = "";
        $stack = array();
        $concatenate = false;
        
        for($i = $start; $i < strlen($code); $i++){
            
            $char = substr($code, $i, 1);
            
            if($char == '{'){
                array_push($stack, $i);

                if($concatenate) $method .= $char;
                
                $concatenate = true;
                
            }elseif($char == '}'){
                array_pop($stack);
                
                if(sizeof($stack) === 0) {
                    break;
                }
                
                if($concatenate) $method .= $char;
            }else{
                if($concatenate) $method .= $char;
            }
            
//            if($concatenate) $method .= $char;
            
        }
        
        return $method;
    }
    
    /**
    * Gets the namespaces on ua/ folder of specified app
    * 
    * @remote
     * @deprecated
    * @param string $app
    * @return array
    */
    public static function getAppUaNamespaces($app){
        return LatteReflection::getDirectoryList(DataLatteUa::getAppPath($app) . '/ua');
    }

    private static function getCommentDescription($comment) {

        $lines = explode(PHP_EOL, $comment);
        $desc = array();

        foreach ($lines as $line) {
            $line = self::cleanCommentLine($line);

            if (!str(trim($line))->startsWith('@'))
                $desc[] = $line;
        }

        return implode(PHP_EOL, $desc);
    }

    /**
     * Cleans the '/' and '*' characters from JSDoc comments
     * @param type $line
     */
    private static function cleanCommentLine($line) {
        $line = str_replace('/*', '', $line);
        $line = str_replace('*/', '', $line);
        $line = trim($line);

        if (str($line)->startsWith('*'))
            $line = substr($line, 1);

        //$line = trim($line);

        return $line;
    }

    /**
     * Finds the specified comment given the end of the comment
     */
    private static function findCommentByEnd($code, $commentEnd) {

        $commentStart = 0;

        for ($i = $commentEnd; $i > 0; $i--) {
            $char = substr($code, $i, 1);
            $prevChar = substr($code, $i - 1, 1);

            if ($char == '*' && $prevChar == '/') {
                $commentStart = $i - 1;
                break;
            }
        }

        return substr($code, $commentStart, $commentEnd - $commentStart + 2);
    }
    
    /**
     * Gets an array of information pieces for specified modules.
     * <c>$moduleNames</c> may be a module name or a comma separated list of modules.
     * 
     * @remote
     * @param string $moduleNames
     * @param string $version
     * @return array
     */
    public static function getModuleClassesInfo($moduleNames, $version = 'development'){
        
        $gatherer = array();
        $tokens = explode(',', $moduleNames);

        // Execute method for each module name
        foreach ($tokens as $token){
            $m = new LatteModule(trim($token));
            $gatherer = array_merge($gatherer, $m->getClassesInfo($version));
        }

        return $gatherer;
        
    }
    
    /**
    * Gets the informatio array about the object on server
    * 
    * @remote
    * @deprecated
    * @param string $app
    * @param string $className
    * @return array
    */
    public static function getServerObject($app, $className) {

        $path = DataLatteUa::getAppPath($app) . "/php/$className.php";

        return LatteReflection::generatePhpFileInfo($path);
    }

    /**
     * Gets the names of files in the classes/ folder
     * 
     * @remote
     * @deprecated
     * @param string $app
     * @return array
     */
    public static function getServerObjects($app) {

        $list = LatteReflection::getFileList(DataLatteUa::getAppPath($app) . '/php', '.php');

        foreach ($list as $i => $value) {
            $s = str($value);
            $list[$i] = $s->substring(0, $s->length() - 4) . '';
        }

        return $list;
    }

    /**
     * Gets the information array of all objects in app
     * 
     * @remote
     * @deprecated
     * @param string $app
     * @return array
     */
    public static function getServerObjectsDeep($app = 'App') {

        $list = self::getServerObjects($app);
        $objects = array();

        foreach ($list as $i => $className) {
            $objects[$className] = self::getServerObject($app, $className);
        }

        return $objects;
    }

}