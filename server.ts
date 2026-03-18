import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import knex from "knex";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data.sqlite",
  },
  useNullAsDefault: true,
});

async function initDb() {
  const hasTable = await db.schema.hasTable("products");
  if (!hasTable) {
    await db.schema.createTable("products", (table) => {
      table.string("id").primary();
      table.string("title");
      table.string("category");
      table.string("type");
      table.float("price");
      table.float("oldPrice");
      table.integer("rating");
      table.string("image");
      table.string("hoverImage");
      table.text("gallery"); // Store as JSON string
      table.text("badge"); // Store as JSON string
      table.timestamp("createdAt").defaultTo(db.fn.now());
    });

    console.log("Seeding 120 products into SQLite...");
    const categories = ["mens", "womens", "jewelry", "perfume"];
    const titles = {
      mens: ["Classic Cotton Shirt", "Slim Fit Jeans", "Leather Jacket", "Casual Sneakers", "Wool Sweater", "Polo T-Shirt", "Chino Pants", "Winter Coat"],
      womens: ["Floral Maxi Dress", "Silk Blouse", "Skinny Jeans", "Evening Gown", "Knitted Cardigan", "Denim Jacket", "Summer Skirt", "Party Heels"],
      jewelry: ["Gold Necklace", "Silver Earrings", "Diamond Ring", "Pearl Bracelet", "Sapphire Pendant", "Crystal Brooch", "Platinum Band"],
      perfume: ["Midnight Rose", "Ocean Breeze", "Golden Oud", "Velvet Musk", "Citrus Splash", "Floral Dream", "Spiced Amber"],
    };

    const products = [];
    for (let i = 1; i <= 120; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const categoryTitles = titles[category as keyof typeof titles];
      const baseTitle = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
      const price = Math.floor(Math.random() * 200) + 20;
      const oldPrice = price + Math.floor(Math.random() * 50) + 10;

      products.push({
        id: `prod_${i}`,
        title: `${baseTitle} ${i}`,
        category: category,
        type: category,
        price: price,
        oldPrice: oldPrice,
        rating: Math.floor(Math.random() * 3) + 3,
        image: `https://picsum.photos/seed/prod${i}/600/800`,
        hoverImage: `https://picsum.photos/seed/prod${i}h/600/800`,
        gallery: JSON.stringify([
          `https://picsum.photos/seed/prod${i}/600/800`,
          `https://picsum.photos/seed/prod${i}-1/600/800`,
          `https://picsum.photos/seed/prod${i}-2/600/800`,
        ]),
        badge: i % 5 === 0 ? JSON.stringify({ text: "SALE", color: "bg-black" }) : i % 7 === 0 ? JSON.stringify({ text: "NEW", color: "bg-pink-400" }) : null,
      });
    }

    await db("products").insert(products);
    console.log("SQLite seeding complete!");
  }
}

async function startServer() {
  console.log("Starting server initialization...");
  try {
    await initDb();
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/products", async (req, res) => {
    try {
      const { type, limit = 120 } = req.query;
      let query = db("products").orderBy("createdAt", "desc").limit(Number(limit));
      
      if (type && type !== "all") {
        query = query.where("type", type);
      }

      const products = await query;
      
      // Parse JSON strings back to objects
      const parsedProducts = products.map(p => ({
        ...p,
        gallery: p.gallery ? JSON.parse(p.gallery) : [],
        badge: p.badge ? JSON.parse(p.badge) : null
      }));

      res.json(parsedProducts);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = req.body;
      const id = `prod_${Date.now()}`;
      const newProduct = {
        ...product,
        id,
        gallery: JSON.stringify(product.gallery || []),
        badge: JSON.stringify(product.badge || null),
        createdAt: new Date().toISOString()
      };
      await db("products").insert(newProduct);
      res.status(201).json({ ...newProduct, gallery: product.gallery, badge: product.badge });
    } catch (error) {
      console.error("Create Product Error:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = req.body;
      const updateData = {
        ...product,
        gallery: JSON.stringify(product.gallery || []),
        badge: JSON.stringify(product.badge || null)
      };
      delete updateData.id;
      delete updateData.createdAt;

      await db("products").where({ id }).update(updateData);
      res.json({ id, ...product });
    } catch (error) {
      console.error("Update Product Error:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db("products").where({ id }).delete();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete Product Error:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware...");
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
        root: process.cwd(),
      });
      app.use(vite.middlewares);
      console.log("Vite middleware attached.");
    } catch (error) {
      console.error("Failed to create Vite server:", error);
      process.exit(1);
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("SERVER_BOOT_SUCCESS");
  });
}

startServer();
