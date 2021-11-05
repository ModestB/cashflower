import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export function* setTransactionsSaga(action) {
  const { year, wallet } = { ...action.payload };
  let url = `/transaction?startYear=${year}&endYear=${year}&wallet=${wallet}`;
  if (year === 'All') {
    url = '/transaction';
  }

  const res = yield axios.get(url);

  yield put(actions.setTransactions(res.data.transactions));
}

export function* deleteTransactionSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/transaction/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteTransactionSuccess(action.payload.key, result));
}

export function* editTransactionSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.patch(`/transaction/${action.payload.key}`, action.payload.transaction)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    const result = yield promise;
    yield put(actions.transactionEditSuccess(action.payload.key, result));
  } catch (error) {
    yield put(actions.transactionEditFailed(error.response.data.message));
  }
}
