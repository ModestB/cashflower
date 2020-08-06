import React, {  useEffect, useCalback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../store/actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/dataTable/DataTable";
import IncomeTable from "./incomeTable/IncomeTable";
 
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

const tableColumns = {
  columns: [
    {
      id: "date",
      label: "Date",
      editable: true,
      inputType: "date",
      dateFormat: "YYYY-MM-DD",
      minWidth: 170,
    },
    {
      id: "amount",
      label: "Amount",
      editable: true,
      inputType: "number",
      minWidth: 100,
    },
    {
      id: "type",
      label: "Income type",
      selectType: "income",
      editable: true,
      inputType: "select",
      inputOptions: [
        { value: "", label: "None" },
        { value: "winnings", label: "Winnings" },
        { value: "salary", label: "Salary" },
        { value: "gift", label: "Gift" },
        { value: "interest", label: "Interest" },
      ],
      minWidth: 170,
    },
    {
      id: "comment",
      label: "Comment",
      editable: true,
      inputType: "textArea",
      minWidth: 170,
      colspan: 2,
    },
    {
      id: "edit",
      label: "",
      minWidth: 50,
    },
  ],
};

function Income(props) {
  const dispatch = useDispatch();
  const incomeData = useSelector(state => state.income)

  const classes = useStyles();

  // const initIncomeData = useCalback(
  //   () => props.getAllIncomeData(),
  //   []
  // )
  useEffect(() => {
    // props.getAllIncomeData()
    dispatch(actions.getAllIncomeData())
    console.log('s')
    // console.log('s')
  }, [])

  useEffect(() => {
    console.log(incomeData)
  }, [incomeData])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IncomeTable
            tableColumns={tableColumns}
            tableData={incomeData}
            submitBtnLabel="Add Income"
            editBtnLabel="Save Income"
          />
          {/* <DataTable
            tableColumns={tableColumns}
            tableData={tableData}
            submitBtnLabel="Add Income"
          /> */}
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>Graph</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

// export default connect(undefined, mapDispatchToProps)(Income);
export default Income;
