import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 90,
  },
  select: {
    padding: "10px 14px"
  }
}));

export default function CustomSelect({ 
  value,
  label,
  onChangeHandler,
  items
}) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel 
        id={`custom-select-label-${label.toLowerCase()}`}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`custom-select-label-${label.toLowerCase()}`}
        id={`custom-select-${label.toLowerCase()}`}
        value={value}
        onChange={onChangeHandler}
        label={label}
        classes={{ select: classes.select}}
      >
        {
          items.map(item => <MenuItem value={item}>{item}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}