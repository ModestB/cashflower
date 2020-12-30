import React from "react";

import TextField from "@material-ui/core/TextField";

export default function NumberInput(props) {
  return (
    <TextField
      id="standard-number"
      label={props.label}
      type="number"
      value={props.value ? props.value : ''}
      onChange={props.onChangeHandler}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
