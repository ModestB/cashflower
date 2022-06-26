import { defineStore } from 'pinia';
import axios from 'axios';
import { API_AUTH_URL, LOCAL_STORAGE_USER_KEY } from '@/constants';

import { useWalletsStore } from '@/stores/WalletsStore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  actions: {
    setUserData({ user, accessToken }) {
      const userState = {
        ...user,
        accessToken,
      };
      this.user = userState;
      localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify({ user, accessToken })
      );
      axios.defaults.headers.common.Authorization = `Bearer ${userState.accessToken.token}`;
    },
    unsetUserData() {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      window.location.reload();
    },
    register(credentials) {
      const walletsStore = useWalletsStore();

      return axios
        .post(API_AUTH_URL, credentials)
        .then(({ data }) => this.setUserData(data))
        .then(() => {
          walletsStore.getWallets();
        });
    },
    login(credentials) {
      const walletsStore = useWalletsStore();

      return axios
        .post(`${API_AUTH_URL}/login`, credentials)
        .then(({ data }) => this.setUserData(data))
        .then(() => {
          walletsStore.getWallets();
        });
    },
    logout() {
      return axios.post(`${API_AUTH_URL}/logout`).then(() => {
        this.unsetUserData();
      });
    },
  },
});
