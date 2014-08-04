<?php

/**
 * Wraps a response to an Ajax Message.
 * 
 * This is the object that methods starting with <c>_remote_</c> must return.
 * 
 * Example:
 * <example>
 *  private function _remote_doSomething($a){
 *      if($a > 5)
 *          return DataLatteResponse.fromError("A must be lower than 5");
 *      else
 *          return new DataLatteResponse(array("My serializable Data"));
 *  }
 * </example>
*/
class DataLatteResponse{

    /**
     * Indicates that message executed successfully
     * @var boolean
     */
    public $success = true;

    /**
     * Result data of message
     * @var mixed 
     */
    public $data = array();

    /**
     * Log notes to return
     * @var array
     */
    public $logs = array();

    /**
     * Warnings to return
     * @var array
     */
    public $warnings = array();

    /**
     * Error description if execution failed
     * @var string
     */
    public $error = null;
    
    /**
     * Error number if execution failed
     * @var integer
     */
    public $errorCode = 0;

    /**
     * Creates a successful response starting from the specified data
     * @param mixed $data 
     */
    public function __construct($data) {
        $this->data = $data;
    }
    
    /**
     * Gets the data of object as a packed object
     * 
     * @return type
     */
    public function getData(){
        $data = null;
        
        if($this->data instanceof DataRecord){
            $data = $this->data->pack();
        }elseif(is_array($this->data)){
            $data = DataRecord::packArray($this->data);
        }else{
            $data = $this->data;
        }
        
        return $data;
    }

    /**
     * Encodes the response as a JSON object
     * @return string 
     */
    public function __toString() {
        
        return $this->getEncoded();
    }
    
    /**
     * Gets the encoded response
     * 
     * @return string
     */
    public function getEncoded(){
        $result = array(
            'success' => $this->success,
            'data' => $this->getData(),
        );

        if($this->errorCode){
            $result['errorCode'] = $this->errorCode;
        }

        if($this->error){
            $result['errorDescription'] = $this->error;
        }

        if(sizeof($this->logs)){
            $result['logs'] = $this->logs;
        }

        if(sizeof($this->warnings)){
            $result['warnings'] = $this->warnings;
        }

        return $result;// json_encode($result);
    }

    /**
     * Creates a failure response, from the specified error description
     * @param string $error 
     * @param int $errorCode
     * @return DataLatteResponse
     */
    public static function fromError($error, $errorCode = 0){
        $r = new DataLatteResponse(array());
        $r->success = false;
        $r->error = $error;
        $r->errorCode = $errorCode;
        return $r;
    }

}