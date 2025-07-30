const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');

    return Product.insertMany([
      {
        name: 'Smart Lock Pro',
        price: 1999,
        description: 'High-security smart lock for homes and offices.',
        image: 'http://localhost:5000/images/connectlocks_pg36_img1.jpeg'
      },
      {
        name: 'Fingerprint Padlock',
        price: 799,
        description: 'Secure fingerprint-based padlock for daily use.',
        image: 'http://localhost:5000/images/connectlocks_pg38_img1.jpeg'
      },
      {
        name: 'Digital Lock Classic',
        price: 1399,
        description: 'Durable digital lock with pin entry.',
        image: 'http://localhost:5000/images/connectlocks_pg40_img3.jpeg'
      }
    ]);
  })
  .then(() => {
    console.log('Sample products added!');
    process.exit();
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
