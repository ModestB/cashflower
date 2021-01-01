import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';

import { watchIncome, watchAuth } from './sagas/index';

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

sagaMiddleware.run(watchIncome);
sagaMiddleware.run(watchAuth);

export default store;
