import axios from 'axios';
// import { dispatch }

import { API_AUTH_URL, LOCAL_STORAGE_USER_KEY } from '@/constants';

export default {
  namespaced: true,
  state: { user: null },
  actions: {
    register({ commit, dispatch }, credentials) {
      return axios
        .post(API_AUTH_URL, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data);
        })
        .then(() => {
          dispatch('wallets/getWallets', null, { root: true });
        });
    },
    login({ commit, dispatch }, credentials) {
      return axios
        .post(`${API_AUTH_URL}/login`, credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data);
        })
        .then(() => {
          dispatch('wallets/getWallets', null, { root: true });
        });
    },
    logout({ commit }) {
      return axios.post(`${API_AUTH_URL}/logout`).then(() => {
        commit('CLEAR_USER_DATA');
      });
    },
    storageLogout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
  },
  mutations: {
    SET_USER_DATA(state, { user, accessToken }) {
      const userState = {
        ...user,
        accessToken,
      };
      state.user = userState;
      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify({ user, accessToken })
      );
      axios.defaults.headers.common.Authorization = `Bearer ${userState.accessToken.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      window.location.reload();
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
};
