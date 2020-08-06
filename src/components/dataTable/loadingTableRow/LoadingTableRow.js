import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from '@material-ui/core/LinearProgress';

import { getTotalColSpan } from "../../../shared/utility";

export default function LoadingTableRow (props) {
  return (
    <TableRow> 
      <TableCell colSpan={getTotalColSpan(props.columns)}>
        <LinearProgress color="secondary"/>
      </TableCell>
    </TableRow>
  )
}