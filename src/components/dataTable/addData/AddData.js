import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateInput from "./dateInput/DateInput";
import NumberInput from "./numberInput/NumberInput";
import SelectInput from "./selectInput/SelectInput";
import TextAreaInput from "./textAreaInput/TextAreaInput";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
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
  const [amount, setAmount] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (props.date) setSelectedDate(new Date(props.date));
    if (props.amount) setAmount(props.amount);
    if (props.incomeType) setIncomeType(props.incomeType.toLowerCase());
    if (props.comment) setComment(props.comment);
  }, [props.date, props.amount, props.incomeType, props.comment]);

  const handleIncomeTypeChange = (event) => {
    setIncomeType(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const addDataHandler = () => {
    const fomatedDate = selectedDate.toISOString().split("T")[0];

    props.submitHandler(
      {
        date: fomatedDate,
        amount: amount,
        type: incomeType,
        comment: comment,
      },
      props.id
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.root}>
        <Grid container xs={12} wrap="nowrap">
          {props.columns.map((column) => {
            if (!column.editable) return;

            switch (column.inputType) {
              case "date":
                return (
                  <FormControl className={classes.formControl}>
                    <DateInput
                      selectedDate={selectedDate}
                      onChangeHandler={setSelectedDate}
                    />
                  </FormControl>
                );
              case "number":
                return (
                  <FormControl className={classes.formControl}>
                    <NumberInput
                      value={amount}
                      onChangeHandler={handleAmountChange}
                    />
                  </FormControl>
                );
              case "select":
                return (
                  <FormControl className={classes.formControl}>
                    <SelectInput
                      value={incomeType}
                      onChangeHandler={handleIncomeTypeChange}
                    />
                  </FormControl>
                );
              case "textArea":
                return (
                  <FormControl className={classes.formControl}>
                    <TextAreaInput
                      value={comment}
                      onChangeHandler={handleCommentChange}
                    />
                  </FormControl>
                );

              default:
                break;
            }
          })}
        </Grid>
        <Grid
          className={classes.actionsContainer}
          container
          xs={12}
          justify="flex-end"
        >
          <Button
            className={classes.button}
            color="secondary"
            size="small"
            onClick={() => props.cancelHandler()}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            variant="contained"
            onClick={() => addDataHandler()}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
