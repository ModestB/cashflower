import {
  INVESTMENT_GET_ALL_REQUESTED,
  INVESTMENT_GET_ALL_SUCCEEDED,
  INVESTMENT_ADD_REQUESTED,
  INVESTMENT_ADD_SUCCEEDED,
  INVESTMENT_EDIT_REQUESTED,
  INVESTMENT_EDIT_SUCCEEDED,
  INVESTMENT_DELETE_REQUESTED,
  INVESTMENT_DELETE_SUCCEEDED,
  INVESTMENT_TYPE_ADD_REQUESTED,
  INVESTMENT_TYPE_ADD_SUCCEEDED,
  INVESTMENT_TYPE_DELETE_REQUESTED,
  INVESTMENT_TYPE_DELETE_SUCCEEDED,
  CURRENT_INVESTMENT_YEAR_CHANGE,
} from '../../actionTypes/actionTypes';

export const getAllInvestmentData = (userId) => ({
  type: INVESTMENT_GET_ALL_REQUESTED,
  payload: {
    userId,
  },
});

export const setAllInvestmentData = (investment) => ({
  type: INVESTMENT_GET_ALL_SUCCEEDED,
  payload: {
    investment,
  },
});

export const investmentAddRequest = (investment, userId) => ({
  type: INVESTMENT_ADD_REQUESTED,
  payload: {
    investment,
    userId,
  },
});

export const investmentAddSucceess = (investment, key) => ({
  type: INVESTMENT_ADD_SUCCEEDED,
  payload: {
    investment,
    key,
  },
});

export const deleteInvestmentRequest = (key, userId) => ({
  type: INVESTMENT_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const deleteInvestmentSucceess = (key) => ({
  type: INVESTMENT_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const investmentEditRequest = (key, investment, userId) => ({
  type: INVESTMENT_EDIT_REQUESTED,
  payload: {
    key,
    investment,
    userId,
  },
});

export const investmentEditSucceess = (key, investment) => ({
  type: INVESTMENT_EDIT_SUCCEEDED,
  payload: {
    key,
    investment,
  },
});

export const investmentTypeAddRequest = (type, userId) => ({
  type: INVESTMENT_TYPE_ADD_REQUESTED,
  payload: {
    type,
    userId,
  },
});

export const investmentTypeAddSuccess = (type, key) => ({
  type: INVESTMENT_TYPE_ADD_SUCCEEDED,
  payload: {
    type,
    key,
  },
});

export const investmentTypeDeleteRequest = (key, userId) => ({
  type: INVESTMENT_TYPE_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const investmentTypeDeleteSucceess = (key) => ({
  type: INVESTMENT_TYPE_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const currentInvestmentDataYearChange = (year) => ({
  type: CURRENT_INVESTMENT_YEAR_CHANGE,
  payload: {
    year,
  },
});
