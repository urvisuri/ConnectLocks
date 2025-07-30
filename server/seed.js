const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    return Product.deleteMany(); // Clean the DB before seeding
  })
  .then(() => {
    return Product.insertMany([
      {
        name: 'Smart Lock Pro',
        price: 1999,
        description: 'High-security smart lock for homes and offices.',
        category: 'Smart Locks',
        image: 'http://localhost:5000/images/connectlocks_pg36_img1.jpeg'
      },
      {
        name: 'Fingerprint Padlock',
        price: 799,
        description: 'Secure fingerprint-based padlock for daily use.',
        category: 'Padlocks',
        image: 'http://localhost:5000/images/connectlocks_pg38_img1.jpeg'
      },
      {
        name: 'Digital Lock Classic',
        price: 1399,
        description: 'Durable digital lock with pin entry.',
        category: 'Digital Locks',
        image: 'http://localhost:5000/images/connectlocks_pg40_img3.jpeg'
      },
      {
        name: 'Glass Door Lock',
        price: 1099,
        description: 'Glass-mounted locking system for office doors.',
        category: 'Glass Locks',
        image: 'http://localhost:5000/images/connectlocks_pg37_img1.jpeg'
      },
      {
        name: 'Cabinet Lock',
        price: 399,
        description: 'Perfect lock for office drawers and cabinets.',
        category: 'Cabinet Locks',
        image: 'http://localhost:5000/images/connectlocks_pg35_img1.jpeg'
      },
      {
        name: 'Digital Door Lock Premium',
        price: 1799,
        description: 'Advanced digital door locking system with touch panel.',
        category: 'Door Locks',
        image: 'http://localhost:5000/images/connectlocks_pg39_img2.png'
      }
    ]);
  })
  .then(() => {
    console.log('🌱 Seeded products with categories!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
