<?php 
class personBase extends DataRecord{
	public $idperson, $title, $name, $lastname, $birth, $sex;
	public static function all($t = "Person"){ return array("$t.idperson AS '$t.idperson'", "$t.title AS '$t.title'", "$t.name AS '$t.name'", "$t.lastname AS '$t.lastname'", "$t.birth AS '$t.birth'", "$t.sex AS '$t.sex'"); }
	public static function gettable(){ return "Person"; }
	public function getAutoKey(){ return array( "idperson" => $this->idperson ); }
	public function getKeys(){ return array(  ); }
	public function getFields(){ return array( "title" => $this->title, "name" => $this->name, "lastname" => $this->lastname, "birth" => $this->birth, "sex" => $this->sex ); }
	public function isInserted(){ return isset($this->idperson); }
}