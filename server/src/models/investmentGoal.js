const mongoose = require('mongoose');

const investmentGoalScheme = mongoose.Schema({
  goal: {
    type: Number,
    required: [true, 'Investment Goal is required!'],
  },
  return: {
    type: Number,
  },
  year: {
    type: Number,
    required: [true, 'Investment Goal Year is required!'],
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

function investmentGoalSchemaToJSONHandler() {
  const investmentGoal = this;
  const investmentGoalObject = investmentGoal.toObject();

  investmentGoalObject.id = investmentGoalObject._id;

  delete investmentGoalObject._id;
  delete investmentGoalObject.__v;
  delete investmentGoalObject.owner;

  return investmentGoalObject;
}

investmentGoalScheme.methods.toJSON = investmentGoalSchemaToJSONHandler;

const InvestmentGoal = mongoose.model('InvestmentGoal', investmentGoalScheme, 'investmentGoals');

module.exports = InvestmentGoal;
