import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeHeaderTitle, getAllInvestmentData } from '../../store/actions/actions';
import TableChartGrid from '../../components/tableChartGrid/TableChartGrid';
import InvestmentsTable from './investmentsTable/InvestmentsTable';
import InvestmentsGraph from './investmentsGraph/InvestmentsGraph';

const Investments = () => {
  const dispatch = useDispatch();
  const dataLoaded = useSelector(state => state.investment.dataLoaded);
  const investmentData = useSelector(state => state.investment.dataByYear);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const userID = useSelector(state => state.auth.userId);
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
    if (userID && !dataLoaded) {
      dispatch(getAllInvestmentData(userID));
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
      <InvestmentsGraph />
    </TableChartGrid>
  );
};

export default Investments;
