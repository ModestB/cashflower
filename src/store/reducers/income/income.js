import { GET_INCOME_DATA } from '../../actionTypes/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case GET_INCOME_DATA: {
      return state;
    }

    default:
      return state;
  }
};
