const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add a new product
router.post("/add", async (req, res) => {
  try {
    let { name, barcode, price } = req.body;

    if (!name || !barcode || !price) {
      return res
        .status(400)
        .json({ error: "Please provide name, barcode, and price" });
    }

    barcode = barcode.trim(); // Trim whitespace

    const exists = await Product.findOne({ barcode });
    if (exists) {
      return res
        .status(400)
        .json({ error: "Product with this barcode already exists" });
    }

    const product = new Product({ name, barcode, price });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get product by barcode
router.get("/barcode/:code", async (req, res) => {
  try {
    const barcode = req.params.code.trim(); // Trim whitespace
    console.log("Received barcode lookup for:", barcode); // Debug log

    const product = await Product.findOne({ barcode });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
