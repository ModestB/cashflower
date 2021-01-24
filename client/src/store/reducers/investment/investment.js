import produce from 'immer';
import {
  INVESTMENT_GET_REQUESTED,
  INVESTMENT_GET_SUCCEEDED,
  INVESTMENT_ADD_REQUESTED,
  INVESTMENT_ADD_SUCCEEDED,
  INVESTMENT_EDIT_REQUESTED,
  INVESTMENT_EDIT_SUCCEEDED,
  INVESTMENT_DELETE_REQUESTED,
  INVESTMENT_DELETE_SUCCEEDED,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';
import { formatDateToYear } from '../../../shared/utilities';

const initialState = {
  data: {},
  currentDataYear: formatDateToYear(new Date()),
  investmentDataLoading: false,
  investmentAddLoading: false,
};

const requestAddInvestmentHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentAddLoading = true;
  });

  return nextState;
};

const addInvestmentSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    const year = formatDateToYear(new Date(payload.investment.date));
    draftState.data[payload.key] = payload.investment;
    draftState.investmentAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.data[payload.key] = payload.investment;
    }
  });

  return nextState;
};

const deleteInvestmentSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
  });
  return nextState;
};

const getInvestmentDataRequestHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.investmentDataLoading = true;

    if (state.currentDataYear !== payload.year) {
      draftState.currentDataYear = payload.year;
    }
  });

  return nextState;
};

const getInvestmentDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.investmentDataLoading = false;
    draftState.data = {};

    Object.keys(payload.investment)
      .forEach(key => {
        draftState.data[payload.investment[key].id] = payload.investment[key];
      });
  });
  return nextState;
};

const editInvestmentDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = { ...state.data[payload.key], ...payload.investment };
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVESTMENT_GET_REQUESTED: {
      return getInvestmentDataRequestHandler(state, action.payload);
    }

    case INVESTMENT_GET_SUCCEEDED: {
      return getInvestmentDataSuccesHandler(state, action.payload);
    }

    case INVESTMENT_ADD_REQUESTED: {
      return requestAddInvestmentHandler(state);
    }

    case INVESTMENT_ADD_SUCCEEDED: {
      return addInvestmentSuccessHandler(state, action.payload);
    }

    case INVESTMENT_EDIT_REQUESTED: {
      return state;
    }

    case INVESTMENT_EDIT_SUCCEEDED: {
      return editInvestmentDataHandler(state, action.payload);
    }

    case INVESTMENT_DELETE_REQUESTED: {
      return state;
    }

    case INVESTMENT_DELETE_SUCCEEDED: {
      return deleteInvestmentSuccessHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
