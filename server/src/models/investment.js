const mongoose = require('mongoose');

const investmentScheme = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Investment Amount is required!'],
  },
  comment: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestmentType',
    required: [true, 'Investment Type is required!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function investmentSchemaToJSONHandler() {
  const investment = this;
  const investmentObject = investment.toObject();

  investmentObject.id = investmentObject._id;

  delete investmentObject._id;
  delete investmentObject.__v;
  delete investmentObject.owner;

  return investmentObject;
}

investmentScheme.methods.toJSON = investmentSchemaToJSONHandler;

const Investment = mongoose.model('Investment', investmentScheme);

module.exports = Investment;
