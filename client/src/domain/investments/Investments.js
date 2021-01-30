import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getInvestmentData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import InvestmentsTable from './investmentsTable/InvestmentsTable';
import ChartByDate from '../../components/charts/chartByDate/ChartByDate';
import ChartByType from '../../components/charts/chartByType/ChartByType';

const Investments = () => {
  const dispatch = useDispatch();
  const investmentDataYears = useSelector(state => state.dataInfo.years.investment);
  const currentDataYear = useSelector(state => state.investment.currentDataYear);
  const investmentData = useSelector(state => state.investment.data);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const [hasData, setHasData] = useState(false);

  const columnsSettings = {
    date: {
      id: 'date',
      label: 'Date',
      editable: true,
      inputType: 'date',
      dateFormat: 'yyyy-MM-dd',
      minWidth: 170,
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
      label: 'Type of Investment',
      selectType: 'investment',
      editable: true,
      inputType: 'select',
      items: investmentTypes,
      minWidth: 170,
    },
    comment: {
      id: 'comment',
      label: 'Comment',
      editable: true,
      inputType: 'textArea',
      minWidth: 170,
      headerColSpan: 2,
    },
    edit: {
      id: 'edit',
      label: '',
      minWidth: 50,
    },
  };

  useEffect(() => {
    dispatch(changeHeaderTitle('Investments'));
    if (!Object.keys(investmentData).length) {
      dispatch(getInvestmentData(currentDataYear));
    }
  }, []);

  useEffect(() => {
    if (investmentData) {
      setHasData(Object.keys(investmentData).length > 0);
    }
  }, [investmentData]);

  return (
    <TableChartGrid hasData={hasData}>
      <InvestmentsTable
        columnsSettings={columnsSettings}
        submitBtnLabel="Add Investment"
        editBtnLabel="Save Investment"
      />
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
