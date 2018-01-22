<?php

class LatteModule {

    //region Constants
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
    const PATH_PHP = 'php';
    
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
     * @return LatteModule
     */
    public static function byName($name){

        foreach(self::$loadedModules as $module){
            if($module->name == $name){
                return $module;
            }
        }

        $module = new LatteModule($name);
        $module->load();

        return $module;
    }

    /**
     * Returns a value indicating if the specified module is loaded
     *
     * @param $name
     * @return bool
     */
    public static function isLoaded($name){
        // Check on loaded modules
        foreach(LatteModule::$loadedModules as $module){

            if($module->name == $name) return true;
        }

        return false;
    }

    /**
     * Loads the modules marked as Auto-Load, by using $this->addToAutoload
     */
    public static function loadAutoLoads(){
        $autoloads = array();

        if(isset($_SESSION['latte-module-autoload'])){
            $autoloads = explode('|', $_SESSION['latte-module-autoload']);
        }

        foreach ($autoloads as $module){
            if(!LatteModule::isLoaded($module)){
                LatteModule::memoryLoad($module)->loadConnection();
            }
        }
    }

    /**
     * Loads the specified module as the main module
     * @param $moduleName
     * @param string $lang
     * @param bool $loadConnection
     * @return LatteModule
     */
    public static function loadMain($moduleName, $lang = null, $loadConnection = true){

        // Create the module
        $app = new LatteModule($moduleName);

        // Load the language
        $app->load($lang);

        // Load the connection if needed
        if($loadConnection){
            $app->loadConnection();
        }

        $app->isMain = true;

        $app->addToAutoload(true);

        return $app;

    }

    /**
     * Loads the module and returns its tags for including in Document
     *
     * @param $moduleName
     * @return array
     */
    public static function tagsOf($moduleName, $lang = null){
        $module = new LatteModule($moduleName);
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
        $module = new LatteModule($moduleName);
        $module->load();
        $module->loadConnection();
        return $module->getTags();
    }

    /**
     * Loads the specified module into memory
     * @param $moduleName
     * @param null $lang
     * @return LatteModule
     */
    public static function memoryLoad($moduleName, $lang = null){

        // If module already loaded, just load language
        if(LatteModule::isLoaded($moduleName)){

            $m =  LatteModule::$loadedModules[$moduleName];

            // Load language if specified
            if($lang){
                $m->loadLanguage($lang);
            }
            return $m;
        }else{

            // Load Module
            $module = new LatteModule($moduleName);
            $module->load($lang);
            return $module;
        }
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
    public $pathPhp;

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
     * Loaded language of the module
     *
     * @var string
     */
    public $lang;

    /**
     * Flag indicating if the module is loaded as main module
     *
     * @var boolean
     */
    public $isMain;

    /**
     * Flag to indicate if a module is a release version (PHP will be loaded from release)
     */
    public $isRelease;

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

        // Check if is release
        $releasePath = DLString::combinePath(DATALATTE_MODULES_RELEASE, $name);
        $releasePhp = DLString::combinePath($releasePath, "$name.php");

//        echo "[$releasePhp]";

        if(file_exists($releasePhp)){
//            echo "[YES EXIST]";
            $this->isRelease = true;
            $this->path = $releasePath;

            $this->pathPhp = $this->path;
            $this->pathLang = $this->path;
            $this->pathSupport = DLString::combinePath($this->path, self::PATH_SUPPORT);

        }else{
//            echo "[NO EXIST]";

            $this->path = $this->path = DLString::combinePath(DATALATTE_MODULES, $name);

            if(!is_dir($this->path)){
                throw new ErrorException("Directory -$name- does not exist in modules directory");
            }

            $this->pathPhp = DLString::combinePath($this->path, self::PATH_PHP);
            $this->pathLang = DLString::combinePath($this->path, self::PATH_LANG);
            $this->pathSupport = DLString::combinePath($this->path, self::PATH_SUPPORT);

        }

        
    }
    //endregion

    //region  Methods

