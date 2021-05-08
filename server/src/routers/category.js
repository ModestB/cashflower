const express = require('express');
const CategoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Income Type
router.post('/api/category', authMiddleware, CategoryController.create);

// Read Income types
router.get('/api/category', authMiddleware, CategoryController.read);

// Edit Income Type
router.patch('/api/category/:id', authMiddleware, CategoryController.update);

// Delete Income Type
router.delete('/api/category/:id', authMiddleware, CategoryController.delete);

module.exports = router;
