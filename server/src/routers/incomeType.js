const express = require('express');
const IncomeTypeController = require('../controllers/incomeTypeController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Income Type
router.post('/api/incomeType', authMiddleware, IncomeTypeController.create);

// Read Income types
router.get('/api/incomeType', authMiddleware, IncomeTypeController.readAll);

// Edit Income Type
router.patch('/api/incomeType/:id', authMiddleware, IncomeTypeController.update);

// Delete Income Type
router.delete('/api/incomeType/:id', authMiddleware, IncomeTypeController.delete);

module.exports = router;
