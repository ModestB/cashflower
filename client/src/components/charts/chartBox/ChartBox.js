import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
}));

function ChartByType({ children }) {
  const classes = useStyles();

  return (
    <Material.Box my={2} display="flex" className={classes.box}>
      <Material.Paper className={classes.paper}>
        { children }
      </Material.Paper>
    </Material.Box>
  );
}

ChartByType.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ChartByType;
