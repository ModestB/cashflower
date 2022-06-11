import axios from 'axios';

import { API_URL } from '@/constants';

export default {
  namespaced: true,
  state: {
    wallets: null,
    activeWallet: null,
  },
  actions: {
    getWallets({ commit }) {
      return axios
        .get(`${API_URL}/wallet`)
        .then(({ data }) => {
          const formatedWallets = {};
          data.forEach((wallet) => {
            formatedWallets[wallet.id] = wallet;
          });
          commit('SET_WALLETS', formatedWallets);
          return formatedWallets;
        })
        .then((data) => {
          if (Object.values(data).length) {
            commit('SET_ACTIVE_WALLET', Object.values(data)[0].id);
          }
        });
    },
    addWallet({ commit }, wallet) {
      return axios.post(`${API_URL}/wallet`, wallet).then(({ data }) => {
        commit('ADD_WALLET', data);
      });
    },
    editWallet({ commit }, wallet) {
      return axios
        .patch(`${API_URL}/wallet/${wallet.id}`, {
          name: wallet.name,
          balance: wallet.balance,
        })
        .then(({ data }) => {
          commit('UPDATE_WALLET', data);
        });
    },
    deleteWallet({ commit }, id) {
      return axios.delete(`${API_URL}/wallet/${id}`).then(({ data }) => {
        commit('DELETE_WALLET', data);
      });
    },
  },
  mutations: {
    SET_WALLETS(state, data) {
      state.wallets = data;
    },
    SET_ACTIVE_WALLET(state, id) {
      state.activeWallet = id;
    },
    ADD_WALLET(state, data) {
      state.wallets = {
        ...state.wallets,
        [data.id]: data,
      };
    },
    UPDATE_WALLET(state, data) {
      state.wallets[data.id] = data;
    },
    DELETE_WALLET(state, data) {
      delete state.wallets[data.id];
    },
  },
  getters: {
    wallets(state) {
      return state.wallets;
    },
    // walletsArray(state) {
    //   return Object.values(state.wallets);
    // },
    activeWallet(state) {
      return state.activeWallet;
    },
  },
};
