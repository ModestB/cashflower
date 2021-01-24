import produce from 'immer';
import {
  INCOME_GET_REQUESTED,
  INCOME_GET_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';
import { formatDateToYear } from '../../../shared/utilities';

const initialState = {
  data: {},
  currentDataYear: formatDateToYear(new Date()),
  incomeDataLoading: false,
  incomeAddLoading: false,
};

const requestAddIncomeHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.incomeAddLoading = true;
  });

  return nextState;
};

const addIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    const year = formatDateToYear(new Date(payload.income.date));
    draftState.data[payload.key] = payload.income;
    draftState.incomeAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.data[payload.key] = payload.income;
    }
  });

  return nextState;
};

const deleteIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
  });
  return nextState;
};

const getIncomeDataRequestHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.incomeDataLoading = true;

    if (state.currentDataYear !== payload.year) {
      draftState.currentDataYear = payload.year;
    }
  });

  return nextState;
};

const getIcomeDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.incomeDataLoading = false;
    draftState.data = {};

    Object.keys(payload.income)
      .forEach(key => {
        draftState.data[payload.income[key].id] = payload.income[key];
      });
  });
  return nextState;
};

const editIncomeDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = { ...state.data[payload.key], ...payload.income };
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCOME_GET_REQUESTED: {
      return getIncomeDataRequestHandler(state, action.payload);
    }

    case INCOME_GET_SUCCEEDED: {
      return getIcomeDataSuccesHandler(state, action.payload);
    }

    case INCOME_ADD_REQUESTED: {
      return requestAddIncomeHandler(state);
    }

    case INCOME_ADD_SUCCEEDED: {
      return addIncomeSuccessHandler(state, action.payload);
    }

    case INCOME_EDIT_REQUESTED: {
      return state;
    }

    case INCOME_EDIT_SUCCEEDED: {
      return editIncomeDataHandler(state, action.payload);
    }

    case INCOME_DELETE_REQUESTED: {
      return state;
    }

    case INCOME_DELETE_SUCCEEDED: {
      return deleteIncomeSuccessHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
