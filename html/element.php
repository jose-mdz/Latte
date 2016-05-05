<?php

/**
 * PHP ELEMENT INDEX
 *
 * Use this index for including latte.element library elements
 */
error_reporting(-1);

/// Include DataLatte
include 'latte/latte.php';

// Load app
LatteModule::loadMain('app.contacts');

/// Create document
$doc = new LatteDocument($strings['appName']);