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
        {props.options.map((option) => {
          let value = option === "none" ? "" : option;
          let label = option.charAt(0).toUpperCase() + option.slice(1);

          return <MenuItem value={value}>{label}</MenuItem>;
        })}
      </Select>
    </React.Fragment>
  );
}
