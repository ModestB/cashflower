import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Material from '../../../shared/material';
import { arraySortByDateDesc } from '../../../shared/utilities';
import * as actions from '../../../store/actions/actions';
import incomeTableSyles from './incomeTableStyles';
import AddIncome from './addIncome/AddIcome';
import EditIncome from './editIncome/EditIncome';
import IncomeTableRow from './IncomeTableRow/IncomeTableRow';
import LoadingTableRow from '../../../components/dataTable/loadingTableRow/LoadingTableRow';
import CustomSelect from '../../../components/dataTable/customSelect/CustomSelect';

function IncomeTable({
  columnsSettings,
  submitBtnLabel,
  editBtnLabel,
}) {
  const classes = incomeTableSyles();
  const rowPerIncomeTablePage = [15, 30, 50];
  const dispatch = useDispatch();
  const incomeData = useSelector(state => state.income.dataByYear);
  const incomeDataYears = useSelector(state => state.income.dataYears);
  const userId = useSelector(state => state.auth.userId);
  const incomeDataLoading = useSelector(state => state.income.incomeDataLoading);
  const incomeAddLoading = useSelector(state => state.income.incomeAddLoading);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerTablePage, setRowsPerTablePage] = useState(rowPerIncomeTablePage[0]);
  const [showAddData, setShowAddData] = useState(false);
  const [hasIncomeData, setHasIncomeData] = useState(false);
  const [showTablePagination, setShowTablePagination] = useState(false);
  const tableRef = useRef(null);
  const colSpan = Object.keys(columnsSettings).length;
  let tableBody = null;

  useEffect(() => {
    if (incomeData && Object.keys(incomeData).length) {
      setShowTablePagination(Object.keys(incomeData).length > rowPerIncomeTablePage[0]);
      setHasIncomeData(Object.keys(incomeData).length > 0);
    }
  }, [incomeData]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerTablePage(+event.target.value);
    setTablePage(0);
  };

  const tableDataAddHandler = (data, uid) => {
    dispatch(actions.incomeAddRequest(data, uid));
    setShowAddData(false);
  };

  const tableDataEditHandler = (data, id) => {
    dispatch(actions.incomeEditRequest(id, data, userId));
    setShowAddData(false);
  };

  const showAddDataHandler = () => {
    setShowAddData(true);
  };

  const hideAddDataHandler = () => {
    setShowAddData(false);
  };

  const deleteDataRowHandler = (dataId) => {
    dispatch(actions.deleteIncomeRequest(dataId, userId));
  };

  const handleCurrentDataYearChange = (event) => {
    dispatch(actions.currentDataYearChange(event.target.value));
  };

  const addData = (
    <AddIncome
      cancelHandler={hideAddDataHandler}
      submitHandler={tableDataAddHandler}
      submitButtonLabel={submitBtnLabel}
      columnsSettings={columnsSettings}
      openModal={showAddData}
      openModalHandler={setShowAddData}
    />
  );

  if (!incomeDataLoading) {
    tableBody = (
      <Material.TableBody>
        {showAddData && addData}
        {incomeAddLoading &&
          <LoadingTableRow colSpan={colSpan} type="success" />}
        {incomeData && Object.values(incomeData)
          .sort(arraySortByDateDesc)
          .slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage)
          .map((row) => (
            <IncomeTableRow
              key={row.id}
              row={row}
              columnsSettings={columnsSettings}
              deleteHandler={deleteDataRowHandler}
              addDataEmptyCellSpan={2}
            >
              <EditIncome
                editHandler={tableDataEditHandler}
                submitButtonLabel={editBtnLabel}
                columnsSettings={columnsSettings}
                row={row}
              />
            </IncomeTableRow>
          ))}
      </Material.TableBody>
    );
  } else {
    tableBody = (
      <Material.TableBody>
        <LoadingTableRow colSpan={colSpan} />
      </Material.TableBody>
    );
  }
  return (
    <Material.Paper elevation={3} className={classes.root}>
      <Material.Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        {
          hasIncomeData ?
            (
              <CustomSelect
                value={currentDataYear}
                label="Year"
                onChangeHandler={handleCurrentDataYearChange}
                items={incomeDataYears}
              />
            )
            : <Material.Box />
        }
        {submitBtnLabel && (
          <Material.Box display="flex" justifyContent="flex-end" p={1}>
            <Material.Button
              variant="contained"
              color="primary"
              onClick={() => showAddDataHandler()}
            >
              {submitBtnLabel}
            </Material.Button>
          </Material.Box>
        )}
      </Material.Box>

      {hasIncomeData && (
        <Material.TableContainer
          ref={tableRef}
          className={[classes.container, classes.customScroll].join(' ')}
        >
          <Material.Table stickyHeader aria-label="sticky table" className={classes.table}>
            <Material.TableHead className={classes.tableHead}>
              <Material.TableRow>
                {Object.keys(columnsSettings)
                  .map(key => columnsSettings[key])
                  .filter((column) => column.id !== 'edit')
                  .map((column) => (
                    <Material.TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      colSpan={column.headerColSpan ? column.headerColSpan : 1}
                    >
                      {column.label}
                    </Material.TableCell>
                  ))}
              </Material.TableRow>
            </Material.TableHead>

            {tableBody}

          </Material.Table>
        </Material.TableContainer>
      )}

      {showTablePagination && (
        <Material.TablePagination
          rowsPerPageOptions={rowPerIncomeTablePage}
          component="div"
          count={Object.keys(incomeData).length}
          rowsPerPage={rowsPerTablePage}
          page={tablePage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.tablePagination}
        />
      )}
    </Material.Paper>
  );
}

IncomeTable.propTypes = {
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  submitBtnLabel: PropTypes.string.isRequired,
  editBtnLabel: PropTypes.string.isRequired,
};

export default IncomeTable;
