import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
  tableCellEdit: {
    padding: 0,
  },
  tableTotalRow: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
}));

export default function DataTableRow(props) {
  const [showEdit, setShowEdit] = useState(false);
  const classes = useStyles();
  let rowContent = null;

  useEffect(() => {
    setShowEdit(false);
  }, [props.row])

  const showEditDataHandler = () => {
    setShowEdit(true);
    props.editDataHandler(props.row.id)
  }

  const cancelHandler = () => {
    setShowEdit(false);
  }

  if (!showEdit) {
    rowContent = props.columns.map((column) => {
      const value = props.row[column.id];
      let tableCellData =
        column.format && typeof value === "number"
          ? column.format(value)
          : value;
  
      if (column.id === "type") {
        tableCellData = value ? 
          value.charAt(0).toUpperCase() + value.slice(1) :
          "";
      }
  
      if (column.id === "edit") {
        tableCellData = (
          <div className={classes.tableCellActions}>
            <TableRowMenu
              id={props.row.id}
              deleteHandler={props.deleteHandler}
              showEditHandler={showEditDataHandler}
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
    rowContent = 
      <TableCell
        className={classes.tableCellEdit}
        colSpan={props.columns.length}
      >
        {React.cloneElement(
          props.children, 
          {cancelHandler}
        )}      
      </TableCell>
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
