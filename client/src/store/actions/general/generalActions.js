import {
  CHANGE_HEADER_TITLE,
  RESET_GENERAL_ALERTS,
  ADD_INFO_ALERT,
  ADD_ERROR_ALERT,
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

export const addInfoAlert = (title, text) => ({
  type: ADD_INFO_ALERT,
  payload: {
    title,
    text,
  },
});

export const addErrorAlert = (text, place) => ({
  type: ADD_ERROR_ALERT,
  payload: {
    text,
    place,
  },
});
