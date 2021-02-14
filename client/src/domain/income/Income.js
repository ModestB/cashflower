import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getIncomeData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import IncomeTable from './incomeTable/IncomeTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import DataBarChart from '../../components/charts/dataBarChart/DataBarChart';
import { TableSettingsProvider } from '../../context/TableSettingsContext';

const Income = () => {
  const dispatch = useDispatch();
  const incomeDataYears = useSelector(state => state.dataInfo.years.income);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const incomeData = useSelector(state => state.income.data);
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
  const [hasIncomeData, setHasIncomeData] = useState(false);

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
      <TableSettingsProvider>
        <IncomeTable
          submitBtnLabel="Add Income"
          editBtnLabel="Save Income"
        />
      </TableSettingsProvider>
      <>
        <ChartByDate
          dataYears={incomeDataYears}
          currentDataYear={currentDataYear}
          data={incomeData}
        />
        <DataBarChart
          data={incomeData}
          types={incomeTypes}
          bars={['amount']}
        />
      </>
    </TableChartGrid>
  );
};

export default Income;
