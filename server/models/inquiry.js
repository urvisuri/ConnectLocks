// server/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  ip: String,
  state: String,
  city: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inquiry', inquirySchema);
