import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
  table: {
    tableLayout: "fixed",
    width: `calc(100% + ${theme.spacing(2) * 2}px)`,
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
  },
  tableCell: {
    borderBottom: "none",
  },
  formControl: {
    width: "100%",
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
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              {props.columns.map((column) => {
                if (!column.editable) return;
                let input = null;

                switch (column.inputType) {
                  case "date":
                    input = (
                      <DateInput
                        label={column.label}
                        selectedDate={selectedDate}
                        onChangeHandler={setSelectedDate}
                      />
                    );
                    break;
                  case "number":
                    input = (
                      <NumberInput
                        label={column.label}
                        value={amount}
                        onChangeHandler={handleAmountChange}
                      />
                    );
                    break;
                  case "select":
                    input = (
                      <SelectInput
                        label={column.label}
                        value={incomeType}
                        selectType={column.selectType}
                        onChangeHandler={handleIncomeTypeChange}
                        options={column.inputOptions}
                      />
                    );
                    break;
                  case "textArea":
                    input = (
                      <TextAreaInput
                        label={column.label}
                        value={comment}
                        onChangeHandler={handleCommentChange}
                      />
                    );
                    break;

                  default:
                    break;
                }

                return (
                  <TableCell
                    key={column.id}
                    colSpan={column.colspan ? column.colspan : 1}
                    style={{ minWidth: column.minWidth }}
                    className={classes.tableCell}
                  >
                    <FormControl className={classes.formControl}>
                      {input}
                    </FormControl>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>

        <Grid
          className={classes.actionsContainer}
          container
          item
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
