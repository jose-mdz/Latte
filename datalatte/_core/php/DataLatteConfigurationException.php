<?php

class DataLatteConfigurationException extends Exception{
    
    public function __construct($message = 'Datalatte is not well configured') {
        parent::__construct($message, 97);
    }
    
}