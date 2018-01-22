<?php


/*
  Handles User Agent related tasks
  
 */
class DataLatteUa {
    
    /*
     * Path of DataLatte from UAs.
     * 
     * @var string
     */
    public static $path = "/datalatte";
    
    /**
     * Path of DataLatte request from UAs
     *
     * @var string
     */
    public static $requestPath = "/datalatte/request.php";
    
    /**
     * Holds a list of directory to search for namespaces
     * @var type 
     */
    private static $namespaceDirectories = array();
    
    /**
     * Includes JavaScript of specified app and DataLatte core.
     * 
     * @deprecated
     * @param string $app
     * @param boolean= $includeCore
     */
    public static function dumpAppJs($app){
        
        $response = '';
        
        $response .= PHP_EOL . "/* App: $app */" . PHP_EOL;
        
        $namespaces = LatteReflection::getAppUaNamespaces($app);
        $files = array();
        
        $response .= PHP_EOL . "/* Namespaces in : $app \n" . implode(PHP_EOL, $namespaces) . "*/" . PHP_EOL;

        foreach($namespaces as $namespace)
            $files = array_merge($files, self::getNamespaceFiles($app, $namespace));
        
        $response .= self::createFilesJs($files);

        echo $response;
    }
    
    /**
     * Finds all .js files in the path and gathers it's code.
     * File scanning is <b>not recursive</b>.
     * 
     * @param string $path Path to scan for JS files
     * @return string
     */
    public static function getFolderJs($path){
        
        $response = '';
        $folders = LatteReflection::getDirectoryList($path);
        $files = array();
        
        // Root files
        foreach(LatteReflection::getFileList($path, 'js') as $file){
            $response .= file_get_contents(DLString::combinePath($path, $file));
        }
        
        foreach($folders as $folder){
            
            // Compose folder path
            $folderPath = DLString::combinePath($path, $folder);
            
            // Scan files in folder
            foreach(LatteReflection::getFileList($folderPath, 'js') as $file){
                $files[] = DLString::combinePath($folderPath, $file);
            }
        }
        
        return $response . self::createFilesJs($files);
        
    }
    
    /**
     * Includes CSS of specified app and DataLatte core.
     * 
     * @deprecated
     * @param string $app
     * @param boolean= $includeCore
     */
    public static function dumpAppCss($app){
        $namespaces = LatteReflection::getAppUaNamespaces($app);
       
        foreach($namespaces as $namespace){
            self::dumpNamespaceCss($app, $namespace); 
        }
    }
    
    /**
     * @deprecated
     */
    public static function dumpFullCss(){
        
        // DataLatte CSS
        self::dumpAppCss('DataLatte');
        
        // App CSS
        self::dumpAppCss('App');
    }
    
    /**
     * @deprecated
     */
    public static function dumpFullJs(){
        
        // Runtime scripts
        self::dumpRunJs();
        
        // DataLatte scripts
        self::dumpAppJs('DataLatte');
        
        // App scripts
        self::dumpAppJs('App');
    }
    
    /**
     * Dumps the css code for the specified namespace
     * 
     * @deprecated
     * @param string $namespace 
     */
    public static function dumpNamespaceCss($app, $namespace){
        
        echo self::getNamespaceCss($app, $namespace);
    }
    
    /**
     * Dumps the css code for the specified namespace
     * 
     * @deprecated
     * @param string $namespace 
     */
    public static function getNamespaceCss($app, $namespace){
        
        // Security: remove "/" and "\" to avoid hacks
        $namespace = str_replace("/", '', $namespace);
        $namespace = str_replace("\\", '', $namespace);
        $response = '';
        
        $path = self::getPathForNamespace($app, $namespace);
        
        if($path){
            
            // Get files to export
            $files = LatteReflection::getFileList($path, '.css');
            
            foreach($files as $file){
                $response .= '/' . 
                        str_repeat('*', 80) . PHP_EOL .
                        str_repeat(' ', 30) . $file . PHP_EOL .
                        str_repeat('*', 80) . '/';
             
                $response .= file_get_contents( DLString::combinePath($path, $file));
            }
            
            
            
        }else{
            $response .= "/** (PHP) DataLatteUa: path for $namespace not found. **/";
        }
        
        return $response;
    }
    
