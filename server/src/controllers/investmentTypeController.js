const InvestmentType = require('../models/investmentType');
const { errorFormatter } = require('../helpers/utils');

const InvestmentTypeController = {
  create: async (req, res) => {
    const investmentType = new InvestmentType({
      ...req.body,
      owner: req.user._id,
    });

    try {
      investmentType.id = investmentType._id;
      await investmentType.save();

      res.send(investmentType);
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
        path: 'investmentTypes',
      }).execPopulate();
      res.send(req.user.investmentTypes);
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
      const investmentType = await InvestmentType.findOne({ _id, owner: req.user._id });
      updates.forEach((update) => { investmentType[update] = req.body[update]; });

      await investmentType.save();

      res.send(investmentType);
      return true;
    } catch (error) {
      res.status(500).send(errorFormatter(error));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const investmentType = await InvestmentType.findOneAndDelete({ _id, owner: req.user._id });

      res.send(investmentType);
    } catch (error) {
      const msg = 'Income type not found!';
      res.status(500).send(errorFormatter({}, msg));
    }
  },
};

module.exports = InvestmentTypeController;
