<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
if (!$input) {
    // Fallback to $_POST for non-JSON requests
    $input = $_POST;
}

$path = $input['path'] ?? null;
$type = $input['type'] ?? 'gallery'; // Default to gallery
$id = $input['id'] ?? null;

if (!$path && !$id) {
    http_response_code(400);
    echo json_encode(["error" => "Path or ID required"]);
    exit;
}

$base_dir = realpath(__DIR__ . "/../../");
$assets_dir = realpath($base_dir . "/assets/gallery/");
$data_dir = __DIR__ . "/../data/";

// 1. Delete file if path provided
if ($path) {
    $filename = basename($path);
    
    // Prevent directory traversal
    if (preg_match('/\.\./', $filename) || preg_match('/[\/\\\\]/', $filename)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid path"]);
        exit;
    }
    
    if ($assets_dir) {
        $file_to_delete = $assets_dir . "/" . $filename;
        
        // Final security check: ensure the file is within the assets directory
        $real_path = realpath($file_to_delete);
        if ($real_path && strpos($real_path, $assets_dir) === 0 && file_exists($real_path)) {
            if (!unlink($real_path)) {
                // Log error but continue with JSON removal
            }
        }
    }
}

// 2. Remove entry from JSON
if ($id || $path) {
    $type = preg_replace('/[^a-zA-Z0-9_]/', '', $type);
    $dataFile = $data_dir . $type . '.json';
    
    if (file_exists($dataFile)) {
        $data = json_decode(file_get_contents($dataFile), true);
        if (is_array($data)) {
            $filteredData = array_filter($data, function($item) use ($id, $path) {
                if ($id && isset($item['id']) && $item['id'] === $id) return false;
                if ($path && isset($item['image_url']) && $item['image_url'] === $path) return false;
                return true;
            });
            
            $filteredData = array_values($filteredData);
            
            // Re-index order_index if it exists
            foreach ($filteredData as $index => &$item) {
                if (isset($item['order_index'])) {
                    $item['order_index'] = $index;
                }
            }
            
            file_put_contents($dataFile, json_encode($filteredData, JSON_PRETTY_PRINT));
        }
    }
}

echo json_encode(["success" => true]);