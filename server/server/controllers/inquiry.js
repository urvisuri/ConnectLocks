// server/controllers/inquiry.js
const Inquiry = require('./models/Inquiry');

const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, state, city, ip } = req.body;

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      state,
      city,
      ip,
      date: new Date(),
    });

    await inquiry.save();
    res.status(201).json({ message: 'Inquiry saved successfully' });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ error: 'Failed to save inquiry' });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};

module.exports = { createInquiry, getAllInquiries };
