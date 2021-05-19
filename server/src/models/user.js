const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Income = require('./income');
const IncomeType = require('./incomeType');
const Investment = require('./investment');
const InvestmentGoal = require('./investmentGoal');
const InvestmentType = require('./investmentType');
const Wallet = require('./wallet');
const Category = require('./category');
const Token = require('./token');
const { jwtSecret } = require('../../config');
const { aggregateDistinctYearsStages } = require('../utils/mongoUtils');
const { transactionParentCategories, transactionChildCategories } = require('../constants/transactionsCategories');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Userame is required!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email address');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minlength: [7, 'Password length must be greater than 7'],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error("Password cannnot contain 'password'");
      }
    },
  },
}, {
  timestamps: true,
});

// Virtual properties (not stored in MongoDB)
// Mongoose will populate documents from the model in ref
// whose foreignField matches this document's localField

userSchema.virtual('wallets', {
  ref: 'Wallet',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('income', {
  ref: 'Income',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('incomeTypes', {
  ref: 'IncomeType',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('investment', {
  ref: 'Investment',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('investmentGoals', {
  ref: 'InvestmentGoal',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('investmentTypes', {
  ref: 'InvestmentType',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'owner',
});

// Enables function before we save the created object

async function userSchemaPreSaveHandler(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
}

userSchema.pre('save', userSchemaPreSaveHandler);

// Generate an auth token for the user

async function generateAuthToken() {
  const user = this;
  const jwtoken = jwt.sign({ _id: user._id }, jwtSecret);
  const token = new Token({
    token: jwtoken,
    owner: user._id,
  });

  await token.save();

  return token;
}

userSchema.methods.generateAuthToken = generateAuthToken;

// Generate default income types

async function generateDefaultIncomeTypes() {
  const user = this;

  const defaultIcomeTypes = [
    {
      value: 'salary',
      label: 'Salary',
      owner: user._id,
    },
    {
      value: 'other',
      label: 'Other',
      owner: user._id,
    },
  ];

  await IncomeType.create(defaultIcomeTypes);
}
userSchema.methods.generateDefaultIncomeTypes = generateDefaultIncomeTypes;

// Generate default wallet

async function generateDefaultWallet() {
  const user = this;

  const defaultWallet = [
    {
      name: 'Default',
      balance: 0,
      type: 'regular',
      owner: user._id,
    },
  ];

  await Wallet.create(defaultWallet);
}
userSchema.methods.generateDefaultIncomeTypes = generateDefaultWallet;

// Generate default categorys

async function generateDefaultCategories() {
  const user = this;

  await Category.create(transactionParentCategories(user));
  const parentCategories = await Category.find({ owner: user._id });
  await Category.create(transactionChildCategories(user, parentCategories));
}
userSchema.methods.generateDefaultCategories = generateDefaultCategories;

// Search for a user by email and password.

async function findByCredentials(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }

  return user;
}

userSchema.statics.findByCredentials = findByCredentials;

// Aggregates distinct years for:
// Income
// Investments
// Investments Goals

async function getDataDistinctYears(user) {
  const id = user.id || user._id;
  let income = [];
  let investment = [];
  let investmentGoals = [];
  const aggregateIncomeDataYears =
    await Income.aggregate(
      aggregateDistinctYearsStages(id),
    );
  const aggregateInvestmentsDataYears =
    await Investment.aggregate(
      aggregateDistinctYearsStages(id),
    );
  const aggregateInvestmentsGoalsDataYears =
    await InvestmentGoal.aggregate(
      aggregateDistinctYearsStages(id, '$year', true),
    );

  if (aggregateIncomeDataYears[0]) {
    income = [...aggregateIncomeDataYears[0].years];
  }
  if (aggregateInvestmentsDataYears[0]) {
    investment = [...aggregateInvestmentsDataYears[0].years];
  }
  if (aggregateInvestmentsGoalsDataYears[0]) {
    investmentGoals = [...aggregateInvestmentsGoalsDataYears[0].years];
  }

  return {
    income,
    investment,
    investmentGoals,
  };
}

userSchema.statics.getDataDistinctYears = getDataDistinctYears;

async function populateDataTypes(user) {
  await user.populate({
    path: 'incomeTypes',
    select: '-__v',
  }).execPopulate();
  await user.populate({
    path: 'investmentTypes',
    select: '-__v',
  }).execPopulate();
}

userSchema.statics.populateDataTypes = populateDataTypes;

async function getUserWallets(user) {
  const id = user.id || user._id;
  const wallets = await Wallet.find({ owner: id });

  return wallets;
}

userSchema.statics.getUserWallets = getUserWallets;

async function getUserCategories(user) {
  const id = user.id || user._id;
  const categories = await Category.find({ owner: id });

  return categories;
}

userSchema.statics.getUserCategories = getUserCategories;

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function userSchemaToJSONHandler() {
  const user = this;
  const userObject = user.toObject();

  userObject.id = userObject._id;

  delete userObject._id;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;

  return userObject;
}

userSchema.methods.toJSON = userSchemaToJSONHandler;

// Delete User Incomes when user is removed

async function useSchemaPreRemoveHandler(next) {
  const user = this;

  await Income.deleteMany({ owner: user._id });
  await IncomeType.deleteMany({ owner: user._id });
  await Investment.deleteMany({ owner: user._id });
  await InvestmentGoal.deleteMany({ owner: user._id });
  await InvestmentType.deleteMany({ owner: user._id });
  await Wallet.deleteMany({ owner: user._id });

  next();
}

userSchema.pre('remove', useSchemaPreRemoveHandler);

const User = mongoose.model('User', userSchema);

module.exports = User;
