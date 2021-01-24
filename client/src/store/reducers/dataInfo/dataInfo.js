import produce from 'immer';
import format from 'date-fns/format';
import {
  AUTH_SUCCEEDED,
  INCOME_ADD_SUCCEEDED,
  INCOME_TYPE_ADD_REQUESTED,
  INCOME_TYPE_ADD_SUCCEEDED,
  INCOME_TYPE_DELETE_REQUESTED,
  INCOME_TYPE_DELETE_SUCCEEDED,
  INVESTMENT_ADD_SUCCEEDED,
  INVESTMENT_TYPE_ADD_REQUESTED,
  INVESTMENT_TYPE_ADD_SUCCEEDED,
  INVESTMENT_TYPE_DELETE_REQUESTED,
  INVESTMENT_TYPE_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const initialState = {
  years: {},
  types: {},
  loading: {
    typeAdd: false,
    typeDelete: false,
  },
};

const addYearHandler = (state, payload, store) => {
  const nextState = produce(state, draftState => {
    const year = parseInt(format(new Date(payload[store].date), 'yyyy'), 10);

    if (!state.years[store].includes(parseInt(year, 10))) {
      draftState.years[store] = [
        ...draftState.years[store],
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
