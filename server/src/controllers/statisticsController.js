const User = require('../models/user');
const Income = require('../models/income');
const Investment = require('../models/investment');
const InvestmentGoal = require('../models/investmentGoal');
const { errorFormatter } = require('../utils/utils');
const {
  aggregateTotalAmountByYearStages,
} = require('../utils/mongoUtils');

const StatisticsController = {

  read: async (req, res) => {
    const userId = req.user._id;
    const dataYearsByDataType = await User.getDataDistinctYears(req.user);
    const dataYears = [];
    const statistics = {};

    Object.keys(dataYearsByDataType).forEach((key) => {
      dataYearsByDataType[key].forEach((yearByType) => {
        if (!dataYears.includes(yearByType)) {
          dataYears.push(yearByType);
        }
      });
    });

    const aggregateIncomeByYear =
      await Income.aggregate(
        aggregateTotalAmountByYearStages(
          userId,
          ['amount'],
        ),
      );

    const aggregateInvestment =
      await Investment.aggregate(
        aggregateTotalAmountByYearStages(
          userId,
          ['amount'],
        ),
      );

    const aggregateInvestmentGoals =
      await InvestmentGoal.aggregate(
        aggregateTotalAmountByYearStages(
          userId,
          ['goal', 'return'],
          'year',
          true,
        ),
      );

    dataYears.forEach((year) => {
      statistics[year] = {
        year,
        income: 0,
        investment: 0,
        goal: 0,
        return: 0,
      };

      for (let i = 0; i < aggregateIncomeByYear.length; i++) {
        if (aggregateIncomeByYear[i].year === year) {
          statistics[year] = {
            ...statistics[year],
            income: aggregateIncomeByYear[i].amount,
          };
          break;
        }
      }

      for (let i = 0; i < aggregateInvestment.length; i++) {
        if (aggregateInvestment[i].year === year) {
          statistics[year] = {
            ...statistics[year],
            investment: aggregateInvestment[i].amount,
          };
          break;
        }
      }

      for (let i = 0; i < aggregateInvestmentGoals.length; i++) {
        if (aggregateInvestmentGoals[i].year === year) {
          statistics[year] = {
            ...statistics[year],
            goal: aggregateInvestmentGoals[i].goal,
            return: aggregateInvestmentGoals[i].return,
          };
          break;
        }
      }
    });

    try {
      res.send({
        ...statistics,
      });
    } catch (error) {
      res.status(500).send(errorFormatter(error));
    }
  },
};

module.exports = StatisticsController;
