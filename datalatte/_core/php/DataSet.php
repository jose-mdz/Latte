<?php

/**
 * Represents a set of data
 */
class DataSet{
    
    /**
     * Information about columns
     * 
     * @var array
     */
    public $fields;
    
    /**
     * Row data
     * 
     * @var array
     */
    public $rows;
    
    /**
     * Number of columns in result
     * @var int
     */
    public $columns;
    
    /**
     * Creates the DataSet from the specified <c>DataReader</c>
     */
    public function __construct(DataReader $reader) {
        
        if($reader){
            while( $row = $reader->read(MYSQL_NUM) ){
                $this->rows[] = $row;
            }
            
            $this->columns = $reader->getColumns();
            
            for($i = 0; $i < $this->columns; $i++){
                $this->fields[] = array(
                    'name' => $reader->getFieldName($i),
                    'type' => $reader->getFieldType($i),
                    'length' => $reader->getFieldLength($i),
                    'table' => $reader->getFieldTable($i)
                );
            }
        }
        
    }
    
    /**
     * Creates a DataSet from the result of the specified SQL query
     * @param string $query
     */
    public static function fromSQL($query){
        return new DataSet(DataLatte::getReader($query));
    }
    
}