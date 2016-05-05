<?php
/**
 * PHP INDEX
 *
 * Use this index for including latte.ui library elements
 */
error_reporting(-1);

/// Include DataLatte
include 'latte/latte.php';

/// Load app
LatteModule::loadMain('app.list');

/// Create document
$doc = new LatteDocument($strings['appName']);
