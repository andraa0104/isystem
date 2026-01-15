<?php
$start = microtime(true);
$host = 'host.docker.internal';
echo "Connecting to $host...\n";
try {
    $pdo = new PDO("mysql:host=$host;port=3306;dbname=dbsja", 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected in " . (microtime(true) - $start) . "s\n";
    
    $ip = gethostbyname($host);
    echo "Resolved $host to $ip\n";

    $writeStart = microtime(true);
    $stmt = $pdo->prepare("INSERT INTO sessions (id, user_id, ip_address, user_agent, payload, last_activity) VALUES (?, ?, ?, ?, ?, ?)");
    $id = uniqid();
    $stmt->execute([$id, null, '127.0.0.1', 'Benchmark', 'test_payload', time()]);
    echo "Session Insert in " . (microtime(true) - $writeStart) . "s\n";

    $delStart = microtime(true);
    $pdo->exec("DELETE FROM sessions WHERE id = '$id'");
    echo "Session Delete in " . (microtime(true) - $delStart) . "s\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
