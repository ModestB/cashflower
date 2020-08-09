import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from '@material-ui/core/LinearProgress';

import { getTotalColSpan } from "../../../shared/utility";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: 'rgba(63, 81, 181, 0.4)',
  },
  barColorPrimary: {
    backgroundColor: 	theme.palette.primary.main,
  },
  colorSuccess: {
    backgroundColor: 'rgba(76, 175, 80, 0.4)',
  },
  barColorSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  colorDanger: {
    backgroundColor: 'rgba(244, 67, 54, 0.4)',
  },
  barColorDanger: {
    backgroundColor: theme.palette.error.main,
  }
}));

export default function LoadingTableRow (props) {
  const classes = useStyles();
  let color, bgColor = null; 

  switch (props.type) {
    case 'success':
      color = classes.colorSuccess;
      bgColor = classes.barColorSuccess;
      break;
    case 'danger':
      color = classes.colorDanger;
      bgColor = classes.barColorDanger;
      break;
  
    default:
      color = classes.colorPrimary;
      bgColor = classes.barColorPrimary;
      break;
  }

  return (
    <TableRow> 
      <TableCell colSpan={getTotalColSpan(props.columns)}>
        <LinearProgress classes={{colorPrimary: color, barColorPrimary: bgColor}}/>
      </TableCell>
    </TableRow>
  )
}