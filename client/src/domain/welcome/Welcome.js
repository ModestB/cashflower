import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { changeHeaderTitle } from '../../store/actions/actions';
import Material from '../../shared/material';
import Login from './Login/Login';
import Register from './Register/Regsiter';

const useStyles = makeStyles((theme) => ({
  box: {
    borderRadius: '4px',
    border: `1px solid ${theme.palette.primary.light}`,
  },
  tabsRoot: {
    width: '100%',
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Material.Box p={3}>{children}</Material.Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default function Welcome() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const onInitLoad = () => {
    dispatch(changeHeaderTitle('Cashflower'));
  };

  useEffect(onInitLoad, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Material.Container maxWidth="sm">
        <Material.Box
          className={classes.box}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.tabsRoot}>
            <Material.AppBar position="static" color="default">
              <Material.Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Material.Tab label="Login" {...a11yProps(0)} />
                <Material.Tab label="Register" {...a11yProps(1)} />
              </Material.Tabs>
            </Material.AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
              >
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Register />
              </TabPanel>
            </SwipeableViews>
          </div>
        </Material.Box>
      </Material.Container>
    </>
  );
}
