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


export const getAllIncomeData = () => {
  return {
    type: INCOME_GET_ALL_REQUESTED
  }
};

export const setAllIncomeData = (income) => {
  return {
    type: INCOME_GET_ALL_SUCCEEDED,
    payload: {
      income
    }
  }
};

export const incomeAddRequest= (income) => {
  return {
    type: INCOME_ADD_REQUESTED,
    payload: {
      income
    }
  }
};

export const incomeAddSucceess= (income) => {
  return {
    type: INCOME_ADD_SUCCEEDED,
    payload: {
      income
    }
  }
};

export const deleteIncomeRequest = (key) => {
  return {
    type: INCOME_DELETE_REQUESTED,
    payload: {
      key
    }
  }
}

export const  deleteIncomeSucceess = (key) => {
  return {
    type: INCOME_DELETE_SUCCEEDED,
    payload: {
      key
    }
  }
}

export const incomeEditRequest= (key, income) => {
  return {
    type: INCOME_EDIT_REQUESTED,
    payload: {
      key,
      income
    }
  }
}

export const incomeEditSucceess= (key,  income) => {
  return {
    type: INCOME_EDIT_SUCCEEDED,
    payload: {
      key,
      income
    }
  }
}