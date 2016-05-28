<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 5/5/16
 * Time: 11:01
 */

class LatteDocument extends Document{

    function __construct($title = null){
        parent::__construct(true, true);

        if($title){
            $this->title->text($title);
        }
    }

}