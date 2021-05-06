const mongoose = require('mongoose');

const walletScheme = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Wallet Name is required!'],
  },
  balance: {
    type: Number,
    required: [true, 'Wallet Balance is required!'],
  },
  type: {
    type: String,
    enum: ['regular', 'goal'],
    default: 'regular',
    required: [true, 'Wallet Type is required!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function walletSchemaToJSONHandler() {
  const wallet = this;
  const walletObject = wallet.toObject();

  walletObject.id = walletObject._id;

  delete walletObject._id;
  delete walletObject.__v;
  delete walletObject.owner;

  return walletObject;
}

walletScheme.methods.toJSON = walletSchemaToJSONHandler;

const Wallet = mongoose.model('Wallet', walletScheme);

module.exports = Wallet;
