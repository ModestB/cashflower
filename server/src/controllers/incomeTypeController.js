const IncomeType = require('../models/incomeType');
const { errorFormatter } = require('../utils/utils');

const IncomeTypeController = {
  create: async (req, res) => {
    const incomeType = new IncomeType({
      ...req.body,
      owner: req.user._id,
    });

    try {
      incomeType.id = incomeType._id;
      await incomeType.save();

      res.send(incomeType);
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

  readAll: async (req, res) => {
    try {
      await req.user.populate({
        path: 'incomeTypes',
      }).execPopulate();
      res.send(req.user.incomeTypes);
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
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid income type update!';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const incomeType = await IncomeType.findOne({ _id, owner: req.user._id });
      updates.forEach((update) => { incomeType[update] = req.body[update]; });

      await incomeType.save();

      res.send(incomeType);
      return true;
    } catch (error) {
      res.status(500).send(errorFormatter(error));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const incomeType = await IncomeType.findOneAndDelete({ _id, owner: req.user._id });

      res.send(incomeType);
    } catch (error) {
      const msg = 'Income type not found!';
      res.status(500).send(errorFormatter({}, msg));
    }
  },
};

module.exports = IncomeTypeController;
