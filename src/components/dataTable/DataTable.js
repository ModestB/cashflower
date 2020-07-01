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

import AddData from "./addData/AddData";
import DataTableRow from "./dataTableRow/DataTableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.grey[50],
  },
  container: {
    maxHeight: 440,
    overflowX: "hidden",
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

const scrollToTableTop = (ref) => {
  ref.current.scrollTop = 0;
};

export default function DataTable(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [showAddData, setShowAddData] = useState(false);

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
    const sortedTableData = [...tableData, data].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }

      return 0;
    });

    // Add Data
    setTableData(sortedTableData);
    // Hide Add Data
    setShowAddData(false);
  };

  const tableDataEditHandler = (data, id, calback) => {
    const dataRowIndex = tableData.findIndex((data) => data.id !== id);
    const newTableData = tableData.slice(dataRowIndex);

    const sortedTableData = [...newTableData, data].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }

      return 0;
    });
    console.log("edit");
    console.log(sortedTableData);

    // Add Data
    setTableData(sortedTableData);
    // Hide Add Data
    calback();
  };

  const showAddDataHandler = () => {
    scrollToTableTop(tableRef);
    setShowAddData(true);
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
      <TableCell colSpan={4} padding="none">
        <AddData
          cancelHandler={hideAddDataHandler}
          submitHandler={tableDataAddHandler}
          submitButtonLabel="Add Income"
          columns={props.columns}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <Paper elevation={3} className={classes.root}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => showAddDataHandler()}
        >
          Add Income
        </Button>
      </Box>

      <TableContainer
        ref={tableRef}
        className={[classes.container, classes.customScroll].join(" ")}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {showAddData ? addData : null}

            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <DataTableRow
                    row={row}
                    columns={props.columns}
                    deleteHandler={deleteDataRowHandler}
                    submitHandler={tableDataEditHandler}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
