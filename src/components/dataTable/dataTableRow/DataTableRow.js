import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddData from "../addData/AddData";
import TableRowMenu from "../tableRowMenu/TableRowMenu";

const useStyles = makeStyles((theme) => ({
  tableCellActions: {
    visibility: "hidden",
    display: "flex",
    justifyContent: "flex-end",
  },
  tableRow: {
    "&:hover": {
      "& $tableCellActions": {
        visibility: "visible",
      },
    },
  },
  tableCell: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    height: "50px",
  },
  tableTotalCell: {
    fontWeight: 700,
  },
  tableTotalRow: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
}));

export default function DataTableRow(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [total, setTotal] = useState(0);
  const classes = useStyles();
  let rowContent = null;

  function showEditHandler() {
    setShowEdit(true);
  }

  function hideEditHandler() {
    setShowEdit(false);
  }

  function submitDataHandler(id, data) {
    props.submitHandler(id, data, hideEditHandler);
  }

  if (!props.tableOptions) {
    rowContent = props.columns.map((column) => {
      const value = props.row[column.id];
      let tableCellData =
        column.format && typeof value === "number"
          ? column.format(value)
          : value;

      if (column.id === "type") {
        tableCellData = value.charAt(0).toUpperCase() + value.slice(1);
      }

      if (column.id === "edit") {
        tableCellData = (
          <div className={classes.tableCellActions}>
            <TableRowMenu
              id={props.row.id}
              deleteHandler={props.deleteHandler}
              showEditHandler={showEditHandler}
            />
          </div>
        );
      }

      if (column.inputType === "date") {
        tableCellData = moment(value).format(column.dateFormat);
      }

      if (column.countableTotal) {
        tableCellData = props.columns
          .filter((column) => {
            return column.countable;
          })
          .reduce((acc, cur) => {
            return acc + props.row[cur.id];
          }, 0);
      }

      return (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
          className={classes.tableCell}
        >
          {tableCellData}
        </TableCell>
      );
    });
  } else {
    rowContent = props.columns.map((column) => {
      let tableCellData = null;
      let columnId = column.id;

      if (column.countableSummary) {
        let columnTotal = props.tableData
          .map((row) => {
            return row[columnId];
          })
          .reduce((acc, cur) => acc + cur, 0);

        tableCellData = columnTotal;
      }

      if (column.inputType === "date") {
        tableCellData = "Total";
      }

      if (column.countableTotal) {
        const countableTablesId = props.columns
          .filter((column) => column.countable)
          .map((column) => column.id);

        tableCellData = countableTablesId
          .map((id) => {
            return props.tableData
              .map((row) => {
                return row[id];
              })
              .reduce((acc, cur) => acc + cur, 0);
          })
          .reduce((acc, cur) => acc + cur, 0);
      }

      return (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
          className={[
            props.tableOptions.totalSummary ? classes.tableTotalCell : "",
            classes.tableCell,
          ].join(" ")}
        >
          {tableCellData}
        </TableCell>
      );
    });
  }

  if (showEdit) {
    rowContent = (
      <TableCell
        colSpan={props.columns.length}
        padding="none"
        className={classes.tableCell}
      >
        <AddData
          cancelHandler={hideEditHandler}
          submitHandler={submitDataHandler}
          columns={props.columns}
          date={props.row["date"]}
          amount={props.row["amount"]}
          incomeType={props.row["type"]}
          comment={props.row["comment"]}
          submitButtonLabel="Save"
          id={props.row.id}
        />
      </TableCell>
    );
  }

  return (
    <TableRow
      className={[
        classes.tableRow,
        props.tableOptions && props.tableOptions.totalSummary
          ? classes.tableTotalRow
          : "",
      ].join(" ")}
      hover
      role="checkbox"
      tabIndex={-1}
      key={props.row ? props.row.code : 1}
    >
      {rowContent}
    </TableRow>
  );
}
