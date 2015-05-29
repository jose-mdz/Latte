<?php 
class categoryBase extends DataRecord{
	public $idcategory, $name, $group, $i;
	public static function all($t = "Category"){ return array("$t.idcategory AS '$t.idcategory'", "$t.name AS '$t.name'", "$t.group AS '$t.group'", "$t.i AS '$t.i'"); }
	public static function gettable(){ return "Category"; }
	public function getAutoKey(){ return array( "idcategory" => $this->idcategory ); }
	public function getKeys(){ return array(  ); }
	public function getFields(){ return array( "name" => $this->name, "group" => $this->group, "i" => $this->i ); }
	public function getModule(){ return 'app.contacts'; }
	public function isInserted(){ return isset($this->idcategory); }
}
class personBase extends DataRecord{
	public $idperson, $idcategory, $title, $name, $lastname, $birth, $sex, $address, $phone, $mobile, $note, $company, $email;
	public static function all($t = "Person"){ return array("$t.idperson AS '$t.idperson'", "$t.idcategory AS '$t.idcategory'", "$t.title AS '$t.title'", "$t.name AS '$t.name'", "$t.lastname AS '$t.lastname'", "$t.birth AS '$t.birth'", "$t.sex AS '$t.sex'", "$t.address AS '$t.address'", "$t.phone AS '$t.phone'", "$t.mobile AS '$t.mobile'", "$t.note AS '$t.note'", "$t.company AS '$t.company'", "$t.email AS '$t.email'"); }
	public static function gettable(){ return "Person"; }
	public function getAutoKey(){ return array( "idperson" => $this->idperson ); }
	public function getKeys(){ return array(  ); }
	public function getFields(){ return array( "idcategory" => $this->idcategory, "title" => $this->title, "name" => $this->name, "lastname" => $this->lastname, "birth" => $this->birth, "sex" => $this->sex, "address" => $this->address, "phone" => $this->phone, "mobile" => $this->mobile, "note" => $this->note, "company" => $this->company, "email" => $this->email ); }
	public function getModule(){ return 'app.contacts'; }
	public function isInserted(){ return isset($this->idperson); }
}