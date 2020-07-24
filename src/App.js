import React from "react";

import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from "./components/sidebar/Sidebar";
import Income from "./domain/income/Income";
import Monthly from "./domain/monthly/Monthly";
import Plans from "./domain/plans/Plans";
import TotalInvestments from "./domain/totalInvestments/TotalInvestments";

import { makeStyles } from "@material-ui/core";

import "./App.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Sidebar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Income} />
            <Route path="/monthly" component={Monthly} />
            <Route path="/plans" component={Plans} />
            <Route path="/total" component={TotalInvestments} />
          </Switch>
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
