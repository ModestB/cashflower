import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextAreaInput({
  label,
  value,
  onChangeHandler,
}) {
  return (
    <TextField
      id="standard-multiline-flexible"
      label={label}
      multiline
      rowsMax={4}
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

TextAreaInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default TextAreaInput;
