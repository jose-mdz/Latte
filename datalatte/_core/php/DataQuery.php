<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 1/12/14
 * Time: 12:37 PM
 */

class DataQuery {

    public $columns = array();
    public $tables = array();
    public $conditions = array();
    public $joins = array();
    public $groups = array();
    public $havings = array();
    public $orderby = array();

    function __construct($table = null){

        if($table){
            $this->tables[] = $table;
        }

    }

    private function columnsString(){
        if(sizeof($this->columns)){
            return implode(", ", $this->columns);
        }else{
            return sizeof($this->joins) ? "#COLUMNS" : "*";
        }

    }

    private function conditionsString(){
        $rows = array();

        if(sizeof($this->conditions)){
            foreach($this->conditions as $c){
                if(is_array($c)){
                    $rows[] = implode (" OR ", $c);
                }else{
                    $rows[] = $c;
                }
            }
        }

        if(sizeof($rows)){
            return "WHERE " . implode("\n AND ", $rows);
        }else{
            return '';
        }
    }

    private function groupsString(){
        if(sizeof($this->groups)){
            return "GROUP BY " . implode(", ", $this->groups);
        }
        return '';
    }

    private function havingsString(){
        $rows = array();

        if(sizeof($this->havings)){
            foreach($this->havings as $h){
                if(is_array($h)){
                    $rows[] = implode(" OR ", $h);
                }else{
                    $rows[] = $h;
                }
            }
        }

        if($rows){
            return "HAVING " . implode(" AND ", $rows);
        }
        return '';
    }

    private function joinsString(){
        return implode("\n", $this->joins);
    }

    private function tablesString(){
        if(sizeof($this->tables)){
            return "FROM " . implode(", ", $this->tables);
        }else{
            return '';
        }
    }

    private function orderbys(){
        if(sizeof($this->orderby)){
            return "ORDER BY " . implode(', ', $this->orderby);
        }
        return '';
    }

    public function innerJoin($join){
        $this->joins[] = " INNER JOIN $join";
    }

    public function leftJoin($join){
        $this->joins[] = " LEFT JOIN $join";
    }



    function __toString(){

        $columns = $this->columnsString();
        $tables = $this->tablesString();
        $conditions = $this->conditionsString();
        $joins = $this->joinsString();
        $groups = $this->groupsString();
        $havings = $this->havingsString();
        $orderbys = $this->orderbys();

        return "SELECT " . implode("\n", array(
            $columns,
            $tables,
            $joins,
            $conditions,
            $groups,
            $havings,
            $orderbys
        ));
    }

} 