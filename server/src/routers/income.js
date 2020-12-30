const express = require('express');
const IncomeController = require('../controllers/incomeController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Income
router.post('/api/income', authMiddleware, IncomeController.create);

// Read Incomes
router.get('/api/income', authMiddleware, IncomeController.readAll);

// Edit Income
router.patch('/api/income/:id', authMiddleware, IncomeController.update);

// Delete income
router.delete('/api/income/:id', authMiddleware, IncomeController.delete);

module.exports = router;
