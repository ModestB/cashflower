const express = require('express');
const InvestmentTypeController = require('../controllers/investmentTypeController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Investment Type
router.post('/api/investmentType', authMiddleware, InvestmentTypeController.create);

// Read Investment types
router.get('/api/investmentType', authMiddleware, InvestmentTypeController.readAll);

// Edit Investment Type
router.patch('/api/investmentType/:id', authMiddleware, InvestmentTypeController.update);

// Delete Investment Type
router.delete('/api/investmentType/:id', authMiddleware, InvestmentTypeController.delete);

module.exports = router;
