<?php

abstract class DataRecord {

    /**
     * Used by DataLatte to describe the record
     * @var type 
     */
    public $_metadata = null;

    //region Static
    /**
     * Loads the record from the database by the specified $id
     *
     * @param string $className
     * @param mixed $id
     * @return DataRecord
     * @throws Exception
     */
    public static function byAuto($className, $id = false) {

        if ($id === false) {
            $id = $className;
            $className = get_called_class();
        }

        $name = $className;
        $obj = new $name();
        $akey = $obj->getallkeys();
        $table = $obj->gettable();

        if (is_string($id) && !is_numeric($id))
            throw new SecurityException("Id is not numeric: $id");

        if (sizeof($akey) != 1)
            throw new Exception("$name has more than 1 key");

        $keyarr = array_keys($akey);
        $key = $keyarr[0];

        //echo "SELECT * FROM `$table` WHERE $key = '$id'";

        return DataLatte::oneOf($name, "SELECT * FROM `$table` WHERE $key = '$id'");
    }

    /**
     * Loads the record from the database by the specified $guid
     *
     * @param mixed $guid
     * @return DataRecord
     * @throws Exception
     */
    public static function byGUID($guid = false) {

        $name = get_called_class();
        $obj = new $name();
        $table = $obj->gettable();

        return DataLatte::oneOf($name, "SELECT * FROM `$table` WHERE guid = '$guid'");
    }

    /**
     * Returns a value indicating if the passed array represents a packed record
     *
     * @param $array
     * @return boolean
     */
    public static function isPackedRecord($array){
        return (isset($array['type'])) && ($array['type'] === 'DataRecord');
    }

    /**
     * Packs the passed array of records
     *
     * @param array $array
     * @return array
     */
    public static function packArray(array $array){
        foreach($array as $i => $record){
            if(is_array($record)){
                $array[$i] = self::packArray($record);
            }elseif($record instanceof DataRecord){
                $array[$i] = $record->pack();
            }
        }
        return $array;
    }

    /**
     * Unmarshalls a packed DataRecord
     *
     * @throws ErrorException
     * @param $array
     * @return DataRecord
     */
    public static function unpack($array){
        if(!DataRecord::isPackedRecord($array)){
            throw new ErrorException("Invalid DataRecord");
        }
        $class = $array['recordType'];
        $id = $array['recordId'];
        $record = new $class();
        foreach($array['fields'] as $key => $value){
            $record->{$key} = $value;
        }
        foreach($array['properties'] as $key => $value){
            if(self::isPackedRecord($value)){
                $value = self::unpack($value);
            }
            $record->{$key} = $value;
        }
        $record->setIdValue($id);
        return $record;
    }

    /**
     * Unpacks a whole array
     * @param array $array
     * @return array
     */
    public static function unpackArray(&$array){
        foreach($array as $key => $value){
            if(is_array($value)){
                if(self::isPackedRecord($value)){
                    $array[$key] = self::unpack($value);
                }else{
                    $array[$key] = self::unpackArray($value);
                }
            }
        }
        return $array;
    }
    //endregion

    //region Abstract
    /**
     * Gets the name of the table this record represents
     * 
     * @return string
     * @throws Exception
     */
     public static function getTable(){
         throw new Exception("Must implement");
     }

    /**
     * Gets the name of the auto incremental key
     * 
     * @return string
     */
    abstract public function getAutokey();

    /**
     * Gets an array with the keys of the table this record represents
     * 
     * @return array
     */
    abstract public function getKeys();

    /**
     * Gets an array with the fields of the table this record represents
     * 
     * @return array
     */
    abstract public function getFields();

    /**
     * Gets a value indicating if this record is inserted on the database
     * 
     * @return booelan
     */
    abstract public function isInserted();
    //endregion

    //region Private
    /**
     * Assigns the '=' sign to array key => value
     * 
     * @param array $arr
     * @return string
     */
    private function equalize($arr) {

        $r = array();
        $arr = DataLatte::escape($arr);

        foreach ($arr as $key => $value) {
            if ($value == "NULL") {
                $r[] = sprintf(" `%s` = %s", $key, $value);
            } else {
                $r[] = sprintf(" `%s` = '%s'", $key, $value);
            }
        }

        return $r;
    }

    /**
     * Creates the WHERE statement part
     * 
     * @param array $arr
     * @return string
     */
    private function createWhere($arr) {

        return implode(" AND ", $this->equalize($arr));
    }
    //endregion

