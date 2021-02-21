const mongoose = require('mongoose');

const TOKEN_LIFE_IN_SECONDS = process.env.JWT_LIFE;

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: () => Date.now() + TOKEN_LIFE_IN_SECONDS * 1000,
    index: { expires: `${TOKEN_LIFE_IN_SECONDS}s` },
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
  delete tokenObject.owner;

  return tokenObject;
}

tokenSchema.methods.toJSON = tokenSchemaToJSONHandler;

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
