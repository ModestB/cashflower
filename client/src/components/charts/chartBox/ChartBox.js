import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';

const useStyles = makeStyles((theme) => ({
  h50: {
    height: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
  },
}));

function ChartByType({ children, height }) {
  const classes = useStyles();

  return (
    <Material.Box
      my={2}
      display="flex"
      className={height !== 'auto' ? classes.h50 : ''}
    >
      <Material.Paper className={classes.paper}>
        { children }
      </Material.Paper>
    </Material.Box>
  );
}

ChartByType.defaultProps = {
  height: '50',
};

ChartByType.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  height: PropTypes.string,
};

export default ChartByType;
