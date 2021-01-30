import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, setMonth } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartBox from '../chartBox/ChartBox';

const initialGraphDataByMonth = () => {
  const graphData = {};

  for (let i = 1; i <= 12; i += 1) {
    const month = i.toString().length < 2 ? `0${i}` : `${i}`;
    graphData[i] = {
      key: month,
      label: format(setMonth(new Date(), month - 1), 'MMM'),
      amount: 0,
    };
  }

  return graphData;
};

const initialGraphDataByYear = (years) => {
  const graphData = {};

  years.forEach((year) => {
    if (year !== 'All') {
      graphData[year] = {
        label: year,
        amount: 0,
      };
    }
  });

  return graphData;
};

function ChartByDate({
  dataYears,
  currentDataYear,
  data,
}) {
  const [dataByDate, setDataByDate] = useState({});

  useEffect(() => {
    const nextIncomeDataByDate = currentDataYear !== 'All' ?
      { ...initialGraphDataByMonth() }
      : { ...initialGraphDataByYear(dataYears) };

    Object.keys(data)
      .forEach(key => {
        if (currentDataYear !== 'All') {
          const month = format(new Date(data[key].date), 'MM');
          const editedMonth = month.charAt(0) === '0' ? month.substring(1) : month;
          nextIncomeDataByDate[editedMonth].amount += parseInt(data[key].amount, 10);
        } else {
          const year = format(new Date(data[key].date), 'yyyy');
          nextIncomeDataByDate[year].amount += parseInt(data[key].amount, 10);
        }
      });
    setDataByDate(nextIncomeDataByDate);
  }, [data, currentDataYear, dataYears]);

  return (
    <ChartBox>
      <ResponsiveContainer height="99%" width="100%">
        <LineChart
          data={Object.values(dataByDate)}
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#3f51b5" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

ChartByDate.propTypes = {
  dataYears: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  currentDataYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ChartByDate;
