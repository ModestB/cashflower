import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Material from '../../../shared/material';
import { TableSettingsContext } from '../../../context/TableSettingsContext';
import DateInput from '../inputs/dateInput/DateInput';
import NumberInput from '../inputs/numberInput/NumberInput';
import SelectInput from '../inputs/selectInput/SelectInput';
import TextInput from '../inputs/textInput/TextInput';
import useOnClickOutside from '../../../shared/hooks/useOnClickOutside';
import StyledButton from '../../buttons/StyledButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    tableLayout: 'fixed',
    width: `calc(100% + ${theme.spacing(2) * 2}px)`,
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
  },
  tableCell: {
    borderBottom: 'none',
  },
  formControl: {
    width: '100%',
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
    textTransform: 'none',
  },
  progress: {
    marginLeft: theme.spacing(2),
  },
}));

function EditData({
  addTypeHandler,
  deleteTypeHandler,
  selectAddLoading,
  selectDeleteLoading,
  submitButtonLabel,
  cancelHandler,
  editDataHandler,
  values,
  valuesChangeHandlers,
  selectOptions,
}) {
  const { tableSettings } = useContext(TableSettingsContext);
  const [loading, setLoading] = useState(false);
  const [disableClickOutside, setDisableClickOutside] = useState(false);

  const classes = useStyles();
  const editRef = useRef();

  useOnClickOutside(editRef, () => !disableClickOutside && cancelHandler());

  const dataValueChangeHandler = () => {
    if (loading) {
      setLoading(false);
      cancelHandler();
    }
  };

  useEffect(dataValueChangeHandler, [values]);

  const submitHandler = () => {
    setLoading(true);
    editDataHandler();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Material.Grid container className={classes.root} ref={editRef}>
        <Material.Table className={classes.table}>
          <Material.TableBody>
            <Material.TableRow>
              {Object.values(tableSettings)
                .map((column) => {
                  let input = null;
                  if (!column.inputType) return null;

                  switch (column.inputType) {
                    case 'date':
                      input = (
                        <DateInput
                          label={column.label}
                          selectedDate={values[column.id]}
                          onChangeHandler={valuesChangeHandlers[column.id]}
                          onOpenHandler={() => setDisableClickOutside(true)}
                          onCloseHandler={() => setDisableClickOutside(false)}
                          dateFormat={column.dateFormat}
                        />
                      );
                      break;
                    case 'number':
                      input = (
                        <NumberInput
                          label={column.label}
                          value={values[column.id]}
                          onChangeHandler={valuesChangeHandlers[column.id]}
                          disabled={!column.editable}
                        />
                      );
                      break;
                    case 'select':
                      input = (
                        <SelectInput
                          onOpenHandler={() => setDisableClickOutside(true)}
                          onCloseHandler={() => setDisableClickOutside(false)}
                          label={column.label}
                          value={values[column.id].id}
                          selectType={column.selectType}
                          onChangeHandler={valuesChangeHandlers[column.id]}
                          options={
                            typeof selectOptions[column.id] === 'object' && selectOptions[column.id] !== null ?
                              Object.values(selectOptions[column.id])
                              : selectOptions[column.id]
                          }
                          addHandler={addTypeHandler}
                          deleteHandler={deleteTypeHandler}
                          selectAddLoading={selectAddLoading}
                          selectDeleteLoading={selectDeleteLoading}
                        />
                      );
                      break;
                    case 'textArea':
                      input = (
                        <TextInput
                          label={column.label}
                          value={values[column.id]}
                          onChangeHandler={valuesChangeHandlers[column.id]}
                        />
                      );
                      break;

                    default:
                      break;
                  }

                  if (column.inputType === 'edit') {
                    return null;
                  }

                  return (
                    <Material.TableCell
                      key={column.id}
                      colSpan={column.headerColSpan ? column.headerColSpan : 1}
                      style={{ minWidth: column.minWidth }}
                      className={classes.tableCell}
                    >
                      <Material.FormControl className={classes.formControl}>
                        {input}
                      </Material.FormControl>
                    </Material.TableCell>
                  );
                })}
            </Material.TableRow>
          </Material.TableBody>
        </Material.Table>

        <Material.Grid
          className={classes.actionsContainer}
          container
          item
          xs={12}
          justify="flex-end"
        >
          <Material.Button
            className={classes.button}
            color="secondary"
            size="small"
            onClick={() => cancelHandler()}
          >
            Cancel
          </Material.Button>
          <StyledButton
            variant="contained"
            color="success"
            className={classes.button}
            size="small"
            onClick={submitHandler}
          >
            {
              !loading ?
                submitButtonLabel
                : (
                  <>
                    Saving
                    <Material.CircularProgress className={classes.progress} color="secondary" size={20} />
                  </>
                )
            }
          </StyledButton>
        </Material.Grid>
      </Material.Grid>
    </MuiPickersUtilsProvider>
  );
}

EditData.propTypes = {
  cancelHandler: PropTypes.func.isRequired,
  addTypeHandler: PropTypes.func.isRequired,
  deleteTypeHandler: PropTypes.func.isRequired,
  selectAddLoading: PropTypes.bool.isRequired,
  selectDeleteLoading: PropTypes.bool.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  editDataHandler: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.object]).isRequired,
  valuesChangeHandlers: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditData;
