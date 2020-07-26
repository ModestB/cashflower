import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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

export default function DataRowTotal(props) {
  const classes = useStyles();
  let rowContent = null;

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
