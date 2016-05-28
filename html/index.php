<?php

/**
 * It takes 3 lines to launch your app
 */

/// Include DataLatte
include 'latte/latte.php';

// Load app
LatteModule::loadMain('contacts');

/// Create document
$doc = new LatteDocument();