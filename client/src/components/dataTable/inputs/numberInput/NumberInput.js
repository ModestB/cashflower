import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function NumberInput({
  label,
  value,
  onChangeHandler,
}) {
  return (
    <TextField
      id="standard-number"
      label={label}
      type="number"
      value={value}
      onChange={onChangeHandler}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default NumberInput;
