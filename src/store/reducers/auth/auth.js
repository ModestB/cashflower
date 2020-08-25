import {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
};

const authSuccessHandler = (state, email, userId, token) => {
  const newState = { ...state };
  newState.email = email;
  newState.userId = userId;
  newState.token = token;
  newState.error = '';
  newState.loading =  false;

  return newState;
}

const authFailedHandler = (state, error) => {
  const newState = { ...state };
  newState.error = error;
  newState.loading =  false;

  return newState;
};

const authRequestHandler = (state) => {
  const newState = {...state};
  newState.loading =  true;

  return newState;
}

const authLogoutHandler = () => {
  localStorage.removeItem('cashflower');
  return initialState;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUESTED: {
      return authRequestHandler(state);
    }

    case AUTH_SUCCEEDED: {
      return authSuccessHandler(state, action.payload.email, action.payload.userId, action.payload.token);
    }

    case AUTH_FAILED: {
      return authFailedHandler(state, action.payload.error);
    }

    case AUTH_LOGOUT: {
      return authLogoutHandler();
    }

    default:
      return state;
  }
};
