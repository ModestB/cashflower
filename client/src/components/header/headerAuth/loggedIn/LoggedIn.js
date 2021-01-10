import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { authLogout } from '../../../../store/actions/actions';
import Material from '../../../../shared/material';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuRoot: {
    padding: '0',
  },
  iconButton: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
  },
  menuLabel: {
    margin: `${theme.spacing(1)}px 0`,
  },
  username: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function LoggedIn() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.email);
  const token = useSelector(state => state.auth.token);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(authLogout(token));
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Material.Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Material.MenuItem onClick={handleMenuClose}>Profile</Material.MenuItem>
      <Material.MenuItem onClick={handleLogout}>Logout</Material.MenuItem>
    </Material.Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Material.Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      MenuListProps={{
        classes: {
          root: classes.menuRoot,
        },
      }}
    >
      <Material.MenuItem onClick={handleProfileMenuOpen}>
        <Material.IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.iconButton}
        >
          <AccountCircle />
        </Material.IconButton>
        <p className={classes.menuLabel}>Profile</p>
      </Material.MenuItem>
      <Material.MenuItem onClick={handleLogout}>
        <Material.IconButton
          aria-label="logout"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.iconButton}
        >
          <ExitToAppIcon />
        </Material.IconButton>
        <p className={classes.menuLabel}>
          Logout
        </p>
      </Material.MenuItem>
    </Material.Menu>
  );

  return (
    <div className={classes.grow}>
      <div className={classes.sectionDesktop}>
        <Material.Typography className={classes.username}>{username}</Material.Typography>
        <Material.IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </Material.IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <Material.IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </Material.IconButton>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
