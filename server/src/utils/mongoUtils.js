const mongoose = require('mongoose');
const { startOfYear, endOfYear } = require('date-fns');

const aggregateDistinctYearsStages = (
  userId,
  dateField = '$date',
  dateFieldNotDateType = false,
) => {
  let projectAggregation = {
    $project: {
      _id: 0,
      year: {
        $year: dateField,
      },
    },
  };

  if (dateFieldNotDateType) {
    projectAggregation = {
      $project: {
        _id: 0,
        year: dateField,
      },
    };
  }
  return ([
    {
      $match: {
        owner: mongoose.Types.ObjectId(userId),
      },
    },
    {
      ...projectAggregation,
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
  ]);
};

const aggregateDistinctTypesTotalAmountStages = (userId, startYear, endYear) => [
  {
    $match: {
      owner: mongoose.Types.ObjectId(userId),
    },
  },
  {
    $project: {
      _id: 0,
      type: 1,
      amount: 1,
      date: 1,
    },
  },
  {
    $match: {
      date: {
        $gte: startOfYear(new Date(startYear, 0, 1)),
        $lte: endOfYear(new Date(endYear, 0, 1)),
      },
    },
  },
  {
    $group: {
      _id: '$type',
      amounts: {
        $push: '$amount',
      },
    },
  },
  {
    $addFields: {
      type: '$_id',
      invested: {
        $sum: '$amounts',
      },
    },
  },
  {
    $unset: ['_id', 'amounts'],
  },
];

const aggregateTotalAmountByYearStages = (
  userId,
  fields,
  dateField = '$date',
  dateFieldNotDateType = false,
) => {
  let projectAggregation = {};
  let projectAggregationFields = {};
  let groupAggregation = {};
  let addFieldsAggregation = {};
  let unsetFields = [];

  fields.forEach((field) => {
    projectAggregationFields = {
      ...projectAggregationFields,
      [field]: 1,
    };

    groupAggregation = {
      ...groupAggregation,
      [`${field}s`]: {
        $push: `$${field}`,
      },
    };

    addFieldsAggregation = {
      ...addFieldsAggregation,
      [field]: {
        $sum: `$${field}s`,
      },
    };

    unsetFields = [
      ...unsetFields,
      `${field}s`,
    ];
  });

  if (!dateFieldNotDateType) {
    projectAggregation = {
      $project: {
        _id: 0,
        year: {
          $year: dateField,
        },
        ...projectAggregationFields,
      },
    };
  } else {
    projectAggregation = {
      $project: {
        _id: 0,
        [dateField]: 1,
        ...projectAggregationFields,
      },
    };
  }

  return ([
    {
      $match: {
        owner: mongoose.Types.ObjectId(userId),
      },
    },
    {
      ...projectAggregation,
    },
    {
      $group: {
        _id: '$year',
        ...groupAggregation,
      },
    },
    {
      $addFields: {
        year: '$_id',
        ...addFieldsAggregation,
      },
    },
    {
      $sort: {
        year: 1,
      },
    },
    {
      $unset: ['_id', ...unsetFields],
    },
  ]);
};

const populateMatchByStartEndYears = (startYear, endYear, dateField = 'date', isFullDate = true) => {
  let sy = null;
  let ey = null;

  const match = {};
  if (startYear) {
    if (isFullDate) {
      sy = startOfYear(new Date(startYear, 0, 1));
    } else {
      sy = startYear;
    }

    match[dateField] = {
      ...match[dateField],
      $gte: sy,
    };
  }
  if (endYear) {
    if (isFullDate) {
      ey = endOfYear(new Date(endYear, 0, 1));
    } else {
      ey = endYear;
    }
    match[dateField] = {
      ...match[dateField],
      $lte: ey,
    };
  }

  return match;
};

module.exports = {
  aggregateDistinctYearsStages,
  aggregateDistinctTypesTotalAmountStages,
  populateMatchByStartEndYears,
  aggregateTotalAmountByYearStages,
};
