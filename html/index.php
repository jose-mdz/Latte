<?php
/**
 * PHP INDEX
 *
 * Use this index for including latte.ui library elements
 */
error_reporting(-1);

/// Include DataLatte
include 'latte/latte.php';

// Load base modules
DataLatteModule::memoryLoad('latte', 'en');
DataLatteModule::memoryLoad('latte.ui', 'en');
DataLatteModule::memoryLoad('latte.data', 'en');
DataLatteModule::memoryLoad('latte.data.ui', 'en');

// Load app
$app = new DataLatteModule('app.list');
$app->load('en');
$app->loadConnection();

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