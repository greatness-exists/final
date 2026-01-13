<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Only POST requests allowed"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'] ?? null;
$data = $input['data'] ?? null;

if (!$type || $data === null) {
    echo json_encode(["error" => "Type and data required"]);
    exit;
}

// Security: Sanitize type to prevent writing to unintended files
$type = preg_replace('/[^a-zA-Z0-9_]/', '', $type);
$dataFile = __DIR__ . '/../data/' . $type . '.json';

if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to save data"]);
}