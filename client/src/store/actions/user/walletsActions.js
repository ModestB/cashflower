import {
  SET_ACTIVE_WALLET,
  ADD_WALLET_REQUESTED,
  ADD_WALLET_SUCCEEDED,
  EDIT_WALLET_REQUESTED,
  EDIT_WALLET_SUCCEEDED,
  DELETE_WALLET_REQUESTED,
  DELETE_WALLET_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const setActiveWallet = (id) => ({
  type: SET_ACTIVE_WALLET,
  payload: {
    id,
  },
});

export const addWalletRequested = (name, balance, type) => ({
  type: ADD_WALLET_REQUESTED,
  payload: {
    name,
    balance,
    type,
  },
});

export const addWalletSuccess = (wallet) => ({
  type: ADD_WALLET_SUCCEEDED,
  payload: {
    wallet,
  },
});

export const editWalletRequested = (id, name, balance, type) => ({
  type: EDIT_WALLET_REQUESTED,
  payload: {
    id,
    name,
    balance,
    type,
  },
});

export const editWalletSuccess = (wallet) => ({
  type: EDIT_WALLET_SUCCEEDED,
  payload: {
    wallet,
  },
});

export const deletetWalletRequested = (id) => ({
  type: DELETE_WALLET_REQUESTED,
  payload: {
    id,
  },
});

export const deleteWalletSuccess = (id) => ({
  type: DELETE_WALLET_SUCCEEDED,
  payload: {
    id,
  },
});
