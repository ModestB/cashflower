import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import LoggedOut from './loggedOut/LoggedOut';
import LoggedIn from './loggedIn/LoggedIn';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

export default function SidebarAuth() {
  const userId = useSelector(state => state.auth.userId);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        userId ?
          <LoggedIn />
          : <LoggedOut />
      }
    </div>
  );
}
