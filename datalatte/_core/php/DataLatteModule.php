<?php

class DataLatteModule {

    //region Contants
    /**
     * Name of the system core module
     */
    const SYSMODULE_CORE = '_core';
    
    /**
     * Name of the main app module.
     */
    const SYSMODULE_APP = '_app';
    
    /**
     * Name of system module of DataLatte manager
     */
    const SYSMODULE_MANAGER = '_manager';
    
    /**
     * Path (relative to module path) of directory where JavaScript code is located
     */
    const PATH_UA = 'ua';

    /**
     * Path (relative to module path) of directory where TypeScript code is located
     */
    const PATH_TS = 'ts';
    
    /**
     * Path (relative to module path)  of directory where language strings are located
     */
    const PATH_LANG = 'lang';
    
    /**
     * Path (relative to module path)  of directory where PHP classes are located
     */
    const PATH_CLASSES = 'php';
    
    /**
     * Path (relative to module path)  of directory where support files are located
     */
    const PATH_SUPPORT = 'support';
    
    /**
     * Path (relative to module path)  of directory where plugins are located
     */
    const PATH_PLUGINS = 'plugins';
    
    /**
     * Path (relative to module path)  of file where module initialization is located
     */
    const PATH_INIT = 'init.php';
    
    /**
     * Path (relative to datalatte-files) 
     */
    const PATH_RELEASES = 'releases';
    //endregion

    //region Static

    /**
     * Holds instances of loaded modules
     *
     * @var array
     */
    public static $loadedModules = array();

    /**
     * Returns the loaded instance of the module of the specified name.
     * If it is not yet loaded, loads it into memory
     * @param $name
     * @return DataLatteModule
     */
    public static function byName($name){

        foreach(self::$loadedModules as $module){
            if($module->name == $name){
                return $module;
            }
        }

        $module = new DataLatteModule($name);
        $module->load();

        return $module;
    }

    /**
     * Gets the back up folder path
     *
     * @param string $versionFolder
     * @return string
     */
    private static function getBackupPath($versionFolder){
        return String::combinePath($versionFolder, 'bak');
    }

    /**
     * Gets the Major number of specified version string
     * @param string $version
     * @return int
     * @throws InvalidArgumentException
     */
    private static function getMajor($version){

        $version = strval($version);
        $parts = explode('.', $version);

        if(sizeof($parts) == 0){
            return 0;

        }elseif(sizeof($parts) == 1 || sizeof($parts) == 2){
            return intval($parts[0]);

        }else{
            throw new InvalidArgumentException('$version');
        }
    }

    /**
     * Gets the Minor number of specified version string
     * @param string $version
     * @return int
     * @throws Exception
     */
    private static function getMinor($version){

        $version = strval($version);
        $parts = explode('.', $version);

        if(sizeof($parts) == 0){
            return 0;

        }elseif(sizeof($parts) == 1){
            return 0;

        }elseif(sizeof($parts) == 2){
            return intval($parts[1]);

        }else{
            throw new InvalidArgumentException('$version');
        }
    }

    /**
     * Loads the module and returns its tags for including in Document
     *
     * @param $moduleName
     * @return array
     */
    public static function tagsOf($moduleName, $lang = null){
        $module = new DataLatteModule($moduleName);
        $module->load($lang);
        return $module->getTags();
    }

    /**
     * Loads the module and its connection and returns is tags for including in Document
     *
     * @param $moduleName
     * @return array
     */
    public static function tagsAndConnectionOf($moduleName){
        $module = new DataLatteModule($moduleName);
        $module->load();
        $module->loadConnection();
        return $module->getTags();
    }

    //endregion

    //region Public Fields

    /**
     * Metadata of module
     * @var array
     */
    public $metadata = array();

    /**
     * Name of module
     * @var string
     */
    public $name;
    
    /**
     * Path of module
     * @var string
     */
    public $path;
    
    /**
     * Path of module's classes folder
     * @var string
     */
    public $pathClasses;
    
    /**
     * Path of module's ua folder
     * @var string
     */
    public $pathUa;
    
    /**
     * Path of module's lang folder
     * @var string
     */
    public $pathLang;
    
