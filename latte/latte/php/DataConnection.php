<?php

 /**
  * Represents a connection to the server
  * 
  * Usage
  * <example>
  *     // Initialize Connection
  *     $c = new DataConnection("user", "mypassword", "localhost:3306", true);
  *     
  *     // Test connection by getting date from server
  *     echo $c->getSingle("SELECT NOW()");
  * </example>
  * 
  */
  class DataConnection {

    /**
         * Holds the pointer to the server connection
         * @var resource 
         */
	public $connection = 0;
        
    /**
     *
     * @var type
     */
    public $debug = false;
	
    /**
         * Creates a connection to a database using the specified parameters.
         * 
         * @param string $user
         * @param string $pass
         * @param string $host May include a port by attaching it i.e. "localhost:9999"
         * @param string $db
         * @param boolean $debug
         * @throws Exception If connection can't be established
         */
	function __construct($user, $pass, $host, $db, $debug){
            global $strings;

            // Save error level
            $level = error_reporting();
            
            // Deactivate errors
            error_reporting(0);

            // Connect to server
            $this->connection = mysql_connect($host, $user, $pass);

            if(!$this->connection){
                error_reporting($level); // Reset error level
                throw new Exception(sprintf($strings['cantConnectToServer'], $host, $user));
            }

            if(!mysql_select_db($db)){
                error_reporting($level); // Reset error level
                throw new Exception(sprintf($strings['cantSelectDbS'], $db));
            }

            error_reporting($level);
		
	}
	
    /**
         * Closes the connection.
         */
	function __destruct(){
		$this->close();
	}
        
    /**
     * Gets the number of affected rows of last query
     *
     * @return integer
     */
    function affectedRows(){
            return mysql_affected_rows($this->connection);
        }
	
    /**
     * Creates the connection by passing an instance of the specified object.
     * A class named <c>ConnectionParameters</c> must be declared before calling this method.
     *
     * @return DataConnection
     */
    public static function fromParametersClass(){
            
            $parameters = new ConnectionParameters();
            $user = $parameters->user;
            $pass = $parameters->pass;
            $host = $parameters->host;
            $db = $parameters->db;
            $debug = $parameters::$debug;
            
            return new DataConnection($user, $pass, $host, $db, $debug);
        }
        
    /**
         * Returns the query if debug mode, something else if not
         * 
         * @param type $query
         * @return type 
         */
	private function queryornot($query){
        return $query;
		return $this->debug ? $query : "(Hidden SQL)";
	}
        
    /**
     * Gets the last error description
     *
     * @return string
     */
    public function getErrorDescription(){
            return mysql_error();
        }
	
    /**
         * Executes a SELECT statement that returns a table of data
         * 
         * @param string $query
         * @return DataReader
         * @throws Exception If query falis
         */
	public function getReader($query){
		global $strings;

		$result = $this->query($query);
		
		if(!$result)
			throw new Exception(sprintf($strings['errorOnQueryS'], $this->getErrorDescription(), $this->queryornot($query)));
		
		return new DataReader($result);
	}
	
	/**
         * Executes a SELECT statement and gets the first field of the first row of result
         * 
         * @param string $query
         * @return mixed
         * @throws Exception If query falis
         */
	public function getSingle($query){
		global $strings;

		$result = $this->query($query);
		
		if(!$result)
			throw new Exception(sprintf($strings['errorOnQueryS'], $this->getErrorDescription(), $this->queryornot($query)));
		
		$row = mysql_fetch_row($result);
		
		return $row[0];
	}
        
    /**
     * Executes a query on database and returns the resource pointer
     *
     * @param string $query
     * @return resource
     */
    public function query($query){
            return mysql_query($query, $this->connection);
    }
	
        /**
         * Executes an UPDATE query
         * 
         * @param string $query
         * @return number
         * @throws Exception If query fails
         */
	public function update($query){
		global $strings;

		$result = $this->query($query);
		
		if(!$result) {
            throw new Exception(sprintf($strings['errorOnQueryS'], $this->getErrorDescription(), $this->queryornot($query)));
        }
		return $this->affectedRows();
	}
	
        /**
         * Closes the connection with the server
         */
	public function close(){
		mysql_close($this->connection);
	}
	
 }