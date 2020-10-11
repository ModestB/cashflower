import produce  from 'immer';
import moment from "moment";
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
  CURRENT_INCOME_YEAR_CHANGE,
} from '../../actionTypes/actionTypes';

const initialState = {
  data: {},
  dataByYear: {},
  types: {},
  dataYears: {},
  currentDataYear: moment().format('YYYY'),
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
    const year = moment(payload.income.date).format('YYYY');
    draftState.data[payload.key] = payload.income;
    draftState.incomeAddLoading = false;

    if (state.currentDataYear === year) {
      draftState.dataByYear[payload.key] = payload.income;
    }
 
    if (!state.dataYears.includes(year)) {
      draftState.dataYears = [...state.dataYears, year];
    }
  })

  return nextState
}

const deleteIncomeSuccessHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    delete draftState.data[payload.key];
    delete draftState.dataByYear[payload.key];
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
    draftState.dataByYear = {};

    const years = [];
    Object.keys(payload.income)
      .forEach(key => {
        const date = moment(payload.income[key].date).format('YYYY')
        if (!years.includes(date)) {
          years.push(date);
        }
        if (date === state.currentDataYear) {
          draftState.dataByYear[key] = payload.income[key];
        }
      })

    draftState.dataYears = [...years];
  })
  return nextState
}

const editIncomeDataHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.data[payload.key] =  {...state.data[payload.key], ...payload.income}
    draftState.dataByYear[payload.key] =  {...state.dataByYear[payload.key], ...payload.income}
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

const currentDataYearChangeHandler = (state, payload) => {
  const nextState = produce(state, draftState => {
    draftState.currentDataYear = payload.year;
    draftState.dataByYear = {};

    Object.keys(state.data)
      .forEach(key => {
        const date = moment(state.data[key].date).format('YYYY')
        if (date === payload.year) {
          draftState.dataByYear[key] = state.data[key];
        }
      })
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

    case CURRENT_INCOME_YEAR_CHANGE: {
      return currentDataYearChangeHandler(state, action.payload);
    }

    default:
      return state;
  }
};
