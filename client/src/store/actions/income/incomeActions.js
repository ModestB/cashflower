import {
  INCOME_GET_ALL_REQUESTED,
  INCOME_GET_ALL_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
  INCOME_TYPE_ADD_REQUESTED,
  INCOME_TYPE_ADD_SUCCEEDED,
  INCOME_TYPE_DELETE_REQUESTED,
  INCOME_TYPE_DELETE_SUCCEEDED,
  CURRENT_INCOME_YEAR_CHANGE,
} from '../../actionTypes/actionTypes';

export const getAllIncomeData = (userId) => ({
  type: INCOME_GET_ALL_REQUESTED,
  payload: {
    userId,
  },
});

export const setAllIncomeData = (income, types) => ({
  type: INCOME_GET_ALL_SUCCEEDED,
  payload: {
    income,
    types,
  },
});

export const incomeAddRequest = (income, userId) => ({
  type: INCOME_ADD_REQUESTED,
  payload: {
    income,
    userId,
  },
});

export const incomeAddSucceess = (income, key) => ({
  type: INCOME_ADD_SUCCEEDED,
  payload: {
    income,
    key,
  },
});

export const deleteIncomeRequest = (key, userId) => ({
  type: INCOME_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const deleteIncomeSucceess = (key) => ({
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

export const incomeEditSucceess = (key, income) => ({
  type: INCOME_EDIT_SUCCEEDED,
  payload: {
    key,
    income,
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

export const incomeTypeDeleteSucceess = (key) => ({
  type: INCOME_TYPE_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const currentDataYearChange = (year) => ({
  type: CURRENT_INCOME_YEAR_CHANGE,
  payload: {
    year,
  },
});
