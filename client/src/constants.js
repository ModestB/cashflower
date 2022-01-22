export const API_URL =  process.env.VUE_APP_API_URL;
export const API_AUTH_URL =  process.env.VUE_APP_AUTH_API_URL;
export const LOCAL_STORAGE_USER_KEY = process.env.VUE_APP_LOCAL_STORAGE_USER_KEY;

export const SIDEBAR_ITEMS = [
  {
    id: 1,
    icon: 'th-large',
    label: 'Dashboard',
    routeName: 'dashboard'
  },
  {
    id: 2,
    icon: 'wallet',
    label: 'Transactions',
    routeName: 'transactions'
  }
]