    /**
     * Finds all .css files in the path's folders and gathers it's code.
     * File scanning is <b>not recursive</b>.
     * 
     * @param string $path Path to scan for JS files
     */
    public static function getFolderCss($path){
        
        $response = '';
        $folders = LatteReflection::getDirectoryList($path);
        $files = array();
        
        foreach($folders as $folder){
            
            // Compose folder path
            $folderPath = DLString::combinePath($path, $folder);
            
            // Scan files in folder
            foreach(LatteReflection::getFileList($folderPath, 'css') as $file){
                $files[] = DLString::combinePath($folderPath, $file);
            }
        }
        
        foreach($files as $file){
            $response .= '/' . 
                    str_repeat('*', 80) . PHP_EOL .
                    str_repeat(' ', 30) . $file . PHP_EOL .
                    str_repeat('*', 80) . '/';

            $response .= file_get_contents($file);
        }
        
        return $response;
    }
    
    /**
     * Gets the path for the specified app
     * 
     * @deprecated
     * @param type $app
     * @return string
     */
    public static function getAppPath($app){
        $path = "";

        if($app == 'DataLatte'){
            $path = __DIR__ . '/..';

        }elseif($app == 'App'){
            $path = __DIR__ . '/../../../datalatte-app';

        }else{
            $path = __DIR__ . '/../../datalatte-modules/' . $app;
        }
        
        return $path;
    }
    
    /**
     * Dumps the javascript code for the specified namespace
     * 
     * @deprecated
     * @param string $app
     * @param string $namespace 
     */
    public static function dumpNameSpaceJs($app, $namespace){
        echo self::createFilesJs(self::getNamespaceFiles($app, $namespace));
    }
    
    /**
     * Gets the file names of a namespace
     * 
     * @deprecated
     * @param type $app
     * @param type $namespace
     * @return type
     */
    private static function getNamespaceFiles($app, $namespace){
        // Security: remove "/" and "\" to avoid hacks
        $namespace = str_replace("/", '', $namespace);
        $namespace = str_replace("\\", '', $namespace);
        
        $path = self::getPathForNamespace($app, $namespace);
        
        // Check if path ok
        if(!$path) die("throw '(PHP) DataLatteUa: path for $namespace not found.';");
            
        // Get files to export
        $files = LatteReflection::getFileList($path, '.js');
        
        // Create files array into a full path files array
        foreach($files as $i => $file)
            $files[$i] = DLString::combinePath($path, $file);
        
        return $files;
    }
    
    /**
     * Dumps the javascript code for the specified namespace
     * @param string $app
     * @param string $namespace 
     */
    private static function createFilesJs($files){
        
        /* 
         * 
         * Check priorities of subclassing:
         *  Having classes A, B, C where AB means a inherits B
         * - assign priority by use of class name as suffix
         * - sort by priority
         * - bind using priority
        */
        $classes = array();
        $descriptions = array();
        $fulldescriptions = array();
        $response = "";
        $lines = array();

        /// Initialize classes array
        foreach($files as $file){
            $meta = LatteReflection::generateJavaScriptFileInfo($file);
            $name = $meta['name'];
            $classes[$name] = 0;
            $lines[$name] = sizeof(file($file));
            $descriptions[$name] = $meta;
            $fulldescriptions[$name] = $meta;
            $files[$name] = $file;
        }
        
        // Function that checks extensibility
        if(!function_exists('_extends')){
            function _extends($baseClass, $superClass, $classes){

                if(!array_key_exists($baseClass, $classes)){
                    return false;
                }

                $baseMeta = $classes[$baseClass];

                if($baseMeta['extend'] == $superClass){
                    return true;
                }else{
                    if($baseMeta['extend']){
                        return _extends($baseMeta['extend'], $superClass, $classes);
                    }else{
                        return false;
                    }
                }
            }
        }
        
        foreach($classes as $className => $priority){
            foreach($classes as $check => $foo){
                /**
                 * if $className extends $check
                 *  $classes[$className]++;
                 */
                if(_extends($check, $className, $fulldescriptions)){
                    $classes[$className]++;
                }
            }
        }

        /// Sort
        arsort($classes);

        $response .= "/*" . var_export($classes, true) . "*/";
        
        
//        $response .= "/* LINES " . PHP_EOL;
//        foreach($lines as $cname => $lines)
//            $response .= $cname . ',' . $lines . PHP_EOL;
//        echo PHP_EOL . " */";

        foreach($classes as $c => $priority){
            $info = $descriptions[$c];
            
            $nsparts = explode('.', $info['namespace']);
            $nsparent = '';
            $nslines = array();
            
            foreach($nsparts as $nspart){
                $checker = $nsparent . (strlen($nsparent) ? '.' : '') . $nspart;
                $nslines[] = "if((typeof $checker) == 'undefined') $checker = {};";
                $nsparent .= (strlen($nsparent) ? '.' : '') . $nspart;
            }
            
            $response .= PHP_EOL . implode(' ', $nslines) . PHP_EOL;
            
            $classpath = $files[$c];
            

            // DUMP file
            $source = file_get_contents($classpath);
            //$source = str_replace('this._super(', 'this["_super"](', $source);
            $response .= $source;

            // Iherit from base or Class
            if( $info['extend'] ){
                $response .= PHP_EOL ."$c = $info[extend].extend($c);" . PHP_EOL;

            }elseif($info['type'] == 'class'){
                $response .= PHP_EOL . "$c = Class.extend($c);" . PHP_EOL;
            }

            // Link static properties
            foreach($info['properties'] as $prop => $data){
                if(isset($data['attributes']) && in_array('static', $data['attributes']) ){
                    $response .= "$c.$prop = $c.prototype.$prop;" . PHP_EOL;
                }
            }

            // Link static methods
            foreach($info['methods'] as $method => $data){
                if(isset($data['attributes']) && in_array('static', $data['attributes']) ){
                    $response .= "$c.$method = $c.prototype.$method;" . PHP_EOL;
                }
            }

            // Name for console
            $response .= PHP_EOL ."$c.toString = function(){ return '$c'; }; " . PHP_EOL;


        }
        
        return $response;

    }
    
