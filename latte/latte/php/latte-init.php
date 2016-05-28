<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 5/5/16
 * Time: 11:33
 */



@session_start();



// Load configuration

$project_path = __DIR__ . '/../../../';
$config_path = $project_path . 'xlatte.json';

if(file_exists($config_path)){
    $GLOBALS['xlatte_config'] = json_decode(file_get_contents($config_path), true);
}else{
    $GLOBALS['xlatte_config'] = array(
        'modules' => 'latte',
        'output' => 'html/latte'
    );
}


/// Create constant with directories
define('DATALATTE_MODULES', $project_path . $GLOBALS['xlatte_config']['modules']);
define('DATALATTE_CORE', DATALATTE_MODULES . '/latte');
define('DATALATTE_APP', DATALATTE_MODULES . "/app");
define('DATALATTE_FILES', $project_path . $GLOBALS['xlatte_config']['output']);
define('DATALATTE_FILES_URL', '/' . $GLOBALS['xlatte_config']['output-url'] . '/');

/// Declare autoload
function dataLatte_Autoloader($className){

//    echo PHP_EOL . "[ Searching: $className]";

    // Check if class is core
    $onCore = DATALATTE_CORE . "/php/$className.php";

    // If class is in _core
    if(file_exists($onCore)){
//        echo PHP_EOL . "[ Found on CORE: $onCore]";
        include $onCore;

    }else{

        // Check on loaded modules
        foreach(LatteModule::$loadedModules as $module){

            // Possible path of file
            $path = String::combinePath($module->pathPhp, "$className.php");

            // Check if exists
            if(file_exists($path)){
//                echo PHP_EOL . "[ Found!: $path]";
                include $path;
            }else{
//                echo PHP_EOL . "[ Not found: $path]";
            }
        }
    }

}

spl_autoload_register("dataLatte_AutoLoader");

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
