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
if (!$input) {
    $input = $_POST;
}

$path = $input['path'] ?? null;
$type = $input['type'] ?? 'gallery';
$id = $input['id'] ?? null;

if (!$path && !$id) {
    http_response_code(400);
    echo json_encode(["error" => "Path or ID required"]);
    exit;
}

$publicRoot = realpath(__DIR__ . "/../../");
$data_dir = __DIR__ . "/../data/";

clearstatcache();

// 1. Delete file if path provided
if ($path) {
    // Basic security: prevent traversal
    if (strpos($path, '..') !== false) {
        http_response_code(403);
        echo json_encode(["error" => "Invalid path"]);
        exit;
    }

    $fullPath = $publicRoot . '/' . ltrim($path, '/');
    
    // Check if path is in allowed directories
    $allowedDirectories = ['', 'Rooms/', 'assets/gallery/'];
    $dir = dirname($path);
    $dir = ($dir === '.' || $dir === '') ? '' : $dir . '/';
    
    // Ensure we don't delete system files
    $basename = basename($path);
    $protectedFiles = ['logo.png', 'vite.svg', 'robots.txt', 'sitemap.xml', 'index.html', '.htaccess', 'favicon.ico'];
    
    if (in_array($dir, $allowedDirectories) && !in_array($basename, $protectedFiles)) {
        if (file_exists($fullPath) && is_file($fullPath)) {
            unlink($fullPath);
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
                // Special case for image_url with leading slash
                if ($path && isset($item['image_url']) && ltrim($item['image_url'], '/') === ltrim($path, '/')) return false;
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