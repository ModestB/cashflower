import { 
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case INCOME_ADD_REQUESTED: {
      return true;
    }

    case INCOME_ADD_SUCCEEDED: {
      return false;
    }

    default: 
      return false;

  }
}
