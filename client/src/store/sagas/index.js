import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes/actionTypes';
import {
  setAllIncomeDataSaga,
  addIncomeDataSaga,
  deleteIncomeDataSaga,
  editIncomeDataSaga,
  addIncomeTypeSaga,
  deleteIncomeTypeSaga,
} from './income/incomeSaga';
import {
  setAllInvestmentDataSaga,
  addInvestmentDataSaga,
  deleteInvestmentDataSaga,
  editInvestmentDataSaga,
  addInvestmentTypeSaga,
  deleteInvestmentTypeSaga,
} from './investment/investmentSaga';
import {
  authUserSaga,
  authCheckSaga,
  authAutoLogoutSaga,
  authLogoutSaga,
} from './auth/authSaga';
import registrationSaga from './registration/registrationSaga';

export function* watchIncome() {
  yield takeLatest(actionTypes.INCOME_GET_ALL_REQUESTED, setAllIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_ADD_REQUESTED, addIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_DELETE_REQUESTED, deleteIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_EDIT_REQUESTED, editIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_TYPE_ADD_REQUESTED, addIncomeTypeSaga);
  yield takeLatest(actionTypes.INCOME_TYPE_DELETE_REQUESTED, deleteIncomeTypeSaga);
}

export function* watchInvestment() {
  yield takeLatest(actionTypes.INVESTMENT_GET_ALL_REQUESTED, setAllInvestmentDataSaga);
  yield takeLatest(actionTypes.INVESTMENT_ADD_REQUESTED, addInvestmentDataSaga);
  yield takeLatest(actionTypes.INVESTMENT_DELETE_REQUESTED, deleteInvestmentDataSaga);
  yield takeLatest(actionTypes.INVESTMENT_EDIT_REQUESTED, editInvestmentDataSaga);
  yield takeLatest(actionTypes.INVESTMENT_TYPE_ADD_REQUESTED, addInvestmentTypeSaga);
  yield takeLatest(actionTypes.INVESTMENT_TYPE_DELETE_REQUESTED, deleteInvestmentTypeSaga);
}

export function* watchAuth() {
  yield takeLatest(actionTypes.AUTH_REQUESTED, authUserSaga);
  yield takeLatest(actionTypes.AUTH_CHECK, authCheckSaga);
  yield takeLatest(actionTypes.AUTH_AUTO_LOGOUT, authAutoLogoutSaga);
  yield takeLatest(actionTypes.AUTH_LOGOUT, authLogoutSaga);
}

export function* watchRegistration() {
  yield takeLatest(actionTypes.REGISTRATION_REQUESTED, registrationSaga);
}
