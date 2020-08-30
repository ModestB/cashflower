import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  editInput: {
    marginTop: theme.spacing(1),
  },
  iconRemove: {
    marginLeft: 'auto',
    '&:hover svg': {
      fill: theme.palette.error.main
    }
  },
  iconAdd: {
    marginLeft: 'auto'
  }
}));

export default function SelectInput(props) {
  const userId = useSelector(state => state.auth.userId);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState(props.options);
  const [newOption, setNewOption] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setOptions(props.options);
    setValue(props.value);
  }, [props.options, props.value]);

  const openHandler = () => setOpen(true);

  const closeHandler = () => setOpen(false);

  const onChangeHandler = (e) => {
    if (e.target.value !== "addOption") {
      setValue(e.target.value);
      props.onChangeHandler(e);
    }
  };

  const keyDownHandler = (e) => {
    e.stopPropagation();
  };

  const addOptionKeypressHandler = (e) => {
    if (e.key === "Enter" || e.charCode === 13) {
      addOptionHandler();
    }
  };

  const addOptionHandler = () => {
    if (!newOption) return;
    const optionLabel =
      newOption.substring(0, 1).toUpperCase() +
      newOption.substring(1).toLowerCase();
    const optionValue = newOption.toLowerCase();
    const option = { value: optionValue, label: optionLabel };

    props.addHandler(option, userId);
    setNewOption("");
  };

  const deleteOptionHandler = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    props.deleteHandler(key, userId)
  };

  return (
    <React.Fragment>
      <InputLabel shrink id="demo-simple-select-label">
        {props.label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        displayEmpty
        onChange={onChangeHandler}
        open={open}
        onOpen={openHandler}
        onClose={closeHandler}
      >
        {
          Object.keys(options)
            .map((key) => {
              return (
                <MenuItem key={options[key].value} value={options[key].value}>
                  {options[key].label}
                  {
                    open &&
                    <IconButton 
                      className={classes.iconRemove} 
                      aria-label="delete"
                      onClick={(e) => deleteOptionHandler(e, options[key].key)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  }
                </MenuItem>
              );
            }
          )
        }
        <MenuItem
          value="addOption"
          onClick={openHandler}
          onKeyDown={keyDownHandler}
          className={classes.editInput}
        >
          <TextField
            placeholder={`Add ${props.selectType ? props.selectType : ""} type`}
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={addOptionKeypressHandler}
          />
          <IconButton className={classes.iconAdd} aria-label="add" onClick={addOptionHandler}>
            <AddCircleOutlineIcon />
          </IconButton>
        </MenuItem>
      </Select>
    </React.Fragment>
  );
}