    /**
     * Path of module's support folder
     * @var string
     */
    public $pathSupport;

    /**
     * Path of module's TypeScript classes folder
     */
    public $pathTs;
    //endregion

    //region Ctor
    /**
     * Creates a module information class from the specified module name
     * 
     * @param type $name
     * @throws exception
     */
    public function __construct($name){
        
        $this->name = $name;
        $this->path =$this->path = String::combinePath(DATALATTE_MODULES, $name);

        if(!is_dir($this->path)){
            throw new ErrorException("Directory -$name- does not exist in modules directory");
        }
        
        $this->pathClasses = String::combinePath($this->path, self::PATH_CLASSES);
        $this->pathUa = String::combinePath($this->path, self::PATH_UA);
        $this->pathLang = String::combinePath($this->path, self::PATH_LANG);
        $this->pathSupport = String::combinePath($this->path, self::PATH_SUPPORT);
        $this->pathTs = String::combinePath($this->path, self::PATH_TS);
        
    }
    //endregion

    //region Private Methods

    /**
     * Returns an array with all strings of all languages
     * @return array
     */
    private function createStringsArray(){
        
        $filesPath = String::combinePath($this->path, self::PATH_LANG);
        $files = DataLatteReflection::getFileList($filesPath, 'txt');
        $response = array();
        
        foreach($files as $file){
            
            // File path
            $path = String::combinePath($filesPath, $file);
            
            // Get lang
            $lang =  basename($file, '.txt');

            // Scan file
            foreach(file($path) as $s){
                $parts = explode(" ", $s);
                $name = $parts[0]; 
                unset($parts[0]);
                $str = str_replace('"', '\\"', trim(implode(" ", $parts)));
                
                $response[$lang][$name] = $str;
                
            }
        }
        
        return $response;
    }
    
    /**
     * Creates the files of strings (JavaScript and PHP). The <c>return</c> param accepts
     *  <b>'js'</b> or <b>'php'</b>, in which case, the files will not be written.
     * 
     * @param string $versionFolder
     * @param string= $return
     * @return mixed
     */
    private function createStringsFiles($versionFolder, $return = null){
        
        $response = '';
        $langs = $this->createStringsArray();
        
        $jsInit = "if( (typeof window['strings']) != 'object'){ window['strings'] = {}; }";
        $phpInit = 'if(!isset($GLOBALS["strings"])){$GLOBALS["strings"]=array();}';
        
        foreach($langs as $lang => $strings){
            
            // Files path
            $jsPath = String::combinePath($versionFolder, 'lang-' . $lang . '.js');
            $phpPath = String::combinePath($versionFolder, 'lang-' . $lang . '.php');
            
            // Open file to write
            if(!$return) {
                $h = fopen($jsPath, 'w+');
                $phph = fopen($phpPath, 'w+');
            }
            
            // Write strings variables Init
            if(!$return) {
                fwrite($h, $jsInit);
                fwrite($phph, $phpInit);
            }else{
                if($return == 'js'){
                    $response .= $jsInit;
                }elseif($return == 'php'){
                    $response .= $phpInit;
                }
            }
            
            // Scan file
            foreach($strings as $name => $str){
                
                $jsLine = "window['strings']['$name']=\"$str\";";
                $phpLine = "\$GLOBALS['strings']['$name']=\"$str\";";
                
                if(!$return) {
                    fwrite($h, $jsLine);
                    fwrite($phph, $phpLine);
                }else{
                    if($return == 'js'){
                        $response .= $jsLine;
                    }elseif($return == 'php'){
                        $response .= $phpLine;
                    }
                }
            }
            
            // Close files
            if(!$return) {
                fclose($h);
                fclose($phph);
            }
        }
        
        return $response;
    }

    //endregion

    //region Public Methods
    /**
     * Gets url of JavaScript file for specified version
     * If version is ommitted, latest version will be used.
     *
     * @param string= $version
     * @param string= $urlPrefix
     * @return string
     */
    public function getUrlForJs($version = null, $urlPrefix = ''){

        if($version === null){
            $version = $this->getLatestVersion();
        }

        return "$urlPrefix/datalatte-files/releases/$this->name/$version/$this->name.js";
    }

