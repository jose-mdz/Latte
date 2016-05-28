<?php

/**
 * Process a request to the server.
 * 
 * Usage
 * <example>
 *  (new DataLatteRequest());
 * </example>
 */
class DataLatteRequest {
    
    /**
     * Creates the request handling and processes it
     */
    public function __construct() {

        LatteModule::loadAutoLoads();

        if(isset($_POST['calls'])){
            self::processAjaxMessage($_POST['calls']);
        }else if(isset($_GET['calls'])){
            self::processAjaxMessage($_GET['calls']);
        }else{
            die("No calls specified");
        }
        
    }

    
    /**
     * Processes the "ajax-message" action.
     */
    private static function processAjaxMessage($calls_raw) {
        
        header("Content-Type: application/javascript");

        $response = array();

        

        // Parse calls
        $calls = json_decode($calls_raw, true);

        // Check calls is an array
        if(!is_array($calls)){
            die("Calls is not an array: $calls_raw");
        }
        
       

        // Execute each call
        foreach($calls as $calldata){

            $call = new DataLatteCall();

            $call->moduleName = $calldata['moduleName'];

            $call->className = $calldata['className'];

            $call->method = $calldata['method'];

            if(isset($calldata['params'])){
                $call->params = $calldata['params'];
            }

            if(isset($calldata['id'])){
                $call->id = $calldata['id'];
            }


            $response[] = $call->execute()->getEncoded();

        }

        echo json_encode($response);
    }

}
