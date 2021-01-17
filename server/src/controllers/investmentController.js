const { startOfYear, endOfYear } = require('date-fns');
const Investment = require('../models/investment');
const InvestmentType = require('../models/investmentType');
const { errorFormatter } = require('../helpers/utils');

const InvestmentController = {

  create: async (req, res) => {
    const investment = new Investment({
      ...req.body,
      owner: req.user._id,
    });
    try {
      investment.id = investment._id;
      await investment.save();

      res.send(investment);
    } catch (error) {
      const msg = 'Investment not valid!';
      res.status(500).send(errorFormatter(error, msg));
    }
  },

  readAll: async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.startYear) {
      const startYear = startOfYear(new Date(req.query.startYear, 0, 1));

      match.date = {
        ...match.date,
        $gte: startYear,
      };
    }
    if (req.query.endYear) {
      const endYear = endOfYear(new Date(req.query.endYear, 0, 1));

      match.date = {
        ...match.date,
        $lte: endYear,
      };
    }

    if (req.query.sortBy) {
      const sortOptions = req.query.sortBy.split(':');
      sort[sortOptions[0]] = sortOptions[1] === 'asc' ? 1 : -1;
    }

    try {
      await req.user.populate({
        path: 'investment',
        match,
        options: {
          sort,
        },
        select: '-__v',
      }).execPopulate();
      const investmentTypes = await InvestmentType.find({
        owner: req.user._id,
      });

      res.send({
        investment: req.user.investment,
        investmentTypes,
      });
    } catch (error) {
      res.status(500).send(errorFormatter(error));
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'amount',
      'comment',
      'date',
      'type',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid update';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const investment = await Investment.findOne({ _id, owner: req.user._id });

      if (!investment) {
        return res.status(404).send();
      }

      updates.forEach((update) => { investment[update] = req.body[update]; });
      await investment.save();

      res.send(investment);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or investment not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const investment = await Investment.findOneAndDelete({ _id, owner: req.user._id });

      if (!investment) {
        const msg = 'Investment not found!';
        return res.status(404).send(errorFormatter({}, msg));
      }

      res.send(investment);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or investment not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },
};

module.exports = InvestmentController;