    /**
     * Do 
     * 
     * @deprecated
     * @param type $app
     * 
     */
    public static function dumpRuntimeJs(){

        readfile(DLString::combinePath(DATALATTE_CORE, 'support/js/datalatte-runtime.js'));

    }
    
    /**
     * @deprecated
     */
    public static function dumpRunJs(){
        self::dumpRuntimeJs();
        self::dumpJsConfig();
        self::dumpJsStrings();
    }
    
    /**
     * @deprecated
     */
    public static function dumpJsStrings(){
        echo self::getJsStrings();
    }
    
    /**
     * @deprecated
     * @return type
     */
    public static function getJsStrings(){
        global $strings;

        $response = '';
        
        $response .= "var strings = {};";

        foreach ($strings as $key => $string) {
            $response .= "strings.$key=\"$string\";";
        }
        
        return $response;
    }
    
    /**
     * @deprecated
     * @return string
     */
    public static function getJsConfig(){
        $response = '';
        
        $response .= "if(typeof latte == 'undefined') latte = {};";
        $response .= "if(typeof latte.config == 'undefined') latte.config = {};";
        $response .= "latte.config.requestPath = \"" . self::$requestPath . "\";";
        $response .= "latte.config.path = \"" . self::$path . "\";";
        
        return $response;
    }
    
    /**
     * @deprecated
     */
    public static function dumpJsConfig(){
        echo self::getJsConfig();
    }
    
    /**
     * Retrieves a record
     *
     * @remote 
     * @param string $name
     * @param string $id
     * @param string $module
     * @return DataRecord
     */
    public static function recordSelect($name, $id = NULL, $module = NULL){

        $connectionBuffer = null;

        if($module){
            if(!LatteModule::isLoaded($module)){
                $mod = LatteModule::memoryLoad($module);
                if($mod->hasConnection()){
                    $connectionBuffer = DL::$current;
                    $mod->loadConnection();
                }
            }else{
                $connectionBuffer = DL::$current;
                LatteModule::byName($module)->loadConnection();
            }
        }

        if($id)
            $record = DataRecord::byAuto($name, $id);
        else
            $record = new $name();

        if ($connectionBuffer){
            DL::$current = $connectionBuffer;
        }

        return $record->pack();
    }
    
    /**
     * @remote
     */
    public static function recordListing($name, $listing, $options = null){

        throw new Exception("Obsolete");
        
//        $record = new $name();
//
//        $records = DataLatteFw::getListingElements($record, $listing);
//
//        $pack = array();
//
//        foreach($records as $record)
//            $pack[] = $record->pack();
//
//        return $pack;
        
    }
    
    /**
     * @remote 
     * @param type $name
     * @param type $id
     */
    public static function recordUpdate($name, $id, $values){

//        die("name: $name, id: $id, values: " .var_export($values, true));
        $record = DataRecord::byAuto($name, $id);

//        die("Record: " . var_export($record, true));
        
//        if(!DataRecordMetadata::canEdit($record))
//            throw new Exception("Cant update record");
        
        $fields = $record->getFields();

//        die("Fields: " . var_export($fields, true));
        
        foreach($values as $field => $value){
            if(array_key_exists($field, $fields)){
                $record->{$field} = $value;
            }
        }

//        die("Updated Record: " . var_export($record, true));

        if(DL::$globalCanUpdate || $record->canUpdate()){
            $record->update();
        }else{
            throw new Exception("Record can't be updated (::canUpdate)");
        }


//        die("[UPDATED]");
        
        //return $record->update();
    }
    
