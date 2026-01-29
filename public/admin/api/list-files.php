<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$publicRoot = realpath(__DIR__ . '/../../');
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

clearstatcache();


function getImageFiles($directory, $basePath = '') {
    global $allowedExtensions;
    $files = [];
    
    if (!is_dir($directory)) {
        return $files;
    }
    
    $items = scandir($directory);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === 'admin') continue;
        
        $fullPath = $directory . '/' . $item;
        $relativePath = $basePath ? $basePath . '/' . $item : $item;
        
        if (is_file($fullPath)) {
            $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
            if (in_array($ext, $allowedExtensions)) {
                $files[] = [
                    'filename' => $relativePath,
                    'name' => $item,
                    'size' => filesize($fullPath),
                    'modified' => filemtime($fullPath),
                    'extension' => $ext
                ];
            }
        }
    }
    
    return $files;
}

$rootFiles = getImageFiles($publicRoot);
$roomFiles = getImageFiles($publicRoot . '/Rooms', 'Rooms');
$assetsGalleryFiles = [];

if (is_dir($publicRoot . '/assets/gallery')) {
    $assetsGalleryFiles = getImageFiles($publicRoot . '/assets/gallery', 'assets/gallery');
}

$allFiles = array_merge($rootFiles, $roomFiles, $assetsGalleryFiles);

usort($allFiles, function($a, $b) {
    return strcmp($a['filename'], $b['filename']);
});

echo json_encode([
    'success' => true,
    'files' => $allFiles,
    'count' => count($allFiles)
]);