import { createStore } from 'vuex';
import auth  from './auth.module';
import wallets  from './wallets.module';

export default createStore({
  modules: {
    auth,
    wallets
  },
});
