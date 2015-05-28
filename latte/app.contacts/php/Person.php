<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 6/11/14
 * Time: 7:41 PM
 */

class Person extends personBase{


    /**
     * Searches for persons in the database
     *
     * @remote
     * @param PersonSearchOptions $options
     * @param int $page
     * @param int $pageSize
     * @return PageResult<Person>
     */
    public static function search($options, $page = 1, $pageSize = 50){

        extract($options, EXTR_PREFIX_ALL, 'op');

        $where = array();

        if(isset($op_text) && strlen($op_text) > 0){
            $where[] = "(
               person.name LIKE '%$op_text%' OR
               person.lastname LIKE '%$op_text%' OR
               person.address LIKE '%$op_text%' OR
               person.phone LIKE '%$op_text%' OR
               person.mobile LIKE '%$op_text%'
            )";
        }

        if(isset($op_idcategory) && $op_idcategory > 0){
            $where[] = "idcategory = '$op_idcategory'";
        }

        $whereSql = sizeof($where) > 0 ? sprintf("WHERE %s", implode(' AND ', $where)) : '';

        return DataLatte::pageOf(get_class(), "
            SELECT *
            FROM person
            $whereSql
            ORDER BY lastname
        ", $page, $pageSize);

    }

}