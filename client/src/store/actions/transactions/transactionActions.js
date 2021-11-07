import {
  SET_TRANSACTION_CATEGORIES,
  TRANSACTIONS_GET_REQUESTED,
  TRANSACTIONS_GET_SUCCEEDED,
  TRANSACTION_ADD_SUCCEEDED,
  TRANSACTION_DELETE_REQUESTED,
  TRANSACTION_DELETE_SUCCEEDED,
  TRANSACTION_EDIT_REQUESTED,
  TRANSACTION_EDIT_SUCCEEDED,
  TRANSACTION_EDIT_FAILED,
} from '../../actionTypes/actionTypes';

export const setTransactionCategories = (categories) => ({
  type: SET_TRANSACTION_CATEGORIES,
  payload: {
    categories,
  },
});

export const getTransactions = (year, wallet) => ({
  type: TRANSACTIONS_GET_REQUESTED,
  payload: {
    year,
    wallet,
  },
});

export const setTransactions = (transactions) => ({
  type: TRANSACTIONS_GET_SUCCEEDED,
  payload: {
    transactions,
  },
});

export const addTransactionSuccess = (transaction, key) => ({
  type: TRANSACTION_ADD_SUCCEEDED,
  payload: {
    transaction,
    key,
  },
});

export const deleteTransactionRequest = (key, userId) => ({
  type: TRANSACTION_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const deleteTransactionSuccess = (key) => ({
  type: TRANSACTION_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const transactionEditRequest = (key, transaction, userId) => ({
  type: TRANSACTION_EDIT_REQUESTED,
  payload: {
    key,
    transaction,
    userId,
  },
});

export const transactionEditSuccess = (key, transaction) => ({
  type: TRANSACTION_EDIT_SUCCEEDED,
  payload: {
    key,
    transaction,
  },
});

export const transactionEditFailed = (error) => ({
  type: TRANSACTION_EDIT_FAILED,
  payload: {
    error,
  },
});
