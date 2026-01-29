<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests allowed"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? 'save';
$type = $input['type'] ?? null;
$data = $input['data'] ?? null;
$id = $input['id'] ?? null;
$updates = $input['updates'] ?? null;

if (!$type) {
    http_response_code(400);
    echo json_encode(["error" => "Type required"]);
    exit;
}

$type = preg_replace('/[^a-zA-Z0-9_]/', '', $type);
$dataDir = __DIR__ . '/../data/';
$dataFile = $dataDir . $type . '.json';

clearstatcache();

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$existingData = [];
if (file_exists($dataFile)) {
    $existingData = json_decode(file_get_contents($dataFile), true);
    if (!is_array($existingData)) {
        $existingData = [];
    }
}

if ($action === 'add') {
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "Data required for add action"]);
        exit;
    }
    
    $newItem = array_merge($data, [
        'id' => $type . '_' . uniqid('', true),
        'created_at' => date('c')
    ]);
    
    $existingData[] = $newItem;
    
    if (file_put_contents($dataFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true, "item" => $newItem]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
    }
    
} elseif ($action === 'update') {
    if (!$id || !$updates) {
        http_response_code(400);
        echo json_encode(["error" => "ID and updates required for update action"]);
        exit;
    }
    
    $found = false;
    foreach ($existingData as &$item) {
        if (isset($item['id']) && $item['id'] === $id) {
            foreach ($updates as $key => $value) {
                $item[$key] = $value;
            }
            $item['updated_at'] = date('c');
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        http_response_code(404);
        echo json_encode(["error" => "Item not found"]);
        exit;
    }
    
    if (file_put_contents($dataFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
    }
    
} else {
    if ($data === null) {
        http_response_code(400);
        echo json_encode(["error" => "Data required"]);
        exit;
    }
    
    if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
    }
}
