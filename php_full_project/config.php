<?php
// config.php
session_start();

// --- DATABASE CONFIGURATION ---
$db_host = 'localhost';
$db_name = 'swiftcart_db';
$db_user = 'root';
$db_pass = '';

try {
    $db = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB Connection Error: " . $e->getMessage());
}

// Cart Functions
if (isset($_GET['add_to_cart'])) {
    $id = $_GET['add_to_cart'];
    if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    header("Location: " . $_SERVER['HTTP_REFERER']);
    exit;
}

if (isset($_GET['remove_from_cart'])) {
    $id = $_GET['remove_from_cart'];
    unset($_SESSION['cart'][$id]);
    header("Location: cart.php");
    exit;
}

$cart_count = isset($_SESSION['cart']) ? array_sum($_SESSION['cart']) : 0;
?>
