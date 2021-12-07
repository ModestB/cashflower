import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'validator/lib/isEmpty';
import isInt from 'validator/lib/isInt';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
import Material from '../../../shared/material';
import { addWalletRequested, editWalletRequested, deletetWalletRequested } from '../../../store/actions/actions';
import FormModal from '../../modal/formModal/FormModal';
import DisclaimerModal from '../../modal/disclaimerModal/DisclaimerModal';
import SimpleSelectInput from '../../dataTable/inputs/simpleSelectInput/SimpleSelectInput';
import FormControl from '../../dataTable/inputs/formControl/FormControl';
import { WALLETS_TYPES } from '../../../shared/constants';
import { LoadingContext } from '../../../context/LoadingContext';

const useStyles = makeStyles((theme) => ({
  card: {
    '& *:focus': {
      outline: 'none',
    },
  },

  cardButton: {
    position: 'relative',
    margin: `50px ${theme.spacing(1)}px 20px ${theme.spacing(1)}px`,
    padding: '10px 0',
    overflow: 'hidden',

    '&:hover': {
      cursor: 'pointer',

      '& $cardContent__name': {
        color: theme.palette.primary.dark,
      },

      '& $cardContent__icon': {
        fill: theme.palette.primary.dark,
      },
    },
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContent__name: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.2',
    color: theme.palette.text.muted,
    transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,
  },

  cardContent__icon: {
    fontSize: '22px',
    marginLeft: '5px',
    fill: theme.palette.text.muted,
  },

  cardContent__edit: {
    fontSize: '12px',
    fontWeight: '400',
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    opacity: 0.8,
    transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,

    '&:hover': {
      opacity: 1,
    },
  },

  cardContent__delete: {
    fontSize: '12px',
    fontWeight: '400',
    marginLeft: theme.spacing(1),
    color: theme.palette.danger.light,
    opacity: 0.8,
    transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,

    '&:hover': {
      opacity: 1,
    },
  },
}));

const WalletForm = ({
  id,
  editForm,
  name,
  balance,
  type,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const wallets = useSelector(state => state.user.wallets);
  const [modalOpen, setModalOpen] = useState(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [walletName, setWalletName] = useState(name);
  const [validateWalletName, setValidateWalletName] = useState(editForm);
  const [validWalletName, setValidWalletName] = useState(false);
  const [walletNameError, setWalletNameError] = useState('');
  const [walletBalance, setWalletBalance] = useState(balance);
  const [validateWalletBalance, setValidateWalletBalance] = useState(editForm);
  const [validWalletBalance, setValidWalletBalance] = useState(false);
  const [walletBalanceError, setWalletBalanceError] = useState('');
  const [walletType, setWalletType] = useState(type);
  const { setLoading } = useContext(LoadingContext);

  const cancelModalHandler = () => {
    if (!editForm) {
      setWalletName('');
      setWalletBalance('');
      setWalletType(Object.keys(WALLETS_TYPES)[0]);
      setValidateWalletBalance(false);
      setValidateWalletName(false);
      setValidWalletBalance(false);
      setValidWalletName(false);
      setValidForm(false);
    } else {
      setWalletName(name);
      setWalletBalance(balance);
      setWalletType(type);
    }
  };

  useEffect(() => {
    setLoading(false);
    setModalOpen(false);
    cancelModalHandler();
  }, [wallets]);

  useEffect(() => {
    if (
      validWalletName &&
      validWalletBalance
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [validWalletName, validWalletBalance]);

  useEffect(() => {
    if (validateWalletName) {
      if (isEmpty(walletName)) {
        setValidWalletName(false);
        setWalletNameError('Wallet Name is Required!');
        return;
      }
      setValidWalletName(true);
      setWalletNameError('');
    }
  }, [walletName, validateWalletName]);

  useEffect(() => {
    if (validateWalletBalance) {
      if (!isInt(`${walletBalance}`)) {
        setValidWalletBalance(false);
        setWalletBalanceError('Wallet Balance is Required!');
        return;
      }
      setValidWalletBalance(true);
      setWalletBalanceError('');
    }
  }, [walletBalance, validateWalletBalance]);

  const formSubmitHandler = () => {
    if (validForm) {
      if (!editForm) {
        dispatch(addWalletRequested(walletName, walletBalance, walletType));
      } else {
        dispatch(editWalletRequested(id, walletName, walletBalance, walletType));
      }
      setLoading(true);
    } else {
      setValidateWalletName(true);
      setValidateWalletBalance(true);
    }
  };

  return (
    <>
      <div
        className={`${classes.card} ${!editForm ? classes.cardButton : ''}`}
        id="addWalletModalToggle"
      >
        {
          editForm ? (
            <Material.Box display="flex">
              <div
                className={classes.cardContent__edit}
                onClick={() => setModalOpen(true)}
                onKeyDown={() => setModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                Edit
              </div>
              <div
                className={classes.cardContent__delete}
                onClick={() => setDisclaimerModalOpen(true)}
                onKeyDown={() => setDisclaimerModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                Delete
              </div>
            </Material.Box>
          ) : (
            <div
              className={classes.cardContent}
              onClick={() => setModalOpen(true)}
              onKeyDown={() => setModalOpen(true)}
              role="button"
              tabIndex={0}
            >
              <div className={classes.cardContent__name}>
                Add Wallet
              </div>
              <AddIcon className={classes.cardContent__icon} />
            </div>
          )
        }
      </div>
      <DisclaimerModal
        openModalHandler={setDisclaimerModalOpen}
        openModal={disclaimerModalOpen}
        confirmHandler={() => dispatch(deletetWalletRequested(id))}
        title="Are you sure ?"
      >
        <div>
          Please confirm if you want to delete&nbsp;
          <b>{name}</b>
          &nbsp;wallet
        </div>
      </DisclaimerModal>
      <FormModal
        openModalHandler={setModalOpen}
        openModal={modalOpen}
        submitDataHandler={() => formSubmitHandler()}
        labelledby="#addWalletModalToggle"
        submitButton
        submitButtonLabel={editForm ? 'Save' : 'Add'}
        cancelButton
        cancelButtonLabel="Cancel"
        cancelHandler={() => cancelModalHandler()}
        formModalTitle={editForm ? `Edit ${name} Wallet` : 'Add  Wallet'}
      >
        <FormControl>
          <Material.TextField
            label="Wallet Name"
            value={walletName}
            helperText={walletNameError || 'Required'}
            error={validateWalletName && !validWalletName}
            onBlur={() => setValidateWalletName(true)}
            onChange={(e) => setWalletName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <Material.TextField
            type="number"
            label="Wallet Balance"
            value={walletBalance}
            helperText={walletBalanceError || 'Required'}
            error={validateWalletBalance && !validWalletBalance}
            onBlur={() => setValidateWalletBalance(true)}
            onChange={(e) => setWalletBalance(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <SimpleSelectInput
            options={WALLETS_TYPES}
            value={walletType}
            disabled={editForm}
            onChangeHandler={setWalletType}
            label="Wallet Type"
          />
        </FormControl>
      </FormModal>
    </>
  );
};

WalletForm.defaultProps = {
  id: '',
  editForm: false,
  name: '',
  balance: 0,
  type: Object.keys(WALLETS_TYPES)[0],
};

WalletForm.propTypes = {
  id: PropTypes.string,
  editForm: PropTypes.bool,
  name: PropTypes.string,
  balance: PropTypes.number,
  type: PropTypes.string,
};

export default WalletForm;
