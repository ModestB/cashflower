import { combineReducers } from 'redux';

import general from './general/general';
import income from './income/income';
import investment from './investment/investment';
import investmentGoals from './investmentGoals/investmentGoals';
import overview from './overview/overview';
import user from './user/user';
import info from './info/info';

export default combineReducers({
  user,
  info,
  general,
  income,
  investment,
  investmentGoals,
  overview,
});
