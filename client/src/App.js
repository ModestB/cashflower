import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { authCheck } from './store/actions/actions';

import Welcome from './domain/welcome/Welcome';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import WalletSidebar from './components/walletSidebar/WalletSidebar';
import Income from './domain/income/Income';
import Transactions from './domain/transactions/Transactions';
import Investments from './domain/investments/Investments';
import InvestmentGoals from './domain/investmentGoals/InvestmentGoals';
import Overview from './domain/overview/Overview';
import Material from './shared/material';

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
  contentWithDrawer: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100% - ${theme.drawerWidth}px)`,
    height: `calc(100vh - ${theme.toolbarHeight.desktop}px)`,
    marginLeft: theme.drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const isAuth = useSelector(state => state.user.token !== null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const initLoad = () => {
    dispatch(authCheck());
  };

  useEffect(initLoad, []);

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
                <main className={classes.contentWithDrawer}>
                  <div className={classes.toolbar} />
                  <Material.Box display="flex">
                    <WalletSidebar />
                    <Switch>
                      <Route exact path="/" component={Transactions} />
                      <Route path="/income" component={Income} />
                      <Route path="/investments" component={Investments} />
                      <Route path="/investmentGoals" component={InvestmentGoals} />
                      <Route path="/overview" component={Overview} />
                    </Switch>
                  </Material.Box>
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
