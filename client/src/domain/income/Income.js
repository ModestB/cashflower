import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import IncomeTable from './incomeTable/IncomeTable';
import IncomeGraph from './incomeGraph/IncomeGraph';

const Income = () => {
  const dispatch = useDispatch();
  const incomeData = useSelector(state => state.income.dataByYear);
  const incomeTypes = useSelector(state => state.income.types);
  const [hasIncomeData, setHasIncomeData] = useState(false);
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
      items: incomeTypes,
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

  useEffect(() => {
    dispatch(changeHeaderTitle('Income'));
  }, []);

  useEffect(() => {
    if (incomeData) {
      setHasIncomeData(Object.keys(incomeData).length > 0);
    }
  }, [incomeData]);

  return (
    <TableChartGrid hasData={hasIncomeData}>
      <IncomeTable
        columnsSettings={columnsSettings}
        submitBtnLabel="Add Income"
        editBtnLabel="Save Income"
      />
      <IncomeGraph />
    </TableChartGrid>
  );
};

export default Income;