    //region Protected
    /**
     * Called before inserting the record. Insert is aborted if <c>false</c> is returned 
     * 
     * @return boolean
     */
    protected function onInserting(){
        return true;
    }
    
    /**
     * Called after inserting the record
     */
    protected function onInsert(){
        
    }
    
    /**
     * Called before updating the record. Insert is aborted if <c>false</c> is returned
     * 
     * @return boolean
     */
    protected function onUpdating(){
        return true;
    }
    
    /**
     * Called after updating the record
     */
    protected function onUpdate(){
        
    }
    
    /**
     * Called before inserting or updating the record. Insert is aborted if <c>false</c> is returned
     */
    protected function onSaving(){
        
    }
    
    /**
     * Called after packing.
     */
    protected function onPacked(Array &$array){
        
    }

    /**
     * Called before packing the record
     */
    protected function onPacking(){
        
    }

    /**
     * Called after saving the record
     */
    protected function onSave(){
        
    }
    
    /**
     * Called before deleting the record. Insert is aborted if <c>false</c> is returned
     */
    protected function onDeleting(){
        
    }
    
    /**
     * Called after deleting the record
     */
    protected function onDelete(){
        
    }
    //endregion

    //region Public

    /**
     * Override to specify if record can be inserted remotely
     * @return bool
     */
    public function canInsert(){
        return true;
    }

    /**
     * Override to specify if record can be update remotely
     * @return bool
     */
    public function canUpdate(){
        return true;
    }

    /**
     * Override to specify if record can be deleted remotely
     * @return bool
     */
    public function canDelete(){
        return false;
    }

    /**
     * Deletes this record on the database.
     *
     * @param DataConnection $connection
     * @return boolean
     */
    public function delete($connection = null) {

        if (method_exists($this, 'onDeleteing')) {
            if (call_user_func(array($this, 'onDeleteing')) === FALSE) {
                return false;
            }
        }

        if (method_exists($this, 'onDeleting')) {
            if (call_user_func(array($this, 'onDeleting')) === FALSE) {
                return false;
            }
        }

        $q = $this->getDeleteQuery();


        if ($connection) {
            $connection->update($q);
        } else {
            DataLatte::update($q);
        }
        if (method_exists($this, 'onDelete')) {
            call_user_func(array($this, 'onDelete'));
        }
    }

    /**
     * Gets an array with all the fields of the table this record represents
     *
     * @return array
     */
    public function getAll() {
        return array_merge(
            $this->getautokey(), $this->getkeys(), $this->getfields());
    }

    /**
     * Gets an array with all the keys of the table this record represents
     *
     * @return array
     */
    public function getAllKeys() {
        return array_merge(
            $this->getautokey(), $this->getkeys());
    }

    /**
     * Gets the SQL <c>DELETE</c> statement for deleting the record
     *
     * @return string
     */
    public function getDeleteQuery() {
        return sprintf(
            "DELETE FROM `%s` WHERE %s", ($this->gettable()), $this->createwhere($this->getallkeys())
        );
    }

    /**
     * Gets the name of the autoincrement field
     * @return string
     * @throws Exception If no autoincrement key
     */
    public function getIdField(){
        $autokey = $this->getautokey();

        if (sizeof($autokey) != 1) {
            throw new Exception(sprintf("Record %s does not have an auto-icrement key", get_class($this)));
        }

        $keys = array_keys($autokey);

        return $keys[0];
    }

    /**
     * Gets the value of the autoincrement key
     * @return mixed
     */
    public function getIdValue(){
        $field = self::getIdField($this);

        return $this->{$field};
    }

    /**
     * Gets the SQL <c>INSERT</c> statement for inserting the record
     *
     * @return string
     */
    public function getInsertQuery() {

        $all = array_merge($this->getKeys(), $this->getFields());

        $all = DataLatte::escape($all);

        return str_replace("'NULL'", "NULL", sprintf(
            "INSERT INTO `%s`(`%s`) VALUES('%s')", ($this->gettable()), implode("`, `", array_keys($all)), implode("', '", array_values($all))
        ));
    }

