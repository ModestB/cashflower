const { startOfYear, endOfYear } = require('date-fns');
const Income = require('../models/income');
const IncomeType = require('../models/incomeType');
const { errorFormatter } = require('../helpers/utils');

const IncomeController = {

  create: async (req, res) => {
    const income = new Income({
      ...req.body,
      owner: req.user._id,
    });
    try {
      income.id = income._id;
      await income.save();

      res.send(income);
    } catch (error) {
      const msg = 'Income not valid!';
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
        path: 'income',
        match,
        options: {
          sort,
        },
        select: '-__v',
      }).execPopulate();
      const incomeTypes = await IncomeType.find({
        owner: req.user._id,
      });

      res.send({
        income: req.user.income,
        incomeTypes,
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
      const income = await Income.findOne({ _id, owner: req.user._id });

      if (!income) {
        return res.status(404).send();
      }

      updates.forEach((update) => { income[update] = req.body[update]; });
      await income.save();

      res.send(income);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or income not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const income = await Income.findOneAndDelete({ _id, owner: req.user._id });

      if (!income) {
        const msg = 'Income not found!';
        return res.status(404).send(errorFormatter({}, msg));
      }

      res.send(income);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or income not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },
};

module.exports = IncomeController;
