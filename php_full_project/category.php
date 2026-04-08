<?php include 'header.php'; 
$cat = $_GET['cat'] ?? 'all';
$stmt = $db->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
$stmt->execute([$cat]);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="container mb-5 py-5">
    <h3 class="fw-black text-uppercase mb-4"><?php echo ucfirst($cat); ?> Collection</h3>
    <div class="row g-4">
        <?php if(empty($products)): ?>
            <div class="col-12 text-center py-5">
                <p class="text-muted">No products found in this category.</p>
            </div>
        <?php else: ?>
            <?php foreach ($products as $p): ?>
            <div class="col-md-3">
                <div class="card product-card">
                    <img src="<?php echo $p['image']; ?>" class="product-img" alt="">
                    <div class="card-body">
                        <p class="text-pink small fw-bold text-uppercase mb-1"><?php echo $p['category']; ?></p>
                        <h6 class="fw-bold text-truncate"><?php echo $p['title']; ?></h6>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <span class="fw-bold">$<?php echo $p['price']; ?></span>
                            </div>
                            <a href="category.php?cat=<?php echo $cat; ?>&add_to_cart=<?php echo $p['id']; ?>" class="btn btn-pink btn-sm bg-pink"><i class="fa fa-plus"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>

<?php include 'footer.php'; ?>
