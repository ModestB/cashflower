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

const initialState = {
  data: {},
  incomeDataLoading: false,
  incomeAddLoading: false,
}

const addIncomeHandler = (state, payload) => {
  const newEntry = {};
  newEntry[payload.income.id] = payload.income
  let updatedState = {};
  updatedState.data = {...state.data, ...newEntry};
  updatedState.incomeAddLoading = false;

  return updatedState
}

const deleteIncomeHandler = (state, payload) => {
  let updatedState = {};
  updatedState.data = {...state.data};

  delete updatedState.data[payload.key];

  return updatedState;
}

const requestAllIncomeData = (state) => {
  let updatedState = {...state};
  updatedState.incomeDataLoading = true;

  return updatedState;
}

const setAllIncomeDataHandler = (state, payload) => {
  let initialState = {...state};
  initialState.incomeDataLoading = false;
  initialState.data = {...payload};
   Object.keys(initialState.data)
    .forEach(key => initialState.data[key]['id'] = key)

  return initialState
}

const requestAddIncomeHandler = (state) => {
  let updatedState = {};
  updatedState.data = {...state.data}
  updatedState.incomeAddLoading = true;

  return updatedState;
}

const editIncomeDataHandler = (state, payload) => {
  let updatedState = {};
  updatedState.data = {...state.data}
  updatedState.data[payload.key] =  {...state.data[payload.key], ...payload.income}

  return updatedState
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCOME_GET_ALL_REQUESTED: {
      return requestAllIncomeData(state);
    }

    case INCOME_GET_ALL_SUCCEEDED: {
      return setAllIncomeDataHandler(state, action.payload.income);
    }

    case INCOME_ADD_REQUESTED: {
      return requestAddIncomeHandler(state);
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
