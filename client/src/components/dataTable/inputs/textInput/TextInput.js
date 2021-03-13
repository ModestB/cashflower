import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function TextInput({
  label,
  value,
  onChangeHandler,
  multiline,
  helperText,
}) {
  return (
    <TextField
      id="standard-multiline-flexible"
      label={label}
      multiline={multiline}
      rowsMax={4}
      value={value}
      helperText={helperText}
      onChange={(e) => onChangeHandler(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

TextInput.defaultProps = {
  multiline: false,
  helperText: '',
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  helperText: PropTypes.string,
};

export default TextInput;
