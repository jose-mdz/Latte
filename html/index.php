<?php

error_reporting(-1);

/// Include DataLatte
include 'datalatte-files/datalatte.php';

/// Create document
$doc = new Document(true);

/// Title of document
$doc->title->text($strings['appName']);

/// Add core and app tags
foreach(DataLatteModule::$loadedModules as $module){
    $doc->head->add($module->getTags());
}

/// Load javascript main
$doc->addScript(" $(function(){ new latte.Main() });");