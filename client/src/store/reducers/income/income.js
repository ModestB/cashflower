import produce from 'immer';
import format from 'date-fns/format';
import {
  INCOME_GET_ALL_REQUESTED,
  INCOME_GET_ALL_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
  CURRENT_INCOME_YEAR_CHANGE,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';

const initialState = {
  data: {},
  dataByYear: {},
  currentDataYear: parseInt(format(new Date(), 'yyyy'), 10),
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
    const year = parseInt(format(new Date(payload.income.date), 'yyyy'), 10);
    draftState.data[payload.key] = payload.income;
    draftState.incomeAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.dataByYear[payload.key] = payload.income;
    }
  });

  return nextState;
};

const deleteIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
    delete draftState.dataByYear[payload.key];
  });
  return nextState;
};

const requestAllIncomeData = (state) => {
  const nextState = produce(state, draftState => {
    draftState.incomeDataLoading = true;
  });

  return nextState;
};

const getAllIcomeDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.incomeDataLoading = false;
    draftState.data = {};
    draftState.dataByYear = {};

    Object.keys(payload.income)
      .forEach(key => {
        draftState.data[payload.income[key].id] = payload.income[key];
        const date = parseInt(format(new Date(payload.income[key].date), 'yyyy'), 10);
        if (date === state.currentDataYear) {
          draftState.dataByYear[payload.income[key].id] = payload.income[key];
        }
      });
  });
  return nextState;
};

const editIncomeDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = { ...state.data[payload.key], ...payload.income };
    draftState.dataByYear[payload.key] = { ...state.dataByYear[payload.key], ...payload.income };
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
    case INCOME_GET_ALL_REQUESTED: {
      return requestAllIncomeData(state);
    }

    case INCOME_GET_ALL_SUCCEEDED: {
      return getAllIcomeDataSuccesHandler(state, action.payload);
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

    case CURRENT_INCOME_YEAR_CHANGE: {
      return currentDataYearChangeHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
