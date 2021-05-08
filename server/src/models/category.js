const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Category is required!'],
    trim: true,
    validate: {
      validator: (value) => {
        const regPattern = new RegExp(/\s/gm);
        return !regPattern.test(value);
      },
      message: 'Category mustn\'t contain white spaces!',
    },
  },
  label: {
    type: String,
    required: [true, 'Category label is required!'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Category icon is required!'],
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    default: 'expense',
    required: [true, 'Category Type is required!'],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Define custom toJSON method
// To hide/delete properties which you don't want to return in the response

function categorySchemaToJSONHandler() {
  const category = this;
  const categoryObject = category.toObject();

  categoryObject.id = categoryObject._id;

  delete categoryObject._id;
  delete categoryObject.__v;
  delete categoryObject.owner;

  return categoryObject;
}

categorySchema.methods.toJSON = categorySchemaToJSONHandler;

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
