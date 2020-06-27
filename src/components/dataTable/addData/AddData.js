import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    minWidth: 170,
    marginRight: theme.spacing(2),
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: "none",
  },
}));

export default function AddData(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [incomeType, setIncomeType] = useState("");
  const [comment, setComment] = useState("");

  const handleIncomeTypeChange = (event) => {
    setIncomeType(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.root}>
        <Grid container xs={12} wrap="nowrap">
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={setSelectedDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-label">
              Income Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={incomeType}
              displayEmpty
              onChange={handleIncomeTypeChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"salary"}>Salary</MenuItem>
              <MenuItem value={"gift"}>Gift</MenuItem>
              <MenuItem value={"interest"}>Interest</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-multiline-flexible"
              label="Multiline"
              multiline
              rowsMax={4}
              value={comment}
              onChange={handleCommentChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          className={classes.actionsContainer}
          container
          xs={12}
          justify="flex-end"
        >
          <Button className={classes.button} color="secondary" size="small">
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            variant="contained"
          >
            Add Income
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
