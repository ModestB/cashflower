import {
  OVERVIEW_GET_REQUESTED,
  OVERVIEW_GET_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const getOverviewData = () => ({
  type: OVERVIEW_GET_REQUESTED,
});

export const setOverviewData = (data) => ({
  type: OVERVIEW_GET_SUCCEEDED,
  payload: {
    data,
  },
});
