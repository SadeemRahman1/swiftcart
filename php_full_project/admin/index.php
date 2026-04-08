<?php 
include '../config.php'; 

// Handle Delete
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header("Location: index.php");
    exit;
}

// Handle Add
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $stmt = $db->prepare("INSERT INTO products (title, category, price, old_price, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['title'],
        $_POST['category'],
        $_POST['price'],
        $_POST['old_price'],
        $_POST['image']
    ]);
    header("Location: index.php");
    exit;
}

$stmt = $db->query("SELECT * FROM products ORDER BY created_at DESC");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwiftCart Admin - Professional Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --pink: #ff6b81; --dark: #1e1e2d; }
        body { font-family: 'Inter', sans-serif; background: #f4f7f6; }
        .sidebar { background: var(--dark); min-height: 100vh; color: white; padding: 30px 20px; }
        .sidebar h2 { font-weight: 800; letter-spacing: -1px; margin-bottom: 40px; }
        .nav-link { color: #a1a1aa !important; font-weight: 600; padding: 12px 0; border-bottom: 1px solid #2d2d3f; }
        .nav-link:hover { color: white !important; }
        .card { border: none; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
        .btn-pink { background: var(--pink); color: white; border: none; font-weight: 700; }
    </style>
</head>
<body>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 sidebar">
                <h2>SwiftCart</h2>
                <nav class="nav flex-column">
                    <a class="nav-link" href="#"><i class="fa fa-dashboard me-2"></i> Dashboard</a>
                    <a class="nav-link" href="#"><i class="fa fa-shopping-bag me-2"></i> Products</a>
                    <a class="nav-link" href="#"><i class="fa fa-users me-2"></i> Customers</a>
                    <a class="nav-link" href="#"><i class="fa fa-chart-line me-2"></i> Analytics</a>
                    <a class="nav-link" href="../index.php"><i class="fa fa-eye me-2"></i> View Shop</a>
                </nav>
            </div>

            <!-- Main Content -->
            <div class="col-md-10 p-5">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <h1 class="fw-black">Product Management</h1>
                    <button class="btn btn-pink px-4 py-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#addModal">
                        <i class="fa fa-plus me-2"></i> ADD NEW PRODUCT
                    </button>
                </div>

                <div class="card p-4">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th class="p-3">Image</th>
                                <th class="p-3">Product Title</th>
                                <th class="p-3">Category</th>
                                <th class="p-3 text-center">Price</th>
                                <th class="p-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($products as $p): ?>
                            <tr>
                                <td class="p-3"><img src="<?php echo $p['image']; ?>" width="50" height="60" class="rounded object-fit-cover shadow-sm"></td>
                                <td class="p-3">
                                    <h6 class="mb-0 fw-bold"><?php echo $p['title']; ?></h6>
                                    <small class="text-muted">ID: #<?php echo $p['id']; ?></small>
                                </td>
                                <td class="p-3"><span class="badge bg-light text-dark border"><?php echo strtoupper($p['category']); ?></span></td>
                                <td class="p-3 text-center fw-bold text-pink">$<?php echo $p['price']; ?></td>
                                <td class="p-3 text-end">
                                    <a href="index.php?delete=<?php echo $p['id']; ?>" class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="return confirm('Are you sure?')">
                                        <i class="fa fa-trash me-1"></i> Delete
                                    </a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 rounded-4 p-4">
                <h5 class="fw-bold mb-4">Add New Product</h5>
                <form method="POST">
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Title</label>
                        <input type="text" name="title" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Category</label>
                        <select name="category" class="form-select">
                            <option value="mens">Mens</option>
                            <option value="womens">Womens</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="perfume">Perfume</option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label small fw-bold">Price</label>
                            <input type="number" step="0.01" name="price" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label small fw-bold">Old Price</label>
                            <input type="number" step="0.01" name="old_price" class="form-control">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small fw-bold">Image URL</label>
                        <input type="text" name="image" class="form-control" value="https://picsum.photos/seed/new/600/800">
                    </div>
                    <button type="submit" class="btn btn-pink w-100 py-3 mt-3 rounded-pill">SAVE PRODUCT</button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
