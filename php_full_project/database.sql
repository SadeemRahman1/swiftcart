-- SwiftCart Database Script
CREATE DATABASE IF NOT EXISTS swiftcart_db;
USE swiftcart_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    image TEXT,
    rating INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (title, category, price, old_price, image) VALUES 
('Classic Cotton Shirt', 'mens', 45.00, 55.00, 'https://picsum.photos/seed/m1/600/800'),
('Floral Maxi Dress', 'womens', 65.00, 80.00, 'https://picsum.photos/seed/w1/600/800'),
('Gold Necklace', 'jewelry', 120.00, 150.00, 'https://picsum.photos/seed/j1/600/800'),
('Midnight Rose Perfume', 'perfume', 85.00, 100.00, 'https://picsum.photos/seed/p1/600/800'),
('Slim Fit Jeans', 'mens', 50.00, 65.00, 'https://picsum.photos/seed/m2/600/800'),
('Silk Blouse', 'womens', 40.00, 55.00, 'https://picsum.photos/seed/w2/600/800'),
('Diamond Ring', 'jewelry', 250.00, 300.00, 'https://picsum.photos/seed/j2/600/800'),
('Ocean Breeze Perfume', 'perfume', 75.00, 90.00, 'https://picsum.photos/seed/p2/600/800');
