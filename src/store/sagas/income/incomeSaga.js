import { put } from "redux-saga/effects"
import axios from "../../../axios";
import * as actions from "../../actions/actions";

export function* setAllIncomeDataSaga (action) {
  const res = yield axios.get(`/data/${action.payload.userId}/income.json`);

  yield put(actions.setAllIncomeData(res.data.incomes, res.data.types));
}

export function* addIncomeDataSaga (action) {
  const promise = new Promise((resolve, reject) => {
    axios.post(`/data/${action.payload.userId}/income/incomes.json`, action.payload.income)
      .then(response => {
        resolve(response)
      })
  })
  const results = yield promise;

  yield put(actions.incomeAddSucceess({...action.payload.income, id: results.data.name}))
}

export function* editIncomeDataSaga(action) {
  const promise = new Promise((resolve, reject) => {
    axios.patch(`/data/${action.payload.userId}/income/incomes/${action.payload.key}.json`,  action.payload.income)
      .then(response => {
        resolve(response.data)
      })
  })

  const result = yield promise;

  yield put(actions.incomeEditSucceess(action.payload.key, result))
}

export function* deleteIncomeDataSaga (action) {
  const promise = new Promise((resolve, reject) => {
    axios.delete(`/data/${action.payload.userId}/income/incomes/${action.payload.key}.json`)
      .then(response => {
        resolve(response)
      })
  })

  const result = yield promise;

  yield put(actions.deleteIncomeSucceess(action.payload.key, result))
}

export function* addIncomeTypeSaga (action) {
  const promise = new Promise((resolve, reject) => {
    axios.post(`/data/${action.payload.userId}/income/types.json`, action.payload.type)
      .then(response => {
        resolve(response)
      })
  })
  const results = yield promise;

  yield put(
    actions.incomeTypeAddSuccess(
      action.payload.type, 
      results.data.name,
  ))
}

export function* deleteIncomeTypeSaga (action) {
  yield console.log(action)
  const promise = new Promise((resolve, reject) => {
    axios.delete(`/data/${action.payload.userId}/income/types/${action.payload.key}.json`)
      .then(response => {
        resolve(response)
      })
  })

  const result = yield promise;

  yield put(actions.incomeTypeDeleteSucceess(action.payload.key))
}
