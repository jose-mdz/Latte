<?php



/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 12/11/13
 * Time: 9:48 AM
 */
class DataLatteCall{

    /**
     * Name of class where method is located
     * @var string
     */
    public $className = null;

    /**
     * Name of the module where the call should be executed
     * @var string
     */
    public $moduleName = null;

    /**
     * Method to call
     * @var string
     */
    public $method = null;

    /**
     * Parameters to pass to the method to call
     * @var array
     */
    public $params = array();

    /**
     * Id of the object where call should be made. Zero or lower indicates a call on static method.
     * @var int
     */
    public $id = 0;

    /**
     * Creates the response
     */
    public function __construct(){

    }

    /**
     * Executes the call and returns the result
     *
     * @return DataLatteResponse
     * @throws SecurityException
     */
    public function execute(){

        if(!$this->moduleName){
            throw new SecurityException("No module specified");
        }

        // Load module connection
        if(!DataLatte::$current && !defined('DONT_AUTOLOAD_MODULE_CONNECTION')){
            LatteModule::byName($this->moduleName)->loadConnection();
        }

//        echo "[Loaded module: $this->moduleName]";
//        echo "[Loaded connection:" . var_export(DataLatte::$current, true) . " ]" ;

        if(!$this->className){
            return DataLatteResponse::fromError("No class name specified");
        }elseif(!$this->method){
            return DataLatteResponse::fromError("No method name specified");
        }

        $object = $this->id > 0 ? DataRecord::byAuto($this->className, $this->id) : $this->className;
        $reflector = new ReflectionObject(new $this->className);
        $info = LatteReflection::generatePhpFileInfo($reflector->getFileName());
        $response = null;
        $error = null;

        // If method exists in reflection analyzer
        if (array_key_exists($this->method, $info['methods'])) {

            // If method is marked as remote
            if (in_array('remote', $info['methods'][$this->method]['attributes'])) {

                // If method exists for PHP parser
                if (method_exists($this->className, $this->method)) {

                    // Clear log and warn arrays
                    $GLOBALS['ajax-warn'] = array();
                    $GLOBALS['ajax-log'] = array();

                    try {

                        // Execute function
                        $result = call_user_func_array(array($object, $this->method), $this->params);

                        // Create response
                        $response = new DataLatteResponse($result);

                        if(sizeof($GLOBALS['ajax-warn'])){
                            $response->warnings = $GLOBALS['ajax-warn'];
                        }

                        if(sizeof($GLOBALS['ajax-log'])){
                            $response->logs = $GLOBALS['ajax-log'];
                        }

                    } catch (Exception $e) {
                        //die("Died because of exception: $e");
                        $response = DataLatteResponse::fromError($e->getMessage(), $e->getCode());
                    }
                } else {
                    $response = DataLatteResponse::fromError("$this->className::$this->method does not exist");
                }
            } else {
                $response = DataLatteResponse::fromError("Method $this->method not registered as remote." . var_export($info, true));
            }
        } else {
            $response = DataLatteResponse::fromError("Method $this->method not in info structure");
        }

        if(!($response instanceof DataLatteResponse)){
            $response = DataLatteResponse::fromError("Unknown error! :S");
        }


        return $response;

    }

}