import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../shared/material';
import IncomeTable from './incomeTable/IncomeTable';
import IncomeGraph from './incomeGraph/IncomeGraph';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  containerTable: {
    height: 'calc(100vh - 88px)',
  },
  containerGraph: {
    height: 'calc(100vh - 104px)',
  },
}));

const columnsSettings = {
  date: {
    id: 'date',
    label: 'Date',
    editable: true,
    inputType: 'date',
    dateFormat: 'yyyy-MM-dd',
    minWidth: 200,
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    editable: true,
    inputType: 'number',
    minWidth: 100,
  },
  type: {
    id: 'type',
    label: 'Income type',
    selectType: 'income',
    editable: true,
    inputType: 'select',
    minWidth: 170,
  },
  comment: {
    id: 'comment',
    label: 'Comment',
    editable: true,
    inputType: 'textArea',
    minWidth: 170,
    // colspan: 1,
    headerColSpan: 2,
  },
  edit: {
    id: 'edit',
    label: '',
    minWidth: 50,
  },
};

const Income = () => {
  const incomeData = useSelector(state => state.income.dataByYear);
  const [hasIncomeData, setHasIncomeData] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (incomeData) {
      setHasIncomeData(Object.keys(incomeData).length > 0);
    }
  }, [incomeData]);

  return (
    <div className={classes.root}>
      <Material.Grid container spacing={3}>
        <Material.Grid item xs={hasIncomeData ? 8 : 12} className={classes.containerTable}>
          <IncomeTable
            columnsSettings={columnsSettings}
            submitBtnLabel="Add Income"
            editBtnLabel="Save Income"
          />
        </Material.Grid>
        {
          hasIncomeData &&
          (
            <Material.Grid item xs={4} className={classes.containerGraph}>
              <IncomeGraph />
            </Material.Grid>
          )
        }
      </Material.Grid>
    </div>
  );
};

export default Income;
