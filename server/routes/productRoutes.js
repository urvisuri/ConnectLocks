const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get product by ID (for /product/:id)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get products by category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No products found for this category' });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
