import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Table from "../../components/dataTable/DataTable";

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

const columns = [
  {
    id: "date",
    label: "Date",
    editable: true,
    inputType: "date",
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
    editable: true,
    inputType: "select",
    minWidth: 170,
  },
  {
    id: "comment",
    label: "Comment",
    editable: true,
    inputType: "textArea",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "",
    minWidth: 50,
  },
];

const tableData = [
  { id: "1", date: "2019-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "2", date: "2011-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "3", date: "2015-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "4", date: "2018-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "5", date: "2020-05-12", amount: 900, type: "Salary", comment: "" },
];

function Income() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Table columns={columns} tableData={tableData} />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Graph</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Income;
