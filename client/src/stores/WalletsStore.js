import { defineStore } from 'pinia';
import axios from 'axios';

import { API_URL } from '@/constants';

export const useWalletsStore = defineStore('wallets', {
  state: () => ({
    wallets: {},
    activeWallet: null,
  }),
  getters: {
    // Wallet formated to use with base-select
    walletsArrayForSelect(state) {
      const walletsArray = Object.values(state.wallets)
        ? Object.values(state.wallets)
        : [];

      return walletsArray.map((wallet) => ({
        label: wallet.name,
        value: wallet.id,
      }));
    },
  },
  actions: {
    getWallets() {
      return axios
        .get(`${API_URL}/wallet`)
        .then(({ data }) => {
          const formatedWallets = {};
          data.forEach((wallet) => {
            formatedWallets[wallet.id] = wallet;
          });
          this.wallets = formatedWallets;

          return formatedWallets;
        })
        .then((data) => {
          if (Object.values(data).length) {
            this.activeWallet = Object.values(data)[0].id;
          }
        });
    },
    addWallet(wallet) {
      return axios.post(`${API_URL}/wallet`, wallet).then(({ data }) => {
        this.wallets = {
          ...this.wallets,
          [data.id]: data,
        };
      });
    },
    editWallet(wallet) {
      return axios
        .patch(`${API_URL}/wallet/${wallet.id}`, {
          name: wallet.name,
          balance: wallet.balance,
        })
        .then(({ data }) => {
          this.wallets[data.id] = data;
        });
    },
    deleteWallet(id) {
      return axios.delete(`${API_URL}/wallet/${id}`).then(({ data }) => {
        delete this.wallets[data.id];
      });
    },
    setActiveWallet(id) {
      this.activeWallet = id;
    },
  },
});
