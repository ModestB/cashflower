import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddData from "../addData/AddData";
import TableRowMenu from "../tableRowMenu/TableRowMenu";

const useStyles = makeStyles((theme) => ({
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

export default function DataTableRow(props) {
  const [showEdit, setShowEdit] = useState(false);
  const classes = useStyles();

  function showEditHandler() {
    setShowEdit(true);
  }

  function hideEditHandler() {
    setShowEdit(false);
  }

  function submitDataHandler(id, data) {
    props.submitHandler(id, data, hideEditHandler);
  }

  let rowContent = props.columns.map((column) => {
    const value = props.row[column.id];
    let tableCellData =
      column.format && typeof value === "number" ? column.format(value) : value;

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

    return (
      <TableCell key={column.id} align={column.align}>
        {tableCellData}
      </TableCell>
    );
  });

  if (showEdit) {
    rowContent = (
      <TableCell colSpan={5} padding="none">
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
      className={classes.tableRow}
      hover
      role="checkbox"
      tabIndex={-1}
      key={props.row.code}
    >
      {rowContent}
    </TableRow>
  );
}
