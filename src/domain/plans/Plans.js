import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import YearlyPlansTable from "./yearlyPlansTable/YearlyPlansTable"

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
      dateFormat: "YYYY",
      minWidth: 170,
    },
    {
      id: "minPlan",
      label: "Min. Plan",
      editable: true,
      inputType: "number",
      minWidth: 100,
    },
    {
      id: "yearlyPlan",
      label: "Yearly Plan",
      editable: true,
      inputType: "number",
      minWidth: 100,
    },
    {
      id: "invested",
      label: "Invested",
      editable: false,
      inputType: "number",
      minWidth: 100,
      colspan: 2,
    },
    {
      id: "edit",
      label: "",
      minWidth: 50,
    },
  ],
};

const tableData = [
  { id: "1", date: "2019-05-12", minPlan: 900, yearlyPlan: 1200, invested: "" },
  { id: "2", date: "2011-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "3", date: "2015-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "4", date: "2018-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "5", date: "2020-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
];

function Plans() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <YearlyPlansTable
            tableColumns={tableColumns}
            tableData={tableData}
            submitBtnLabel={"Add Yearly Plan"}
            editBtnLabel={"Save Yearly Plan"}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>Graph</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Plans;