    /**
     * Gets url of JS strings file for specified version
     * If version is ommitted, latest version will be used.
     *
     * @param string= $version
     * @param string= $lang
     * @param string= $urlPrefix
     * @return string
     */
    public function getUrlForJsStrings($version = null, $lang = 'en', $urlPrefix = ''){

        if($version === null){
            $version = $this->getLatestVersion();
        }

        return "$urlPrefix/datalatte-files/releases/$this->name/$version/lang-$lang.js";
    }

    /**
     * Gets the Url for the support folder
     * @param string $version
     * @param string $urlPrefix
     * @return string
     */
    public function getUrlForSupport($version = null, $urlPrefix = ''){
        if($version === null){
            $version = $this->getLatestVersion();
        }

        if($version == 'development'){
            if($this->name == '_core'){
                return "$urlPrefix/datalatte/_core/support";

            }elseif($this->name == '_app'){
                return "$urlPrefix/datalatte-app/support";

            }elseif($this->name == '_manager'){
                return "$urlPrefix/datalatte/_manager/support";

            }else{
                return "$urlPrefix/datalatte-modules/$this->name/support";
            }
        }else{
            return "$urlPrefix/datalatte-files/releases/$this->name/$version/support";
        }
    }

    /**
     * Gets all the info about classes in the specified version
     *
     * @param string $version
     * @return array
     * @throws Exception
     */
    public function getClassesInfo($version = 'latest'){

        $response = array();
        $version = $this->resolveVersion($version);

        if($version == 'development'){

            $files = DataLatteReflection::getFileList($this->pathClasses);

            foreach($files as $file){
                $info = DataLatteReflection::generatePhpFileInfo(
                    String::combinePath($this->pathClasses, $file));
                $response[$info['name']] = $info;
            }

        }else{
            throw new Exception("getClassesInfo::Implement this!");
        }

        return $response;
    }

    /**
     * Gets the live css of module
     */
    public function getCss(){

        $uapath = String::combinePath($this->path, self::PATH_UA);
        $tspath = String::combinePath(String::combinePath($this->path, self::PATH_SUPPORT), $this->name . '.css');

        if(file_exists($uapath)){
            return DataLatteUa::getFolderCss($uapath);

        }elseif(file_exists($tspath)){
            return file_get_contents($tspath);

        }else{
            return '';
        }

    }

    /**
     * Gets the disk path of the specified version.
     * Version may be <c>latest</c>, <c>development</c> or a version number (e.g. '0.1')
     *
     * @param string $version
     * @return string
     */
    public function getPath($version = 'latest'){

        // Paths
        $releasesPath = String::combinePath(DATALATTE_FILES, self::PATH_RELEASES);
        $moduleReleasesPath = String::combinePath($releasesPath, $this->name);

        if($version == 'development'){
            return $this->path;

        }elseif($version == 'latest'){
            return String::combinePath($moduleReleasesPath, $this->getLatestVersion());

        }else{
            return String::combinePath($moduleReleasesPath, $version);
        }

    }

    /**
     * Gets the live css of module
     */
    public function getJs(){

        $uapath = String::combinePath($this->path, self::PATH_UA);
        $tspath = String::combinePath(String::combinePath($this->path, self::PATH_SUPPORT), $this->name . '.js');

        if(file_exists($uapath)){
            return DataLatteUa::getFolderJs($uapath);

        }elseif(file_exists($tspath)){
            return file_get_contents($tspath);

        }else{
            return '';
        }


        return DataLatteUa::getFolderJs(String::combinePath($this->path, self::PATH_UA));
    }

    /**
     * Gets the live css of module
     */
    public function getJsStrings(){
        return $this->createStringsFiles(null, 'js');
    }

