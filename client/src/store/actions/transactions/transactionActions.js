import {
  SET_TRANSACTION_CATEGORIES,
  TRANSACTIONS_GET_REQUESTED,
  TRANSACTIONS_GET_SUCCEEDED,
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
