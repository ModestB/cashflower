import { combineReducers } from 'redux';

import income from './income/income';
import auth from './auth/auth';

export default combineReducers({
  income,
  auth,
});
