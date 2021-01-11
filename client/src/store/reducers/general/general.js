import {
  CHANGE_HEADER_TITLE,
} from '../../actionTypes/actionTypes';

const initialState = {
  headerTitle: 'Cashflower',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEADER_TITLE: {
      initialState.headerTitle = action.payload.headerTitle;
      return { ...initialState };
    }

    default:
      return state;
  }
};
