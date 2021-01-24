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
      investment: 0,
    };
  }

  return graphData;
};

function InvestmentGraph() {
  const investmentData = useSelector(state => state.investment.data);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const [investmentDataByMonth, setInvestmentDataByMonth] = useState({});
  const [investmentDataByType, setInvestmentDataByType] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const nextInvestmentDataByMonth = { ...initialGraphData() };
    const nextDataByType = {};

    Object.keys(investmentData)
      .forEach(key => {
        const type = investmentTypes[investmentData[key].type].label;
        const month = format(new Date(investmentData[key].date), 'MM');
        const editedMonth = month.charAt(0) === '0' ? month.substring(1) : month;
        nextInvestmentDataByMonth[editedMonth].investment +=
        parseInt(investmentData[key].amount, 10);

        if (type) {
          if (nextDataByType[type]) {
            nextDataByType[type].investment += parseInt(investmentData[key].amount, 10);
          } else {
            nextDataByType[type] = {
              investment: parseInt(investmentData[key].amount, 10),
              type: ucFirst(type),
            };
          }
        }
      });
    setInvestmentDataByType(nextDataByType);
    setInvestmentDataByMonth(nextInvestmentDataByMonth);
  }, [investmentData]);

  return (
    <>
      <Material.Box mb={2} display="flex" className={classes.box}>
        <Material.Paper className={classes.paper}>
          <ResponsiveContainer height="99%" width="100%">
            <LineChart
              data={Object.values(investmentDataByMonth)}
              margin={{
                top: 5, right: 30, left: 0, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthLabel" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="investment" stroke="#3f51b5" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Material.Paper>
      </Material.Box>

      <Material.Box display="flex" className={classes.box}>
        <Material.Paper className={classes.paper}>
          <ResponsiveContainer height="99%" width="100%">
            <BarChart data={Object.values(investmentDataByType)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="investment" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        </Material.Paper>
      </Material.Box>
    </>
  );
}

export default InvestmentGraph;
