import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export function* addWalletSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.post('/wallet', { ...action.payload })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;

    yield put(actions.addWalletSuccess(results.data));
  } catch (error) {
    yield put(actions.addErrorAlert(error.response.data.message, 'modal'));
  }
}

export function* editWalletSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.patch(`/wallet/${action.payload.id}`, {
        name: action.payload.name,
        balance: action.payload.balance,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;

    yield put(actions.editWalletSuccess(results.data));
  } catch (error) {
    yield put(actions.addErrorAlert(error.response.data.message, 'modal'));
  }
}

export function* deleteWalletSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.delete(`/wallet/${action.payload.id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;

    yield put(actions.deleteWalletSuccess(results.data.id));
  } catch (error) {
    yield put(actions.addErrorAlert(error.response.data.message, 'modal'));
  }
}
