import React from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl';

import DateInput from './dateInput/DateInput';
import NumberInput from './numberInput/NumberInput';
import SelectInput from './selectInput/SelectInput';
import TextAreaInput from './textAreaInput/TextAreaInput';
import StyledButton from '../../buttons/StyledButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  },
  formRow: {
    margin: `0 -${theme.spacing(1)}px`
  },
  formControl: {
    margin: theme.spacing(1),
    flex: '1 1 0px',
  },
  buttonRow: {
    margin: `0 -${theme.spacing(1)}px`,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export default function AddDataModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.openModalHandler(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <Paper className={classes.paper} >
            <Grid container>
              <Grid item xs={12}>
                <Box className={classes.formRow} display='flex' >
                  {Object.keys(props.columnsSettings)
                  .map(key => props.columnsSettings[key]) 
                  .map((column) => {
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
                            options={props.selectOptions[column.id]}
                            addHandler={props.addTypeHandler}
                            deleteHandler={props.deleteTypeHandler}
                            selectAddLoading={props.selectAddLoading}
                            selectDeleteLoading={props.selectDeleteLoading}
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
                      <FormControl className={classes.formControl} >
                        {input}
                      </FormControl>
                    );
                  })}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.buttonRow}  display="flex" justifyContent="flex-end">
                  <StyledButton
                    className={classes.button}
                    variant="contained"
                    color="success"
                    onClick={() => props.addDataHandler()}
                  >
                    Add
                  </StyledButton>
                  <StyledButton
                    className={classes.button}
                    variant="contained"
                    color="danger"
                    onClick={handleClose}
                  >
                    Cancel
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Modal>
    </MuiPickersUtilsProvider>
  );
}
