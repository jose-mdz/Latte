<?php

    /**
     * Represents a string with known methods. 
     */
    class DLString{
        
        private $string = null;
        
        /**
         * Creates a new string instance
         * @param type $string
         */
        public function __construct($string){
            $this->string = $string;
        }
        
        /**
         * Returns the string value
         * @return string
         */
        public function __toString(){
            return $this->string;
        }

        public static function combineUrl($path1, $path2){
            return self::combinePath($path1, $path2, "/");
        }
        
        /**
         * Combines the paths
         * @param string $path1
         * @param string $path2
         * @param string $separator
         * @return string
         */
        public static function combinePath($path1, $path2, $separator = DIRECTORY_SEPARATOR){
            if( str($path1)->endsWith($separator) ){
                return $path1 . $path2;
            }else{
                return $path1 . $separator . $path2;
            }
        }
        
        /**
         * Trims the string to the specified size.
         * @param int $size Size of desired trimmed string 
         * @return DLString
         */
        public function ellipsis($size = 20){
            
            $string = $this->string;
            
            if(strlen($string) > $size){
                
                // Holds offset
                $offset = -1;    
                
                do{
                    $offset++;
                    $char = substr($string, $size - 1 - $offset, 1);
                    
                }while( (ord($char) < 32 || ord($char) > 125) && !($offset >= strlen($string)) );
                
                if($offset >= strlen($string))
                    return new DLString("...");
                else
                    return new DLString(substr($string, 0, $size - $offset)) . '...';
            }
            
            return new DLString($string);
        }
        
        /**
         * Returns a boolean indicating if the string ends with the specified $posfix
         * @param string $posfix DLString to check if exists at the end
         * @return boolean
         */
        public function endsWith($posfix){
            $string = $this->string;
            return substr($string, strlen($string) - strlen($posfix)) == $posfix;
        }
        
        /**
         * Returns the position of the first occurrence of the specified string
         * @param DLString $string
         * @param int $start
         * @return int
         */
        public function indexOf(DLString $string, $start = 0){
            return strpos($this->string, $string->string, $start);
        }
        
        public function length(){
            return strlen($this->string);
        }
        
        public function replace($search, $replace){
            return str(str_replace($search, $replace, $this->string));
        }
        
        /**
         * Returns a boolean indicating if the string starts with the specified $prefix
         * @param type $prefix
         * @return type 
         */
        public function startsWith($prefix){
            $string = $this->string;
            return substr($string, 0, strlen($prefix)) == $prefix;
        }
        
        /**
         * Returns the substring specified by the parameters
         * @param int $start
         * @param int $length
         * @return DLString
         */
        public function substring($start, $length = null){
            if($length === null)
                return str(substr($this->string, $start));
            else
                return str(substr($this->string, $start, $length));
        }
        
    }
    
    /**
     * Creates a DLString object from the specified native string
     * @param type $string
     * @return DLString
     */
    function str($string) { return new DLString($string); }