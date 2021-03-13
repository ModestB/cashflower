import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';
import StyledButton from '../../buttons/StyledButton';
import CircularProgress from '../../progress/circularProgress/CircularProgress';
import Modal from '../Modal';

import { LoadingContext } from '../../../context/LoadingContext';

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
    outline: 'none',
    width: '500px',
    minHeight: '160px',
  },

  formRow: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
    margin: `${theme.spacing(2)}px 0`,
  },

  buttonRow: {
    margin: `0 -${theme.spacing(1)}px`,
  },

  button: {
    flexGrow: 1,
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

  content: {
    padding: theme.spacing(2, 4, 3),
  },
}));

function DisclaimerModal({
  title,
  openModalHandler,
  openModal,
  confirmHandler,
  children,
  submitButtonLabel,
  cancelButtonLabel,
  labelledby,
  describedby,
}) {
  const classes = useStyles();
  const { loading } = useContext(LoadingContext);

  const handleClose = () => {
    openModalHandler(false);
  };

  return (
    <Modal
      openModalHandler={openModalHandler}
      openModal={openModal}
      handleClose={handleClose}
      labelledby={labelledby}
      describedby={describedby}
    >
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
              { title }
            </Material.Typography>
          </Material.Grid>
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
                <StyledButton
                  className={classes.button}
                  variant="contained"
                  color="success"
                  disabled={loading}
                  onClick={() => confirmHandler()}
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
                <StyledButton
                  className={classes.button}
                  variant="contained"
                  color="danger"
                  onClick={handleClose}
                >
                  {cancelButtonLabel}
                </StyledButton>
              </Material.Box>
            </Material.Grid>
          </Material.Grid>
        </Material.Grid>
      </Material.Paper>
    </Modal>
  );
}

DisclaimerModal.defaultProps = {
  title: '',
  submitButtonLabel: 'Confirm',
  cancelButtonLabel: 'Cancel',
  labelledby: '',
  describedby: '',
};

DisclaimerModal.propTypes = {
  title: PropTypes.string,
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  confirmHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  submitButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  labelledby: PropTypes.string,
  describedby: PropTypes.string,
};

export default DisclaimerModal;
