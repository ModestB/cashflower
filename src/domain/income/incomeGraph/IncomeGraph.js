import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import moment from 'moment';
import { ucFirst } from '../../../shared/utilities';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '50%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const initialGraphData = () => {
  const initialGraphData = {};

  for (let i = 1; i <= 12; i++) {
    const month = i.toString().length < 2 ? `0${i}` : `${i}`;
    initialGraphData[i] = {
      month: month,
      monthLabel: moment().month(month).format('MMM'),
      income: 0
    };
  } 

  return initialGraphData;
}

 

function IncomeGraph(props) {
  const incomeData = useSelector(state => state.income.dataByYear);
  const [incomeDataByMonth, setIncomeDataByMonth] = useState({})
  const [incomeDataByType, setIncomeDataByType] = useState({});
  const classes = useStyles();
  
  useEffect(() => {
    const nextIncomeDataByMonth = {...initialGraphData()};
    const nextDataByType = {};

    Object.keys(incomeData)
      .forEach(key => {
        const type = incomeData[key].type ? incomeData[key].type : 'other'
        const month = moment(incomeData[key].date).format('MM');
        const editedMonth = month.charAt(0) === '0' ? month.substring(1) : month;
        nextIncomeDataByMonth[editedMonth].income = nextIncomeDataByMonth[editedMonth].income + parseInt(incomeData[key].amount);

        if (type) {
          if (nextDataByType[type]) {
            nextDataByType[type].income = nextDataByType[type].income + parseInt(incomeData[key].amount);
          } else {
            nextDataByType[type] = {
              income: parseInt(incomeData[key].amount),
              type: ucFirst(type)
            }
          }
        }
      })
    setIncomeDataByType(nextDataByType)
    setIncomeDataByMonth(nextIncomeDataByMonth);
  }, [incomeData])

  useEffect(() => {
    console.log(incomeDataByMonth)
    console.log(Object.values(incomeDataByMonth))
  }, [incomeDataByMonth])
  
  return (
    <React.Fragment>
      <Box mb={2} display="flex" className={classes.box} >
        <Paper className={classes.paper} >
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
        </Paper>
      </Box>
     
      <Box display="flex" className={classes.box}>
        <Paper className={classes.paper}>
          <ResponsiveContainer  height="99%" width="100%">
            <BarChart data={Object.values(incomeDataByType)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </React.Fragment>
  )
}

export default IncomeGraph;