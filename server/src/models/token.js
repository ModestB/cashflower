const mongoose = require('mongoose');

const tokenExpTimeInMinutes = 1440;

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: () => Date.now() + tokenExpTimeInMinutes * 1000 * 60,
    index: { expires: `${tokenExpTimeInMinutes}m` },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function tokenSchemaToJSONHandler() {
  const token = this;
  const tokenObject = token.toObject();

  delete tokenObject._id;
  delete tokenObject.createdAt;
  delete tokenObject.updatedAt;
  delete tokenObject.__v;

  return tokenObject;
}

tokenSchema.methods.toJSON = tokenSchemaToJSONHandler;

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
