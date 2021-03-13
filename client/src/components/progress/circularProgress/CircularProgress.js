import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';

const useStyles = makeStyles((theme) => ({
  root: {
    animationDuration: '800ms',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  topSuccess: {
    color: theme.palette.success.main,
  },
  topSuccessContrast: {
    color: theme.palette.success.contrastText,
  },
  topDanger: {
    color: theme.palette.error.main,
  },
  topDefault: {
    color: theme.palette.primary.main,
  },
}));

function CircularProgress(props) {
  const classes = useStyles();
  let color = null;

  switch (props.type) {
    case 'success':
      color = classes.topSuccess;
      break;
    case 'successContrast':
      color = classes.topSuccessContrast;
      break;
    case 'danger':
      color = classes.topDanger;
      break;
    default:
      color = classes.topDefault;
      break;
  }

  return (
    <Material.CircularProgress
      className={`${classes.root} ${color}`}
      {...props}
    />
  );
}

CircularProgress.propTypes = {
  type: PropTypes.string,
};

CircularProgress.defaultProps = {
  type: '',
};

export default CircularProgress;
