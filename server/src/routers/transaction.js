const express = require('express');
const TransactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Income
router.post('/api/transaction', authMiddleware, TransactionController.create);

// Read Incomes
router.get('/api/transaction', authMiddleware, TransactionController.readAll);

// Edit Income
router.patch('/api/transaction/:id', authMiddleware, TransactionController.update);

// Delete income
router.delete('/api/transaction/:id', authMiddleware, TransactionController.delete);

module.exports = router;
