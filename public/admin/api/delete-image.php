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

$input = json_decode(file_get_contents('php://input'), true);
$filename = $input['filename'] ?? '';

if (!$filename) {
    http_response_code(400);
    echo json_encode(['error' => 'No filename provided']);
    exit;
}

if (strpos($filename, '..') !== false) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid filename']);
    exit;
}

$allowedPaths = ['', 'Rooms/', 'assets/gallery/'];
$dir = dirname($filename);
$dir = ($dir === '.' || $dir === '') ? '' : $dir . '/';

if (!in_array($dir, $allowedPaths)) {
    http_response_code(403);
    echo json_encode(['error' => 'Cannot delete from this directory']);
    exit;
}

$protectedFiles = ['logo.png', 'vite.svg', 'robots.txt', 'sitemap.xml'];
$basename = basename($filename);
if (in_array($basename, $protectedFiles)) {
    http_response_code(403);
    echo json_encode(['error' => 'This file is protected and cannot be deleted']);
    exit;
}

$publicRoot = realpath(__DIR__ . '/../../');
$fullPath = $publicRoot . '/' . $filename;

if (!file_exists($fullPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'File not found']);
    exit;
}

if (unlink($fullPath)) {
    echo json_encode(['success' => true, 'deleted' => $filename]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete file']);
}