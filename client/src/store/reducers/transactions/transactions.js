import produce from 'immer';
import {
  AUTH_SUCCEEDED,
  TRANSACTIONS_GET_REQUESTED,
  TRANSACTIONS_GET_SUCCEEDED,
} from '../../actionTypes/actionTypes';
import { formatDateToYear } from '../../../shared/utilities';

const initialState = {
  categories: {
    expense: {},
    income: {},
  },
  data: [],
  currentDataYear: formatDateToYear(new Date()),
};

const setTransactionCategories = (state, categories) => {
  const newState = {
    ...state,
    categories: {
      expense: categories.expense,
      income: categories.income,
    },
  };

  return newState;
};

const getTransactionsRequestHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    // draftState.incomeDataLoading = true;

    if (state.currentDataYear !== payload.year) {
      draftState.currentDataYear = payload.year;
    }
  });

  return nextState;
};

const getTransactionsSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    // draftState.incomeDataLoading = false;
    draftState.data = {};

    Object.keys(payload.transactions)
      .forEach(key => {
        draftState.data[payload.transactions[key].id] = payload.transactions[key];
      });
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCEEDED: {
      return setTransactionCategories(state, action.payload.categories);
    }

    case TRANSACTIONS_GET_REQUESTED: {
      return getTransactionsRequestHandler(state, action.payload);
    }

    case TRANSACTIONS_GET_SUCCEEDED: {
      return getTransactionsSuccessHandler(state, action.payload);
    }

    default:
      return state;
  }
};
