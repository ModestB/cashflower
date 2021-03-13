import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/actions';
import AddInvestmentGoal from './addInvestmentGoal/AddInvestmentGoal';
import EditInvestmentGoal from './editInvestmentGoal/EditInvestmentGoal';
import DataTable from '../../../components/dataTable/DataTable';
import { TableSettingsContext } from '../../../context/TableSettingsContext';
import {
  tableDateColumnSettings,
  tableNumberColumnSettings,
  tableTypeColumnSettings,
  tableEditColumnSettings,
} from '../../../shared/constants';

function InvestmentGoalsTable({
  submitBtnLabel,
  editBtnLabel,
}) {
  const dispatch = useDispatch();
  const investmentGoalsData = useSelector(state => state.investmentGoals.data);
  const investmentTypes = useSelector(state => state.info.types.investment);
  const investmentGoalsDataYears = useSelector(state => state.info.years.investmentGoals);
  const investmentGoalsDataLoading =
    useSelector(state => state.investmentGoals.investmentGoalsDataLoading);
  const investmentGoalAddLoading =
    useSelector(state => state.investmentGoals.investmentGoalAddLoading);
  const currentDataYear = useSelector(state => state.investmentGoals.currentDataYear);
  const { setTableSettings } = useContext(TableSettingsContext);

  useEffect(() => {
    setTableSettings({
      ...tableTypeColumnSettings('Type of Investment', 'investment', true, investmentTypes, 'type'),
      ...tableDateColumnSettings('Date', true, 'year', 'yyyy'),
      ...tableNumberColumnSettings('Goal', true, 'goal'),
      ...tableNumberColumnSettings('Invested', false, 'invested'),
      ...tableNumberColumnSettings('Return', true, 'return', 2),
      ...tableEditColumnSettings(),
    });
  }, [investmentTypes, setTableSettings]);

  return (
    <DataTable
      submitBtnLabel={submitBtnLabel}
      editBtnLabel={editBtnLabel}
      tableData={investmentGoalsData}
      tableDataYears={investmentGoalsDataYears}
      activeTableDataYear={currentDataYear}
      tableDataLoading={investmentGoalsDataLoading}
      tableDataAddLoading={investmentGoalAddLoading}
      addDataComponent={(props) => (
        <AddInvestmentGoal {...props} />
      )}
      addDataHandler={(data) => dispatch(actions.investmentGoalAddRequest(data, currentDataYear))}
      editDataComponent={(props) => (
        <EditInvestmentGoal {...props} />
      )}
      editDataHandler={(id, data, uid) => dispatch(
        actions.investmentGoalEditRequest(id, data, uid, currentDataYear),
      )}
      deleteDataHandler={(id, uid) => dispatch(actions.deleteInvestmentGoalRequest(id, uid))}
      currentDataYearHandler={(year) => dispatch(actions.getInvestmentGoalsData(year))}
    />
  );
}

InvestmentGoalsTable.propTypes = {
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default InvestmentGoalsTable;
