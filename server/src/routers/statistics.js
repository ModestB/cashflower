const express = require('express');
const StatisticsController = require('../controllers/statisticsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Read Investments Goals
router.get('/api/statistics', authMiddleware, StatisticsController.read);

module.exports = router;
