<?php

/**
 * PHP ELEMENT INDEX
 *
 * Use this index for including latte.element library elements
 */

error_reporting(-1);

/// Include DataLatte
include 'latte/latte.php';

// Load base modules
DataLatteModule::memoryLoad('latte', 'en');
DataLatteModule::memoryLoad('latte.data', 'en');
DataLatteModule::memoryLoad('latte.element', 'en');

// Load app
$app = new DataLatteModule('app.contacts');
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
$doc->addScript(" window.addEventListener('load', function(){ new latte.Main() });");