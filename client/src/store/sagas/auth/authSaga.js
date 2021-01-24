import { put, delay } from 'redux-saga/effects';
import { differenceInMilliseconds } from 'date-fns';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export function* authAutoLogoutSaga(action) {
  yield delay(action.payload.expirationTime);
  yield put(actions.authLogout(action.payload.token));
}

export function* authLogoutSaga(action) {
  if (action.payload.token) {
    yield axios.post('users/logout');
  }
}

export function* authUserSaga(action) {
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
  };

  try {
    const response = yield axios.post('users/login', authData);
    const localStorageData = {};
    const expirationDate = yield differenceInMilliseconds(
      new Date(response.data.token.expireAt),
      new Date().getTime(),
    );
    yield localStorageData.expirationDate = response.data.token.expireAt;
    yield localStorageData.token = response.data.token.token;
    yield localStorageData.email = response.data.user.email;
    yield localStorageData.userId = response.data.user.id;
    yield localStorage.setItem('cashflower', JSON.stringify(localStorageData));
    yield put(
      actions.authSuccess(
        response.data.user.email,
        response.data.user.id,
        response.data.token,
        response.data.dataYears,
        response.data.dataTypes,
      ),
    );
    if (response.data.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token.token}`;
    }
    yield put(actions.getAllIncomeData(response.data.user.id));
    yield put(actions.authAutoLogout(expirationDate, response.data.token.token));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* authCheckSaga() {
  const localStorageData = yield JSON.parse(localStorage.getItem('cashflower'));

  if (!localStorageData) {
    yield put(actions.authLogout());
  } else if (localStorageData.token) {
    const expirationDate = yield new Date(localStorageData.expirationDate);
    if (localStorageData.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorageData.token}`;
    }
    if (expirationDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      if (localStorageData.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorageData.token}`;
      }
      const response = yield axios.get('users/me');

      yield put(
        actions.authSuccess(
          response.data.user.email,
          response.data.user.id,
          response.data.token,
          response.data.dataYears,
          response.data.dataTypes,
        ),
      );
      yield put(actions.getAllIncomeData(response.data.user.id));
      const expiresIn = yield (expirationDate.getTime() - new Date().getTime());
      yield put(actions.authAutoLogout(expiresIn, localStorageData.token));
    }
  }
}
