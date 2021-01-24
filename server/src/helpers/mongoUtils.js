const mongoose = require('mongoose');

const aggregateDistinctYearsStages = (userId) => (
  [
    {
      $match: {
        owner: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $project: {
        _id: 0,
        year: {
          $year: '$date',
        },
      },
    },
    {
      $group: {
        _id: null,
        years: {
          $push: '$year',
        },
      },
    },
    {
      $unwind: '$years',
    },
    {
      $group: {
        _id: null,
        years: {
          $addToSet: '$years',
        },
      },
    },
    {
      $unwind: '$years',
    },
    {
      $sort: {
        years: -1,
      },
    },
    {
      $group: {
        _id: null,
        years: {
          $push: '$years',
        },
      },
    },
  ]
);

module.exports = {
  aggregateDistinctYearsStages,
};
