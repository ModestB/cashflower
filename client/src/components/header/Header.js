import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import MenuIcon from '@material-ui/icons/Menu';
import Material from '../../shared/material';
import HeaderAuth from './headerAuth/HeaderAuth';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuth = useSelector(state => state.auth.token !== null);
  const location = useLocation();
  const sectionTitle = isAuth ? location.state.sectionTitle : 'Cashflower';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Material.AppBar
        position="fixed"
        className={`${isAuth ? classes.appBar : ''}`}
      >
        <Material.Toolbar>
          <Material.IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </Material.IconButton>
          <Material.Typography variant="h6" noWrap>
            {sectionTitle}
          </Material.Typography>
          {
            isAuth && <HeaderAuth />
          }
        </Material.Toolbar>
      </Material.AppBar>
    </>
  );
}

export default Header;
