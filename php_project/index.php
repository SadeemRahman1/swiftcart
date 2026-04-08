<?php
include 'db.php';
$category = isset($_GET['category']) ? $_GET['category'] : 'all';

if ($category == 'all') {
    $stmt = $db->query("SELECT * FROM products ORDER BY createdAt DESC");
} else {
    $stmt = $db->prepare("SELECT * FROM products WHERE category = ? ORDER BY createdAt DESC");
    $stmt->execute([$category]);
}
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwiftCart - PHP Store</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --pink: #ff6b81; --zinc: #18181b; }
        body { font-family: 'Inter', sans-serif; background: #f8f9fa; }
        .text-pink { color: var(--pink); }
        .bg-pink { background-color: var(--pink); color: white; }
        .product-card { border: none; border-radius: 15px; transition: 0.3s; background: white; overflow: hidden; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .product-img { aspect-ratio: 3/4; object-fit: cover; width: 100%; }
        .nav-link { font-weight: 700; text-transform: uppercase; font-size: 0.8rem; color: var(--zinc) !important; }
        .nav-link:hover { color: var(--pink) !important; }
    </style>
</head>
<body>

    <header class="bg-white border-bottom py-4">
        <div class="container d-flex justify-content-between align-items-center">
            <h1 class="fw-black mb-0" style="letter-spacing: -2px;">SwiftCart</h1>
            <div class="d-flex gap-4">
                <a href="admin.php" class="btn btn-outline-dark btn-sm">Admin Panel</a>
                <i class="fa fa-shopping-bag fs-4"></i>
            </div>
        </div>
    </header>

    <nav class="navbar navbar-expand-lg bg-white border-bottom mb-5">
        <div class="container justify-content-center">
            <ul class="navbar-nav gap-4">
                <li class="nav-item"><a class="nav-link" href="index.php?category=all">All</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?category=mens">Mens</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?category=womens">Womens</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?category=jewelry">Jewelry</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?category=perfume">Perfume</a></li>
            </ul>
        </div>
    </nav>

    <div class="container mb-5">
        <h2 class="fw-black text-uppercase mb-4"><?php echo ucfirst($category); ?> Products</h2>
        <div class="row g-4">
            <?php foreach ($products as $p): ?>
            <div class="col-md-3">
                <div class="card product-card">
                    <img src="<?php echo $p['image']; ?>" class="product-img" alt="">
                    <div class="card-body">
                        <p class="text-pink small fw-bold text-uppercase mb-1"><?php echo $p['category']; ?></p>
                        <h6 class="fw-bold text-truncate"><?php echo $p['title']; ?></h6>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold">$<?php echo $p['price']; ?></span>
                            <button class="btn btn-pink btn-sm bg-pink">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

</body>
</html>
