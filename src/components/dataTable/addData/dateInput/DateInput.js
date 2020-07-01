import React from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";

export default function DateInput(props) {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      id="date-picker-inline"
      label="Date picker inline"
      value={props.selectedDate}
      onChange={props.onChangeHandler}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
}
