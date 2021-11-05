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

export function* deleteTransactionsSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/transaction/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteTransactionSuccess(action.payload.key, result));
}
