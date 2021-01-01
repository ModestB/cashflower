import {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
  AUTH_AUTO_LOGOUT,
  AUTH_CHECK,
} from '../../actionTypes/actionTypes';

export const authRequest = (email, password) => ({
  type: AUTH_REQUESTED,
  payload: {
    email,
    password,
  },
});

export const authSuccess = (email, userId, token) => ({
  type: AUTH_SUCCEEDED,
  payload: {
    email,
    userId,
    token,
  },
});

export const authFailed = (error) => ({
  type: AUTH_FAILED,
  payload: {
    error,
  },
});

export const authLogout = (token) => ({
  type: AUTH_LOGOUT,
  payload: {
    token,
  },
});

export const authAutoLogout = (expirationTime, token) => ({
  type: AUTH_AUTO_LOGOUT,
  payload: {
    expirationTime,
    token,
  },
});

export const authCheck = () => ({ type: AUTH_CHECK });
