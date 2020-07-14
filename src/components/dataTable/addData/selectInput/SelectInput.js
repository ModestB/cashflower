import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function SelectInput(props) {
  return (
    <React.Fragment>
      <InputLabel shrink id="demo-simple-select-label">
        {props.label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        displayEmpty
        onChange={props.onChangeHandler}
      >
        {props.options.map((option) => {
          return <MenuItem value={option.value}>{option.label}</MenuItem>;
        })}
      </Select>
    </React.Fragment>
  );
}
