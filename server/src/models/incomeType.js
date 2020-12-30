const mongoose = require('mongoose');

const incomeTypeSchema = mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Income type is required!'],
    trim: true,
    validate: {
      validator: (value) => {
        const regPattern = new RegExp(/\s/gm);
        return !regPattern.test(value);
      },
      message: 'Income type mustn\'t contain white spaces!',
    },
  },
  label: {
    type: String,
    required: [true, 'Income type label is required!'],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response
incomeTypeSchema.methods.toJSON = () => {
  const incomeType = this;
  const incomeTypeObject = incomeType.toObject();

  incomeTypeObject.id = incomeTypeObject._id;

  delete incomeTypeObject._id;
  delete incomeTypeObject.owner;

  return incomeTypeObject;
};

const IncomeType = mongoose.model('IncomeType', incomeTypeSchema, 'incomeTypes');

module.exports = IncomeType;
