const express = require('express');
const InvestmentController = require('../controllers/investmentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Investment
router.post('/api/investment', authMiddleware, InvestmentController.create);

// Read Investments
router.get('/api/investment', authMiddleware, InvestmentController.readAll);

// Edit Investment
router.patch('/api/investment/:id', authMiddleware, InvestmentController.update);

// Delete Investment
router.delete('/api/investment/:id', authMiddleware, InvestmentController.delete);

module.exports = router;
