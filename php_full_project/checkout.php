<?php include 'header.php'; 
$total = 0;
if(isset($_SESSION['cart'])) {
    foreach($_SESSION['cart'] as $id => $qty) {
        $stmt = $db->prepare("SELECT price FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $p = $stmt->fetch(PDO::FETCH_ASSOC);
        if($p) $total += $p['price'] * $qty;
    }
}
?>

<div class="container py-5">
    <h2 class="fw-black text-uppercase mb-5">Checkout</h2>
    <div class="row">
        <div class="col-md-7">
            <div class="card border-0 shadow-sm p-4 rounded-4">
                <h5 class="fw-bold mb-4">Shipping Details</h5>
                <form action="index.php" method="GET">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">First Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Last Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label small fw-bold">Email Address</label>
                            <input type="email" class="form-control" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label small fw-bold">Street Address</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">City</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold">Zip Code</label>
                            <input type="text" class="form-control" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-pink bg-pink w-100 py-3 mt-4 fw-bold rounded-pill" onclick="alert('Order Placed Successfully!')">PLACE ORDER</button>
                </form>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card border-0 shadow-sm p-4 rounded-4">
                <h5 class="fw-bold mb-4">Your Order</h5>
                <div class="d-flex justify-content-between mb-4">
                    <span class="fs-4 fw-bold">Total Amount</span>
                    <span class="fs-4 fw-bold text-pink">$<?php echo $total; ?></span>
                </div>
                <p class="text-muted small">By placing your order, you agree to SwiftCart's Terms of Use and Privacy Policy.</p>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
