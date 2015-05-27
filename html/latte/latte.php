<?php

@session_start();

/// Set default timezone
date_default_timezone_set('America/Mexico_City');

// Load configuration

$project_path = __DIR__ . '/../../';
$config_path = $project_path . 'xlatte.json';

if(file_exists($config_path)){
    $GLOBALS['xlatte_config'] = json_decode(file_get_contents($config_path), true);
}else{
    $GLOBALS['xlatte_config'] = array(
        'modules' => 'latte',
        'output' => 'html/latte'
    );
}

/*
 * DATALATTE
 * Make an require() or include() to this file to get
 * DataLatte Framework functionallity.
 */

 /// Create constant with directories
define('DATALATTE_MODULES', $project_path . $GLOBALS['xlatte_config']['modules']);
define('DATALATTE_CORE', DATALATTE_MODULES . '/latte.data');
define('DATALATTE_APP', DATALATTE_MODULES . "/app");
define('DATALATTE_FILES', __DIR__ . "/.");

//TODO: This should come from configuration
define('DATALATTE_FILES_URL', '/latte/');


/// Declare autoload
 function __autoload($className){

     // Check if class is core
     $onCore = DATALATTE_CORE . "/php/$className.php";

     // If class is in _core
     if(file_exists($onCore)){
         include $onCore;

     }else{

         // Check on loaded modules
         foreach(DataLatteModule::$loadedModules as $module){

             // Possible path of file
             $path = String::combinePath($module->pathPhp, "$className.php");

             // Check if exists
             if(file_exists($path)){
                 include $path;
             }else{
//                     echo PHP_EOL . "<!-- Not found: $path -->";
             }
         }
     }

 }

/**
 * Redirects warnings and errors to ajax pipeline
 * @param $errno
 * @param $errstr
 * @param $errfile
 * @param $errline
 * @return bool
 */
function errorHandler($errno, $errstr, $errfile, $errline){

     switch($errno){
         case E_USER_WARNING:
         case E_USER_NOTICE:
             ajaxWarn(sprintf("[$errstr]: $errstr in ($errfile:$errline)"));
             return true;
     }
 }

 set_error_handler("errorHandler");

// Load base modules
DataLatteModule::memoryLoad('latte', 'en');
DataLatteModule::memoryLoad('latte.ui', 'en');
DataLatteModule::memoryLoad('latte.data', 'en');
DataLatteModule::memoryLoad('latte.data.ui', 'en');

// Load app
$app = new DataLatteModule('app');
$app->load('en');
$app->loadConnection();