import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { authCheck } from './store/actions/actions';

import Welcome from './domain/welcome/Welcome';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Income from './domain/income/Income';

import './App.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const isAuth = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        {
          isAuth ?
            (
              <>
                <Sidebar />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Switch>
                    <Route exact path="/" component={Income} />
                    {/* <Route path="/monthly" component={Monthly} />
                    <Route path="/plans" component={Plans} />
                    <Route path="/total" component={Total} /> */}
                  </Switch>
                </main>
              </>
            )
            : (
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Welcome />
              </main>
            )
        }
      </div>
    </>
  );
}

export default App;
