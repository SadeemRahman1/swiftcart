<?php include 'header.php'; 

$cat = $_GET['cat'] ?? 'all';
$search = $_GET['search'] ?? '';

$query = "SELECT * FROM products WHERE 1=1";
$params = [];

if ($cat != 'all') {
    $query .= " AND category = ?";
    $params[] = $cat;
}

if (!empty($search)) {
    $query .= " AND title LIKE ?";
    $params[] = "%$search%";
}

$query .= " ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute($params);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="container mb-5">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3">
            <div class="sidebar-card">
                <h5 class="sidebar-title">Categories</h5>
                <ul class="cat-list">
                    <li><a href="index.php?cat=mens"><i class="fa fa-tshirt me-2"></i> Men's Fashion</a></li>
                    <li><a href="index.php?cat=womens"><i class="fa fa-female me-2"></i> Women's Fashion</a></li>
                    <li><a href="index.php?cat=jewelry"><i class="fa fa-gem me-2"></i> Jewelry</a></li>
                    <li><a href="index.php?cat=perfume"><i class="fa fa-spray-can me-2"></i> Perfume</a></li>
                    <li><a href="index.php?cat=watches"><i class="fa fa-clock me-2"></i> Watches</a></li>
                </ul>
            </div>

            <div class="sidebar-card">
                <h5 class="sidebar-title">Best Sellers</h5>
                <div class="d-flex align-items-center gap-3 mb-3">
                    <img src="https://picsum.photos/seed/best1/50/50" class="rounded" width="50">
                    <div>
                        <h6 class="mb-0 small fw-bold">Relaxed T-Shirt</h6>
                        <span class="text-pink fw-bold small">$45.00</span>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-3 mb-3">
                    <img src="https://picsum.photos/seed/best2/50/50" class="rounded" width="50">
                    <div>
                        <h6 class="mb-0 small fw-bold">Floral Dress</h6>
                        <span class="text-pink fw-bold small">$65.00</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
            <?php if(empty($search)): ?>
            <div class="hero-banner mb-5 shadow-sm">
                <div>
                    <p class="text-pink fw-bold text-uppercase mb-2" style="letter-spacing: 2px;">Trending item</p>
                    <h2 class="display-4 fw-black mb-4" style="line-height: 1;">WOMEN'S LATEST<br>FASHION SALE</h2>
                    <p class="fs-4 mb-4">starting at $ <span class="fw-bold fs-2">20</span>.00</p>
                    <a href="#shop" class="btn btn-pink bg-pink px-5 py-3 fw-bold rounded-pill">SHOP NOW</a>
                </div>
            </div>
            <?php endif; ?>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-black text-uppercase mb-0">
                    <?php 
                    if(!empty($search)) echo "Search Results for: '$search'";
                    else echo ucfirst($cat) . " Products"; 
                    ?>
                </h4>
                <span class="text-muted small"><?php echo count($products); ?> Products found</span>
            </div>

            <div class="row g-4" id="shop">
                <?php if(empty($products)): ?>
                    <div class="col-12 text-center py-5">
                        <i class="fa fa-search fs-1 text-muted mb-3"></i>
                        <p class="text-muted">No products found matching your criteria.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($products as $p): ?>
                    <div class="col-md-4">
                        <div class="card product-card">
                            <div class="product-img-wrapper">
                                <img src="<?php echo $p['image']; ?>" class="product-img" alt="">
                                <?php if($p['old_price']): ?>
                                    <span class="product-badge">SALE</span>
                                <?php endif; ?>
                            </div>
                            <div class="card-body p-4">
                                <p class="text-pink small fw-bold text-uppercase mb-1" style="font-size: 10px;"><?php echo $p['category']; ?></p>
                                <h6 class="fw-bold text-truncate mb-2"><?php echo $p['title']; ?></h6>
                                <div class="text-warning mb-3" style="font-size: 12px;">
                                    <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa-regular fa-star"></i>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="fs-5 fw-bold">$<?php echo $p['price']; ?></div>
                                    <?php if($p['old_price']): ?>
                                        <del class="text-muted small">$<?php echo $p['old_price']; ?></del>
                                    <?php endif; ?>
                                </div>
                                <a href="index.php?add_to_cart=<?php echo $p['id']; ?>" class="btn btn-add-cart">ADD TO CART</a>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
