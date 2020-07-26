import React, { useState, useEffect, useRef } from "react";
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

import AddYearlyPlan from "./addYearlyPlan/AddYearlyPlan";
import DataTableRow from "../../../components/dataTable/dataTableRow/DataTableRow";

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

export default function YearlyPlansTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [showAddData, setShowAddData] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  

  const tableRef = useRef(null);

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableDataAddHandler = (data) => {
    const sortedTableData = [...tableData, {id: "55", ...data}].sort(tableDataSortFunction);

    // Add Data
    setTableData(sortedTableData);
    // Hide Add Data
    setShowAddData(false);
  };

  const tableDataEditHandler = (data, id, calback) => {
    const dataRowIndex = tableData.findIndex((data) => data.id === id);
    const newTableData = [...tableData];
    newTableData.splice(dataRowIndex, 1)

    const sortedTableData = [...newTableData, {id, ...data}].sort(tableDataSortFunction);

    // Add Data
    setTableData(sortedTableData);
    // Hide Add Data
    setShowAddData(false);
  };

  const showAddDataHandler = () => {
    setShowAddData(true);
    setRowToEdit(null)

  };

  const editDataHandler = (id) => {
    setRowToEdit(
      tableData
        .find((row) => row.id === id)
    )
  };

  const hideAddDataHandler = () => {
    setShowAddData(false);
  };

  const deleteDataRowHandler = (dataId) => {
    const newTableData = tableData.filter((row) => row.id !== dataId);
    setTableData(newTableData);
  };


  const addData = (
    <TableRow>
      <TableCell colSpan={props.tableColumns.columns.length} padding="none">
        <AddYearlyPlan 
          cancelHandler={hideAddDataHandler}
          submitHandler={tableDataAddHandler}
          editHandler={tableDataEditHandler}
          submitButtonLabel={props.submitBtnLabel}
          columns={props.tableColumns.columns}
          row={rowToEdit}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <Paper elevation={3} className={classes.root}>
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

      <TableContainer
        ref={tableRef}
        className={[classes.container, classes.customScroll].join(" ")}
      >
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {props.tableColumns.columns
                .filter((column) => column.id !== "edit")
                .map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      colSpan={column.colspan ? column.colspan : 1}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>

          <TableBody>
            {showAddData ? addData : null}

            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(tableDataSortFunction)
              .map((row, index) => {
                return (
                  <DataTableRow
                    key={index}
                    row={row}
                    columns={props.tableColumns.columns}
                    deleteHandler={deleteDataRowHandler}
                    submitHandler={tableDataEditHandler}
                    editDataHandler={editDataHandler}
                    addDataEmptyCellSpan={2}
                  >
                    <AddYearlyPlan 
                      submitHandler={tableDataAddHandler}
                      editHandler={tableDataEditHandler}
                      submitButtonLabel={props.editBtnLabel}
                      columns={props.tableColumns.columns}
                      row={row}
                    />
                  </DataTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {tableData.length > 10 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
