const mongoose = require('mongoose');

const incomeScheme = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Income Amount is required!'],
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
    ref: 'IncomeType',
    required: [true, 'Income Type is required!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response
incomeScheme.methods.toJSON = () => {
  const income = this;
  const incomeObject = income.toObject();

  incomeObject.id = incomeObject._id;

  delete incomeObject._id;
  delete incomeObject.__v;
  delete incomeObject.owner;

  return incomeObject;
};

const Income = mongoose.model('Income', incomeScheme);

module.exports = Income;
