<?php
include 'db.php';

// Handle Delete
if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header("Location: admin.php");
}

// Handle Add
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = 'prod_' . time();
    $stmt = $db->prepare("INSERT INTO products (id, title, category, type, price, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $id,
        $_POST['title'],
        $_POST['category'],
        $_POST['category'],
        $_POST['price'],
        $_POST['image']
    ]);
    header("Location: admin.php");
}

$stmt = $db->query("SELECT * FROM products ORDER BY createdAt DESC");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SwiftCart Admin - PHP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-light">

    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-5">
            <h1 class="fw-black">Admin Dashboard</h1>
            <a href="index.php" class="btn btn-dark">View Shop</a>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="card border-0 shadow-sm p-4 rounded-4">
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
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Price</label>
                            <input type="number" name="price" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold">Image URL</label>
                            <input type="text" name="image" class="form-control" value="https://picsum.photos/seed/new/600/800">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 fw-bold">Save Product</button>
                    </form>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card border-0 shadow-sm overflow-hidden rounded-4">
                    <table class="table table-hover mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="p-3">Img</th>
                                <th class="p-3">Title</th>
                                <th class="p-3">Price</th>
                                <th class="p-3 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($products as $p): ?>
                            <tr>
                                <td class="p-3"><img src="<?php echo $p['image']; ?>" width="40" height="50" class="rounded object-fit-cover"></td>
                                <td class="p-3 fw-bold"><?php echo $p['title']; ?></td>
                                <td class="p-3">$<?php echo $p['price']; ?></td>
                                <td class="p-3 text-end">
                                    <a href="admin.php?delete=<?php echo $p['id']; ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?')">
                                        <i class="fa fa-trash"></i>
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

</body>
</html>
