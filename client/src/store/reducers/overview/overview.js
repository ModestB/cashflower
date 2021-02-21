import produce from 'immer';
import {
  AUTH_LOGOUT,
  OVERVIEW_GET_REQUESTED,
  OVERVIEW_GET_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const initialState = {
  data: {},
  dataLoading: false,
};

const getOverviewDataRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.dataLoading = true;
  });

  return nextState;
};

const getOverviewDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.dataLoading = false;
    draftState.data = payload.data;
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OVERVIEW_GET_REQUESTED: {
      return getOverviewDataRequestHandler(state);
    }

    case OVERVIEW_GET_SUCCEEDED: {
      return getOverviewDataSuccesHandler(state, action.payload);
    }

    case AUTH_LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
