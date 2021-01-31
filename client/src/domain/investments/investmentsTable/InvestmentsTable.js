import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import AddInvestment from './addInvestment/AddInvestment';
import EditInvestment from './editInvestment/EditInvestment';
import DataTable from '../../../components/dataTable/DataTable';
import { TableSettingsContext } from '../../../context/TableSettingsContext';
import {
  tableDateColumnSettings,
  tableAmountColumnSettings,
  tableTypeColumnSettings,
  tableCommentColumnSettings,
  tableEditColumnSettings,
} from '../../../shared/constants';

function InvestmentTable({
  submitBtnLabel,
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const investmentData = useSelector(state => state.investment.data);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const investmentDataYears = useSelector(state => state.dataInfo.years.investment);
  const investmentDataLoading = useSelector(state => state.investment.investmentDataLoading);
  const investmentAddLoading = useSelector(state => state.investment.investmentAddLoading);
  const currentDataYear = useSelector(state => state.investment.currentDataYear);
  const { setTableSettings } = useContext(TableSettingsContext);

  useEffect(() => {
    setTableSettings({
      ...tableDateColumnSettings('Date', true),
      ...tableAmountColumnSettings('Amount', true),
      ...tableTypeColumnSettings('Type of Investment', 'investment', true, investmentTypes),
      ...tableCommentColumnSettings('Comment', true),
      ...tableEditColumnSettings(),
    });
  }, [investmentTypes, setTableSettings]);

  return (
    <DataTable
      submitBtnLabel={submitBtnLabel}
      editBtnLabel={editBtnLabel}
      tableData={investmentData}
      tableDataYears={investmentDataYears}
      activeTableDataYear={currentDataYear}
      tableDataLoading={investmentDataLoading}
      tableDataAddLoading={investmentAddLoading}
      addDataComponent={(props) => (
        <AddInvestment {...props} />
      )}
      addDataHandler={(data) => dispatch(actions.investmentAddRequest(data, currentDataYear))}
      editDataComponent={(props) => (
        <EditInvestment {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(actions.investmentEditRequest(id, data, uid))}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteInvestmentRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.getInvestmentData(year))}
    />
  );
}

InvestmentTable.propTypes = {
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default InvestmentTable;
