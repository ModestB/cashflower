import produce from 'immer';
import {
  AUTH_SUCCEEDED,
  INCOME_ADD_SUCCEEDED,
  INCOME_TYPE_ADD_REQUESTED,
  INCOME_TYPE_ADD_SUCCEEDED,
  INCOME_TYPE_DELETE_REQUESTED,
  INCOME_TYPE_DELETE_SUCCEEDED,
  INVESTMENT_ADD_SUCCEEDED,
  INVESTMENT_GOAL_ADD_SUCCEEDED,
  INVESTMENT_TYPE_ADD_REQUESTED,
  INVESTMENT_TYPE_ADD_SUCCEEDED,
  INVESTMENT_TYPE_DELETE_REQUESTED,
  INVESTMENT_TYPE_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';
import { formatDateToYear } from '../../../shared/utilities';

const initialState = {
  years: {},
  types: {},
  loading: {
    typeAdd: false,
    typeDelete: false,
  },
};

const addYearHandler = (state, payload, payloadStore, stateStore) => {
  const sStore = stateStore || payloadStore;
  const nextState = produce(state, draftState => {
    let year = null;
    if (payload[payloadStore].year) {
      year = payload[payloadStore].year;
    } else {
      year = formatDateToYear(new Date(payload[payloadStore].date));
    }

    if (!state.years[sStore].includes(parseInt(year, 10))) {
      draftState.years[sStore] = [
        ...draftState.years[sStore],
        year,
      ].sort((a, b) => b - a);
    }
  });

  return nextState;
};

const addTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.loading.typeAdd = true;
  });
  return nextState;
};

const addTypeSuccessHandler = (state, payload, store) => {
  const nextState = produce(state, draftState => {
    draftState.types[store][payload.key] = { ...payload.type };
    draftState.loading.typeAdd = false;
  });
  return nextState;
};

const deleteTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.loading.typeDelete = true;
  });
  return nextState;
};

const deleteTypeSuccessHandler = (state, payload, store) => {
  const nextState = produce(state, draftState => {
    delete draftState.types[store][payload.key];
    draftState.loading.typeDelete = false;
  });
  return nextState;
};

const authSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.years = { ...payload.dataYears };
    draftState.types.income = {};
    draftState.types.investment = {};

    Object.keys(payload.dataYears).forEach((key) => {
      if (
        payload.dataYears[key].length > 1 &&
        key !== 'investmentGoals'
      ) {
        draftState.years[key] = [...payload.dataYears[key], 'All'];
      }
    });

    Object.keys(payload.dataTypes.income).forEach(key => {
      const incomeType = {
        [payload.dataTypes.income[key].id]: payload.dataTypes.income[key],
      };
      draftState.types.income = {
        ...draftState.types.income,
        ...incomeType,
      };
    });

    Object.keys(payload.dataTypes.investment).forEach(key => {
      const investmentType = {
        [payload.dataTypes.investment[key].id]: payload.dataTypes.investment[key],
      };
      draftState.types.investment = {
        ...draftState.types.investment,
        ...investmentType,
      };
    });

  });

  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCEEDED: {
      return authSuccessHandler(state, action.payload);
    }

    case INCOME_ADD_SUCCEEDED: {
      return addYearHandler(state, action.payload, 'income');
    }

    case INCOME_TYPE_ADD_REQUESTED: {
      return addTypeRequestHandler(state);
    }

    case INCOME_TYPE_ADD_SUCCEEDED: {
      return addTypeSuccessHandler(state, action.payload, 'income');
    }

    case INCOME_TYPE_DELETE_REQUESTED: {
      return deleteTypeRequestHandler(state);
    }

    case INCOME_TYPE_DELETE_SUCCEEDED: {
      return deleteTypeSuccessHandler(state, action.payload, 'income');
    }

    case INVESTMENT_ADD_SUCCEEDED: {
      return addYearHandler(state, action.payload, 'investment');
    }

    case INVESTMENT_GOAL_ADD_SUCCEEDED: {
      return addYearHandler(state, action.payload, 'investmentGoal', 'investmentGoals');
    }

    case INVESTMENT_TYPE_ADD_REQUESTED: {
      return addTypeRequestHandler(state);
    }

    case INVESTMENT_TYPE_ADD_SUCCEEDED: {
      return addTypeSuccessHandler(state, action.payload, 'investment');
    }

    case INVESTMENT_TYPE_DELETE_REQUESTED: {
      return deleteTypeRequestHandler(state);
    }

    case INVESTMENT_TYPE_DELETE_SUCCEEDED: {
      return deleteTypeSuccessHandler(state, action.payload, 'investment');
    }

    default:
      return state;
  }
};
