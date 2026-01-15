<?php
$start = microtime(true);
echo "Start: " . $start . "\n";

try {
    $pdo = new PDO('mysql:host=172.18.0.1;port=3306;dbname=dbsja', 'root', '');
    $connected = microtime(true);
    echo "Connected: " . ($connected - $start) . "s\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
