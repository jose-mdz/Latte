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

    const MODE_ASSOC_ARRAY = MYSQLI_ASSOC;

    const MODE_NUM = MYSQLI_NUM;

    const MODE_BOTH = MYSQLI_BOTH;

    /**
     * MySQL result handle
     * 
     * @var mysqli_result
     */
    public $result = 0;

    private $_fields;

    /**
     * Creates a new DataReader from the specified MySQL result
     * 
     * @param mysqli_result $result
     */
    function __construct($result) {
        $this->result = $result;
    }

    /**
     * Advances one row in the result, and returns the row as an array.
     * Possible values for <c>$mode</c>: <c>MYSQL_ASSOC</c> | <c>MYSQL_NUM</c> | <c>MYSQL_BOTH</c>
     * 
     * @param int $mode
     * @return array
     */
    function read($mode = DataReader::MODE_BOTH) {
        return $this->result->fetch_array($mode);
    }

    /**
     * Gets the number of rows in the result
     * 
     * @return integer
     */
    function getRows() {
        return $this->result->num_rows;
    }

    /**
     * Gets the number of columns in the result
     * 
     * @return integer
     */
    function getColumns() {
        return $this->result->field_count;
    }

    /**
     * Gets
     */
    function getFields(){
        if(!$this->_fields){
            $this->_fields = $this->result->fetch_fields();
        }
        return $this->_fields;
    }
    
    /**
     * Gets the name of the specified field
     * 
     * @param int $field
     * @return string
     */
    function getFieldName($field){
        return $this->getFields()[$field]->name;
    }
    
    /**
     * Gets the type of the specified field
     * 
     * @param int $field
     * @return string
     */
    function getFieldType($field){
        return $this->getFields()[$field]->type;
    }
    
    /**
     * Gets the table where the specified field lives
     * 
     * @param int $field
     * @return string
     */
    function getFieldTable($field){
        return $this->getFields()[$field]->table;
    }
    
    /**
     * Gets the length of the specified field
     * 
     * @param int $field
     * @return int
     */
    function getFieldLength($field){
        return $this->getFields()[$field]->length;
    }

}