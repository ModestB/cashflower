const mongoose = require('mongoose');

const investmentTypeSchema = mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Investment type is required!'],
    trim: true,
    validate: {
      validator: (value) => {
        const regPattern = new RegExp(/\s/gm);
        return !regPattern.test(value);
      },
      message: 'Investment type mustn\'t contain white spaces!',
    },
  },
  label: {
    type: String,
    required: [true, 'Investment type label is required!'],
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

function investmentTypeSchemaToJSONHandler() {
  const investmentType = this;
  const investmentTypeObject = investmentType.toObject();

  investmentTypeObject.id = investmentTypeObject._id;

  delete investmentTypeObject._id;
  delete investmentTypeObject.__v;
  delete investmentTypeObject.owner;

  return investmentTypeObject;
}

investmentTypeSchema.methods.toJSON = investmentTypeSchemaToJSONHandler;

const InvestmentType = mongoose.model('InvestmentType', investmentTypeSchema, 'investmentTypes');

module.exports = InvestmentType;
