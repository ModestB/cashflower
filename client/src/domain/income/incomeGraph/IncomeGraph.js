import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { format, setMonth } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';
import { ucFirst } from '../../../shared/utilities';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const initialGraphData = () => {
  const graphData = {};

  for (let i = 1; i <= 12; i += 1) {
    const month = i.toString().length < 2 ? `0${i}` : `${i}`;
    graphData[i] = {
      month,
      monthLabel: format(setMonth(new Date(), month - 1), 'MMM'),
      income: 0,
    };
  }

  return graphData;
};

function IncomeGraph() {
  const incomeData = useSelector(state => state.income.dataByYear);
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
  const [incomeDataByMonth, setIncomeDataByMonth] = useState({});
  const [incomeDataByType, setIncomeDataByType] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const nextIncomeDataByMonth = { ...initialGraphData() };
    const nextDataByType = {};

    Object.keys(incomeData)
      .forEach(key => {
        const type = incomeTypes[incomeData[key].type].label;
        const month = format(new Date(incomeData[key].date), 'MM');
        const editedMonth = month.charAt(0) === '0' ? month.substring(1) : month;
        nextIncomeDataByMonth[editedMonth].income += parseInt(incomeData[key].amount, 10);

        if (type) {
          if (nextDataByType[type]) {
            nextDataByType[type].income += parseInt(incomeData[key].amount, 10);
          } else {
            nextDataByType[type] = {
              income: parseInt(incomeData[key].amount, 10),
              type: ucFirst(type),
            };
          }
        }
      });
    setIncomeDataByType(nextDataByType);
    setIncomeDataByMonth(nextIncomeDataByMonth);
  }, [incomeData]);

  return (
    <>
      <Material.Box mb={2} display="flex" className={classes.box}>
        <Material.Paper className={classes.paper}>
          <ResponsiveContainer height="99%" width="100%">
            <LineChart
              data={Object.values(incomeDataByMonth)}
              margin={{
                top: 5, right: 30, left: 0, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthLabel" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#3f51b5" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Material.Paper>
      </Material.Box>

      <Material.Box display="flex" className={classes.box}>
        <Material.Paper className={classes.paper}>
          <ResponsiveContainer height="99%" width="100%">
            <BarChart data={Object.values(incomeDataByType)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        </Material.Paper>
      </Material.Box>
    </>
  );
}

export default IncomeGraph;