    /**
     * Gets the SQL <c>UPDATE</c> statement for updating the record
     *
     * @param string $field Specify a field for updating a single field
     * @return string
     */
    public function getUpdateQuery($field = "") {

        if (strlen($field) == 0) {
            return sprintf(
                "UPDATE `%s` SET %s WHERE %s", ($this->gettable()), implode(", ", $this->equalize(array_merge($this->getfields(), ((sizeof($this->getautokey()) ? $this->getkeys() : array()))))), $this->createwhere((sizeof($this->getautokey()) ? $this->getautokey() : $this->getallkeys()))
            );
        } else {
            return sprintf(
                "UPDATE `%s` SET `%s` = '%s' WHERE %s", ($this->gettable()), $field, $this->${field}, $this->createwhere((sizeof($this->getautokey()) ? $this->getautokey() : $this->getallkeys()))
            );
        }
    }

    /**
     * Inserts this record on the database. If primary key is auto numeric, the Id will be automatically retrieved.
     *
     * @param DataConnection $connection
     * @return boolean
     */
    public function insert($connection = null) {

        $arr = $this->getautokey();
        $ak = 0;

        if (method_exists($this, 'onSaving')) {
            if (call_user_func(array($this, 'onSaving')) === FALSE) {
                return false;
            }
        }

        if (method_exists($this, 'onInserting')) {
            if (call_user_func(array($this, 'onInserting')) === FALSE) {
                return false;
            }
        }


        if (sizeof($arr)) {
            $keys = array_keys($arr);
            $ak = $keys[0];
        }

        if ($connection) {
            $connection->update($this->getinsertquery());

            if ($ak) {
                $this->{$ak} = $connection->getsingle("SELECT LAST_INSERT_ID()");
            }
        } else {
            DataLatte::update($this->getinsertquery());

            if ($ak) {
                $this->{$ak} = DataLatte::getsingle("SELECT LAST_INSERT_ID()");
            }
        }

        if (method_exists($this, 'onInsert')) {
            call_user_func(array($this, 'onInsert'));
        }

        if (method_exists($this, 'onSave')) {
            call_user_func(array($this, 'onSave'));
        }
    }

    /**
     * Packs the record for ajax transport
     */
    public function pack(){

        $this->onPacking();

        $arr = array(
            'type' => 'DataRecord',
            'recordId' => $this->getIdValue($this),
            'recordType' => get_class($this),
            //'metadata' => DataRecordMetadata::byRecord($this),
            'fields' => array_merge($this->getAllKeys(), $this->getFields()),
            'properties' => array(),
        );

        // Check others for properties from [others]
        if(isset($this->others) && is_array($this->others)){
            foreach($this->others as $key => $value){
                $arr['properties'][$key] = $value;
            }
        }

        foreach($this as $i => $value){
            if($value instanceof DataRecord){
                $arr['properties'][$i] = $value->pack();
            }
        }

        $this->onPacked($arr);

        return $arr;
    }

    /**
     * Inserts or updates this record on the database depending on the value of its primary key.
     *
     * @param DataConnection $connection
     */
    public function save($connection = null) {

        $inserted = false;

        $name = get_class($this);
        $obj = new $name();
        $akey = $obj->getautokey();
        $table = $obj->gettable();
        $x = $connection ? $connection : DataLatte::$current;

        if (!sizeof($akey)) {
            $keyarr = array_keys($this->getallkeys());
            $key = $keyarr[0];
            $inserted = $this->{$key} ? true : false;
        } else {
            $inserted = $this->isinserted();
        }

        if ($inserted) {
            $this->update($x);
        } else {
            $this->insert($x);
        }
    }

    /**
     * Sets the id of the record
     *
     * @param $value
     */
    public function setIdValue($value){
        $auto = $this->getAutoKey();
        $keys = array_keys($auto);
        $idField = $keys[0];
        $this->{$idField} = $value;
    }

    /**
     * Updates this record on the database
     *
     * @param DataConnection $connection
     * @return boolean
     */
    public function update($connection = null) {

        if (method_exists($this, 'onSaving')) {
            if (call_user_func(array($this, 'onSaving')) === FALSE) {
                return false;
            }
        }

        if (method_exists($this, 'onUpdating')) {
            if (call_user_func(array($this, 'onUpdating')) === FALSE) {
                return false;
            }
        }

        if ($connection) {
            $connection->update($this->getupdatequery());
        } else {
            DataLatte::update($this->getupdatequery());
        }

        if (method_exists($this, 'onUpdate')) {
            call_user_func(array($this, 'onUpdate'));
        }

        if (method_exists($this, 'onSave')) {
            call_user_func(array($this, 'onSave'));
        }
    }



    //endregion
    
}