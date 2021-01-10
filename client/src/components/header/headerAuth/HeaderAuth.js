import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LoggedIn from './loggedIn/LoggedIn';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

export default function SidebarAuth() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoggedIn />
    </div>
  );
}
