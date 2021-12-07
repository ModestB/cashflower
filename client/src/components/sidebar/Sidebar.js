import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Material from '../../shared/material';
import { ReactComponent as MainLogo } from '../../shared/logos/logo.svg';
import mainTheme from '../../themes/defaultTheme';

const SIDEBAR_ITEMS = [
  {
    text: 'Transactions',
    icon: <ReceiptIcon />,
    location: { pathname: '/', state: { sectionTitle: 'Transactions' } },
  },
  {
    text: 'Income',
    icon: <AccountBalanceIcon />,
    location: { pathname: '/income', state: { sectionTitle: 'Income' } },
  },
  {
    text: 'Investments',
    icon: <EqualizerIcon />,
    location: {
      pathname: '/investments',
      state: { sectionTitle: 'Investments' },
    },
  },
  {
    text: 'Investment Goals',
    icon: <AssignmentIcon />,
    location: {
      pathname: '/investmentGoals',
      state: { sectionTitle: 'Investment Goals' },
    },
  },
  {
    text: 'Overview',
    icon: <AssessmentIcon />,
    location: {
      pathname: '/overview',
      state: { sectionTitle: 'Overview' },
    },
  },
];

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.light,
    width: theme.drawerWidth,
    boxShadow: theme.shadows[4],
  },
  sidebarTitle: {
    padding: '16px',
  },
  listItemText: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}));

const ListItemWithStyles = withStyles(theme => ({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,

    '& svg': {
      fontSize: '30px',
      fill: theme.palette.text.muted,
    },

    '&$selected ': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,

      '& svg': {
        fill: theme.palette.primary.contrastText,
      },
    },

    '&$selected:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,

      '& svg': {
        fill: theme.palette.primary.contrastText,
      },
    },

    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: 'transparent',

      '& svg': {
        fill: theme.palette.primary.dark,
      },
    },
  },
  selected: {},
}))(props => <Material.ListItem {...props} />);

function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const initIndex = SIDEBAR_ITEMS
      .findIndex(item => item.location.pathname === location.pathname);

    setSelectedIndex(initIndex);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Material.Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={2}
      >
        <MainLogo
          fill={mainTheme.palette.primary.dark}
          width="40px"
          height="40px"
        />
      </Material.Box>

      <Material.List>
        {SIDEBAR_ITEMS.map((listItem, index) => (
          <ListItemWithStyles
            button
            key={listItem.text}
            component={Link}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            to={listItem.location}
            className={classes.listItem}
          >
            <Material.ListItemIcon>
              {listItem.icon}
            </Material.ListItemIcon>
            <Material.ListItemText className={classes.listItemText} primary={listItem.text} />
          </ListItemWithStyles>
        ))}
      </Material.List>
      <Material.Divider />
    </>
  );

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Material.Hidden smUp implementation="css">
          <Material.Drawer
            container={window.document.body}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Material.Drawer>
        </Material.Hidden>
        <Material.Hidden xsDown implementation="css">
          <Material.Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Material.Drawer>
        </Material.Hidden>
      </nav>
    </>
  );
}

export default Sidebar;
