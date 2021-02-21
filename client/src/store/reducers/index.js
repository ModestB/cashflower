import { combineReducers } from 'redux';

import general from './general/general';
import income from './income/income';
import investment from './investment/investment';
import investmentGoals from './investmentGoals/investmentGoals';
import overview from './overview/overview';
import auth from './auth/auth';
import dataInfo from './dataInfo/dataInfo';

export default combineReducers({
  general,
  income,
  investment,
  investmentGoals,
  overview,
  auth,
  dataInfo,
});
