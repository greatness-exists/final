<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$type = $_GET['type'] ?? 'gallery';
$dataFile = __DIR__ . '/../data/' . $type . '.json';

if (!file_exists($dataFile)) {
    echo json_encode([]);
    exit;
}

$data = json_decode(file_get_contents($dataFile), true);

if (!is_array($data)) {
    echo json_encode([]);
    exit;
}

// Sort by creation time (descending) or order_index
usort($data, function($a, $b) {
    if (isset($a['order_index']) && isset($b['order_index'])) {
        return $a['order_index'] - $b['order_index'];
    }
    $timeA = isset($a['created_at']) ? strtotime($a['created_at']) : 0;
    $timeB = isset($a['created_at']) ? strtotime($b['created_at']) : 0;
    return $timeB - $timeA;
});

echo json_encode($data);