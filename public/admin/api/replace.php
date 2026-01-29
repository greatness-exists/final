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
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$targetFile = $_POST['target'] ?? '';
$uploadedFile = $_FILES['replacement'] ?? null;

if (!$targetFile || !$uploadedFile) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing target or replacement file']);
    exit;
}

if (strpos($targetFile, '..') !== false) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid target path']);
    exit;
}

$allowedPaths = ['', 'Rooms/', 'assets/gallery/'];
$targetDir = dirname($targetFile);
$targetDir = ($targetDir === '.' || $targetDir === '') ? '' : $targetDir . '/';

if (!in_array($targetDir, $allowedPaths)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid target directory']);
    exit;
}

$publicRoot = realpath(__DIR__ . '/../../');
$fullPath = $publicRoot . '/' . $targetFile;

if (!file_exists($fullPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Target file not found']);
    exit;
}

clearstatcache();

if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Upload error: ' . $uploadedFile['error']]);
    exit;
}

if ($uploadedFile['size'] > 10 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 10MB)']);
    exit;
}

$imageFileType = strtolower(pathinfo($uploadedFile['name'], PATHINFO_EXTENSION));
$allowed_formats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
if (!in_array($imageFileType, $allowed_formats)) {
    http_response_code(400);
    echo json_encode(['error' => 'Only JPG, JPEG, PNG, WebP & GIF allowed']);
    exit;
}

$check = @getimagesize($uploadedFile['tmp_name']);
if ($check === false) {
    http_response_code(400);
    echo json_encode(['error' => 'File is not a valid image']);
    exit;
}

if (move_uploaded_file($uploadedFile['tmp_name'], $fullPath)) {
    echo json_encode(['success' => true, 'replaced' => $targetFile]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to replace file']);
}