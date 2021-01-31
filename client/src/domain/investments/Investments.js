import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getInvestmentData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import InvestmentsTable from './investmentsTable/InvestmentsTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import ChartByType from '../../components/charts/chartByType/ChartByType';
import { TableSettingsProvider } from '../../context/TableSettingsContext';

const Investments = () => {
  const dispatch = useDispatch();
  const investmentDataYears = useSelector(state => state.dataInfo.years.investment);
  const currentDataYear = useSelector(state => state.investment.currentDataYear);
  const investmentData = useSelector(state => state.investment.data);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const [hasData, setHasData] = useState(false);

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Investments'));
    if (!Object.keys(investmentData).length) {
      dispatch(getInvestmentData(currentDataYear));
    }
  };

  useEffect(onInitLoad, []);

  useEffect(() => {
    if (investmentData) {
      setHasData(Object.keys(investmentData).length > 0);
    }
  }, [investmentData]);

  return (
    <TableChartGrid hasData={hasData}>
      <TableSettingsProvider>
        <InvestmentsTable
          submitBtnLabel="Add Investment"
          editBtnLabel="Save Investment"
        />
      </TableSettingsProvider>
      <>
        <ChartByDate
          dataYears={investmentDataYears}
          currentDataYear={currentDataYear}
          data={investmentData}
        />
        <ChartByType
          data={investmentData}
          types={investmentTypes}
        />
      </>
    </TableChartGrid>
  );
};

export default Investments;
