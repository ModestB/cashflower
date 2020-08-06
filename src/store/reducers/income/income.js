import {
  INCOME_GET_ALL_REQUESTED,
  INCOME_GET_ALL_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const addIncomeHandler = (state, payload) => {
  const newEntry = {};
  newEntry[payload.income.id] = payload.income
  let updatedState = {};
  updatedState = {...state, ...newEntry};

  return updatedState
}

const deleteIncomeHandler = (state, payload) => {
  let updatedState = {...state};
  delete updatedState[payload.key];

  return updatedState;
}

const setAllIncomeDataHandler = (payload) => {
  let initialState = {...payload};
   Object.keys(initialState)
    .forEach(key => initialState[key]['id'] = key)

  return initialState
}

const editIncomeDataHandler = (state, payload) => {
  let updatedState = {...state};
  updatedState[payload.key] =  {...state[payload.key], ...payload.income}

  return updatedState
}

export default (state = {}, action) => {
  switch (action.type) {
    case INCOME_GET_ALL_REQUESTED: {
      return state;
    }

    case INCOME_GET_ALL_SUCCEEDED: {
      return setAllIncomeDataHandler(action.payload.income);
    }

    case INCOME_ADD_REQUESTED: {
      return state;
    }

    case INCOME_ADD_SUCCEEDED: {
      return addIncomeHandler(state, action.payload);
    }

    case INCOME_EDIT_REQUESTED: {
      return state;
    }

    case INCOME_EDIT_SUCCEEDED: {
      return editIncomeDataHandler(state, action.payload);
    }

    case INCOME_DELETE_REQUESTED: {
      return state;
    }

    case INCOME_DELETE_SUCCEEDED: {
      return deleteIncomeHandler(state, action.payload);
    }

    default:
      return state;
  }
};
