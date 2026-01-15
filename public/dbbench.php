<?php
$start = microtime(true);
echo "Start: " . $start . "\n";

try {
    $pdo = new PDO('mysql:host=host.docker.internal;port=3306;dbname=dbsja', 'root', '');
    $connected = microtime(true);
    echo "Connected: " . ($connected - $start) . "s\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
