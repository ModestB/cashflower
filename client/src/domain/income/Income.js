import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getIncomeData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import IncomeTable from './incomeTable/IncomeTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import ChartByType from '../../components/charts/chartByType/ChartByType';

const Income = () => {
  const dispatch = useDispatch();
  const incomeDataYears = useSelector(state => state.dataInfo.years.income);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const incomeData = useSelector(state => state.income.data);
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
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

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Income'));
    if (!Object.keys(incomeData).length) {
      dispatch(getIncomeData(currentDataYear));
    }
  };

  useEffect(onInitLoad, []);

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

      <>
        <ChartByDate
          dataYears={incomeDataYears}
          currentDataYear={currentDataYear}
          data={incomeData}
        />
        <ChartByType
          data={incomeData}
          types={incomeTypes}
        />
      </>
    </TableChartGrid>
  );
};

export default Income;
