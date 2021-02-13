import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getInvestmentGoalsData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import InvestmentGoalsTable from './investmentGoalsTable/InvestmentGoalsTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import ChartByType from '../../components/charts/chartByType/ChartByType';
import { TableSettingsProvider } from '../../context/TableSettingsContext';

const InvestmentGoals = () => {
  const dispatch = useDispatch();
  const currentDataYear = useSelector(state => state.investmentGoals.currentDataYear);
  const investmentGoalsData = useSelector(state => state.investmentGoals.data);
  const [hasData, setHasData] = useState(false);

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Investment Goals'));
    if (!Object.keys(investmentGoalsData).length) {
      dispatch(getInvestmentGoalsData(currentDataYear));
    }
  };

  useEffect(onInitLoad, []);

  useEffect(() => {
    if (investmentGoalsData) {
      setHasData(Object.keys(investmentGoalsData).length > 0);
    }
  }, [investmentGoalsData]);

  return (
    <TableChartGrid hasData={hasData}>
      <TableSettingsProvider>
        <InvestmentGoalsTable
          submitBtnLabel="Add Investment Goal"
          editBtnLabel="Save Investment Goal"
        />
      </TableSettingsProvider>
      <>
        {/* <ChartByDate
          dataYears={investmentDataYears}
          currentDataYear={currentDataYear}
          data={investmentData}
        />
        <ChartByType
          data={investmentData}
          types={investmentTypes}
        /> */}
      </>
    </TableChartGrid>
  );
};

export default InvestmentGoals;
