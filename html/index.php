<?php

const ON_MAINTENANCE = false;

ini_set('output_buffering', 'Off');

error_reporting(-1);

/// Include DataLatte
include 'datalatte-files/datalatte.php';

/// Create document
$doc = new Document(true);

/// Title of document
$doc->title->text($strings['appName']);

// Add core and app tags
$doc->head->add(DataLatteModule::tagsOf('_ui', 'en'));
$doc->head->add(DataLatteModule::tagsOf('_core', 'en'));
$doc->head->add(DataLatteModule::tagsAndConnectionOf('_app', 'en'));
$doc->head->add(DataLatteModule::tagsAndConnectionOf('_api'));

// Load main
$doc->addScript(" $(function(){ new latte.Main() });");