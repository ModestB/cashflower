import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from './store/actions/actions';

import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from "./components/sidebar/Sidebar";
import Income from "./domain/income/Income";
import Monthly from "./domain/monthly/Monthly";
import Plans from "./domain/plans/Plans";
import Total from "./domain/total/Total";

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
  const [isAuth, setIsAuth] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(authCheck())
  }, []);

  useEffect(() => {
    setIsAuth(token !== null);
  }, [token])

  return (
    <React.Fragment>     
      <CssBaseline />
      <div className={classes.root}>
        <Sidebar />

        {isAuth &&     
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Income} />
              {/* <Route path="/monthly" component={Monthly} />
              <Route path="/plans" component={Plans} />
              <Route path="/total" component={Total} /> */}
            </Switch>
          </main>
        }
      </div>
    </React.Fragment>
  );
}

export default App;
