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
     * @param string $term
     * @param int $page
     * @param int $pageSize
     * @return PageResult<Person>
     */
    public static function search($term = '', $page = 1, $pageSize = 50){

        return DataLatte::pageOf(get_class(), "
            SELECT *
            FROM person
            WHERE (
               person.name LIKE '%$term%' OR
               person.lastname LIKE '%$term%'
            )
        ", $page, $pageSize);

    }

}