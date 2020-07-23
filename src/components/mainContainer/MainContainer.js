import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DataTable from "../dataTable/DataTable";

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

export default function MainContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable
            tableColumns={props.tableColumns}
            tableData={props.tableData}
            submitBtnLabel={props.submitBtnLabel}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>Graph</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
