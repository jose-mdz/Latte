<?php

@session_start();

/// Set default timezone
date_default_timezone_set('America/Mexico_City');

/// PHPMailer API
include __DIR__ . "/../../datalatte/plugins/phpmailer/Autoloader.php";

/*
 * DATALATTE
 * Make an require() or include() to this file to get
 * DataLatte Framework functionallity.
 */

 /// Create constant with directories
 define('DATALATTE_CORE', __DIR__ . "/../../datalatte/_core");
 define('DATALATTE_FILES', __DIR__ . "/.");
 define('DATALATTE_MODULES', __DIR__ . "/../../datalatte/");
 define('DATALATTE_APP', __DIR__ . "/../../datalatte/_app");


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
DataLatteModule::memoryLoad('_ui', 'en');
DataLatteModule::memoryLoad('_core', 'en');

// Load app
$app = new DataLatteModule('_app');
$app->load('en');
$app->loadConnection();