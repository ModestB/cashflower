import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Material from '../../../../shared/material';

const useStyles = makeStyles((theme) => ({
  editInput: {
    marginTop: theme.spacing(1),
  },
  iconRemove: {
    marginLeft: 'auto',
    '&:hover svg': {
      fill: theme.palette.error.main,
    },
  },
  iconAdd: {
    marginLeft: 'auto',
  },
}));

function SelectInput({
  onOpenHandler,
  onCloseHandler,
  options,
  onChangeHandler,
  selectAddLoading,
  selectDeleteLoading,
  addHandler,
  deleteHandler,
  label,
  value,
  selectType,
}) {
  const userId = useSelector((state) => state.user.userId);
  const [open, setOpen] = useState(false);
  const [newOption, setNewOption] = useState('');
  const classes = useStyles();

  const openHandler = () => {
    setOpen(true);
    onOpenHandler();
  };

  const closeHandler = () => {
    setOpen(false);
    onCloseHandler();
  };

  const onChange = (e) => {
    if (e.target.value !== 'addOption') {
      onChangeHandler(e.target.value);
    }
  };

  const keyDownHandler = (e) => {
    e.stopPropagation();
  };

  const addOptionHandler = () => {
    if (!newOption || selectAddLoading) return;
    const optionLabel =
      newOption.substring(0, 1).toUpperCase() +
      newOption.substring(1);
    const optionValue = newOption.toLowerCase();
    const option = { value: optionValue, label: optionLabel };

    addHandler(option, userId);
    setNewOption('');
  };

  const addOptionKeypressHandler = (e) => {
    if (e.key === 'Enter' || e.charCode === 13) {
      addOptionHandler();
    }
  };

  const deleteOptionHandler = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectDeleteLoading) return;
    deleteHandler(key, userId);
  };

  return (
    <>
      <Material.InputLabel shrink id="demo-simple-select-label">
        {label}
      </Material.InputLabel>
      <Material.Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        displayEmpty
        onChange={onChange}
        open={open}
        onOpen={openHandler}
        onClose={closeHandler}
      >
        {
          Object.keys(options)
            .map((key) => (
              <Material.MenuItem key={key} value={options[key].id}>
                {options[key].label}
                {
                  open &&
                  (
                    <Material.IconButton
                      className={classes.iconRemove}
                      aria-label="delete"
                      onClick={(e) => deleteOptionHandler(e, key)}
                      disabled={selectDeleteLoading}
                    >
                      <RemoveCircleOutlineIcon />
                    </Material.IconButton>
                  )
                }
              </Material.MenuItem>
            ))
        }
        <Material.MenuItem
          value="addOption"
          onClick={openHandler}
          onKeyDown={keyDownHandler}
          className={classes.editInput}
        >
          <Material.TextField
            placeholder={`Add ${selectType} type`}
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={addOptionKeypressHandler}
          />
          <Material.IconButton className={classes.iconAdd} aria-label="add" onClick={addOptionHandler}>
            {
              !selectAddLoading ?
                <AddCircleOutlineIcon />
                : <Material.CircularProgress size={24} />
            }
          </Material.IconButton>
        </Material.MenuItem>
      </Material.Select>
    </>
  );
}

SelectInput.defaultProps = {
  onOpenHandler: () => {},
  onCloseHandler: () => {},
};

SelectInput.propTypes = {
  onOpenHandler: PropTypes.func,
  onCloseHandler: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  selectAddLoading: PropTypes.bool.isRequired,
  selectDeleteLoading: PropTypes.bool.isRequired,
  addHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selectType: PropTypes.string.isRequired,
};

export default SelectInput;
