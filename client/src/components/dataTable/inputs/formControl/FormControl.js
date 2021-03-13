import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../../shared/material';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flex: '1 1 0px',
  },
}));

const FormControl = ({ children }) => {
  const classes = useStyles();
  return (
    <Material.FormControl
      className={classes.formControl}
    >
      { children }
    </Material.FormControl>
  );
};

FormControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormControl;
