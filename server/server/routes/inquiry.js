// server/routes/inquiry.js
const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries } = require('../controllers/inquiry');

router.post('/', createInquiry);
router.get('/', getAllInquiries);

module.exports = router;
