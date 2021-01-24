import produce from 'immer';
import format from 'date-fns/format';
import {
  INVESTMENT_GET_ALL_REQUESTED,
  INVESTMENT_GET_ALL_SUCCEEDED,
  INVESTMENT_ADD_REQUESTED,
  INVESTMENT_ADD_SUCCEEDED,
  INVESTMENT_EDIT_REQUESTED,
  INVESTMENT_EDIT_SUCCEEDED,
  INVESTMENT_DELETE_REQUESTED,
  INVESTMENT_DELETE_SUCCEEDED,
  CURRENT_INVESTMENT_YEAR_CHANGE,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';

const initialState = {
  dataLoaded: false,
  data: {},
  dataByYear: {},
  currentDataYear: parseInt(format(new Date(), 'yyyy'), 10),
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
    const year = parseInt(format(new Date(payload.investment.date), 'yyyy'), 10);
    draftState.data[payload.key] = payload.investment;
    draftState.investmentAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.dataByYear[payload.key] = payload.investment;
    }
  });

  return nextState;
};

const deleteInvestmentSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
    delete draftState.dataByYear[payload.key];
  });
  return nextState;
};

const requestAllInvestmentData = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentDataLoading = true;
  });

  return nextState;
};

const getAllIcomeDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.investmentDataLoading = false;
    draftState.data = {};
    draftState.dataByYear = {};

    Object.keys(payload.investment)
      .forEach(key => {
        draftState.data[payload.investment[key].id] = payload.investment[key];
        const date = parseInt(format(new Date(payload.investment[key].date), 'yyyy'), 10);
        if (date === state.currentDataYear) {
          draftState.dataByYear[payload.investment[key].id] = payload.investment[key];
        }
      });

    draftState.dataLoaded = true;
  });
  return nextState;
};

const editInvestmentDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = { ...state.data[payload.key], ...payload.investment };
    draftState.dataByYear[payload.key] =
      { ...state.dataByYear[payload.key], ...payload.investment };
  });
  return nextState;
};

const currentDataYearChangeHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.currentDataYear = payload.year;
    draftState.dataByYear = {};

    Object.keys(state.data)
      .forEach(key => {
        const date = parseInt(format(new Date(state.data[key].date), 'yyyy'), 10);
        if (date === payload.year) {
          draftState.dataByYear[key] = state.data[key];
        }
      });
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVESTMENT_GET_ALL_REQUESTED: {
      return requestAllInvestmentData(state);
    }

    case INVESTMENT_GET_ALL_SUCCEEDED: {
      return getAllIcomeDataSuccesHandler(state, action.payload);
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

    case CURRENT_INVESTMENT_YEAR_CHANGE: {
      return currentDataYearChangeHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
