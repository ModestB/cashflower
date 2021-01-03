import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

function DateInput({
  label,
  selectedDate,
  onChangeHandler,
}) {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      id="date-picker-inline"
      label={label}
      value={selectedDate}
      onChange={onChangeHandler}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  );
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default DateInput;
