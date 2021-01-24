import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../shared/material';
import { arraySortByDateDesc } from '../../shared/utilities';
import DataTableRow from './dataTableRow/DataTableRow';
import LoadingTableRow from './loadingTableRow/LoadingTableRow';
import CustomSelect from './customSelect/CustomSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[50],
  },
  container: {
    maxHeight: 'calc(100% - 152px)',
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
  },
  tableHead: {
    padding: theme.spacing(2),
  },
  tablePagination: {
    marginTop: 'auto',
    minHeight: '50px',
    overflow: 'hidden',
  },
  formControl: {
    minWidth: 170,
  },
  yearsFormControl: {
    minWidth: 90,
  },
  customScroll: theme.mixins.customScrollBar,
  tableCellActions: {
    visibility: 'hidden',
  },
  tableRow: {
    '&:hover': {
      '& $tableCellActions': {
        visibility: 'visible',
      },
    },
  },
}));

function DataTable({
  columnsSettings,
  submitBtnLabel,
  editBtnLabel,
  tableData,
  tableDataYears,
  activeTableDataYear,
  tableDataLoading,
  tableDataAddLoading,
  addDataComponent,
  addDataHandler,
  editDataComponent,
  editDataHandler,
  deleteDataHandler,
  currentDataYearHandler,
}) {
  const classes = useStyles();
  const rowPerTablePage = [15, 30, 50];
  const userId = useSelector(state => state.auth.userId);
  const [tablePage, setTablePage] = useState(0);
  const [rowsPerTablePage, setRowsPerTablePage] = useState(rowPerTablePage[0]);
  const [showAddData, setShowAddData] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [showTablePagination, setShowTablePagination] = useState(false);
  const tableRef = useRef(null);
  const colSpan = Object.keys(columnsSettings).length;
  let tableBody = null;

  useEffect(() => {
    if (tableData && Object.keys(tableData).length) {
      setShowTablePagination(Object.keys(tableData).length > rowPerTablePage[0]);
      setHasData(Object.keys(tableData).length > 0);
    }
  }, [tableData]);

  const handleChangePage = (event, newPage) => {
    setTablePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerTablePage(+event.target.value);
    setTablePage(0);
  };

  const tableDataAddHandler = (data, uid) => {
    addDataHandler(data, uid);
    setShowAddData(false);
  };

  const tableDataEditHandler = (data, id) => {
    editDataHandler(id, data, userId);
    setShowAddData(false);
  };

  const showAddDataHandler = () => {
    setShowAddData(true);
  };

  const hideAddDataHandler = () => {
    setShowAddData(false);
  };

  const deleteDataRowHandler = (id) => {
    deleteDataHandler(id, userId);
  };

  const handleCurrentDataYearChange = (event) => {
    currentDataYearHandler(event.target.value);
  };

  if (!tableDataLoading) {
    tableBody = (
      <Material.TableBody>
        {
          addDataComponent && addDataComponent({
            columnsSettings,
            cancelHandler: hideAddDataHandler,
            submitHandler: tableDataAddHandler,
            submitButtonLabel: submitBtnLabel,
            openModal: showAddData,
            openModalHandler: setShowAddData,
          })
        }
        {tableDataAddLoading &&
          <LoadingTableRow colSpan={colSpan} type="success" />}
        {tableData && Object.values(tableData)
          .sort(arraySortByDateDesc)
          .slice(tablePage * rowsPerTablePage, tablePage * rowsPerTablePage + rowsPerTablePage)
          .map((row) => (
            <DataTableRow
              key={row.id}
              row={row}
              columnsSettings={columnsSettings}
              deleteHandler={deleteDataRowHandler}
              addDataEmptyCellSpan={2}
            >
              {
                editDataComponent && editDataComponent({
                  columnsSettings,
                  row,
                  editHandler: tableDataEditHandler,
                  submitButtonLabel: editBtnLabel,
                })
              }

            </DataTableRow>
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
          hasData ?
            (
              <CustomSelect
                value={activeTableDataYear}
                label="Year"
                onChangeHandler={handleCurrentDataYearChange}
                items={tableDataYears}
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

      {showTablePagination && (
        <Material.TablePagination
          rowsPerPageOptions={rowPerTablePage}
          component="div"
          count={Object.keys(tableData).length}
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

DataTable.defaultProps = {
  tableDataYears: [new Date().getFullYear()],
  submitBtnLabel: '',
  editBtnLabel: '',
  activeTableDataYear: new Date().getFullYear(),
  tableDataLoading: false,
  tableDataAddLoading: false,
  addDataComponent: undefined,
  addDataHandler: undefined,
  editDataComponent: undefined,
  editDataHandler: undefined,
  deleteDataHandler: undefined,
  currentDataYearHandler: undefined,
};

DataTable.propTypes = {
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tableData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  submitBtnLabel: PropTypes.string,
  editBtnLabel: PropTypes.string,
  tableDataYears: PropTypes.arrayOf(PropTypes.number),
  activeTableDataYear: PropTypes.number,
  tableDataLoading: PropTypes.bool,
  tableDataAddLoading: PropTypes.bool,
  addDataComponent: PropTypes.func,
  addDataHandler: PropTypes.func,
  editDataComponent: PropTypes.func,
  editDataHandler: PropTypes.func,
  deleteDataHandler: PropTypes.func,
  currentDataYearHandler: PropTypes.func,
};

export default DataTable;
