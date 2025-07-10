<?php
header('Content-Type: application/json');

// Database credentials
$host = "localhost";
$dbname = "healandmir";
$username = "root";
$password = "";

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Simple router
$action = $_GET['action'] ?? '';

if ($action === 'query' && isset($_POST['sql'])) {
    $sql = $_POST['sql'];
    // Only allow SELECT queries for security
    if (stripos(trim($sql), 'select') === 0) {
        $result = $conn->query($sql);
        if ($result) {
            $rows = [];
            while ($row = $result->fetch_assoc()) $rows[] = $row;
            echo json_encode($rows);
        } else {
            http_response_code(400);
            echo json_encode(["error" => $conn->error]);
        }
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Only SELECT queries are allowed"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}

$conn->close();
?>
