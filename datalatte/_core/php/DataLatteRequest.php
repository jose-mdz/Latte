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
        
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'ajax-rpc': self::processAjaxMessage();
                    break;
            }
        }
    }

    
    /**
     * Processes the "ajax-message" action.
     */
    private static function processAjaxMessage() {
        
        header("Content-Type: application/javascript");

        $response = array();

        // Check calls exists
        if(!isset($_POST['calls'])){
            die("No calls specified");
        }

        // Parse calls
        $calls = json_decode($_POST['calls'], true);

        // Check calls is an array
        if(!is_array($calls)){
            die("Calls is not an array: $_POST[calls]");
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