import React, { useState } from "react";
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
import CircularProgress from '@material-ui/core/CircularProgress';
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
  progress: {
    marginLeft: theme.spacing(2),
  },
}));

export default function AddData(props) {
  const [loading, setLoading] = useState(false)
  const classes = useStyles();

  const addDataHandler = () => {
    setLoading(true);
    props.addDataHandler();
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
                        selectedDate={props.dataValues[column.id]}
                        onChangeHandler={props.dataChangeHandlers[column.id]}
                      />
                    );
                    break;
                  case "number":
                    input = (
                      <NumberInput
                        label={column.label}
                        value={props.dataValues[column.id]}
                        onChangeHandler={props.dataChangeHandlers[column.id]}
                      />
                    );
                    break;
                  case "select":
                    input = (
                      <SelectInput
                        label={column.label}
                        value={props.dataValues[column.id]}
                        selectType={column.selectType}
                        onChangeHandler={props.dataChangeHandlers[column.id]}
                        options={column.inputOptions}
                      />
                    );
                    break;
                  case "textArea":
                    input = (
                      <TextAreaInput
                        label={column.label}
                        value={props.dataValues[column.id]}
                        onChangeHandler={props.dataChangeHandlers[column.id]}
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
              {
                props.emptyCellSpan &&
                <TableCell
                  colSpan={props.emptyCellSpan}
                  className={classes.tableCell}
                />
              }
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
            onClick={addDataHandler}
          > 
            {
              !loading ?
              props.submitButtonLabel
              :
              <React.Fragment>
                Saving <CircularProgress className={classes.progress} color='secondary' size={20}/>
              </React.Fragment>       
            }
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
