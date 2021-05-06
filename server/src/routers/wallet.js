const express = require('express');
const WalletController = require('../controllers/walletController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Wallet
router.post('/api/wallet', authMiddleware, WalletController.create);

// Read Wallets
router.get('/api/wallet', authMiddleware, WalletController.readAll);

// Edit Wallet
router.patch('/api/wallet/:id', authMiddleware, WalletController.update);

// Delete Wallet
router.delete('/api/wallet/:id', authMiddleware, WalletController.delete);

module.exports = router;
