import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: 'rgba(63, 81, 181, 0.4)',
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  colorSuccess: {
    backgroundColor: 'rgba(76, 175, 80, 0.4)',
  },
  barColorSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  colorDanger: {
    backgroundColor: 'rgba(244, 67, 54, 0.4)',
  },
  barColorDanger: {
    backgroundColor: theme.palette.error.main,
  },
}));

function LoadingTableRow({
  type,
  colSpan,
}) {
  const classes = useStyles();
  let color = null;
  let bgColor = null;

  switch (type) {
    case 'success':
      color = classes.colorSuccess;
      bgColor = classes.barColorSuccess;
      break;
    case 'danger':
      color = classes.colorDanger;
      bgColor = classes.barColorDanger;
      break;
    default:
      color = classes.colorPrimary;
      bgColor = classes.barColorPrimary;
      break;
  }

  return (
    <Material.TableRow>
      <Material.TableCell colSpan={colSpan}>
        <Material.LinearProgress
          classes={{ colorPrimary: color, barColorPrimary: bgColor }}
        />
      </Material.TableCell>
    </Material.TableRow>
  );
}

LoadingTableRow.propTypes = {
  type: PropTypes.string,
  colSpan: PropTypes.number.isRequired,
};

LoadingTableRow.defaultProps = {
  type: '',
};

export default LoadingTableRow;
