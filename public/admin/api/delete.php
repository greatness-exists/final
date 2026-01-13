<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Only POST requests allowed"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$path = $input['path'] ?? null;
$type = $input['type'] ?? null;
$id = $input['id'] ?? null;

if (!$path) {
    echo json_encode(["error" => "Path is required"]);
    exit;
}

// Security: Prevent directory traversal
$filename = basename($path);
$target_dir = realpath(__DIR__ . "/../../assets/gallery/");
$file_to_delete = realpath($target_dir . "/" . $filename);

if ($file_to_delete && strpos($file_to_delete, $target_dir) === 0 && file_exists($file_to_delete)) {
    unlink($file_to_delete);
}

// Remove from JSON if type and id are provided
if ($type && $id) {
    $dataFile = __DIR__ . '/../data/' . $type . '.json';
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        $filteredData = array_filter($data, function($item) use ($id) {
            return $item['id'] !== $id;
        });
        file_put_contents($dataFile, json_encode(array_values($filteredData), JSON_PRETTY_PRINT));
    }
}

echo json_encode(["success" => true]);