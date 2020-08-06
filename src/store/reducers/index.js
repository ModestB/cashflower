import { combineReducers } from "redux";

import income from '../reducers/income/income';
import incomeDataLoading from '../reducers/income/incomeDataLoading';
import incomeAddLoading from '../reducers/income/incomeAddLoading';

export default combineReducers({
  income,
  incomeDataLoading,
  incomeAddLoading
});