// Required Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const fetch = require('node-fetch'); // for IP info
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  ip: String,
  state: String,
  city: String,
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// 🛠️ ACTUAL INQUIRY ROUTE
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const ip = req.clientIp || req.ip || '';
    const locationHeader = req.headers['x-user-location'] || '';
    const [state, city] = locationHeader.split('|');

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      ip,
      state: state || '',
      city: city || '',
    });

    await newInquiry.save();
    res.status(200).json({ message: 'Inquiry saved' });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ message: 'Error saving inquiry' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
