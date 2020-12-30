const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a new user
router.post('/api/users', UserController.create);

// View logged in user profile
router.get('/api/users/me', authMiddleware, UserController.read);

// Update user profile
router.patch('/api/users/me', authMiddleware, UserController.update);

// Delete user profile
router.delete('/api/users/me', authMiddleware, UserController.delete);

// Login a registered user
router.post('/api/users/login', UserController.login);

// Logout current user device
router.post('/api/users/logout', authMiddleware, UserController.logout);

// Logout all user devices
router.post('/api/users/logoutall', authMiddleware, UserController.logoutAll);

module.exports = router;
