import produce from 'immer';
import {
  INVESTMENT_GOALS_GET_REQUESTED,
  INVESTMENT_GOALS_GET_SUCCEEDED,
  INVESTMENT_GOAL_ADD_REQUESTED,
  INVESTMENT_GOAL_ADD_SUCCEEDED,
  INVESTMENT_GOAL_EDIT_REQUESTED,
  INVESTMENT_GOAL_EDIT_SUCCEEDED,
  INVESTMENT_GOAL_DELETE_REQUESTED,
  INVESTMENT_GOAL_DELETE_SUCCEEDED,
  AUTH_LOGOUT,
} from '../../actionTypes/actionTypes';
import { formatDateToYear } from '../../../shared/utilities';

const initialState = {
  data: {},
  currentDataYear: formatDateToYear(new Date()),
  investmentGoalsDataLoading: false,
  investmentGoalAddLoading: false,
};

const requestAddInvestmentGoalHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.investmentGoalAddLoading = true;
  });

  return nextState;
};

const addInvestmentGoalSuccessHandler = (state, payload) => {
  console.log(payload)
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = payload.investmentGoal;
    draftState.investmentGoalAddLoading = false;

    if (state.currentDataYear === payload.investmentGoal.year) {
      draftState.data[payload.key] = payload.investmentGoal;
    }
  });

  return nextState;
};

const deleteInvestmentGoalSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
  });
  return nextState;
};

const getInvestmentGoalsDataRequestHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.investmentGoalsDataLoading = true;

    if (state.currentDataYear !== payload.year) {
      draftState.currentDataYear = payload.year;
    }
  });

  return nextState;
};

const getInvestmentGoalsDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.investmentGoalsDataLoading = false;
    draftState.data = {};

    Object.keys(payload.investmentGoals)
      .forEach(key => {
        draftState.data[payload.investmentGoals[key].id] = payload.investmentGoals[key];
      });
  });
  return nextState;
};

const editInvestmentGoalDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = { ...state.data[payload.key], ...payload.investmentGoal };
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INVESTMENT_GOALS_GET_REQUESTED: {
      return getInvestmentGoalsDataRequestHandler(state, action.payload);
    }

    case INVESTMENT_GOALS_GET_SUCCEEDED: {
      return getInvestmentGoalsDataSuccesHandler(state, action.payload);
    }

    case INVESTMENT_GOAL_ADD_REQUESTED: {
      return requestAddInvestmentGoalHandler(state);
    }

    case INVESTMENT_GOAL_ADD_SUCCEEDED: {
      return addInvestmentGoalSuccessHandler(state, action.payload);
    }

    case INVESTMENT_GOAL_EDIT_REQUESTED: {
      return state;
    }

    case INVESTMENT_GOAL_EDIT_SUCCEEDED: {
      return editInvestmentGoalDataHandler(state, action.payload);
    }

    case INVESTMENT_GOAL_DELETE_REQUESTED: {
      return state;
    }

    case INVESTMENT_GOAL_DELETE_SUCCEEDED: {
      return deleteInvestmentGoalSuccessHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
