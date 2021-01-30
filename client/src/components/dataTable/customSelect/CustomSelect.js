import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 110,
  },
  select: {
    padding: '10px 14px',
  },
}));

function CustomSelect({
  value,
  label,
  onChangeHandler,
  items,
}) {
  const classes = useStyles();
  return (
    <Material.FormControl variant="outlined" className={classes.formControl}>
      <Material.InputLabel
        id={`custom-select-label-${label.toLowerCase()}`}
      >
        {label}
      </Material.InputLabel>
      <Material.Select
        labelId={`custom-select-label-${label.toLowerCase()}`}
        id={`custom-select-${label.toLowerCase()}`}
        value={value}
        onChange={onChangeHandler}
        label={label}
        classes={{ select: classes.select }}
      >
        {
          items.map((item) => (
            <Material.MenuItem
              key={`${label.toLowerCase()}${item}`}
              value={item}
            >
              {item}
            </Material.MenuItem>
          ))
        }
      </Material.Select>
    </Material.FormControl>
  );
}

CustomSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default CustomSelect;
