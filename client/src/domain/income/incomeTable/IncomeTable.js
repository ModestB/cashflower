import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import AddIncome from './addIncome/AddIcome';
import EditIncome from './editIncome/EditIncome';
import DataTable from '../../../components/dataTable/DataTable';
import { TableSettingsContext } from '../../../context/TableSettingsContext';
import {
  tableDateColumnSettings,
  tableNumberColumnSettings,
  tableTypeColumnSettings,
  tableCommentColumnSettings,
  tableEditColumnSettings,
} from '../../../shared/constants';

function IncomeTable({
  submitBtnLabel,
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const incomeData = useSelector(state => state.income.data);
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
  const incomeDataYears = useSelector(state => state.dataInfo.years.income);
  const incomeDataLoading = useSelector(state => state.income.incomeDataLoading);
  const incomeAddLoading = useSelector(state => state.income.incomeAddLoading);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const { setTableSettings } = useContext(TableSettingsContext);

  useEffect(() => {
    setTableSettings({
      ...tableDateColumnSettings('Date', true),
      ...tableNumberColumnSettings('Amount', true),
      ...tableTypeColumnSettings('Income type', 'income', true, incomeTypes),
      ...tableCommentColumnSettings('Comment', true),
      ...tableEditColumnSettings(),
    });
  }, [incomeTypes, setTableSettings]);

  return (
    <DataTable
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
      addDataHandler={(data) => dispatch(actions.incomeAddRequest(data, currentDataYear))}
      editDataComponent={(props) => (
        <EditIncome {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(actions.incomeEditRequest(id, data, uid))}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteIncomeRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.getIncomeData(year))}
    />
  );
}

IncomeTable.propTypes = {
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default IncomeTable;
