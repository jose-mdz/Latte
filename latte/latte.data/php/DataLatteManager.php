<?php
/**
 * Handles tasks related to the DataLatteManager, the tool for managing DataLatte.
 */
    class DataLatteManager{
        
        const MIN_PASSPHRASE_LENGTH = 5;
        
        const MAX_LOGIN_FAILS = 3;
        
        /**
         * @remote
         */
        public static function test(){
           return DataLatte::getCache("SELECT * FROM `cookie`");
        }
        
        /**
         * Checks if DataLatte can be initialized
         * 
         * @remote
         * @return boolean
         */
        public static function canInit(){
            return DataLatte::canInit();
        }
        
        /**
         * Gets the namespaces on ua/ folder
         * 
         * @remote
         * @deprecated use getModuleUaNamespaces
         * @param string $app
         * @return array
         */
        public static function getUaNamespaces($app){
            
            return LatteReflection::getAppUaNamespaces($app);
        }
        
        /**
         * Gets the php classes of the specified version
         * 
         * @remote
         * @param string $moduleName
         * @param string $version
         * @return array
         */
        public static function getModulePhpClasses($moduleName, $version = 'development'){
            
            $m = new LatteModule($moduleName);
            
            return $m->getPhpClasses($version);
        }
        
        /**
         * @remote
         * @param type $module
         * @param type $version
         */
        public static function getModuleUaNamespaces($moduleName, $version = 'development'){
            
            $m = new LatteModule($moduleName);
            
            return $m->getUaNamespaces($version);
            
        }
        
        /**
         * @remote
         * @param type $module
         * @param type $version
         */
        public static function getModuleUaNamespaceClasses($moduleName, $namespace, $version = 'development'){
            
            $m = new LatteModule($moduleName);
            
            return $m->getUaNamespaceClasses($namespace, $version);
            
        }
        
        /**
         * 
         * @remote
         * @param type $moduleName
         * @param type $class
         * @param type $version
         * @return any
         */
        public static function getModulePhpClassInfo($moduleName, $class, $version = 'development'){
            
            $m = new LatteModule($moduleName);
            
            return $m->getPhpClassInfo($class, $version);
            
        }
        
        /**
         * 
         * @remote
         * @param type $moduleName
         * @param type $class
         * @param type $version
         * @return any
         */
        public static function getModuleJsClassInfo($moduleName, $class, $version = 'development'){
            
            $m = new LatteModule($moduleName);
            
            return $m->getUaClassInfo($class, $version);
        }
        
        /**
         * Gets the names of the files in the specified namespace
         * 
         * @remote
         * @deprecated
         * @param string $app
         * @param string $namespace
         * @return array
         */
        public static function getUaObjects($app, $namespace){
            
            $list = LatteReflection::getFileList(DataLatteUa::getAppPath($app) . '/ua/' . $namespace, '.js');
            
            foreach($list as $i => $value){
                $s = str($value);
                $list[$i] = $s->substring(0, $s->length() - 3) . '';
            }

            return $list;
        }
        
        /**
         * Gets information about the user session.
         * Returns <c>OK</c> | <c>NOSESSION</c> | <c>[Error description]</c>
         * 
         * @remote
         * @return string
         */
        public static function getSessionInformation() {
            global $strings;

            if (self::isEnabled()) {

                if (self::isReady()) {

                    if (self::isConfigured()) {
                        
                        if (self::isLoggedIn()) {
                            return 'OK';
                            
                        } else {
                            return 'NOSESSION';
                            
                        }
                    } else {
                        return 'NOCONNECTION';
                    }
                } else {
                    return $strings['managerNotReady'];
                }
            } else {
                return $strings['managerNotEnabled'];
            }
        }
         
        /**
         * Gets the information array about the object
         * 
         * @deprecated
         * @remote
         * @param string $app
         * @param string $className
         * @return array
         * @throws Exception
         */
        public static function getUaObject($app, $className){
            
            $parts = explode('.', $className);
            
            if(sizeof($parts) < 2)
                throw new Exception("Invalid class name");
            
            $filename = array_pop($parts);
            $namespace = implode('.', $parts);
            
            $path = DataLatteUa::getAppPath($app) . "/ua/$namespace/$filename.js";

            return  LatteReflection::generateJavaScriptFileInfo($path); 
        }
        
        /**
         * Gets the data of the specified table
         * 
         * @remote
         * @param string $tablename
         * @return DataSet
         * @throws NoSessionException
         */
        public static function getTableData($tablename){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            return new DataSet(DataLatte::getReader("SELECT * FROM `$tablename` LIMIT 100"));
        }
        
        /**
         * Gets the info of the specified table
         * 
         * @remote
         * @param string $tablename
         * @return DataSet
         * @throws NoSessionException
         */
        public static function getTableInfo($tablename){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            return new DataSet(DataLatte::getReader("SHOW COLUMNS FROM `$tablename`"));
        }
         
        /**
         * Gets the full path to the passhphrase file 
         * 
         * @return string
         */
        private static function getPassphrasePath(){
            return DATALATTE_FILES . "/passphrase.php";
        }
        
        /**
         * Gets the full path to the connection data file
         * 
         * @return string
         */
        private static function getConnectionPath(){
            return DATALATTE_FILES . "/connection.php";
        }
        
        /**
         * Gets the full path to the login fails file
         * 
         * @return string
         */
        private static function getFailsPath(){
            return DATALATTE_FILES . "/login_fails";
        }
        
        /**
         * Gets an array with the names of the tables on database
         * 
         * @remote
         * @return array
         * @throws Exception
         */
        public static function getDbTables(){
            if(!self::isLoggedIn()) throw new Exception("Not logged");
            
            return DataLatte::getCache("SHOW TABLES");
        }
        
        /**
         * Adds the IP to the fail list
         */
        private static function addFail(){
            file_put_contents(self::getFailsPath(), $_SERVER['REMOTE_ADDR'] . PHP_EOL, FILE_APPEND);
        }
        
        /**
         * Checks if there's a configured connection 
         * 
         * @remote
         * @return boolean
         */
        public static function isConfigured(){
            return DataLatte::canInit();
            //if (DataLatte::getsingle("SELECT now()"))
            //    return true;
            //return false;
        }        
        
        /**
         * Checks if the DataLatte manager is enabled.
         * To enable the DataLatte manager, a file named PASSHPRHASE should exist on _files/PASSPHRASE directory
         * and it must contain an alphanumeric passphrase larger than 5 characters.
         * 
         * @return boolean
         */
        public static function isEnabled(){
            
            $path = DataLatteManager::getPassphrasePath();
            
            if(file_exists($path)){
                ob_start(); 
                include $path; 
                ob_end_clean();
                
                if(!defined('PASSPHRASE')) return false;
                
                return strlen(trim(PASSPHRASE)) > DataLatteManager::MIN_PASSPHRASE_LENGTH;
                
            }else{
                return false;
            }
            
        }
        
        /**
         * Checks if there's a user currently logged in
         * 
         * @remote
         * @return boolean 
         */
        public static function isLoggedIn(){
            return isset($_SESSION['datalattemanager']);
        }
        
        /**
         * Checks that a _files directory exists and is writable
         * 
         * @return boolean
         */
        public static function isReady(){
            
            if(is_writable(DATALATTE_FILES . "/.")){
                
                return true;
            }
            return false;
        }
        
        /**
         * Gets an array of ips who have failed on logins 
         * 
         * @return array
         */
        private static function getFails(){
            $path = DataLatteManager::getFailsPath();
            
            $fails = array();
            
            if(file_exists($path)){
                $fails = file($path);
            }
            
            return $fails;
        }
        
        /**
         * Gets the passphrase
         * 
         * @return string
         */
        private static function getPassphrase(){
            return trim(PASSPHRASE);
        }
        
        /**
         * Tries to log user in
         * 
         * @remote
         * @param string $passphrase
         * @return boolean
         */
        public static function logIn($passphrase){
            
            $success = false;
            
            if(DataLatteManager::isEnabled()){
                $success = $passphrase == DataLatteManager::getPassphrase();
            }
            
            if($success){
                $_SESSION['datalattemanager'] = 1;
                
                self::resetFails();
                
            }else{
                // Handle fail counter
                self::addFail();
                
                $fails = self::getFails();
                
                if(sizeof($fails) > self::MAX_LOGIN_FAILS){
                    $path = self::getPassphrasePath();
                    rename($path, $path . "_BLOCKED");
                }
                
            }
            
            return $success;
        }
        
        /**
         * @remote
         * @param LatteModule $module
         * @param type $major
         * @return string
         */
        public static function makeRelease($module, $major = false){
            
            $module = new LatteModule($module);
            
            
            return $module->makeRelease($major);
        }
        
        /**
         * Handles HTTP requests with commands for manager interface
         * 
         * @return mixed
         */
        public static function processRequest(){
            global $strings;

            switch($_POST['action']){
                
                case 'login':
                    if(!DataLatteManager::logIn($_POST['passphrase']))
                        return $strings['invalidPassphrase'];
                    break;
                case 'logout':
                    unset($_SESSION['datalattemanager']); 
                    break;
                
                case 'update-connection':
                    return DataLatteManager::saveConnection($_POST['user'], $_POST['pass'], 
                            $_POST['host'], $_POST['db'], true);
                    break;
                
                case 'update-records':
                    return DataLatteManager::updateRecords();
                    break;
                
            }
            
            return null;
            
        }
        
        /**
         * Resets the fail list
         */
        private static function resetFails(){
            /// Delete fail file
            $path = self::getFailsPath();
            
            if(file_exists($path)){
                unlink($path);
            }
        }
        
        /**
         * Saves the connection described by the parameters as the default connection
         * @remote
         * 
         * @return bool 
         */
        public static function saveConnection($user, $pass, $host, $db, $debug){
            global $strings;

            $debug = $debug ? 'true' : 'false';
            $success = false;

            /**
             * Test connection 
             */
            try{
                $x = new DataConnection($user, $pass, $host, $db, $debug);
                if($x) $success = true;
            }catch(Exception $e){
                return $strings['parametersError'] . ' ' . $e->getMessage();
            }
            
            
            if($success){
                $filename = DATALATTE_FILES . "/connection.php";
                unlink($filename);
                file_put_contents($filename, "<?php
                    
    /**
     * 
     * WARNING: DO NOT CHANGE THIS FILE
     * This class was generated automatically,
     * by the DataLatte framework code.
     * 
     * Created: " . DataLatte::datetime() . "
     * 
     * To change the default connection parameters,
     * go to the datalatte/ control panel interface
     * using a web ApiDetailView.
     */

    class ConnectionParameters{

        public \$user = '$user';
        public \$pass = '$pass';
        public \$host = '$host';
        public \$db   = '$db';

        public static \$debug = $debug;
    } 
                ");
            }
            
            return $success;
        }
        
        /**
         * Updates the records
         * @remote
         */
        public static function updateRecords(){
            
            if(!self::isLoggedIn()) die("No session");
            
            $path = DATALATTE_FILES . '/records.php';
            $archiveFolder = DATALATTE_FILES . '/records_archive';
            $archive = $archiveFolder . '/records-' . time() . '.php';
            
            /// Archive current copy
            if(file_exists($path)){
                
                // Check if archive folder exits
                if(!file_exists($archiveFolder . '/.')){
                    mkdir($archiveFolder);
                }
                
                // Archive copy
                rename($path, $archive);
            }
            
            /// Empty file
            file_put_contents($path , '<?php /* Created: ' . DataLatte::datetime() . ' */' . PHP_EOL);
            
            function /**/ callback($buffer){
                file_put_contents(DATALATTE_FILES . '/records.php' , $buffer, FILE_APPEND);
            }
            
            ob_start('callback');
            DataRecordFactory::dumpRecords();
            ob_end_flush();
            
            return true;
        }
        
        /**
         * Updates the value of the specified row of the specified table
         * 
         * @remote
         * @param string $table
         * @param string $key
         * @param string $keyValue
         * @param string $column
         * @param string $value
         */
        public static function updateTableValue($table, $key, $keyValue, $column, $value){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            $query = "UPDATE `$table` SET `$column` = '$value' WHERE `$key` = '$keyValue'";
            
            #return $query;
            
            return DataLatte::update($query);
        }
        
        /**
         * Gets the name of the primary key of table
         * @param string $key
         */
        private static function getTableKey($table){
            $ds = self::getTableInfo($table);
            
            foreach($ds->rows as $i => $row){
                if($row[3] == 'PRI')
                    return $row[0];
            }
            
            return null;
        }
        
        /**
         * 
         * @remote
         * @param type $param
         * @return any
         */
        public static function insertTableRows($table, $names, $values){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            $columns = '`' . implode('`, `', $names) . '`';
            $valuesArray = array();
            
            foreach($values as $i => $value){
                $valuesArray[] = "('" . implode("', '", $value) . "')";
            }
            
            $values = implode(", ", $valuesArray);
            
            $query = "INSERT INTO `$table`($columns) VALUES $values";
            return DataLatte::update($query);
        }

        /**
         * 
         * @remote
         * @param type $param
         * @return any
         */
        public static function updateTableRows($table, $names, $values){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            $responses = array();
            $queries = array();
            $key = self::getTableKey($table);
            
            foreach($values as $i => $row){
                
                $pairs = array();
                $where = '';
                
                foreach($names as $i => $name)
                    if($name == $key)
                        $where =  "`$name` = '$row[$i]'";
                    else
                        $pairs[] = "\n\t`$name` = '$row[$i]'";
                    
                
                $query = "\n\nUPDATE `$table` SET " . implode(', ', $pairs) . " \nWHERE $where";
                
                $queries[] = $query;
            }
            
            foreach($queries as $query)
                $responses[] = DataLatte::update($query);
            
            #$query = implode(';', $queries);
            
            return implode(", ", $responses);
        }
        
        /**
         * 
         * @remote
         * @param type $param
         * @return any
         */
        public static function deleteTableRows($table, $names, $values){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            $ids = array();
            $key = self::getTableKey($table);
            
            foreach($values as $i => $row){
                foreach($names as $i => $name)
                    if($name == $key)
                        $ids[] =  "`$name` = '$row[$i]'";
            }
            
            $where = implode(' OR ', $ids);
            $query = "DELETE FROM `$table` WHERE $where";
            
            #return $query;
            return DataLatte::update($query);
        }
        
        /**
         * @remote
         * @param
         * @return DataSet
         */
        public static function executeQuery($sql){
            if(!self::isLoggedIn()) throw new NoSessionException();
            
            DataLatte::init();
            
            $connection = DataLatte::$current;
            $result = $connection->query($sql);
            
            if(!$result){
                throw new Exception($connection->getErrorDescription());
            }
            
            if(is_bool($result)){
                return $connection->affectedRows();
            }else{
                return new DataSet(new DataReader($result));
                
            }
            
        }
        
        /**
         * @remote
         * @param
         * @return int
         */
        public static function executeUpdate($sql){
            if(!self::isLoggedIn()) throw new NoSessionException();
            return DataLatte::update($sql);
        }
        
        
        
    }