import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

function DateInput({
  label,
  selectedDate,
  onChangeHandler,
  onOpenHandler,
  onCloseHandler,
  dateFormat,
}) {
  let datePickerView = ['year', 'date', 'month'];
  if (dateFormat === 'yyyy') {
    datePickerView = ['year'];
  }
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format={dateFormat}
      id="date-picker-inline"
      label={label}
      value={selectedDate}
      onChange={onChangeHandler}
      views={datePickerView}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
    />
  );
}

DateInput.defaultProps = {
  onOpenHandler: () => {},
  onCloseHandler: () => {},
  dateFormat: 'MM/dd/yyyy',
};

DateInput.propTypes = {
  onOpenHandler: PropTypes.func,
  onCloseHandler: PropTypes.func,
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
};

export default DateInput;
