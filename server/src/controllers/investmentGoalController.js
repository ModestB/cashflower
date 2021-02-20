const mongoose = require('mongoose');
const InvestmentGoal = require('../models/investmentGoal');
const Investment = require('../models/investment');
const { errorFormatter } = require('../utils/utils');
const {
  populateMatchByStartEndYears, aggregateDistinctTypesTotalAmountStages,
} = require('../utils/mongoUtils');

const InvestmentGoalController = {

  create: async (req, res) => {
    const userId = req.user._id;
    const investmentGoal = new InvestmentGoal({
      ...req.body,
      owner: req.user._id,
    });
    try {
      investmentGoal.id = investmentGoal._id;

      // Check if goal for this investment type and year already exsist
      // If True throw error.
      // Only one goal per type per year allowed

      const goalForYear = await InvestmentGoal.findOne({
        year: req.body.year,
        type: req.body.type,
        owner: req.user._id,
      });

      if (goalForYear) {
        const msg = 'Goal already exist for this investment type!';
        res.status(404).send(errorFormatter({}, msg));
      } else {
        // Aggregate and Set invested
        const aggregateInvestmentsTotalsByType =
          await Investment.aggregate(
            aggregateDistinctTypesTotalAmountStages(
              userId,
              req.body.year,
              req.body.year,
            ),
          );
        const invested = aggregateInvestmentsTotalsByType
          .find((totalByType) => mongoose.Types.ObjectId(totalByType.type)
            .equals(mongoose.Types.ObjectId(req.body.type)));

        await investmentGoal.save();
        res.send({
          ...investmentGoal.toJSON(),
          invested: invested ? invested.invested : 0,
        });
      }
    } catch (error) {
      const msg = 'Investment Goal is not valid!';
      res.status(500).send(errorFormatter(error, msg));
    }
  },

  readAll: async (req, res) => {
    const userId = req.user._id;
    const sort = {};
    const matchInvestmentGoalsYears = populateMatchByStartEndYears(
      req.query.startYear,
      req.query.endYear,
      'year',
      false,
    );

    if (req.query.sortBy) {
      const sortOptions = req.query.sortBy.split(':');
      sort[sortOptions[0]] = sortOptions[1] === 'asc' ? 1 : -1;
    }

    try {
      await req.user.populate({
        path: 'investmentGoals',
        match: matchInvestmentGoalsYears,
        options: {
          sort,
        },
        select: '-__v',
      }).execPopulate();

      // Aggregate and Set invested

      const aggregateInvestmentsTotalsByType =
        await Investment.aggregate(
          aggregateDistinctTypesTotalAmountStages(
            userId,
            req.query.startYear,
            req.query.endYear,
          ),
        );

      req.user.investmentGoals.forEach((goal, index) => {
        let invested = aggregateInvestmentsTotalsByType
          .find((totalByType) => mongoose.Types.ObjectId(totalByType.type)
            .equals(mongoose.Types.ObjectId(goal.type)));
        if (!invested) invested = 0;
        req.user.investmentGoals[index] = {
          ...req.user.investmentGoals[index].toJSON(),
          invested: invested.invested,
        };
      });

      res.send({
        investmentGoals: req.user.investmentGoals,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(errorFormatter(error));
    }
  },

  update: async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'year',
      'goal',
      'type',
      'return',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      const msg = 'Not valid update';
      return res.status(400).send(errorFormatter({}, msg));
    }

    try {
      const investmentGoal = await InvestmentGoal.findOne({ _id, owner: req.user._id });

      if (!investmentGoal) {
        return res.status(404).send();
      }

      updates.forEach((update) => { investmentGoal[update] = req.body[update]; });

      if (req.body.year) {
        // Check if goal for this investment type and year already exsist
        // If True throw error.
        // Only one goal per type per year allowed

        const goalForYear = await InvestmentGoal.findOne({
          year: investmentGoal.year,
          type: investmentGoal.type,
          owner: req.user._id,
        });

        if (
          goalForYear &&
          !mongoose.Types.ObjectId(goalForYear._id)
            .equals(mongoose.Types.ObjectId(_id))
        ) {
          const msg = 'Goal already exist for this investment type!';
          return res.status(404).send(errorFormatter({}, msg));
        }
      }

      await investmentGoal.save();
      res.send(investmentGoal);

      return true;
    } catch (error) {
      const msg = 'Something went wrong or investment goal not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },

  delete: async (req, res) => {
    const _id = req.params.id;

    try {
      const investmentGoal = await InvestmentGoal.findOneAndDelete({ _id, owner: req.user._id });

      if (!investmentGoal) {
        const msg = 'Investment Goal not found!';
        return res.status(404).send(errorFormatter({}, msg));
      }

      res.send(investmentGoal);
      return true;
    } catch (error) {
      const msg = 'Something went wrong or investment goal not found!';
      res.status(400).send(errorFormatter({}, msg));
      return false;
    }
  },
};

module.exports = InvestmentGoalController;
