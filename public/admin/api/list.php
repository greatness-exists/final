<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$type = $_GET['type'] ?? 'gallery';

// Security: Sanitize type to prevent directory traversal
$type = preg_replace('/[^a-zA-Z0-9_]/', '', $type);
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

// Sort by order_index (ascending) or created_at (descending)
usort($data, function($a, $b) {
    if (isset($a['order_index']) && isset($b['order_index'])) {
        return $a['order_index'] - $b['order_index'];
    }
    $timeA = isset($a['created_at']) ? strtotime($a['created_at']) : 0;
    $timeB = isset($b['created_at']) ? strtotime($b['created_at']) : 0;
    return $timeB - $timeA;
});

echo json_encode($data);