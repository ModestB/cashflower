import produce from 'immer';
import {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
  REGISTRATION_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
};

const authSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.email = payload.email;
    draftState.userId = payload.userId;
    draftState.token = payload.token;
    draftState.error = '';
    draftState.loading = false;
  });

  return nextState;
};

const authFailedHandler = (state, error) => {
  const newState = { ...state };
  newState.error = error;
  newState.loading = false;

  return newState;
};

const authRequestHandler = (state) => {
  const newState = { ...state };
  newState.loading = true;

  return newState;
};

const authLogoutHandler = () => {
  localStorage.removeItem('cashflower');
  return initialState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUESTED: {
      return authRequestHandler(state);
    }

    case AUTH_SUCCEEDED: {
      return authSuccessHandler(state, action.payload);
    }

    case REGISTRATION_SUCCEEDED: {
      return authSuccessHandler(state, action.payload);
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
