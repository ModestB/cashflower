import React, { useState } from "react";
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

const columns = [
  { id: "date", label: "Date", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  {
    id: "type",
    label: "Income type",
    minWidth: 170,
  },
  {
    id: "comment",
    label: "Comment",
    minWidth: 170,
  },
];

function createData(date, amount, type, comment) {
  return { date, amount, type, comment };
}

const rows = [
  createData("2019-05-12", 900, "Salary", ""),
  createData("2019-04-12", 900, "Salary", ""),
  createData("2019-03-12", 900, "Salary", ""),
  createData("2019-02-12", 900, "Salary", ""),
  createData("2019-01-12", 900, "Salary", ""),
  createData("2018-12-12", 500, "Salary", ""),
  createData("2018-11-12", 500, "Salary", ""),
  createData("2018-10-12", 500, "Salary", ""),
];

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
}));

export default function DataTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addDataHandler = () => {
    console.log(tableData);
    setTableData([
      ...tableData,
      createData("2018-10-12", 500, "Salary", "test"),
    ]);
    // rows.push(createData("2018-10-12", 500, "Salary", "test"));
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="primary" onClick={addDataHandler}>
          Add Income
        </Button>
      </Box>

      <TableContainer
        className={[classes.container, classes.customScroll].join(" ")}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {columns.map((column) => (
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
            <TableRow>
              <TableCell colSpan={4} padding="none">
                <AddData />
              </TableCell>
            </TableRow>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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
