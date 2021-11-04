import {
  INCOME_GET_REQUESTED,
  INCOME_GET_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_ADD_FAILED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_EDIT_FAILED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
  INCOME_TYPE_ADD_REQUESTED,
  INCOME_TYPE_ADD_SUCCEEDED,
  INCOME_TYPE_DELETE_REQUESTED,
  INCOME_TYPE_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const getIncomeData = (year) => ({
  type: INCOME_GET_REQUESTED,
  payload: {
    year,
  },
});

export const setIncomeData = (income) => ({
  type: INCOME_GET_SUCCEEDED,
  payload: {
    income,
  },
});

export const incomeAddRequest = (income, currentDataYear) => ({
  type: INCOME_ADD_REQUESTED,
  payload: {
    income,
    currentDataYear,
  },
});

export const incomeAddSuccess = (income, key) => ({
  type: INCOME_ADD_SUCCEEDED,
  payload: {
    income,
    key,
  },
});

export const incomeAddFailed = (error) => ({
  type: INCOME_ADD_FAILED,
  payload: {
    error,
  },
});

export const deleteIncomeRequest = (key, userId) => ({
  type: INCOME_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const deleteIncomeSuccess = (key) => ({
  type: INCOME_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const incomeEditRequest = (key, income, userId) => ({
  type: INCOME_EDIT_REQUESTED,
  payload: {
    key,
    income,
    userId,
  },
});

export const incomeEditSuccess = (key, income) => ({
  type: INCOME_EDIT_SUCCEEDED,
  payload: {
    key,
    income,
  },
});

export const incomeEditFailed = (error) => ({
  type: INCOME_EDIT_FAILED,
  payload: {
    error,
  },
});

export const incomeTypeAddRequest = (type, userId) => ({
  type: INCOME_TYPE_ADD_REQUESTED,
  payload: {
    type,
    userId,
  },
});

export const incomeTypeAddSuccess = (type, key) => ({
  type: INCOME_TYPE_ADD_SUCCEEDED,
  payload: {
    type,
    key,
  },
});

export const incomeTypeDeleteRequest = (key, userId) => ({
  type: INCOME_TYPE_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const incomeTypeDeleteSuccess = (key) => ({
  type: INCOME_TYPE_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});
