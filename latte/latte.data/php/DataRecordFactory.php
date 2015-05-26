<?php
/**
 * Utility for creating records
 * User: menendezpoo
 * Date: 9/26/13
 * Time: 8:02 PM
 */

class DataRecordFactory {

    /**
     * Dumps on the output the result of <c>getAllTablesRecordCode</c>
     * @remote
     */
    public static function dumpRecords() {

        echo self::getAllTablesRecordCode();

    }

    /**
     * Returns the PHP code for representing all database tables as a DataRecord
     *
     * @remote
     * @return string
     * @throws SecurityException
     */
    public static function getAllTablesRecordCode(){

        // Check user can make this
        if(!DataLatteManager::isLoggedIn())
            throw new SecurityException();

        $result = '';
        $reader = DataLatte::getreader("SHOW TABLES");
        $tables = array();

        while ($r = $reader->read())
            $tables[] = $r[0];

        foreach ($tables as $table)
            $result .= self::getTableRecordCode($table);

        return $result;
    }

    /**
     * Gets the PHP code for representing the specified table as a DataRecord.
     *
     * @remote
     * @param $table
     * @return string
     * @throws SecurityException
     */
    public static function getTableRecordCode($table){

        if(!DataLatteManager::isLoggedIn())
            throw new SecurityException();

        $fields = array();
        $primkey = array();
        $keys = array();
        $justfields = array();
        $reader = DataLatte::getreader("describe `$table`");
        $desc = array();
        $describer = null;
        $SPACE = " ";

        while ($r = $reader->read()) {
            $fields[] = $r[0];

            if ($r['Extra'] == "auto_increment") {
                $primkey[] = $r[0];
            } elseif ($r['Key'] == "PRI") {
                $keys[] = $r[0];
            } else {
                $justfields[] = $r[0];
            }

            $describerRow = array();


            $describer .= "//    <Column>";
            foreach ($r as $key => $value)
                if (!is_numeric($key))
                    $describer .= "<$key>$value</$key>";

            $describer .= "</Column>" . PHP_EOL;
        }


        $checks = array();

        foreach (array_merge($keys, $primkey) as $value) {
            $checks[] = sprintf('isset($this->%s)', $value);
        }

        $selects = array();

        foreach ($fields as $value) {
            $selects[] = sprintf(' "$t.%s AS \'$t.%s\'" ', $value, $value);
        }

        $code = sprintf('

/// <table-definition>
///   <name>%s</name>
%s/// </table-definition>
class __TABLE__Base extends DataRecord{

    public $%s;
    public static function' . ' all($t = "__TABLE__"){  return array( %s ); }
    public static function' . ' gettable(){ return "__TABLE__"; }
    public  function' . ' getautokey(){ return array( %s ); }
    public function' . ' getkeys(){ return array( %s ); }
    public function' . ' getfields(){ return array( %s ); }
    public function' . ' isinserted(){ return %s; }

} ', $table, $describer, implode(', $', $fields), implode(', ', $selects), implode(", ", self::makepairs($primkey)), implode(", ", self::makepairs($keys)), implode(", ", self::makepairs($justfields)), sizeof($checks) ? implode(" && ", $checks) : 1
        );

        return str_replace("__TABLE__", $table, $code);

    }

    /**
     * Private function to create SQL Sentences parts
     */
    private static function makepairs($arr) {

        $r = array();

        foreach ($arr as $value) {
            $r[] = sprintf('"%s" => $this->%s', $value, $value);
        }

        return $r;
    }

} 