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
  incomeTypeAddLoading: false,
  incomeTypeDeleteLoading: false
}

const requestAddIncomeHandler = (state) => {
  const nextState = produce(state,  draftState => {
    draftState.incomeAddLoading = true;
  })

  return nextState;
}

const addIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] = payload.income;
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
  })
  return nextState
}

const editIncomeDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] =  {...state.data[payload.key], ...payload.income}
  })
  return nextState
}

const addIncomeTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.incomeTypeAddLoading = true;
  })
  return nextState;
}

const addIncomeTypeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.types[payload.key] = {...payload.type};
    draftState.incomeTypeAddLoading = false;
  })
  return nextState;
}

const deleteIncomeTypeRequestHandler = (state) => {
  const nextState = produce(state, draftState => {
    draftState.incomeTypeDeleteLoading = true;
  })
  return nextState;
}

const deleteIncomeTypeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.types[payload.key];
    draftState.incomeTypeDeleteLoading = false;
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
      return addIncomeTypeRequestHandler(state);
    }

    case  INCOME_TYPE_ADD_SUCCEEDED: {
      return addIncomeTypeSuccessHandler(state, action.payload);
    }

    case INCOME_TYPE_DELETE_REQUESTED: {
      return deleteIncomeTypeRequestHandler(state);
    }

    case INCOME_TYPE_DELETE_SUCCEEDED: {
      return deleteIncomeTypeSuccessHandler(state, action.payload);
    }

    default:
      return state;
  }
};
