import produce from 'immer';
import {
  STATISTICS_GET_REQUESTED,
  STATISTICS_GET_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const initialState = {
  data: {},
  statisticsLoading: false,
};

const getStatisticsDataRequestHandler = (state,) => {
  const nextState = produce(state, draftState => {
    draftState.statisticsLoading = true;
  });

  return nextState;
};

const getStatisticsDataSuccesHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.statisticsLoading = false;
    draftState.data = payload.statistics;
  });
  return nextState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS_GET_REQUESTED: {
      return getStatisticsDataRequestHandler(state);
    }

    case STATISTICS_GET_SUCCEEDED: {
      return getStatisticsDataSuccesHandler(state, action.payload);
    }

    default:
      return state;
  }
};
