import { combineReducers } from "redux";

import income from '../reducers/income/income';
import auth from  '../reducers/auth/auth';

export default combineReducers({
  income,
  auth
});