import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export function* setAllIncomeDataSaga() {
  const res = yield axios.get('/income');

  yield put(actions.setAllIncomeData(res.data.income));
}

export function* addIncomeDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.post('/income', action.payload.income)
      .then((response) => {
        resolve(response);
      });
  });
  const results = yield promise;

  yield put(actions.incomeAddSucceess(results.data, results.data.id));
}

export function* editIncomeDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.patch(`/income/${action.payload.key}`, action.payload.income)
      .then((response) => {
        resolve(response.data);
      });
  });

  const result = yield promise;
  yield put(actions.incomeEditSucceess(action.payload.key, result));
}

export function* deleteIncomeDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/income/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteIncomeSucceess(action.payload.key, result));
}

export function* addIncomeTypeSaga(action) {
  const promise = new Promise((resolve) => {
    const body = {
      value: action.payload.type.value,
      label: action.payload.type.label,
    };
    axios.post('/incomeType', body)
      .then((response) => {
        resolve(response);
      });
  });
  const results = yield promise;
  yield put(
    actions.incomeTypeAddSuccess(
      action.payload.type,
      results.data.id,
    ),
  );
}

export function* deleteIncomeTypeSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/incomeType/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.incomeTypeDeleteSucceess(action.payload.key));
}
