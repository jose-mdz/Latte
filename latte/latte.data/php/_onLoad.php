<?php
/**
 * Created by PhpStorm.
 * User: josemanuel
 * Date: 10/23/14
 * Time: 10:23 AM
 */

/**
 * Adds a warning to return in the current ajax call
 * @param $message
 */
function ajaxWarn($message){
    $GLOBALS['ajax-warn'][] = $message;
}

/**
 * Adds a log to return in the current ajax call
 * @param $message
 */
function ajaxLog($message){
    $GLOBALS['ajax-log'][] = $message . '';
}