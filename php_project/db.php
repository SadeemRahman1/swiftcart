<?php
// db.php - Database Connection
try {
    $db = new PDO('sqlite:database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if not exists
    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        title TEXT,
        category TEXT,
        type TEXT,
        price REAL,
        oldPrice REAL,
        rating INTEGER,
        image TEXT,
        hoverImage TEXT,
        gallery TEXT,
        badge TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Seed data if empty
    $count = $db->query("SELECT COUNT(*) FROM products")->fetchColumn();
    if ($count == 0) {
        $categories = ["mens", "womens", "jewelry", "perfume"];
        $stmt = $db->prepare("INSERT INTO products (id, title, category, type, price, oldPrice, rating, image, hoverImage, gallery, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        for ($i = 1; $i <= 20; $i++) {
            $cat = $categories[array_rand($categories)];
            $price = rand(20, 200);
            $stmt->execute([
                "prod_$i",
                "Product $i ($cat)",
                $cat,
                $cat,
                $price,
                $price + 20,
                rand(3, 5),
                "https://picsum.photos/seed/p$i/600/800",
                "https://picsum.photos/seed/p{$i}h/600/800",
                json_encode(["https://picsum.photos/seed/p$i/600/800"]),
                null
            ]);
        }
    }
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
