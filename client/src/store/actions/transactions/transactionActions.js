import {
  SET_TRANSACTION_CATEGORIES,
  TRANSACTIONS_GET_REQUESTED,
  TRANSACTIONS_GET_SUCCEEDED,
  TRANSACTION_ADD_SUCCEEDED,
  TRANSACTION_DELETE_REQUESTED,
  TRANSACTION_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const setTransactionCategories = (expense, income) => ({
  type: SET_TRANSACTION_CATEGORIES,
  payload: {
    expense,
    income,
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
