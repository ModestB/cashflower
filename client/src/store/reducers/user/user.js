import produce from 'immer';
import {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  AUTH_LOGOUT,
  REGISTRATION_SUCCEEDED,
  SET_ACTIVE_WALLET,
  ADD_WALLET_SUCCEEDED,
  EDIT_WALLET_SUCCEEDED,
  DELETE_WALLET_SUCCEEDED,
  TRANSACTIONS_GET_REQUESTED,
} from '../../actionTypes/actionTypes';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
  wallets: [],
  activeWallet: null,
  currency: 'EUR',
  locale: 'lt',
};

const authSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.email = payload.email;
    draftState.userId = payload.userId;
    draftState.token = payload.token;
    draftState.error = '';
    draftState.loading = false;
    draftState.wallets = payload.wallets;
    draftState.activeWallet = payload.wallets[0].id;
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

const setActiveWalletandler = (state, id) => ({ ...state, activeWallet: id });

const addWalletHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.wallets = [...state.wallets, payload.wallet];
  });

  return nextState;
};

const editWalletHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.wallets = state.wallets.map(wallet => {
      if (wallet.id === payload.wallet.id) {
        return payload.wallet;
      }
      return wallet;
    });
  });

  return nextState;
};

const deleteWalletHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.wallets = state.wallets.filter(wallet => {
      if (wallet.id !== payload.id) {
        return wallet;
      }
    });
  });

  return nextState;
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

    case SET_ACTIVE_WALLET: {
      return setActiveWalletandler(state, action.payload.id);
    }

    case TRANSACTIONS_GET_REQUESTED: {
      return setActiveWalletandler(state, action.payload.wallet);
    }

    case ADD_WALLET_SUCCEEDED: {
      return addWalletHandler(state, action.payload);
    }

    case EDIT_WALLET_SUCCEEDED: {
      return editWalletHandler(state, action.payload);
    }

    case DELETE_WALLET_SUCCEEDED: {
      return deleteWalletHandler(state, action.payload);
    }

    default:
      return state;
  }
};
