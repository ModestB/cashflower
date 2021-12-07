import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Material from '../../shared/material';
import HeaderAuth from './headerAuth/HeaderAuth';
import { ReactComponent as MainLogo } from '../../shared/logos/logo.svg';
import mainTheme from '../../themes/defaultTheme';

const useStyles = makeStyles((theme) => ({
  appBarAuth: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
      marginLeft: theme.drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  mainLogo: {
    marginRight: '10px',
  },
}));

function Header() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuth = useSelector(state => state.user.token !== null);
  const headerTitle = useSelector(state => state.general.headerTitle);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Material.AppBar
        position="fixed"
        elevation={4}
        className={`${isAuth ? classes.appBarAuth : ''}`}
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
          {
            !isAuth && (
              <MainLogo
                className={classes.mainLogo}
                fill={mainTheme.palette.primary.dark}
                width="35px"
                height="35px"
              />
            )
          }
          <Material.Typography variant="h6" noWrap>
            {headerTitle}
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
