// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());  // ✅ IP middleware

const path = require('path');

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Mongo error:', err));

// Schema & Model
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  ip: String,
  state: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

// Helper: Parse State & City from LocalStorage Header
function parseLocationHeader(headerValue) {
  try {
    const [state, city] = headerValue.split('|');
    return { state, city };
  } catch {
    return { state: '', city: '' };
  }
}

// POST /api/inquiry
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const ip = req.clientIp;

    // Get location from custom header
    const locationHeader = req.headers['x-user-location'] || '';
    const { state, city } = parseLocationHeader(locationHeader);

    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      ip,
      state,
      city
    });

    await newInquiry.save();
    res.status(200).json({ message: 'Inquiry saved successfully' });
  } catch (err) {
    console.error('POST /api/inquiry failed:', err);
    res.status(500).json({ error: 'Failed to save inquiry' });
  }
});

// GET all inquiries for admin
app.get('/api/inquiries', async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
