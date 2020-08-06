import { takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actionTypes/actionTypes";
import {
  setAllIncomeDataSaga,
  addIncomeDataSaga,
  deleteIncomeDataSaga,
  editIncomeDataSaga,
} from "./income/incomeSaga";


export function* watchIncome() {
  yield takeLatest(actionTypes.INCOME_GET_ALL_REQUESTED, setAllIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_ADD_REQUESTED, addIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_DELETE_REQUESTED, deleteIncomeDataSaga);
  yield takeLatest(actionTypes.INCOME_EDIT_REQUESTED, editIncomeDataSaga);
}