const express = require('express');
const OverviewController = require('../controllers/overviewController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Read Investments Goals
router.get('/api/overview', authMiddleware, OverviewController.read);

module.exports = router;
