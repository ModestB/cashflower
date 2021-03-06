import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Material from '../../../shared/material';
import StyledButton from '../../buttons/StyledButton';
import CircularProgress from '../../progress/circularProgress/CircularProgress';
import Modal from '../Modal';
import { LoadingContext } from '../../../context/LoadingContext';
import { resetGeneralAlerts } from '../../../store/actions/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width: '1000px',
    minHeight: '160px',
  },

  formRow: {
    margin: `0 -${theme.spacing(1)}px`,
  },

  buttonRow: {
    margin: `0 -${theme.spacing(1)}px`,
  },

  button: {
    margin: theme.spacing(1),
  },

  header: {
    position: 'relative',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(2),
  },

  header__text: {
    color: theme.palette.primary.contrastText,
  },

  header__close: {
    position: 'absolute',
    top: 0,
    right: 0,

    '& svg': {
      fill: theme.palette.primary.contrastText,
      fontSize: '25px',
    },
  },

  content: {
    padding: theme.spacing(2, 4, 3),
  },

  alert__container: {
    padding: theme.spacing(2, 4, 2),
  },

  alert: {
    width: '100%',
  },
}));

function FormModal({
  openModalHandler,
  openModal,
  submitDataHandler,
  children,
  submitButton,
  submitButtonLabel,
  cancelHandler,
  cancelButton,
  cancelButtonLabel,
  formModalTitle,
  labelledby,
  describedby,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const error = useSelector(state => state.general.alerts.error);
  const { loading, setLoading } = useContext(LoadingContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error && error.text && error.place === 'modal') {
      setShowAlert(true);
      setLoading(false);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleAlertClose = () => {
    setShowAlert(false);
    dispatch(resetGeneralAlerts());
  };

  const handleClose = () => {
    openModalHandler(false);
    cancelHandler();
    handleAlertClose();
  };

  return (
    <Modal
      openModalHandler={openModalHandler}
      openModal={openModal}
      handleClose={handleClose}
      labelledby={labelledby}
      describedby={describedby}
    >
      <>
        <Material.Paper className={classes.paper}>
          <Material.Grid container>
            <Material.Grid
              item
              xs={12}
              className={classes.header}
            >
              <Material.Typography
                align="center"
                variant="h5"
                className={classes.header__text}
              >
                {formModalTitle}
              </Material.Typography>
              <Material.IconButton
                className={classes.header__close}
                onClick={handleClose}
              >
                <CloseIcon />
              </Material.IconButton>
            </Material.Grid>
            {
              showAlert && (
                <Material.Grid container className={classes.alert__container}>
                  <Material.Alert
                    severity="error"
                    className={classes.alert}
                    onClose={handleAlertClose}
                  >
                    <Material.AlertTitle>
                      Error
                    </Material.AlertTitle>
                    {error && error.text}
                  </Material.Alert>
                </Material.Grid>
              )
            }
            <Material.Grid container className={classes.content}>
              <Material.Grid item xs={12}>
                <Material.Box className={classes.formRow} display="flex">
                  { children }
                </Material.Box>
              </Material.Grid>
              <Material.Grid item xs={12}>
                <Material.Box
                  className={classes.buttonRow}
                  display="flex"
                  justifyContent="flex-end"
                  pt={2}
                >
                  {
                    submitButton && (
                      <StyledButton
                        className={classes.button}
                        variant="contained"
                        color="success"
                        disableRipple
                        disabled={loading}
                        onClick={() => {
                          handleAlertClose();
                          submitDataHandler();
                        }}
                      >
                        {submitButtonLabel}
                        {
                          loading && (
                            <Material.Box
                              display="flex"
                              alignItems="center"
                              pl={1}
                            >
                              <CircularProgress
                                type="successContrast"
                                size={20}
                                thickness={5}
                              />
                            </Material.Box>
                          )
                        }
                      </StyledButton>
                    )
                  }
                  {
                    cancelButton && (
                      <StyledButton
                        className={classes.button}
                        variant="contained"
                        color="danger"
                        onClick={handleClose}
                      >
                        {cancelButtonLabel}
                      </StyledButton>
                    )
                  }
                </Material.Box>
              </Material.Grid>
            </Material.Grid>
          </Material.Grid>
        </Material.Paper>
      </>
    </Modal>
  );
}

FormModal.defaultProps = {
  submitButton: false,
  submitButtonLabel: 'Add',
  cancelHandler: () => {},
  cancelButtonLabel: 'Cancel',
  cancelButton: false,
  formModalTitle: '',
  labelledby: '',
  describedby: '',
};

FormModal.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  submitDataHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  submitButton: PropTypes.bool,
  submitButtonLabel: PropTypes.string,
  cancelHandler: PropTypes.func,
  cancelButton: PropTypes.bool,
  cancelButtonLabel: PropTypes.string,
  formModalTitle: PropTypes.string,
  labelledby: PropTypes.string,
  describedby: PropTypes.string,
};

export default FormModal;
