import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import AddIncome from './addIncome/AddIcome';
import EditIncome from './editIncome/EditIncome';
import DataTable from '../../../components/dataTable/DataTable';

function IncomeTable({
  columnsSettings,
  submitBtnLabel,
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const incomeData = useSelector(state => state.income.dataByYear);
  const incomeDataYears = useSelector(state => state.income.dataYears);
  const incomeDataLoading = useSelector(state => state.income.incomeDataLoading);
  const incomeAddLoading = useSelector(state => state.income.incomeAddLoading);
  const currentDataYear = useSelector(state => state.income.currentDataYear);

  return (
    <DataTable
      columnsSettings={columnsSettings}
      submitBtnLabel={submitBtnLabel}
      editBtnLabel={editBtnLabel}
      tableData={incomeData}
      tableDataYears={incomeDataYears}
      activeTableDataYear={currentDataYear}
      tableDataLoading={incomeDataLoading}
      tableDataAddLoading={incomeAddLoading}
      addDataComponent={(props) => (
        <AddIncome {...props} />
      )}
      addDataHandler={(data, uid) => dispatch(actions.incomeAddRequest(data, uid))}
      editDataComponent={(props) => (
        <EditIncome {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(actions.incomeEditRequest(id, data, uid))}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteIncomeRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.currentIncomeDataYearChange(year))}
    />
  );
}

IncomeTable.propTypes = {
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default IncomeTable;