    /**
     * Gets the tags for including the module in the document
     *
     * @param string $version
     * @param string $urlPrefix
     * @return array
     */
    public function getTags($lang = 'en', $urlPrefix = ''){

        $tags = array();

        /**
         * Include Js to include
         */
        if(isset($this->metadata['ua-include-js'])){
            foreach($this->metadata['ua-include-js'] as $file){
                $tags[] = tag('script')->src("$urlPrefix/datalatte-files/releases/$this->name/support/$file");
            }
        }

        /**
         * Include Css to include
         */
        if(isset($this->metadata['ua-include-css'])){
            foreach($this->metadata['ua-include-css'] as $file){
                $tags[] = tag('script')->src("$urlPrefix/datalatte-files/releases/$this->name/support/$file");
            }
        }

        /**
         * Include standard tags
         */
        $tags = array_merge($tags, array(
            tag('link')->rel('stylesheet')->href("/datalatte-files/releases/$this->name/$this->name.css"),
            tag('script')->src("/datalatte-files/releases/$this->name/$lang.js"),
            tag('script')->src("/datalatte-files/releases/$this->name/$this->name.js"),
        ));

        return $tags;

    }

    /**
     * Gets the namespaces of the UA folder in the specified version
     *
     * @param string $version
     * @return array
     * @throws Exception
     */
    public function getUaNamespaces($version = 'latest'){

        $version = $this->resolveVersion($version);

        if($version == 'development'){

            return DataLatteReflection::getDirectoryList($this->pathUa);

        }else{

            // Data should come from a .json description file in release folder
            throw new Exception("Not implemented");
        }

    }

    /**
     * Gets the PHP classes of the specified version
     *
     * @param string $version
     * @return array
     * @throws Exception
     */
    public function getPhpClasses($version = 'latest'){

        $version = $this->resolveVersion($version);

        if($version == 'development'){

            $result = array();
            $files = DataLatteReflection::getFileList($this->pathClasses, 'php');

            foreach($files as $file){
                $result[] = basename($file, '.php');
            }

            return $result;

        }else{

            // Data should come from a .json description file in release folder
            throw new Exception("Not implemented");
        }
    }

    /**
     * Gets the Info about the specified PHP class of the specified version
     *
     * @param $class
     * @param string $version
     * @return string
     * @throws Exception
     */
    public function getPhpClassInfo($class, $version = 'latest'){

        $version = $this->resolveVersion($version);

        if($version == 'development'){

            return DataLatteReflection::generatePhpFileInfo(
                String::combinePath($this->pathClasses, $class . '.php'));

        }else{

            // Data should come from a .json description file in release folder
            throw new Exception("Not implemented");
        }
    }

    /**
     * Gets the info of specified lass on specified version
     * @param $class
     * @param string $version
     * @return array
     * @throws Exception
     */
    public function getUaClassInfo($class, $version = 'latest'){

        $version = $this->resolveVersion($version);

        if($version == 'development'){

            // Explode by dots
            $parts = explode('.', $class);

            // Get file name
            $file = $parts[sizeof($parts) - 1];

            // Remove file name for directory
            unset($parts[sizeof($parts) - 1]);

            // Gather to get namespace
            $namespace = implode('.', $parts);

            return DataLatteReflection::generateJavaScriptFileInfo(
                String::combinePath($this->pathUa, $namespace . '/' . $file . '.js'));

        }else{

            // Data should come from a .json description file in release folder
            throw new Exception("Not implemented");
        }
    }

    /**
     * Gets the classes in the namespace in the specified version
     *
     * @param string $namespace
     * @param string $version
     * @return array
     * @throws Exception
     */
    public function getUaNamespaceClasses($namespace, $version = 'latest'){

        $version = $this->resolveVersion($version);

        if($version == 'development'){

            $files = DataLatteReflection::getFileList(
                String::combinePath($this->pathUa, $namespace), 'js');

            $result = array();

            foreach($files as $file){
                $result[] = basename($file, '.js');
            }

            return $result;

        }else{

            // Data should come from a .json description file in release folder
            throw new Exception("Not implemented");
        }
    }

    /**
     * Gets url of release CSS file for specified version
     * If version is ommitted, latest version will be used.
     *
     * @param string= $version
     * @param string= $urlPrefix
     * @return string
     */
    public function getUrlForCss($version = null, $urlPrefix){

        if($version === null){
            $version = $this->getLatestVersion();
        }

        return "$urlPrefix/datalatte-files/releases/$this->name/$version/$this->name.css";
    }

