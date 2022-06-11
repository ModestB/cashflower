export const API_URL = process.env.VUE_APP_API_URL;
export const API_AUTH_URL = process.env.VUE_APP_AUTH_API_URL;
export const LOCAL_STORAGE_USER_KEY =
  process.env.VUE_APP_LOCAL_STORAGE_USER_KEY;

export const VIEWS = {
  dashboard: {
    id: 1,
    icon: 'th-large',
    label: 'Dashboard',
    routeName: 'dashboard',
  },
  transactions: {
    id: 2,
    icon: 'wallet',
    label: 'Transactions',
    routeName: 'transactions',
  },
};

export const WALLET_TYPES = {
  regular: {
    label: 'Regular',
    value: 'regular',
  },
  // goal: {
  //   label: 'Goal',
  //   value: 'goal',
  // },
};
