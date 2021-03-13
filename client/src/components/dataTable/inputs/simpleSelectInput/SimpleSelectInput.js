import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Material from '../../../../shared/material';

function SimpleSelectInput({
  options,
  value,
  onChangeHandler,
  label,
  disabled,
}) {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    onChangeHandler(e.target.value);
  };

  return (
    <>
      <Material.InputLabel shrink id="demo-simple-select-label">
        {label}
      </Material.InputLabel>
      <Material.Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        displayEmpty
        onChange={onChange}
        open={open}
        onOpen={openHandler}
        onClose={closeHandler}
        disabled={disabled}
      >
        {
          Object.keys(options)
            .map((key) => (
              <Material.MenuItem key={key} value={key}>
                {options[key].label}
              </Material.MenuItem>
            ))
        }
      </Material.Select>
    </>
  );
}

SimpleSelectInput.defaultProps = {
  disabled: false,
};

SimpleSelectInput.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default SimpleSelectInput;
