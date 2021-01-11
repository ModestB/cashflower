import {
  CHANGE_HEADER_TITLE,
} from '../../actionTypes/actionTypes';

export const changeHeaderTitle = (headerTitle) => ({
  type: CHANGE_HEADER_TITLE,
  payload: {
    headerTitle,
  },
});
