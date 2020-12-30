import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TotalTable from "./totalTable/TotalTable";

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
      label: "Year",
      editable: false,
      inputType: "date",
      dateFormat: "YYYY",
      minWidth: 170,
    },
    {
      id: "p2p",
      label: "P2P",
      editable: false,
      inputType: "number",
      countable: true,
      countableSummary: true,
      minWidth: 100,
    },
    {
      id: "stocks",
      label: "Stocks",
      editable: false,
      inputType: "number",
      countable: true,
      countableSummary: true,
      minWidth: 100,
    },
    {
      id: "total",
      label: "Total",
      editable: false,
      inputType: "number",
      countableTotal: true,
      countableSummary: true,
      minWidth: 100,
    },
  ],
  tableOptions: {
    totalSummary: true,
  },
};

const tableData = [
  { id: "1", date: "2019-05-12", p2p: 850, stocks: 400, total: "" },
  { id: "2", date: "2011-05-12", p2p: 50, stocks: 400, total: "" },
  { id: "3", date: "2015-05-12", p2p: 900, stocks: 300, total: "" },
  { id: "4", date: "2018-05-12", p2p: 100, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
];

const TotatInvestments = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TotalTable
            tableColumns={tableColumns}
            tableData={tableData}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>Graph</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default TotatInvestments;