    /**
     * @remote 
     * @param string $name
     * @param any $values
     * @return DataRecord
     * @throws Exception
     */
    public static function recordInsert($name, $values){

        $record = new $name;
        
//        if(!DataRecordMetadata::canInsert($record))
//            throw new Exception("Cant insert record");
        
        $fields = $record->getFields();

        foreach($values as $field => $value){
            if(array_key_exists($field, $fields)){
                $record->{$field} = $value;
            }
        }

        if (DL::$globalCanInsert || $record->canInsert()){
            $record->insert();
        }else{
            throw new Exception("Record can't be inserted (::canInsert)");
        }



        return $record->getIdValue();
    }
    
    /**
     * @remote 
     * @param string $name
     * @param int $id
     * @return any
     * @throws Exception
     */
    public static function recordDelete($name, $id){

        $record = DataRecord::byAuto($name, $id);
        
        if(DL::$globalCanDelete || !$record->canDelete())
            throw new Exception("Record can't be deleted (::canDelete)");
        
        return $record->delete();
    }

    /**
     * Gets the path for the specified namespace if found.
     * 
     * @deprecated
     * @param string $app
     * @param string $namespace
     * @return string File system path for namespace 
     */
    private static function getPathForNamespace($app, $namespace){
        $path = null;
        $checked = array();
        
        return self::getAppPath($app) . '/ua/' . $namespace;
        
        /// Get path
        foreach(self::$namespaceDirectories as $dir){
            $possible = DLString::combinePath($dir, $namespace);
            $check = DLString::combinePath($possible, '.');
            $checked[] = $dir;
            if(file_exists($check)){
                $path = $possible;
                break;
            }
        }
        
//        if(!$path){
//            echo "/* Checked:";
//            print_r($checked);
//            echo "*/";
//        }
        
        return $path;
    }
    
    /**
     * Gets an array of tags for running the specified app.
     * It optionally may not include the core runtime tags
     * 
     * @deprecated
     * @param string $app
     * @param boolean $includeCore
     * @return DocumentTag
     */
    public static function appTags($app = 'App', $includeCore = true){
        
        return array(
            tag("script")
            ->attr("type", "text/javascript")
            ->attr("src", DLString::combinePath(self::$path , '_core/support/js/jquery-1.7.2.min.js')),
            
            tag("script")->attr("type", "text/javascript")->attr("src", self::$requestPath . '?action=full-js&app='. $app),
            
            //tag("script")->attr("type", "text/javascript")->attr("src", '/compiled.js'),

            tag("link")
                ->attr("rel", "stylesheet") 
                ->attr("href", self::$requestPath . '?action=full-css&app=' . $app),
                
        );
    }
    
    /*
     * Gets an array of tags for a specific namespace
     * 
     * @deprecated 
     * @param string $namespace
     * @param string $app
     */
    public static function namespaceTags($namespace, $app = 'DataLatte'){
        
        if(!$namespace) throw new Exception("namespace is required");
        
        $parts = explode(".", $namespace);
        $object = $parts['0'];
        
        return array(
            tag("link")
                ->attr("rel", "stylesheet") 
                ->attr("href", self::$requestPath . '?action=namespace-css&namespace=' . $namespace . '&app=' . $app),

            tag("script")
                ->attr("type", "text/javascript")
                ->attr("src", self::$requestPath . '?action=namespace-js&namespace=' . $namespace . '&app=' . $app),
                //->attr("src", "/compiled.js"),
        );
    }
    
    /**
     * Registers a directory to search for namespaces
     * @param string $path Path to register
     */
    public static function registerNamespaceDirectory($path){
        self::$namespaceDirectories[] = $path;
    }
    
    /*
     * Gets an array of tags necessary for running DataLatte
     * @deprecated
     */
    public static function runtimeTags(){
        return array(
            tag("script")
            ->attr("type", "text/javascript")
            ->attr("src", DLString::combinePath(self::$path , 'support/js/jquery-1.7.2.min.js')),
            
            tag("script")
            ->attr("type", "text/javascript")
            ->attr("src", self::$requestPath . '?action=run-js'),
            
        );
    }
    
    /**
     * Updates the DataLatteUa::$path variable, based on the current REQUEST_URI
     */
    public static function updatePath(){
        $req = str($_SERVER['REQUEST_URI']);
        $index = $req->indexOf(str('/datalatte'));
        
        if($index < 0)
            throw new Exception("DataLatte not detected on URI_REQUEST");
        
        if($index > 0)
            self::$path = $req->substring(0, $index) . '/datalatte';
    }
    
}
  