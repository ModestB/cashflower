import {
  STATISTICS_GET_REQUESTED,
  STATISTICS_GET_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const getStatisticsData = () => ({
  type: STATISTICS_GET_REQUESTED,
});

export const setStatisticsData = (statistics) => ({
  type: STATISTICS_GET_SUCCEEDED,
  payload: {
    statistics,
  },
});
