import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function SelectInput(props) {
  return (
    <React.Fragment>
      <InputLabel shrink id="demo-simple-select-label">
        Income Type
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        displayEmpty
        onChange={props.onChangeHandler}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value={"salary"}>Salary</MenuItem>
        <MenuItem value={"gift"}>Gift</MenuItem>
        <MenuItem value={"interest"}>Interest</MenuItem>
      </Select>
    </React.Fragment>
  );
}
