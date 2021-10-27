const mongoose = require('mongoose');
const { startOfYear, endOfYear } = require('date-fns');
const Transaction = require('../models/transaction');
const { errorFormatter } = require('../utils/utils');

const TransactionController = {

  create: async (req, res) => {
    const transaction = new Transaction({
      ...req.body,
      owner: req.user._id,
    });
    try {
      transaction.id = transaction._id;
      await transaction.save();

      res.send(transaction);
    } catch (error) {
      const msg = 'Transaction not valid!';
      res.status(500).send(errorFormatter(error, msg));
    }
  },

  readAll: async (req, res) => {
    const match = {};
    const sort = {};

    if (!req.query.wallet) {
      return res.status(400).send(errorFormatter({}, 'Wallet must be provided'));
    }

    match.wallet = {
      $eq: mongoose.Types.ObjectId(req.query.wallet),
    };

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
        path: 'transactions',
        match,
        options: {
          sort,
        },
        select: '-__v',
      }).execPopulate();

      res.send({
        transactions: req.user.transactions,
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
      'category',
      'wallet',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid update';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const transaction = await Transaction.findOne({ _id, owner: req.user._id });

      if (!transaction) {
        return res.status(404).send();
      }

      updates.forEach((update) => { transaction[update] = req.body[update]; });
      await transaction.save();

      res.send(transaction);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or transaction not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const transaction = await Transaction.findOneAndDelete({ _id, owner: req.user._id });

      if (!transaction) {
        const msg = 'Income not found!';
        return res.status(404).send(errorFormatter({}, msg));
      }

      res.send(transaction);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or transaction not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },
};

module.exports = TransactionController;
