const Category = require('../models/category');
const { errorFormatter } = require('../utils/utils');

const CategoryController = {
  create: async (req, res) => {
    const category = new Category({
      ...req.body,
      owner: req.user._id,
    });

    try {
      category.id = category._id;
      await category.save();

      res.send(category);
    } catch (error) {
      let msg = '';
      let err = error;
      if (error.name === 'MongoError') {
        err = {};
        msg = 'Income type not valid!';
      }
      res.status(500).send(errorFormatter(err, msg));
    }
  },

  read: async (req, res) => {
    try {
      await req.user.populate({
        path: 'categories',
      }).execPopulate();
      res.send(req.user.categories);
    } catch (error) {
      res.status(500).send(errorFormatter());
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'value',
      'label',
      'icon',
      'parentId',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid category update!';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const category = await Category.findOne({ _id, owner: req.user._id });
      updates.forEach((update) => { category[update] = req.body[update]; });

      await category.save();

      res.send(category);
      return true;
    } catch (error) {
      res.status(500).send(errorFormatter(error));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const category = await Category.findOneAndDelete({ _id, owner: req.user._id });

      res.send(category);
    } catch (error) {
      const msg = 'Income type not found!';
      res.status(500).send(errorFormatter({}, msg));
    }
  },
};

module.exports = CategoryController;
