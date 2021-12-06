import React, { useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../../axios';
import { addTransactionSuccess, getTransactions } from '../../../store/actions/actions';
import { errorMessageHandler } from '../../../shared/utilities';
import Material from '../../../shared/material';
import FormModal from '../formModal/FormModal';
import Modal from '../Modal';
import { LoadingContext } from '../../../context/LoadingContext';

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

  categoryInputRoot: {
    color: `${theme.palette.primary.dark} !important`,
    cursor: 'pointer !important',
  },

  categoryInputLabelRoot: {
    color: `${theme.palette.primary.dark} !important`,
  },

  categoryInputAdornmentRoot: {
    color: `${theme.palette.primary.dark} !important`,
    cursor: 'pointer !important',
  },

  categoryNotchedInputOutline: {
    borderColor: `${theme.palette.primary.dark} !important`,
  },

  input: {
    width: '100%',
  },
}));

function AddTransaction({
  openModalHandler,
  openModal,
}) {
  const dispatch = useDispatch();
  const wallets = useSelector(state => state.user.wallets);
  const activeWallet = useSelector(state => state.user.activeWallet);
  const currentDataYear = useSelector(state => state.transactions.currentDataYear);
  const { loading, setLoading } = useContext(LoadingContext);
  // NOTE: transactionCategorys only for testing
  const transactionCategory = useSelector(state => Object.values(state.transactions.categories.expense)[0])
  const [errorAlert, setErrorAlert] = useState('');
  const [activeSelectWallet, setActiveSelectWallet] = useState(activeWallet);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(transactionCategory.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  const handleWalletChange = (event) => {
    setActiveSelectWallet(event.target.value);
  };

  const resetFormData = () => {
    setActiveSelectWallet(activeWallet);
    setSelectedCategory(transactionCategory.id);
    setSelectedDate(new Date());
    setAmount(0);
    setNote('');
  };

  const submitDataHandler = () => {
    setLoading(true);
    axios.post('/transaction', {
      wallet: activeSelectWallet,
      category: selectedCategory,
      amount,
      date: selectedDate,
      comment: note,
    })
      .then((response) => {
        if (response.data.wallet === activeWallet) {
          return dispatch(addTransactionSuccess(response.data, response.data.id));
        }
        return dispatch(getTransactions(currentDataYear, response.data.wallet));
      })
      .then(() => {
        setLoading(false);
        openModalHandler(false);
        resetFormData();
      })
      .catch((error) => {
        setLoading(false);
        setErrorAlert(errorMessageHandler(error));
      });
  };

  return (
    <FormModal
      openModalHandler={openModalHandler}
      openModal={openModal}
      submitButton
      submitButtonLabel="Add Transaction"
      submitDataHandler={submitDataHandler}
      cancelButton
      cancelButtonLabel="Cancel"
      formModalTitle="Add Transaction"
      errorAlert={errorAlert}
      setErrorAlert={setErrorAlert}
    >
      <Material.Grid container spacing={3}>
        <Material.Grid item xs={4}>
          <Material.TextField
            id="select-wallet"
            select
            label="Wallet"
            value={activeSelectWallet}
            onChange={handleWalletChange}
            variant="outlined"
            className={classes.input}
          >
            {wallets.map((wallet) => (
              <Material.MenuItem key={wallet.id} value={wallet.id}>
                {wallet.name}
              </Material.MenuItem>
            ))}
          </Material.TextField>
        </Material.Grid>
        <Material.Grid item xs={4}>
          <Material.TextField
            id="input-with-icon-textfield"
            label="Category"
            variant="outlined"
            value={selectedCategory}
            onClick={(e) => setOpenCategoryModal(true)}
            disabled
            className={classes.input}
            InputLabelProps={{
              classes: {
                root: classes.categoryInputLabelRoot,
              },
            }}
            InputProps={{
              startAdornment: (
                <Material.InputAdornment
                  position="start"
                  classes={{
                    root: classes.categoryInputAdornmentRoot,
                  }}
                >
                  <AccountCircle />
                </Material.InputAdornment>
              ),
              classes: {
                input: classes.categoryInputRoot,
                notchedOutline: classes.categoryNotchedInputOutline,
              },
            }}
          />
          <Modal
            openModalHandler={setOpenCategoryModal}
            openModal={openCategoryModal}
          >
            <span>{transactionCategory.label}</span>
          </Modal>
        </Material.Grid>
        <Material.Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="yyyy/MM/dd"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              className={classes.input}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Material.Grid>
        <Material.Grid item xs={4}>
          <Material.TextField
            id="outlined-number"
            label="Amount"
            type="number"
            value={amount}
            className={classes.input}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <Material.InputAdornment position="end">€</Material.InputAdornment>,
            }}
            variant="outlined"
          />
        </Material.Grid>
        <Material.Grid item xs={8}>
          <Material.TextField
            id="outlined-basic"
            label="Note"
            placeholder="Enter Note"
            variant="outlined"
            className={classes.input}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Material.Grid>
      </Material.Grid>
    </FormModal>
  );
}

AddTransaction.defaultProps = {

};

AddTransaction.propTypes = {
  openModalHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};

export default AddTransaction;