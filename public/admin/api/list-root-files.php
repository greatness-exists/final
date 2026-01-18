<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$publicRoot = realpath(__DIR__ . '/../../');
$folder = $_GET['folder'] ?? '';

if ($folder && strpos($folder, '..') !== false) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid folder']);
    exit;
}

$allowedFolders = ['', 'Rooms'];
if (!in_array($folder, $allowedFolders)) {
    http_response_code(403);
    echo json_encode(['error' => 'Folder not allowed']);
    exit;
}

$targetDir = $folder ? $publicRoot . '/' . $folder : $publicRoot;

if (!is_dir($targetDir)) {
    http_response_code(404);
    echo json_encode(['error' => 'Directory not found']);
    exit;
}

$imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$files = [];

$items = scandir($targetDir);
foreach ($items as $item) {
    if ($item === '.' || $item === '..') continue;
    
    $fullPath = $targetDir . '/' . $item;
    if (!is_file($fullPath)) continue;
    
    $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
    if (!in_array($ext, $imageExtensions)) continue;
    
    $relativePath = $folder ? $folder . '/' . $item : $item;
    $urlPath = '/' . $relativePath;
    
    $files[] = [
        'name' => $item,
        'path' => $relativePath,
        'url' => $urlPath,
        'size' => filesize($fullPath),
        'modified' => filemtime($fullPath)
    ];
}

usort($files, function($a, $b) {
    return $b['modified'] - $a['modified'];
});

echo json_encode([
    'success' => true,
    'folder' => $folder ?: 'root',
    'files' => $files,
    'count' => count($files)
]);