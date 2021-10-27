import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../shared/material';

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
    width: '1000px',
    minHeight: '160px',
  },

  content: {
    padding: theme.spacing(2, 4, 3),
  },
}));

function Modal({
  openModalHandler,
  openModal,
  children,
  labelledby,
  describedby,
}) {
  console.log(openModal, openModalHandler)
  const classes = useStyles();
  const handleClose = () => {
    openModalHandler(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Material.Modal
        aria-labelledby={labelledby}
        aria-describedby={describedby}
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
          { children }
        </Material.Fade>
      </Material.Modal>
    </MuiPickersUtilsProvider>
  );
}

Modal.defaultProps = {
  labelledby: '',
  describedby: '',
};

Modal.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  labelledby: PropTypes.string,
  describedby: PropTypes.string,
};

export default Modal;
