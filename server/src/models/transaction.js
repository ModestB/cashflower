const mongoose = require('mongoose');

const transactionScheme = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required!'],
  },
  comment: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required!'],
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: [true, 'Wallet is required!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function transactionsSchemaToJSONHandler() {
  const transaction = this;
  const transactionObject = transaction.toObject();

  transactionObject.id = transactionObject._id;

  delete transactionObject._id;
  delete transactionObject.__v;
  delete transactionObject.owner;

  return transactionObject;
}

transactionScheme.methods.toJSON = transactionsSchemaToJSONHandler;

const Transaction = mongoose.model('Transaction', transactionScheme);

module.exports = Transaction;
