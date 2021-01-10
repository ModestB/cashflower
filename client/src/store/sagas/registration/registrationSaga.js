import { put } from 'redux-saga/effects';
import { differenceInMilliseconds } from 'date-fns';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export default function* registrationSaga(action) {
  const registrationData = {
    username: action.payload.username,
    email: action.payload.email,
    password: action.payload.password,
  };

  try {
    const response = yield axios.post('users', registrationData);
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
      actions.registrationSuccedded(
        response.data.user.email,
        response.data.user.id,
        response.data.token.token,
      ),
    );
    if (response.data.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token.token}`;
    }
    yield put(actions.authAutoLogout(expirationDate, response.data.token.token));
  } catch (error) {
    yield put(actions.registrationFailed(error.response.data.error));
  }
}
