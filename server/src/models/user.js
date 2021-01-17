const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Income = require('./income');
const IncomeType = require('./incomeType');
const Investment = require('./investment');
const InvestmentType = require('./investmentType');
const Token = require('./token');

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

userSchema.virtual('income', {
  ref: 'Income',
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

userSchema.virtual('investmentTypes', {
  ref: 'InvestmentType',
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
  const jwtoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
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
  await InvestmentType.deleteMany({ owner: user._id });

  next();
}

userSchema.pre('remove', useSchemaPreRemoveHandler);

const User = mongoose.model('User', userSchema);

module.exports = User;
