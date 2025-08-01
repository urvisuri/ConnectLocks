// routes/imageRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:category', (req, res) => {
  const category = req.params.category;
  const dirPath = path.join(__dirname, '../client/public/assets', category);

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }

    const imageUrls = files
      .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
      .map(file => `/assets/${category}/${file}`);

    res.json(imageUrls);
  });
});

module.exports = router;
