<?php
/**
 * Main bridge for accessing data. You may use this object anywhere to get access to database querying.
 * 
 * This class loads automatically the configuration of the DataLatte installed on server. 
 * To check the configuration of DataLatte access the DataLatteManager through http://host/datalatte on your server.
 * 
 * Usage:
 * <example>
 *     // (1) SQL Querying
 *     //     Use DataLatte as a wrapper for accessing and querying data
 * 
 *     // Echo the current timestamp
 *     echo DataLatte::getSingle("SELECT NOW()");;
 * 
 *     // Echo a set of data
 *     print_r(DataLatte::getCache("SHOW TABLES"));
 * 
 *     // (2) Object recognition
 *     //     Loads an object by analyzing its structrue
 *     //     A class named Product must be declared and implement DataRecord
 *     $products = DataLatte::oneOf('Product', "SELECT * FROM product WHERE id = 1");
 *     
 *     // Echo product list
 *     echo $product->name;
 * 
 *     // (3) Multiple Object recognition
 *     //     Get an array of objects
 *     //     A class named Product must be declared and implement DataRecord
 *     $products = DataLatte::arrayOf('Product', "SELECT * FROM product");
 *     
 *     foreach($products as $product){
 *         // Echo product list
 *         echo $product->name;
 *     }
 * </example>
 */
 class DataLatte {

    /**
     * Current connection. Its value is set when <c>init()</c> method is called.
     * @var DataConnection 
     */
    public static $current = NULL;

     /**
      * Global flag that allows remote connections to insert records
      * @var bool
      */
     public static $globalCanInsert = false;

     /**
      * Global flag that allows remote connections to update records
      * @var bool
      */
     public static $globalCanUpdate = false;

     /**
      * Global flag that allows remote connections to delete records
      * @var bool
      */
     public static $globalCanDelete = false;

    /**
     * Throws an Exception. This class should not be instantiated.
     */
    private function __construct() {
        throw new Exception();
    }

    /**
     * Initializes the connection to the database.
     * @throws Exception if call to <c>init()</c> method is called.
     */
    public static function init() {
        global $strings;

        // Check if already initialized
        if (!self::$current){

            $xpath = DATALATTE_FILES . '/connection.php';

            // Check if connection in /_files exists
            if (!DataLatte::canInit()) {
                throw new Exception($strings['datalatteInitFailed']);
            }

            // Create current object
            self::$current = DataConnection::fromParametersClass();
        }

    }

    /**
     * Returns a boolean indicating if DataLatte can be used, by checking that configuration is already set up.
     * 
     * @returns boolean
     */
    public static function canInit() {
        $xpath = DATALATTE_FILES . '/connection.php';
        $result = false;


        if (!class_exists('ConnectionParameters', false)) {

            if (file_exists($xpath)) {
                // Include connection file
                try {


                    ob_start();         /// Include connection data file.
                    include $xpath;     /// Please NOTE that output buffering
                    ob_end_clean();     /// is used for security reasons.


                    // Check if connection added successfully
                    if (!class_exists('ConnectionParameters')) {


                    } else {
                        try {
                            // Test connection
                            $d = DataConnection::fromParametersClass();
                            $result = true;
                        } catch (Exception $e) {

                            echo $e;
                            $result = false;
                        }
                    }
                } catch (Exception $e) {
                    return false;
                }
            } else {
                $result = class_exists($result);
            }
        } else {
            $result = true;
        }

        return $result;
    }

    /**
     * Returns a comma separated list of fields on records passed as parameters.
     * @variable-params
     * @return string
     */
    public static function all() {
        $args = func_get_args();
        $r = array();
        foreach ($args as $arg) {
            $obj = new $arg();
            if ($obj) {
                $r[] = implode(", ", call_user_func(array($arg, 'all')));
            }
        }
        return (implode(", ", $r));
    }

     /**
      * Makes an associative array of the specified DataRecord array,
      * using the records' id as the id of the associative array
      *
      * @param array $array
      * @param string $property
      * @return array
      */
     public static function associativeArray(array $array, $property = null){

         $result = array();

         foreach($array as $r){
             if($property){
                 $result[$r->{$property}] = $r;
             }else{
                 $result[$r->getIdValue()] = $r;
             }
         }
         return $result;
     }

    /**
     * Gets a value indicating if the current connection is running in debug mode
     * 
     * @returns boolean
     */
    public static function debugMode() {
        self::init();
        return self::$current->debug;
    }

    /**
     * Queries the database and returns the entire result as an array of arrays
     *
     * @param $query
     * @param $mode
     * @returns array
     */
    public static function getCache($query, $mode = DataReader::MODE_BOTH) {

        $a = array();
        $reader = self::getreader($query);

        while ($r = $reader->read($mode))
            $a[] = $r;

        return $a;
    }

    /**
     * Queries the database and returns an array with the first value of each row
     *
     * @returns array
     */
    public static function getSingleArray($query) {

        $cache = self::getCache($query);

        $result = array();

        foreach($cache as $row){
            $result[] = $row[0];
        }


        return $result;

    }

    /**
     * Executes a SELECT statement on the current connection that returns a table of data.
     * 
     * @param string $query
     * @returns DataReader
     */
    public static function getReader($query) {
        self::init();
        return self::$current->getReader($query);
    }

    /**
     * Executes a SELECT statement on the current connection and gets the first field of the first row of result
     * 
     * @param string $query
     * @returns mixed
     */
    public static function getSingle($query) {
        self::init();
        return self::$current->getsingle($query);
    }

     /**
      * Executes multiple queries
      *
      * @param string $query
      * @returns boolean
      */
     public static function multiQuery($query) {
         self::init();
         return self::$current->multiQuery($query);
     }

    /**
     * Executes an UPDATE query on the current connection
     * 
     * @param string $query
     * @returns number
     */
    public static function update($query) {
        self::init();
        return self::$current->update($query);
    }

    /**
     * Closes the current connection with the server
     */
    public static function close() {
        init();
        return self::$current->close();
    }

    /**
     * Converts a MySQL date-time string to a timestamp (used in PHP)
     * 
     * @param string $datetime MySQL formatted date-time 'yyyy-mm-dd'
     * @returns integer
     */
    public static function timestamp($datetime = null) {
        if (!$datetime)
            $datetime = DataLatte::datetime();

        $parts = explode(' ', $datetime);

        if (strpos($parts[0], "-") === false) {
            // Just time (without a date)
            $timebits = explode(':', $parts[0]);

            if (3 != count($timebits))
                return -1;

            return mktime($timebits[0], $timebits[1], $timebits[2]);
        }else {

            // Treat as datetime or date
            $datebits = explode('-', $parts[0]);
            if (3 != count($datebits))
                return -1;
            if (isset($parts[1])) {
                $timebits = explode(':', $parts[1]);
                if (3 != count($timebits))
                    return -1;
                return mktime($timebits[0], $timebits[1], $timebits[2], $datebits[1], $datebits[2], $datebits[0]);
            }
            return mktime(0, 0, 0, $datebits[1], $datebits[2], $datebits[0]);
        }
    }

    /**
     * Converts a timestamp to a MySQL formatted date-time.
     * If no <c>$timestamp</c> is provided, current time will be used.
     * 
     * @param integer $timestamp
     * @returns string In the format: yyyy-mm-dd
     */
    static function date($timestamp = NULL) {
        if ($timestamp === NULL)
            $timestamp = time();
        return date("Y-m-d", $timestamp);
    }

    /**
     * Converts a Unix Timestamp to a MySQL formatted date-time.
     * If no <c>$timestamp</c> is provided, current time will be used.
     * 
     * @param integer $timestamp
     * @returns string
     */
    static function dateTime($timestamp = NULL) {
        if ($timestamp === NULL)
            $timestamp = time();
        return date("Y-m-d H:i:s", $timestamp);
    }
    
    /**
     * Similar to <c>arrayOf</c>, but it converts the query into a paginated query.
     * First page is 1. Result contains the following variables:
     * - <c>records</c> Actual array of records
     * - <c>recordcount</c> Total of records in query
     * - <c>page</c> Retrieved page
     * - <c>pages</c> Total of pages in query
     * 
     * @param string $class Name of the class of the object to instantiate
     * @param string $query SQL Sentence to retrieve objects data
     * @param int $page
     * @param int $pageSize
     * @return array
     * @throws Exception
     */
    public static function pageOf($class, $query, $page, $pageSize = 50) {
        
        // Check for SQL_CALC_FOUND_ROWS flag
        if(strpos($query, 'SQL_CALC_FOUND_ROWS') === false){
            $query = preg_replace("/SELECT/", "SELECT SQL_CALC_FOUND_ROWS ", $query, 1);
            
            if(strpos($query, 'SQL_CALC_FOUND_ROWS') === false){
                throw new Exception("DataLatte::pageOf() Can't insert SQL_CALC_FOUND_ROWS into query. SELECT statement must be followed by a space.");
            }
        }
        
        // Compute offset for query
        $offset = ($page - 1) * $pageSize;
        
        // Append pagination to query
        $query .= PHP_EOL . "LIMIT $pageSize OFFSET $offset";

        // Retrieve records
        $records = self::arrayOf($class, $query);

        // Retrieve count of records in query
        $count = DataLatte::getSingle("SELECT FOUND_ROWS()");


        // Compute total of pages
        $pageCount = ceil($count / $pageSize);

        return array(
            'records' => $records,
            'recordcount' => $count,
            'page'  => $page,
            'pages' => $pageCount,
            );
        
        
    }

    /**
     * Recognizes the fields in the array and applies its values to the correspondant record fields.
     * 
     * @param any $array
     * @param DataRecord $record
     * @oaram string $alias
     */
    public static function recognize($array, $record, $alias = '') {

        foreach ($array as $key => $value) {

            $value = is_array($value) ? $value : stripslashes($value);
            $key = str_replace("__", ".", $key);
            $pos = strpos($key, ".");

            // If alias provided
            if($alias){

                // If key does not start with alias
                if(strpos($key, $alias . '.') !== 0){
                    if(!is_numeric($key))
                    continue; // bye
                }
            }

            if ($pos === FALSE) {
                $prop = $key;
            } elseif (!$alias && substr($key, 0, $pos) != $record->gettable()) {
                continue;
            } else {
                $prop = substr($key, (strlen($key) - $pos - 1) * -1);
            }

            if (property_exists($record, $prop)) {
                $record->{$prop} = $value;

            } elseif (!is_numeric($prop)) {

                if (!isset($record->others)){
                    $record->others = array();
                }

                $record->others[$prop] = $value;
            }
        }


    }

    /**
     * Queries the database and maps the result to an object
     * of the specified class name.
     * 
     * @param string $classname  Name of the class of the object to create
     * @param string $query SQL sentence to retieve object values
     * 
     * @returns object
     */
    public static function oneOf($classname, $query) {
        $arr = self::arrayOf($classname, $query);
        
        if(is_array($arr) && sizeof($arr) > 0)
            return $arr[0];
        
        return null;
    }

    /**
     * Queries the database and maps the result to an array of objects of the specified class name.
     * <c>$name</c> May specify the class or a comma separated list of classes, which will be set as properties of the objects in array.
     * The term <c>#COLUMNS</c> may be used to specify all columns of query.
     * 
     * @param string $class Name of the class of the object to instantiate. 
     * @param string $query SQL Sentence to retrieve objects data
     * @return array
     */
    public static function arrayOf($class, $query) {
        
        $result = array();
        $classes = explode(",", $class);
        $aliases = array();
        
        // Trim class names
        foreach($classes as $key => $class){
            $class = trim($class);

            if(strpos($class, ' ') !== false){
                $parts = explode(' ', $class);
                $class = $parts[0];
                $aliases[$key] = $parts[1];
            }

            $classes[$key] = trim($class);
        }


        // Expand column names
        if(strpos($query, "#COLUMNS") !== false){
            $columns = array();
            foreach($classes as $i => $class){
                $columns = array_merge($columns, $class::all( isset($aliases[$i]) ? $aliases[$i] : $class::gettable() ));
            }
            $query = str_replace("#COLUMNS", (implode(", ", $columns)), $query);
        }
        
        $arr = self::getCache($query);

        foreach ($arr as $row) {
            $owner = NULL;

            foreach ($classes as $key => $class) {
                $class = trim($class);
                $obj = new $class();
                self::recognize($row, $obj, isset($aliases[$key]) ? $aliases[$key] : null );

                if (!$owner) {
                    $owner = $obj;
                } else {
                    $owner->{( isset($aliases[$key]) ? $aliases[$key] : strtolower($class) )} = $obj;
                }
            }

            $result[] = $owner;
        }

        return $result;
    }

    /**
     * Escapes the specified value or values, necessary process to ensure application security.
     * 
     * @param array|string $array
     */
    public static function escape($array) {
        self::init();
        if (is_array($array)) {
            foreach ($array as $key => $value) {
                $array[$key] = DataLatte::escape($value);
            }
            return $array;
        } elseif(!is_object($array)) {
            return self::$current->connection->real_escape_string($array);
//            return mysql_real_escape_string($array);
        } else {
            return $array;
        }
    }

     /**
      * Generates a unique GUID of the specified length.
      * If table is specified, it will check the table for its uniqueness.
      *
      * @param string $table
      * @param int $length
      * @return string
      */
      public static function generateGUID($table = null, $length = 12){
          $chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-";
          $max = strlen($chars) - 1;
          $guid = "";
          do{
              while(strlen($guid) != $length){
                  $guid .= substr($chars, rand(0, $max), 1);
              }
          }while($table && DL::getSingle("SELECT COUNT(*) FROM $table WHERE guid = '$guid'") > 0);
          return $guid;
      }

}