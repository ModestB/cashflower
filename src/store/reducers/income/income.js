import produce  from 'immer';
import {
  INCOME_GET_ALL_REQUESTED,
  INCOME_GET_ALL_SUCCEEDED,
  INCOME_ADD_REQUESTED,
  INCOME_ADD_SUCCEEDED,
  INCOME_EDIT_REQUESTED,
  INCOME_EDIT_SUCCEEDED,
  INCOME_DELETE_REQUESTED,
  INCOME_DELETE_SUCCEEDED,
  INCOME_TYPE_ADD_REQUESTED,
  INCOME_TYPE_ADD_SUCCEEDED,
  INCOME_TYPE_DELETE_REQUESTED,
  INCOME_TYPE_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

const initialState = {
  data: {},
  types: {},
  incomeDataLoading: false,
  incomeAddLoading: false,
}

const requestAddIncomeHandler = (state) => {
  const nextState = produce(state,  draftState => {
    draftState.incomeAddLoading = true;
  })

  return nextState;
}

const addIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.income.id] = payload.income;
    draftState.incomeAddLoading = false;
  })

  return nextState
}

const deleteIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
  })
  return nextState;
}

const requestAllIncomeData = (state) => {
  let nextState = produce(state, draftState =>  {
    draftState.incomeDataLoading = true;
  })

  return nextState;
}

const getAllIcomeDataSuccesHandler = (state, payload) => {
  const nextState = produce(state,  draftState => {
    draftState.incomeDataLoading = false;
    draftState.data = {...payload.income};
    draftState.types = {...payload.types}
    Object.keys(draftState.data)
      .forEach(key => draftState.data[key]['id'] = key)
    Object.keys(draftState.types)
      .forEach(key => draftState.types[key]['key'] = key)
  })
  return nextState
}

const editIncomeDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] =  {...state.data[payload.key], ...payload.income}
  })
  return nextState
}

const addIncomeTypeHandler = (state, payload) => {
  const nextState = produce(state, draftState  => {
    draftState.types[payload.key] = {...payload.type, key: payload.key};
  })
  return nextState;
}

const deleteIncomeTypeHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.types[payload.key];
  })
  return nextState;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCOME_GET_ALL_REQUESTED: {
      return requestAllIncomeData(state);
    }

    case INCOME_GET_ALL_SUCCEEDED: {
      return getAllIcomeDataSuccesHandler(state, action.payload);
    }

    case INCOME_ADD_REQUESTED: {
      return requestAddIncomeHandler(state);
    }

    case INCOME_ADD_SUCCEEDED: {
      return addIncomeSuccessHandler(state, action.payload);
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
      return deleteIncomeSuccessHandler(state, action.payload);
    }

    case INCOME_TYPE_ADD_REQUESTED: {
      return state;
    }

    case  INCOME_TYPE_ADD_SUCCEEDED: {
      return addIncomeTypeHandler(state, action.payload);
    }

    case INCOME_TYPE_DELETE_REQUESTED: {
      return state;
    }

    case INCOME_TYPE_DELETE_SUCCEEDED: {
      return deleteIncomeTypeHandler(state, action.payload);
    }

    default:
      return state;
  }
};
