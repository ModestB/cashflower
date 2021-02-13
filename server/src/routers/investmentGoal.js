const express = require('express');
const InvestmentGoalController = require('../controllers/investmentGoalController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Investment Goal
router.post('/api/investmentGoal', authMiddleware, InvestmentGoalController.create);

// Read Investments Goals
router.get('/api/investmentGoal', authMiddleware, InvestmentGoalController.readAll);

// Edit Investment Goal
router.patch('/api/investmentGoal/:id', authMiddleware, InvestmentGoalController.update);

// Delete InvestmentGoal
router.delete('/api/investmentGoal/:id', authMiddleware, InvestmentGoalController.delete);

module.exports = router;
