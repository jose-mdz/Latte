<?php

class SecurityException extends Exception{
    
    public function __construct($message = 'Security Violation') {
        parent::__construct($message, 98);
    }
    
}