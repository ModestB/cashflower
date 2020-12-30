import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SidebarAuth from "./sidebarAuth/SidebarAuth";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  sidebarTitle: {
    padding: "16px",
  },
}));

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let location = useLocation();
  let sectionTitle = !location.state ? "Income" : location.state.sectionTitle;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItems = [
    {
      text: "Income",
      icon: <AccountBalanceIcon />,
      location: { pathname: "/", state: { sectionTitle: "Income" } },
    },
    // {
    //   text: "Monthly Investments",
    //   icon: <DateRangeIcon />,
    //   location: {
    //     pathname: "/monthly",
    //     state: { sectionTitle: "Monthly Investments" },
    //   },
    // },
    // {
    //   text: "Total Investments",
    //   icon: <AssessmentIcon />,
    //   location: {
    //     pathname: "/total",
    //     state: { sectionTitle: "Total Investments" },
    //   },
    // },
    // {
    //   text: "Investments Plans",
    //   icon: <AssignmentIcon />,
    //   location: {
    //     pathname: "/plans",
    //     state: { sectionTitle: "Investments Plans" },
    //   },
    // },
  ];

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbar} />
      <Typography className={classes.sidebarTitle} variant="h6">
        CashFlower
      </Typography>
      <Divider />

      <List>
        {listItems.map((listItem) => (
          <ListItem
            button
            key={listItem.text}
            component={Link}
            to={listItem.location}
          >
            <ListItemIcon>{listItem.icon}</ListItemIcon>
            <ListItemText primary={listItem.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </React.Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {sectionTitle}
          </Typography>
          <SidebarAuth />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
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
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}

export default Sidebar;
