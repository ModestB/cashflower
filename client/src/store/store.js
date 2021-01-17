import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';

import {
  watchIncome,
  watchInvestment,
  watchAuth,
  watchRegistration,
} from './sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchRegistration);
sagaMiddleware.run(watchIncome);
sagaMiddleware.run(watchInvestment);

export default store;
