import produce from 'immer';
import {
  CHANGE_HEADER_TITLE,
  RESET_GENERAL_ALERTS,
  INCOME_ADD_FAILED,
  INCOME_EDIT_FAILED,
  INVESTMENT_ADD_FAILED,
  INVESTMENT_EDIT_FAILED,
  INVESTMENT_GOAL_ADD_FAILED,
  INVESTMENT_GOAL_EDIT_FAILED,
} from '../../actionTypes/actionTypes';

const initialState = {
  headerTitle: 'Cashflower',
  alerts: {
    error: '',
  },
};

const alertErrorHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.alerts.error = payload.error;
  });

  return nextState;
};

const resetGeneralAlertsHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.alerts = { ...initialState.alerts };
  });

  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TITLE: {
      initialState.headerTitle = action.payload.headerTitle;
      return { ...initialState };
    }

    case INCOME_ADD_FAILED:
    case INCOME_EDIT_FAILED:
    case INVESTMENT_ADD_FAILED:
    case INVESTMENT_EDIT_FAILED:
    case INVESTMENT_GOAL_ADD_FAILED:
    case INVESTMENT_GOAL_EDIT_FAILED: {
      return alertErrorHandler(state, action.payload);
    }

    case RESET_GENERAL_ALERTS: {
      return resetGeneralAlertsHandler(state);
    }

    default:
      return state;
  }
};
