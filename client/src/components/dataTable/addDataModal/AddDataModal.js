import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';
import DateInput from '../inputs/dateInput/DateInput';
import NumberInput from '../inputs/numberInput/NumberInput';
import SelectInput from '../inputs/selectInput/SelectInput';
import TextAreaInput from '../inputs/textAreaInput/TextAreaInput';
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
    outline: 'none',
    width: '1000px',
    height: '160px',
  },
  formRow: {
    margin: `0 -${theme.spacing(1)}px`,
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
  },
}));

function AddDataModal({
  openModalHandler,
  openModal,
  columnsSettings,
  dataValues,
  dataChangeHandlers,
  selectOptions,
  addTypeHandler,
  deleteTypeHandler,
  selectAddLoading,
  selectDeleteLoading,
  addDataHandler,
}) {
  const classes = useStyles();

  const handleClose = () => {
    openModalHandler(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Material.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Material.Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Material.Fade in={openModal}>
          <Material.Paper className={classes.paper}>
            <Material.Grid container>
              <Material.Grid item xs={12}>
                <Material.Box className={classes.formRow} display="flex">
                  {Object.values(columnsSettings)
                    .map((column) => {
                      let input = null;

                      switch (column.inputType) {
                        case 'date':
                          input = (
                            <DateInput
                              label={column.label}
                              selectedDate={dataValues[column.id]}
                              onChangeHandler={dataChangeHandlers[column.id]}
                            />
                          );
                          break;
                        case 'number':
                          input = (
                            <NumberInput
                              label={column.label}
                              value={dataValues[column.id]}
                              onChangeHandler={dataChangeHandlers[column.id]}
                            />
                          );
                          break;
                        case 'select':
                          input = (
                            <SelectInput
                              label={column.label}
                              value={dataValues[column.id]}
                              selectType={column.selectType}
                              onChangeHandler={dataChangeHandlers[column.id]}
                              options={selectOptions[column.id]}
                              addHandler={addTypeHandler}
                              deleteHandler={deleteTypeHandler}
                              selectAddLoading={selectAddLoading}
                              selectDeleteLoading={selectDeleteLoading}
                            />
                          );
                          break;
                        case 'textArea':
                          input = (
                            <TextAreaInput
                              label={column.label}
                              value={dataValues[column.id]}
                              onChangeHandler={dataChangeHandlers[column.id]}
                            />
                          );
                          break;

                        default:
                          break;
                      }

                      if (!input) return null;

                      return (
                        <Material.FormControl
                          key={`addDataModal${column.id}`}
                          className={classes.formControl}
                        >
                          {input}
                        </Material.FormControl>
                      );
                    })}
                </Material.Box>
              </Material.Grid>
              <Material.Grid item xs={12}>
                <Material.Box className={classes.buttonRow} display="flex" justifyContent="flex-end">
                  <StyledButton
                    className={classes.button}
                    variant="contained"
                    color="success"
                    onClick={() => addDataHandler()}
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
                </Material.Box>
              </Material.Grid>
            </Material.Grid>
          </Material.Paper>
        </Material.Fade>
      </Material.Modal>
    </MuiPickersUtilsProvider>
  );
}

AddDataModal.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dataValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
  dataChangeHandlers: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addTypeHandler: PropTypes.func.isRequired,
  deleteTypeHandler: PropTypes.func.isRequired,
  selectAddLoading: PropTypes.bool.isRequired,
  selectDeleteLoading: PropTypes.bool.isRequired,
  addDataHandler: PropTypes.func.isRequired,
};

export default AddDataModal;
