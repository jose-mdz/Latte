<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 5/27/15
 * Time: 1:15 PM
 */

class Category extends categoryBase{

    /**
     * @remote
     * @return Array<Category>
     */
    public static function fullCatalog(){
        return DL::arrayOf('Category', "SELECT * FROM category");
    }

}