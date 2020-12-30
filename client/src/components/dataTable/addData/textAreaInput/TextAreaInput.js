import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextAreaInput(props) {
  return (
    <TextField
      id="standard-multiline-flexible"
      label={props.label}
      multiline
      rowsMax={4}
      value={props.value ? props.value : ''}
      onChange={props.onChangeHandler}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
