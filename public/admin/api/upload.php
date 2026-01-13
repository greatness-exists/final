<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$target_dir = __DIR__ . "/../../assets/gallery/";
$data_dir = __DIR__ . "/../data/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0755, true);
}

if (!isset($_FILES["file"])) {
    echo json_encode(["error" => "No file uploaded"]);
    exit;
}

$file = $_FILES["file"];
$imageFileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

// Validate if it's an image
$check = getimagesize($file["tmp_name"]);
if ($check === false) {
    echo json_encode(["error" => "File is not an image."]);
    exit;
}

// Validate size (< 5MB)
if ($file["size"] > 5000000) {
    echo json_encode(["error" => "File is too large (max 5MB)."]);
    exit;
}

// Validate format
$allowed_formats = ["jpg", "jpeg", "png", "webp"];
if (!in_array($imageFileType, $allowed_formats)) {
    echo json_encode(["error" => "Only JPG, JPEG, PNG & WEBP files are allowed."]);
    exit;
}

// Generate unique filename
$filename = uniqid('img_', true) . '.' . $imageFileType;
$target_path = $target_dir . $filename;
$relative_url = "/assets/gallery/" . $filename;

if (move_uploaded_file($file["tmp_name"], $target_path)) {
    // If type is provided (e.g., gallery), append to corresponding JSON
    $type = $_POST['type'] ?? null;
    if ($type === 'gallery') {
        $dataFile = $data_dir . 'gallery.json';
        $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
        
        $newItem = [
            "id" => uniqid(),
            "image_url" => $relative_url,
            "category" => $_POST['category'] ?? 'general',
            "description" => $_POST['description'] ?? '',
            "order_index" => count($data),
            "created_at" => date('c')
        ];
        
        $data[] = $newItem;
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    }
    
    echo json_encode(["url" => $relative_url, "success" => true]);
} else {
    echo json_encode(["error" => "Failed to save uploaded file."]);
}
