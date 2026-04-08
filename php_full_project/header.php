<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwiftCart - Professional E-commerce</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --pink: #ff6b81; --dark: #1e1e2d; --light: #f4f7f6; }
        body { font-family: 'Inter', sans-serif; background-color: var(--light); color: #333; }
        
        /* Amazon Style Header */
        .top-header { background: #fff; border-bottom: 1px solid #eee; padding: 15px 0; }
        .search-box { border-radius: 8px; border: 1px solid #ddd; overflow: hidden; }
        .search-box input { border: none; padding: 10px 15px; width: 100%; outline: none; }
        .search-box button { background: var(--pink); color: white; border: none; padding: 10px 20px; }
        
        .nav-icons a { color: #333; text-decoration: none; position: relative; font-size: 1.2rem; }
        .badge-count { position: absolute; top: -8px; right: -10px; background: var(--pink); color: white; font-size: 10px; padding: 3px 6px; border-radius: 50%; }
        
        .main-nav { background: #fff; border-bottom: 1px solid #eee; }
        .nav-link { font-weight: 600; font-size: 0.9rem; color: #444 !important; text-transform: uppercase; padding: 12px 15px !important; }
        .nav-link:hover { color: var(--pink) !important; }

        /* Amazon Style Sidebar */
        .sidebar-card { background: #fff; border-radius: 12px; border: none; padding: 20px; margin-bottom: 20px; }
        .sidebar-title { font-weight: 800; font-size: 1rem; text-transform: uppercase; margin-bottom: 15px; border-bottom: 2px solid var(--pink); display: inline-block; }
        .cat-list { list-style: none; padding: 0; }
        .cat-list li a { display: block; padding: 8px 0; color: #555; text-decoration: none; font-size: 0.95rem; transition: 0.2s; }
        .cat-list li a:hover { color: var(--pink); padding-left: 5px; }

        /* Product Cards */
        .product-card { background: #fff; border-radius: 12px; border: none; transition: 0.3s; height: 100%; overflow: hidden; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.08); }
        .product-img-wrapper { position: relative; aspect-ratio: 1/1; overflow: hidden; }
        .product-img { width: 100%; height: 100%; object-fit: cover; }
        .product-badge { position: absolute; top: 10px; left: 10px; background: var(--pink); color: white; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 5px; }
        
        .btn-add-cart { background: var(--pink); color: white; border: none; width: 100%; padding: 10px; border-radius: 8px; font-weight: 700; transition: 0.3s; }
        .btn-add-cart:hover { background: #e05a6d; }
    </style>
</head>
<body>

    <!-- Top Header -->
    <div class="top-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <a href="index.php" class="text-decoration-none"><h2 class="fw-black mb-0 text-dark" style="letter-spacing: -2px;">SwiftCart</h2></a>
                </div>
                <div class="col-md-7">
                    <form action="index.php" method="GET" class="search-box d-flex">
                        <input type="text" name="search" placeholder="Search for products, brands and more..." value="<?php echo $_GET['search'] ?? ''; ?>">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="col-md-3">
                    <div class="nav-icons d-flex justify-content-end gap-4 align-items-center">
                        <a href="admin/index.php" class="small fw-bold text-muted">SELL ON SWIFTCART</a>
                        <a href="#"><i class="fa-regular fa-user"></i></a>
                        <a href="cart.php">
                            <i class="fa-solid fa-bag-shopping"></i>
                            <span class="badge-count"><?php echo $cart_count; ?></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Nav -->
    <nav class="navbar navbar-expand-lg main-nav mb-4">
        <div class="container justify-content-center">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="index.php">All Categories</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?cat=mens">Mens</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?cat=womens">Womens</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?cat=jewelry">Jewelry</a></li>
                <li class="nav-item"><a class="nav-link" href="index.php?cat=perfume">Perfume</a></li>
                <li class="nav-item"><a class="nav-link text-danger" href="#">Hot Offers</a></li>
            </ul>
        </div>
    </nav>
