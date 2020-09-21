import React, { useEffect, useState } from 'react';
import produce  from 'immer';
import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const initialGrpahData = () => {
  const initialGraphData = {};

  for (let i = 1; i <= 12; i++) {
    const month = i.toString().length < 2 ? `0${i}` : `${i}`;
    initialGraphData[i] = {
      month: month,
      income: 0
    };
  } 

  return initialGraphData;
}

 

function IncomeGraph(props) {
  const incomeData = useSelector(state => state.income.dataByYear);
  const [graphData, setGraphData] = useState({})
  const classes = useStyles();
  
  useEffect(() => {
    const nextGraphData = {...initialGrpahData()};

    Object.keys(incomeData)
      .forEach(key => {
        const month = moment(incomeData[key].date).format('MM');
        const editedMonth = month.charAt(0) === '0' ? month.substring(1) : month;
        nextGraphData[editedMonth].income = nextGraphData[editedMonth].income + parseInt(incomeData[key].amount); 
      })
    setGraphData(nextGraphData);
  }, [incomeData])

  return (
    <Paper className={classes.paper}>
      <LineChart
        width={700}
        height={500}
        data={Object.keys(graphData).map(key => graphData[key])}
        margin={{
          top: 5, right: 30, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Paper>  
  )
}

export default IncomeGraph;