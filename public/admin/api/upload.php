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

// Security: Define allowed base directory
$base_dir = realpath(__DIR__ . "/../../");
$assets_dir = $base_dir . "/assets/gallery/";
$data_dir = __DIR__ . "/../data/";

// Ensure directories exist
if (!file_exists($assets_dir)) {
    mkdir($assets_dir, 0755, true);
}
if (!file_exists($data_dir)) {
    mkdir($data_dir, 0755, true);
}

if (!isset($_FILES["file"])) {
    http_response_code(400);
    echo json_encode(["error" => "No file uploaded"]);
    exit;
}

$file = $_FILES["file"];

// Validate upload errors
if ($file["error"] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "Upload error: " . $file["error"]]);
    exit;
}

// Validate size (< 5MB)
if ($file["size"] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["error" => "File is too large (max 5MB)."]);
    exit;
}

// Validate file type (image only)
$imageFileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
$allowed_formats = ["jpg", "jpeg", "png", "webp", "gif"];
if (!in_array($imageFileType, $allowed_formats)) {
    http_response_code(400);
    echo json_encode(["error" => "Only JPG, JPEG, PNG, WebP & GIF files are allowed."]);
    exit;
}

// Verify it's actually an image
$check = @getimagesize($file["tmp_name"]);
if ($check === false) {
    http_response_code(400);
    echo json_encode(["error" => "File is not an image."]);
    exit;
}

// Generate unique filename
$filename = uniqid('img_', true) . '.' . $imageFileType;
$target_path = $assets_dir . $filename;
$relative_url = "/assets/gallery/" . $filename;

// Save file
if (!move_uploaded_file($file["tmp_name"], $target_path)) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to save uploaded file."]);
    exit;
}

// Optional: Append metadata to gallery.json if type is gallery
// This handles the "Append metadata to admin/data/gallery.json" requirement
// when called with metadata
$type = $_POST['type'] ?? null;
if ($type === 'gallery') {
    $dataFile = $data_dir . 'gallery.json';
    $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    if (!is_array($data)) $data = [];
    
    $newItem = [
        "id" => uniqid('gal_', true),
        "image_url" => $relative_url,
        "category" => $_POST['category'] ?? 'general',
        "description" => $_POST['description'] ?? '',
        "order_index" => count($data),
        "created_at" => date('c')
    ];
    
    $data[] = $newItem;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    
    echo json_encode([
        "url" => $relative_url, 
        "success" => true,
        "item" => $newItem
    ]);
} else {
    echo json_encode(["url" => $relative_url, "success" => true]);
}