import { 
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
  AUTH_AUTO_LOGOUT,
  AUTH_CHECK,
} from '../../actionTypes/actionTypes';


export const authRequest = (email, password) => {
  return {
    type: AUTH_REQUESTED,
    payload: {
      email,
      password
    }
  }
};

export const authSuccess = (email, userId, token) => {
  return {
    type: AUTH_SUCCEEDED,
    payload: {
      email,
      userId,
      token,
    }
  }
};

export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    payload: {
      error
    }
  }
};

export const authLogout = (token) => {
  return {
    type: AUTH_LOGOUT,
    payload: {
      token
    }
  }
};

export const authAutoLogout = (expirationTime, token) => {
  return {
    type: AUTH_AUTO_LOGOUT,
    payload: {
      expirationTime,
      token,
    }
  }
};

export const authCheck = () => {
  return {
    type: AUTH_CHECK,
  }
};