import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Person from '@material-ui/icons/Person';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { authLogout } from '../../../../store/actions/actions';
import Material from '../../../../shared/material';
import StyledButton from '../../../buttons/StyledButton';

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

  listItemProfile: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    '&:hover, &.Mui-focusVisible': {
      backgroundColor: 'transparent',
      cursor: 'initial',
    },
  },

  listItemProfileSelected: {
    backgroundColor: 'transparent',
  },

  verticalDivider: {
    marginRight: '15px',
    backgroundColor: theme.palette.primary.dark,
  },

  buttonAdd: {
    fontWeight: '700',
  },
}));

const IconButtonWithStyles = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },

    '& svg:nth-child(2)': {
      fontSize: '30px',
      fill: theme.palette.primary.dark,
    },
  },
}))(props => <Material.IconButton {...props} />);

export default function LoggedIn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const username = useSelector(state => state.auth.email);
  const token = useSelector(state => state.auth.token);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [addButton, setAddButton] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';

  useEffect(() => {
    if (location.pathname === '/') {
      setAddButton(
        <Material.Box py={2} pr={2}>
          <StyledButton variant="contained" color="success" className={classes.buttonAdd}>
            Add Income
          </StyledButton>
        </Material.Box>,
      );
    } else {
      setAddButton(null);
    }
  }, [location]);

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

  const renderMenu = (
    <Material.Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Material.MenuItem
        classes={{
          root: classes.listItemProfile,
          selected: classes.listItemProfileSelected,
        }}
      >
        {username}
      </Material.MenuItem>
      <Material.Divider />
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
        {addButton}
        <IconButtonWithStyles
          edge="end"
          disableRipple
          disableFocusRipple
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Material.Divider
            orientation="vertical"
            flexItem
            classes={{ root: classes.verticalDivider }}
          />
          <Person />
          <KeyboardArrowDownIcon />
        </IconButtonWithStyles>
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
