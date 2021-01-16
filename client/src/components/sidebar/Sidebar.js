import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import Material from '../../shared/material';

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
    width: theme.drawerWidth,
  },
  sidebarTitle: {
    padding: '16px',
  },
}));

function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItems = [
    {
      text: 'Income',
      icon: <AccountBalanceIcon />,
      location: { pathname: '/', state: { sectionTitle: 'Income' } },
    },
    // {
    //   text: 'Monthly Investments',
    //   icon: <DateRangeIcon />,
    //   location: {
    //     pathname: '/monthly',
    //     state: { sectionTitle: 'Monthly Investments' },
    //   },
    // },
    // {
    //   text: 'Total Investments',
    //   icon: <AssessmentIcon />,
    //   location: {
    //     pathname: '/total',
    //     state: { sectionTitle: 'Total Investments' },
    //   },
    // },
    // {
    //   text: 'Investments Plans',
    //   icon: <AssignmentIcon />,
    //   location: {
    //     pathname: '/plans',
    //     state: { sectionTitle: 'Investments Plans' },
    //   },
    // },
  ];

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Material.Typography className={classes.sidebarTitle} variant="h6">
        CashFlower
      </Material.Typography>
      <Material.Divider />

      <Material.List>
        {listItems.map((listItem) => (
          <Material.ListItem
            button
            key={listItem.text}
            component={Link}
            to={listItem.location}
          >
            <Material.ListItemIcon>{listItem.icon}</Material.ListItemIcon>
            <Material.ListItemText primary={listItem.text} />
          </Material.ListItem>
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
