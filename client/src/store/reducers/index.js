import { combineReducers } from 'redux';

import general from './general/general';
import income from './income/income';
import auth from './auth/auth';

export default combineReducers({
  general,
  income,
  auth,
});
