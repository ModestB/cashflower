import { 
  INCOME_GET_ALL_REQUESTED,
  INCOME_GET_ALL_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case INCOME_GET_ALL_REQUESTED: {
      return true;
    }

    case INCOME_GET_ALL_SUCCEEDED: {
      return false;
    }

    default: 
      return false;

  }
}
