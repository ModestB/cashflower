import {
  REGISTRATION_REQUESTED,
  REGISTRATION_SUCCEEDED,
  REGISTRATION_FAILED,
} from '../../actionTypes/actionTypes';

export const registrationRequest = (username, email, password) => ({
  type: REGISTRATION_REQUESTED,
  payload: {
    username,
    email,
    password,
  },
});

export const registrationSuccedded = (email, id, token) => ({
  type: REGISTRATION_SUCCEEDED,
  payload: {
    userId: id,
    email,
    token,
  },
});

export const registrationFailed = (error) => ({
  type: REGISTRATION_FAILED,
  payload: {
    error,
  },
});