    /**
     * Returns an array with all strings of all languages
     * @return array
     */
    private function createStringsArray(){
        
        $filesPath = DLString::combinePath($this->path, self::PATH_LANG);
        $response = array();

        if(!file_exists($filesPath)) {
            return $response;
        }

        $files = LatteReflection::getFileList($filesPath, 'txt');

        foreach($files as $file){
            
            // File path
            $path = DLString::combinePath($filesPath, $file);
            
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
     * Helps recusively collect includes of the module
     * @param $names
     * @return array
     */
    private function collectInclude(&$names = null){

        if(!$names) {
            $names = array();
        }

        if(isset($this->metadata['module-include'])){
            foreach($this->metadata['module-include'] as $moduleName){
                if (isset($names[$moduleName])){
                    $names[$moduleName]++;
                }else{
                    $names[$moduleName] = 0;
                }

                if(LatteModule::isLoaded($moduleName)){
                    $module = LatteModule::byName($moduleName);
                }else{
                    $module = new LatteModule($moduleName);
                    $module->loadMetadata();
                }
                $module->collectInclude($names);
            }
        }
        return $names;
    }

    /**
     * Adds the module to the autoload list of user
     */
    public function addToAutoload($resetAutoloads = false){
        $autoloads = array();

        if($resetAutoloads){
            unset($_SESSION['latte-module-autoload']);
        }

        if(isset($_SESSION['latte-module-autoload'])){
            $autoloads = explode('|', $_SESSION['latte-module-autoload']);
        }

        if(!in_array($this->name, $autoloads)){
            $autoloads[] = $this->name;
        }

        $_SESSION['latte-module-autoload'] = implode('|', $autoloads);
    }
    
    /**
     * Gets the live css of module
     */
    public function getCss(){

        $uapath = DLString::combinePath($this->path, self::PATH_UA);
        $tspath = DLString::combinePath(DLString::combinePath($this->path, self::PATH_SUPPORT), $this->name . '.css');

        if(file_exists($uapath)){
            return DataLatteUa::getFolderCss($uapath);

        }elseif(file_exists($tspath)){
            return file_get_contents($tspath);

        }else{
            return '';
        }

    }

    /**
     * Returns an array with the paths of the CSS files for this module
     * @return array
     */
    public function getCssPaths(){
        $paths = array();
        $files_path = $this->isRelease ? DATALATTE_FILES_RELEASE : DATALATTE_FILES;

        /**
         * Include Css to include
         */
        if(isset($this->metadata['ua-include-css'])){
            foreach($this->metadata['ua-include-css'] as $file){
                $paths[] = DLString::combineUrl(DATALATTE_FILES_URL, "releases/$this->name/support/$file");
            }
        }

        /**
         * Include standard tags
         */
        if(file_exists(DLString::combinePath($files_path, "releases/$this->name/$this->name.css"))){
            $paths[] = DLString::combineUrl(DATALATTE_FILES_URL, "releases/$this->name/$this->name.css");
        }

        return $paths;
    }

    /**
     * Gets an array with all the modules needed to include this module
     */
    public function getIncludeChain(){
//        return array_keys($this->collectInclude());
        $names = $this->collectInclude();
        arsort($names);
        return array_keys($names);
    }

    /**
     * Gets the live css of module
     */
    public function getJs(){

        $uapath = DLString::combinePath($this->path, self::PATH_UA);
        $tspath = DLString::combinePath(DLString::combinePath($this->path, self::PATH_SUPPORT), $this->name . '.js');

        if(file_exists($uapath)){
            return DataLatteUa::getFolderJs($uapath);

        }elseif(file_exists($tspath)){
            return file_get_contents($tspath);

        }else{
            return '';
        }


        return DataLatteUa::getFolderJs(DLString::combinePath($this->path, self::PATH_UA));
    }

    /**
     * Gets the live css of module
     */
    public function getJsStrings(){
        return $this->createStringsFiles(null, 'js');
    }

    /**
     * Returns an array with the paths of javascript files for this module
     * @return array
     */
    public function getJsPaths(){
        $paths = array();
        $files_path = $this->isRelease ? DATALATTE_FILES_RELEASE : DATALATTE_FILES ;

        // Include paths in metadata
        if(isset($this->metadata['ua-include-js'])){
            foreach($this->metadata['ua-include-js'] as $file){
                $paths[] = DLString::combineUrl(DATALATTE_FILES_URL, "releases/$this->name/support/$file");
            }
        }

        // Include release module
        if(file_exists(DLString::combinePath($files_path, "releases/$this->name/$this->name.js"))){
            $paths[] = DLString::combineUrl(DATALATTE_FILES_URL, "releases/$this->name/$this->name.js");
        }

        // Include language file
        if($this->lang){
            if(file_exists(DLString::combinePath($files_path, "releases/$this->name/$this->lang.js"))){
                $paths[] = DLString::combineUrl(DATALATTE_FILES_URL, "releases/$this->name/$this->lang.js");
            }
        }

        return $paths;
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
        $releasesPath = DLString::combinePath(DATALATTE_FILES, self::PATH_RELEASES);
        $moduleReleasesPath = DLString::combinePath($releasesPath, $this->name);

        if($version == 'development'){
            return $this->path;

        }elseif($version == 'latest'){
            return DLString::combinePath($moduleReleasesPath, $this->getLatestVersion());

        }else{
            return DLString::combinePath($moduleReleasesPath, $version);
        }

    }

    /**
     * Gets the tags for including the module in the document
     *
     * @param string $urlPrefix
     * @return array
     */
    public function getTags($urlPrefix = ''){

        $tags = array();

        $css = $this->getCssPaths();
        $js = $this->getJsPaths();

        foreach($css as $path){
            $tags[] = tag('link')->rel('stylesheet')->href($path);
        }

        foreach($js as $path){
            $tags[] = tag('script')->src($path);
        }

        return $tags;

    }

    /**
     * Loads the module into memory, using the specified language
     * If no language is specified, no language will be loaded into memory
     *
     * @param string $lang
     */
    public function load($lang = null){

//        echo PHP_EOL . "[LOADING $this->name]";

        //region Check if loaded
        if(LatteModule::isLoaded($this->name)){

            if($lang){
                $this->loadLanguage($lang);
            }

            return;
        }
        //endregion

        // Load Metadata
        $this->loadMetadata();

        //region Module Includes
        if(isset($this->metadata['module-include'])){
            foreach($this->metadata['module-include'] as $moduleName){
                if(!LatteModule::isLoaded($moduleName)){
                    LatteModule::memoryLoad($moduleName, $lang);
                }
            }
        }
        //endregion

        //region Load Records
        if(!$this->isRelease){
            $records = DLString::combinePath($this->pathSupport, 'records.php');

            if(file_exists($records)){
                include $records;
            }
        }

        //endregion

        // Report as loaded
        self::$loadedModules[$this->name] = $this;

        //region Includes
        if(isset($this->metadata['php-include'])){
            foreach($this->metadata['php-include'] as $file){

                include DLString::combinePath(DLString::combinePath($this->path, 'php'), $file);
            }
        }
        //endregion

        //region Load strings

        if(!$lang){
            $lang = 'en';
        }

        $langFile = DLString::combinePath($this->pathLang, $lang . '.txt');

        if(file_exists($langFile)){
            $this->loadLanguage($lang);
        }
        //endregion

        //region Execute _onLoad.php

        $onLoad = DLString::combinePath($this->pathPhp, '_onLoad.php');

        if(file_exists($onLoad)){
            include $onLoad;
        }

        //endregion

        //region Load PHP
        if ($this->isRelease && $this->name != 'latte'){
//            echo PHP_EOL . "[LOADING PHP $this->name.php]";
            include DLString::combinePath($this->path, "$this->name.php");
//            echo PHP_EOL . "[/LOADING PHP $this->name.php]";
        }
        //endregion

//        echo PHP_EOL . "[/LOADED $this->name]";
//        echo "<!-- LOADED: $this->name -->";
    }

    /**
     * Loads the metadata of the module
     */
    public function loadMetadata(){
        if($this->isRelease){

            include DLString::combinePath($this->path, "module.json.php");
            $this->metadata = json_decode($GLOBALS['module-json-' . $this->name], true);
        }else{

            $metafile = DLString::combinePath($this->path, 'module.json');

            if(file_exists($metafile)){
                $metatext = file_get_contents($metafile);
                $this->metadata = json_decode($metatext, true);
            }
        }
    }

    /**
     * Loads the specified language into memory and returns a value indicating success
     *
     * @param $lang
     * @return bool
     */
    public function loadLanguage($lang){
        $this->lang = $lang;

        $langs = $this->createStringsArray();

        if(isset($langs[$lang])){

            if(!isset($GLOBALS['strings'])){
                $GLOBALS['strings'] = array();
            }

            $GLOBALS['strings'] = array_replace($GLOBALS['strings'], $langs[$lang]);
        }else{
            return false;
        }
    }

    /**
     * Gets a value indicating if the module has a connection declared
     *
     * @return bool
     */
    public function hasConnection(){
        return isset($this->metadata['connection']);
    }

    /**
     * Loads its MySQL connection from metadata.
     * If no connection is specified in metadata, DataLatte current connection won't be changed.
     * If no connection loaded, no connection will be active in DataLatte Object
     */
    public function loadConnection(){

        if(isset($this->metadata['connection'])){

            $c = $this->metadata['connection'];

            if(isset($this->metadata['connection']['file'])){
                // Load connection from file
                $extra = '';
                if($this->isRelease){
                    $parts = explode('/', $GLOBALS['xlatte_config']['output']);
                    $extra = str_repeat('/../', sizeof($parts));
//                    echo "[IS-RELEASE" . sizeof($parts) . "]";
                }
//                echo "[$this->path > $extra > " . $this->metadata['connection']['file'] . "]";
                $connectionFile = DLString::combinePath($this->path . $extra, $this->metadata['connection']['file']);
                $connectionText = file_get_contents($connectionFile);
                $c = json_decode($connectionText, true);
            }

            if(DataLatte::$current){
                //DataLatte::$current->close();
            }

            $x = new DataConnection($c['user'], $c['password'], $c['host'], $c['database'], true);

            DataLatte::$current = $x;

            //region Execute _onLoadConnection.php

            $onLoad = DLString::combinePath($this->pathPhp, '_onLoadConnection.php');

            if(file_exists($onLoad)){
                include $onLoad;
            }

            //region
        }
    }
    

    //endregion

}