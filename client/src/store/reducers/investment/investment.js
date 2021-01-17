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
  INVESTMENT_TYPE_ADD_REQUESTED,
  INVESTMENT_TYPE_ADD_SUCCEEDED,
  INVESTMENT_TYPE_DELETE_REQUESTED,
  INVESTMENT_TYPE_DELETE_SUCCEEDED,
  CURRENT_INVESTMENT_YEAR_CHANGE,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';

const initialState = {
  dataLoaded: false,
  data: {},
  dataByYear: {},
  types: {},
  dataYears: [],
  currentDataYear: format(new Date(), 'yyyy'),
  investmentDataLoading: false,
  investmentAddLoading: false,
  investmentTypeAddLoading: false,
  investmentTypeDeleteLoading: false,
};

const requestAddInvestmentHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentAddLoading = true;
  });

  return nextState;
};

const addInvestmentSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    const year = format(new Date(payload.investment.date), 'yyyy');
    draftState.data[payload.key] = payload.investment;
    draftState.investmentAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.dataByYear[payload.key] = payload.investment;
    }

    if (!state.dataYears.includes(year)) {
      draftState.dataYears = [...state.dataYears, year];
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
    draftState.types = {};
    draftState.dataByYear = {};

    const years = [];
    Object.keys(payload.investment)
      .forEach(key => {
        draftState.data[payload.investment[key].id] = payload.investment[key];
        const date = format(new Date(payload.investment[key].date), 'yyyy');
        if (!years.includes(date)) {
          years.push(date);
        }
        if (date === state.currentDataYear) {
          draftState.dataByYear[payload.investment[key].id] = payload.investment[key];
        }
      });

    Object.keys(payload.types).forEach(key => {
      draftState.types[payload.types[key].id] = payload.types[key];
    });

    draftState.dataYears = [...years];
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

const addInvestmentTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentTypeAddLoading = true;
  });
  return nextState;
};

const addInvestmentTypeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.types[payload.key] = { ...payload.type };
    draftState.investmentTypeAddLoading = false;
  });
  return nextState;
};

const deleteInvestmentTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentTypeDeleteLoading = true;
  });
  return nextState;
};

const deleteInvestmentTypeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.types[payload.key];
    draftState.investmentTypeDeleteLoading = false;
  });
  return nextState;
};

const currentDataYearChangeHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.currentDataYear = payload.year;
    draftState.dataByYear = {};

    Object.keys(state.data)
      .forEach(key => {
        const date = format(new Date(state.data[key].date), 'yyyy');
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

    case INVESTMENT_TYPE_ADD_REQUESTED: {
      return addInvestmentTypeRequestHandler(state);
    }

    case INVESTMENT_TYPE_ADD_SUCCEEDED: {
      return addInvestmentTypeSuccessHandler(state, action.payload);
    }

    case INVESTMENT_TYPE_DELETE_REQUESTED: {
      return deleteInvestmentTypeRequestHandler(state);
    }

    case INVESTMENT_TYPE_DELETE_SUCCEEDED: {
      return deleteInvestmentTypeSuccessHandler(state, action.payload);
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
