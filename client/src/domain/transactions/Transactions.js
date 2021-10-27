import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getTransactions, addInfoAlert } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import TransactionsTable from './table/TransactionsTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import DataBarChart from '../../components/charts/dataBarChart/DataBarChart';
import { TableSettingsProvider } from '../../context/TableSettingsContext';

const Income = () => {
  const dispatch = useDispatch();
  const incomeDataYears = useSelector(state => state.info.years.income);
  const activeWallet = useSelector(state => state.user.activeWallet);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const transactionsData = useSelector(state => state.transactions.data);
  const incomeTypes = useSelector(state => state.info.types.income);
  const [hasIncomeData, setHasIncomeData] = useState(false);

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Transactions'));
    if (!Object.keys(transactionsData).length) {
      let dataYear = currentDataYear;
      if (
        incomeDataYears.length &&
        !incomeDataYears.includes(currentDataYear)
      ) {
        [dataYear] = incomeDataYears;
      }
      dispatch(getTransactions(dataYear, activeWallet));
    }
  };

  useEffect(onInitLoad, []);

  useEffect(() => {
    dispatch(getTransactions(currentDataYear, activeWallet));
  }, [activeWallet]);

  useEffect(() => {
    setHasIncomeData(Object.keys(transactionsData).length > 0);
  }, [transactionsData]);

  useEffect(() => {
    if (!hasIncomeData) {
      dispatch(addInfoAlert('Income table is empty', 'To add income data click Add Income Button'));
    }
  }, [hasIncomeData]);

  return (
    <TableChartGrid hasData={hasIncomeData}>
      <TableSettingsProvider>
        <TransactionsTable
          editBtnLabel="Save Income"
        />
      </TableSettingsProvider>
      <>
        {/* <ChartByDate
          dataYears={incomeDataYears}
          currentDataYear={currentDataYear}
          data={transactionsData}
        />
        <DataBarChart
          data={transactionsData}
          types={incomeTypes}
          bars={['amount']}
        /> */}
      </>
    </TableChartGrid>
  );
};

export default Income;
