import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import AddInvestment from './addInvestment/AddInvestment';
import EditInvestment from './editInvestment/EditInvestment';
import DataTable from '../../../components/dataTable/DataTable';

function InvestmentTable({
  columnsSettings,
  submitBtnLabel,
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const investmentData = useSelector(state => state.investment.dataByYear);
  const investmentDataYears = useSelector(state => state.dataInfo.years.investment);
  const investmentDataLoading = useSelector(state => state.investment.investmentDataLoading);
  const investmentAddLoading = useSelector(state => state.investment.investmentAddLoading);
  const currentDataYear = useSelector(state => state.investment.currentDataYear);
  return (
    <DataTable
      columnsSettings={columnsSettings}
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
      addDataHandler={(data, uid) => dispatch(actions.investmentAddRequest(data, uid))}
      editDataComponent={(props) => (
        <EditInvestment {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(actions.investmentEditRequest(id, data, uid))}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteInvestmentRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.currentInvestmentDataYearChange(year))}
    />
  );
}

InvestmentTable.propTypes = {
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default InvestmentTable;
