import { put, delay } from "redux-saga/effects"
import axios from "../../../axios";
import * as actions from "../../actions/actions";
import { WEB_API_KEY } from '../../../shared/constants';

export function* authAutoLogoutSaga (action) {
  yield delay(action.payload.expirationTime)
  yield put(actions.authLogout())
}

export function* authUserSaga (action) {
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };

  let url =
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;

  try {
    const response = yield axios.post(url, authData);
    const localStorageData = {};
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    
    yield localStorageData.expirationDate = expirationDate;
    yield localStorageData.userId =  response.data.localId;
    yield localStorageData.token =  response.data.idToken;
    yield localStorageData.email =  response.data.email;
    yield localStorage.setItem('cashflower', JSON.stringify(localStorageData));
    yield put(
      actions.authSuccess(response.data.email, response.data.localId, response.data.idToken)
    );
    yield put(actions.getAllIncomeData(response.data.localId))
    yield put(actions.authAutoLogout(response.data.expiresIn * 1000))
    
  } catch (error) { 
    yield put(actions.authFailed(error.response.data.error));
  }
}


export function* authCheckSaga (action) {
  const localStorageData = yield JSON.parse(localStorage.getItem('cashflower'));

  if (!localStorageData) {
    yield put (actions.authLogout());
  } else if (localStorageData.token) {
    const expirationDate = yield new Date (localStorageData.expirationDate);
    if (expirationDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      yield put (actions.authSuccess(localStorageData.email, localStorageData.userId, localStorageData.token));
      yield put(actions.getAllIncomeData(localStorageData.userId))
      const expiresIn = yield (expirationDate.getTime() - new Date().getTime());
      yield put (actions.authAutoLogout(expiresIn))
    }    
  }
} 