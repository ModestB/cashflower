import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function NumberInput({
  label,
  value,
  onChangeHandler,
  disabled,
}) {
  return (
    <TextField
      id="standard-number"
      label={label}
      type="number"
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      disabled={disabled}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

NumberInput.defaultProps = {
  disabled: false,
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default NumberInput;
