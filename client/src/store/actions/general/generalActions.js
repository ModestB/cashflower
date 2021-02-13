import {
  CHANGE_HEADER_TITLE,
  RESET_GENERAL_ALERTS,
} from '../../actionTypes/actionTypes';

export const changeHeaderTitle = (headerTitle) => ({
  type: CHANGE_HEADER_TITLE,
  payload: {
    headerTitle,
  },
});

export const resetGeneralAlerts = () => ({
  type: RESET_GENERAL_ALERTS,
});
