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

function TransactionsTable({
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const transactionsData = useSelector(state => state.transactions.data);
  const incomeTypes = useSelector(state => state.info.types.income);
  const incomeDataYears = useSelector(state => state.info.years.income);
  const incomeDataLoading = useSelector(state => state.income.incomeDataLoading);
  const incomeAddLoading = useSelector(state => state.income.incomeAddLoading);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const { setTableSettings } = useContext(TableSettingsContext);

  useEffect(() => {
    setTableSettings({
      ...tableDateColumnSettings('Date', true),
      ...tableTypeColumnSettings('Category', 'income', true, incomeTypes),
      ...tableNumberColumnSettings('Amount', true),
      ...tableCommentColumnSettings('Note', true),
      ...tableEditColumnSettings(),
    });
  }, [incomeTypes, setTableSettings]);

  return (
    <DataTable
      editBtnLabel={editBtnLabel}
      tableData={transactionsData}
      tableDataYears={incomeDataYears}
      activeTableDataYear={currentDataYear}
      tableDataLoading={incomeDataLoading}
      editDataComponent={(props) => (
        <EditIncome {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(actions.incomeEditRequest(id, data, uid))}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteTransactionRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.getIncomeData(year))}
    />
  );
}

TransactionsTable.propTypes = {
  editBtnLabel: PropTypes.string.isRequired,
};

export default TransactionsTable;
