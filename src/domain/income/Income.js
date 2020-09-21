import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IncomeTable from "./incomeTable/IncomeTable";
import IncomeGraph from "./incomeGraph/IncomeGraph"
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const columnsSettings = {
  date: {
    id: "date",
    label: "Date",
    editable: true,
    inputType: "date",
    dateFormat: "YYYY-MM-DD",
    minWidth: 200,
  },
  amount: {
    id: "amount",
    label: "Amount",
    editable: true,
    inputType: "number",
    minWidth: 100,
  },
  type: {
    id: "type",
    label: "Income type",
    selectType: "income",
    editable: true,
    inputType: "select",
    minWidth: 170,
  },
  comment: {
    id: "comment",
    label: "Comment",
    editable: true,
    inputType: "textArea",
    minWidth: 170,
    // colspan: 1,
    headerColSpan: 2,
  },
  edit: {
    id: "edit",
    label: "",
    minWidth: 50,
  },
};

function Income(props) {
  const incomeData = useSelector(state => state.income.dataByYear);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <IncomeTable
            columnsSettings={columnsSettings}
            tableData={incomeData}
            submitBtnLabel="Add Income"
            editBtnLabel="Save Income"
          />
        </Grid>
        <Grid item xs={6}>
          <IncomeGraph />
        </Grid>
      </Grid>
    </div>
  );
}

export default Income;
