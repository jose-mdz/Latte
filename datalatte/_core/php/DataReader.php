<?php

/**
 * Represents a stream reader from a database result
 * <example>
 *   // Get a data reader
 *   $reader = DataLatte::getReader($query);
 *  
 *   // Scan results
 *   while ($row = $reader->read())
 *       print_r($row);
 * 
 * </example>
 */
class DataReader {

    /**
     * MySQL result handle
     * 
     * @var resource
     */
    public $result = 0;

    /**
     * Creates a new DataReader from the specified MySQL result
     * 
     * @param resource $result
     */
    function __construct($result) {
        $this->result = $result;
    }

    /**
     * Advances one row in the result, and returns the row as an array.
     * Possible values for <c>$mode</c>: <c>MYSQL_ASSOC</c> | <c>MYSQL_NUM</c> | <c>MYSQL_BOTH</c>
     * 
     * @param number $mode
     * @return array
     */
    function read($mode = MYSQL_BOTH) {
        return mysql_fetch_array($this->result, $mode);
    }

    /**
     * Gets the number of rows in the result
     * 
     * @return integer
     */
    function getRows() {
        return mysql_num_rows($this->result);
    }

    /**
     * Gets the number of columns in the result
     * 
     * @return integer
     */
    function getColumns() {
        return mysql_num_fields($this->result);
    }
    
    /**
     * Gets the name of the specified field
     * 
     * @param int $field
     * @return string
     */
    function getFieldName($field){
        return mysql_field_name($this->result, $field);
    }
    
    /**
     * Gets the type of the specified field
     * 
     * @param int $field
     * @return string
     */
    function getFieldType($field){
        return mysql_field_type($this->result, $field);
    }
    
    /**
     * Gets the table where the specified field lives
     * 
     * @param int $field
     * @return string
     */
    function getFieldTable($field){
        return mysql_field_table($this->result, $field);
    }
    
    /**
     * Gets the length of the specified field
     * 
     * @param int $field
     * @return int
     */
    function getFieldLength($field){
        return mysql_field_len($this->result, $field);
    }

}