    /**
     * Finds the current major version of releases
     *
     * @return float
     */
    public function getLatestVersion(){

        $releasesPath = String::combinePath(DATALATTE_FILES, self::PATH_RELEASES);
        $moduleReleasesPath = String::combinePath($releasesPath, $this->name);
        $versions = array();

        if(!is_dir($moduleReleasesPath)){
            return '0.0';
        }

        $folders = DataLatteReflection::getDirectoryList($moduleReleasesPath);

        // Scan all folders and get them on array
        foreach($folders as $folder){
            if(is_numeric($folder)){
                $versions[] = $folder;
            }
        }

        // Major versions array
        $majors = array();

        // Collect majors
        foreach($versions as $v){
            $majors[] = self::getMajor($v);
        }

        // Select major
        $major = sizeof($majors) > 0 ? max($majors) : 0;

        // Minor versions array
        $minors = array();

        // Collect minors
        foreach($versions as $v){
            if(self::getMajor($v) == $major){
                $minors[] = self::getMinor($v);
            }
        }

        $minor = sizeof($minors) > 0 ? max($minors) : 0;

//        echo "Majors: " . var_export($majors, true);
//        echo "Minors: " . var_export($minors, true);
//        die("Latest: $major.$minor");

        return $major . '.' . $minor;
    }

    /**
     * Loads the module into memory, with the specified language and version
     *
     * @param string $lang
     */
    public function load($lang = null){


        // Report as loaded
        self::$loadedModules[] = $this;

        //region Load Records
        $records = String::combinePath($this->pathSupport, 'records.php');

        if(file_exists($records)){
            include $records;
        }
        //endregion


        //region Load Metadata
        $metafile = String::combinePath($this->path, 'module.json');

        if(file_exists($metafile)){
            $metatext = file_get_contents($metafile);
            $this->metadata = json_decode($metatext, true);
        }
        //endregion

        //region Includes
        if(isset($this->metadata['php-include'])){
            foreach($this->metadata['php-include'] as $file){

                include String::combinePath(String::combinePath($this->path, 'php'), $file);
            }
        }
        //endregion

        //region Load strings
        if($lang){
            $langs = $this->createStringsArray();

            if(isset($langs[$lang])){
                if(!isset($GLOBALS['strings'])){
                    $GLOBALS['strings'] = array();
                }

                $GLOBALS['strings'] = array_merge($GLOBALS['strings'], $langs[$lang]);
            }else{
                die("No $lang lang in $this->name");
            }
        }
        //endregion


    }

    /**
     * Loads its MySQL connection from metadata.
     * If no connection loaded. No connection will be active in DataLatte Object
     */
    public function loadConnection(){


        if(isset($this->metadata['connection'])){

            $c = $this->metadata['connection'];

            if(isset($this->metadata['connection']['file'])){
                // Load connection from file
                $connectionFile = String::combinePath($this->path, $this->metadata['connection']['file']);
                $connectionText = file_get_contents($connectionFile);
                $c = json_decode($connectionText, true);
            }

            if(DataLatte::$current){
                DataLatte::$current->close();
            }

            $x = new DataConnection($c['user'], $c['password'], $c['host'], $c['database'], true);

            DataLatte::$current = $x;
        }
    }
    
    /**
     * Makes a release of the app
     */
    public function makeRelease_ERASE($major = false){
        
        $oldmask = umask(0);
        
        $version = $this->incrementVersion($this->getLatestVersion(), $major);
         
        // Create directory
        $versionFolder = $this->createDirectoryForVersion($version);
        
        // Create JS file
        $this->createJsFile($versionFolder);
        
        // Create CSS file
        $this->createCssFile($versionFolder);
        
        // Create PHP file
        $this->createPhpFile($versionFolder);
        
        // Create description file
        $this->createDescriptionFile($versionFolder);
        
        // Create strings files
        $this->createStringsFiles($versionFolder);
        
        // Copy support files
        $this->copySupportFiles($versionFolder);
        
        umask($oldmask);
        
        
        return "OK - " . DataLatte::datetime();
    }
    //endregion

}
