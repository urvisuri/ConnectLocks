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
app.use(requestIp.mw());  // Middleware to get client IP

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Inquiry Schema & Model
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

// Helper function to parse location string
function parseLocationHeader(headerValue) {
  try {
    const [state, city] = headerValue.split('|');
    return {
      state: state?.trim() || '',
      city: city?.trim() || ''
    };
  } catch {
    return { state: '', city: '' };
  }
}

// POST Route: Submit Inquiry
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const ip = req.clientIp;

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
    res.status(200).json({ message: '✅ Inquiry saved successfully' });
  } catch (err) {
    console.error('❌ Failed to save inquiry:', err);
    res.status(500).json({ error: 'Server error while saving inquiry' });
  }
});

// GET Route: Admin fetch all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error('❌ Error fetching inquiries:', err);
    res.status(500).json({ error: 'Server error while fetching inquiries' });
  }
});
const path = require('path');

// Serve React build
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
