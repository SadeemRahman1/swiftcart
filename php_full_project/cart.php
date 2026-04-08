<?php include 'header.php'; 
$cart_items = $_SESSION['cart'] ?? [];
$total = 0;
?>

<div class="container py-5">
    <h2 class="fw-black text-uppercase mb-5">Your Shopping Cart</h2>
    <div class="row">
        <div class="col-md-8">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                <table class="table table-hover mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th class="p-4">Product</th>
                            <th class="p-4">Price</th>
                            <th class="p-4">Qty</th>
                            <th class="p-4">Subtotal</th>
                            <th class="p-4 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if(empty($cart_items)): ?>
                        <tr><td colspan="5" class="p-5 text-center text-muted">Your cart is empty.</td></tr>
                        <?php else: ?>
                        <?php foreach($cart_items as $id => $qty): 
                            $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
                            $stmt->execute([$id]);
                            $p = $stmt->fetch(PDO::FETCH_ASSOC);
                            if(!$p) continue;
                            $subtotal = $p['price'] * $qty;
                            $total += $subtotal;
                        ?>
                        <tr>
                            <td class="p-4">
                                <div class="d-flex align-items-center gap-3">
                                    <img src="<?php echo $p['image']; ?>" width="50" height="60" class="rounded object-fit-cover">
                                    <h6 class="mb-0 fw-bold"><?php echo $p['title']; ?></h6>
                                </div>
                            </td>
                            <td class="p-4">$<?php echo $p['price']; ?></td>
                            <td class="p-4"><?php echo $qty; ?></td>
                            <td class="p-4 fw-bold">$<?php echo $subtotal; ?></td>
                            <td class="p-4 text-end">
                                <a href="cart.php?remove_from_cart=<?php echo $id; ?>" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm p-4 rounded-4">
                <h5 class="fw-bold mb-4">Order Summary</h5>
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span class="fw-bold">$<?php echo $total; ?></span>
                </div>
                <div class="d-flex justify-content-between mb-4">
                    <span>Shipping</span>
                    <span class="text-success fw-bold">FREE</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-4">
                    <span class="fs-5 fw-bold">Total</span>
                    <span class="fs-5 fw-bold text-pink">$<?php echo $total; ?></span>
                </div>
                <a href="checkout.php" class="btn btn-pink bg-pink w-100 py-3 fw-bold rounded-pill">CHECKOUT</a>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
