import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AddIncome from "./addIncome/AddIcome";
import DataTableRow from "../../../components/dataTable/dataTableRow/DataTableRow";
import LoadingTableRow from "../../../components/dataTable/loadingTableRow/LoadingTableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.grey[50],
  },
  container: {
    maxHeight: 440,
    overflowX: "hidden",
  },
  table: {
    tableLayout: "fixed",
    width: "100%",
  },
  tableHead: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 170,
  },
  yearsFormControl: {
    minWidth: 90,
  },
  customScroll: theme.mixins.customScrollBar,
  tableCellActions: {
    visibility: "hidden",
  },
  tableRow: {
    "&:hover": {
      "& $tableCellActions": {
        visibility: "visible",
      },
    },
  },
}));

function tableDataSortFunction(a, b) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

export default function IcomeTable(props) {
  const dispatch = useDispatch();
  const incomeDataYears = useSelector(state => state.income.dataYears);
  const userId = useSelector(state => state.auth.userId);
  const incomeDataLoading = useSelector(state => state.income.incomeDataLoading);
  const incomeAddLoading = useSelector(state => state.income.incomeAddLoading);
  const currentDataYear = useSelector(state => state.income.currentDataYear);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [showAddData, setShowAddData] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [dataYears, setDataYears] = useState([]);
  const tableRef = useRef(null);
  let tableBody = null;
  const colSpan = Object.keys(props.columnsSettings).length;

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  useEffect(() => {
    if (incomeDataYears.length) {
      setDataYears(incomeDataYears);
    }  
  }, [incomeDataYears]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableDataAddHandler = (data, userId) => {
    dispatch(actions.incomeAddRequest(data, userId));
    setShowAddData(false);
  };

  const tableDataEditHandler = (data, id) => {
    dispatch(actions.incomeEditRequest(id, data, userId));
    setShowAddData(false);
  };

  const showAddDataHandler = () => {
    setShowAddData(true);
    setRowToEdit(null);
  };

  const editDataHandler = (id) => {
    const rowToEditId = Object.keys(tableData)
      .map (key => tableData[key])
      .find(row => row.id === id)

    setRowToEdit(rowToEditId);
  };

  const hideAddDataHandler = () => {
    setShowAddData(false);
  };

  const deleteDataRowHandler = (dataId) => {
    dispatch(actions.deleteIncomeRequest(dataId, userId));
  };

  const handleCurrentDataYearChange = (event) => {
    dispatch(actions.currentDataYearChange(event.target.value));
  }

  const addData = (
    <TableRow>
      <TableCell 
        colSpan={colSpan} 
        padding="none"
      >
        <AddIncome
          cancelHandler={hideAddDataHandler}
          submitHandler={tableDataAddHandler}
          editHandler={tableDataEditHandler}
          submitButtonLabel={props.submitBtnLabel}
          columnsSettings={props.columnsSettings}
          row={rowToEdit}
        />
      </TableCell>
    </TableRow>
  );

  if (!incomeDataLoading) {
    tableBody = (
      <TableBody>
        {showAddData && addData}
        {incomeAddLoading && 
          <LoadingTableRow colSpan={colSpan} type='success' />
        }
  
        {tableData && Object.keys(tableData)  
          .map(key => {
            const newTableData = {...tableData[key], key: key};
            return newTableData;
          })
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .sort(tableDataSortFunction)
          .map((row, index) => {
            return (
              <DataTableRow
                key={index}
                row={row}
                columnsSettings={props.columnsSettings}
                deleteHandler={deleteDataRowHandler}
                editDataHandler={editDataHandler}
                addDataEmptyCellSpan={2}
              >
                <AddIncome
                  submitHandler={tableDataAddHandler}
                  editHandler={tableDataEditHandler}
                  submitButtonLabel={props.editBtnLabel}
                  columnsSettings={props.columnsSettings}
                  row={row}
                />
              </DataTableRow>
            );
          })}
      </TableBody>
    )
  } else {
    tableBody = 
      <TableBody>
        <LoadingTableRow colSpan={colSpan} />
      </TableBody>
  }
  return (
    <Paper elevation={3} className={classes.root}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <FormControl variant="outlined" className={classes.yearsFormControl}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentDataYear}
            onChange={handleCurrentDataYearChange}
            label="Year"
          >
            {
              dataYears.map(year => {
                return (
                  <MenuItem value={year}>{year}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        {props.submitBtnLabel && (
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showAddDataHandler()}
            >
              {props.submitBtnLabel}
            </Button>
          </Box>
        )}
      </Box>

      <TableContainer
        ref={tableRef}
        className={[classes.container, classes.customScroll].join(" ")}
      >
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {Object.keys(props.columnsSettings)
                .map(key => props.columnsSettings[key])
                .filter((column) => column.id !== "edit")
                .map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      colSpan={column.headerColSpan ? column.headerColSpan : 1}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>

          {tableBody}

        </Table>
      </TableContainer>

      {tableData && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={Object.keys(tableData).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
