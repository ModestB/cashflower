import {
  INVESTMENT_GOALS_GET_REQUESTED,
  INVESTMENT_GOALS_GET_SUCCEEDED,
  INVESTMENT_GOAL_ADD_REQUESTED,
  INVESTMENT_GOAL_ADD_SUCCEEDED,
  INVESTMENT_GOAL_ADD_FAILED,
  INVESTMENT_GOAL_EDIT_REQUESTED,
  INVESTMENT_GOAL_EDIT_SUCCEEDED,
  INVESTMENT_GOAL_EDIT_FAILED,
  INVESTMENT_GOAL_DELETE_REQUESTED,
  INVESTMENT_GOAL_DELETE_SUCCEEDED,
} from '../../actionTypes/actionTypes';

export const getInvestmentGoalsData = (year) => ({
  type: INVESTMENT_GOALS_GET_REQUESTED,
  payload: {
    year,
  },
});

export const setInvestmentGoalsData = (investmentGoals) => ({
  type: INVESTMENT_GOALS_GET_SUCCEEDED,
  payload: {
    investmentGoals,
  },
});

export const investmentGoalAddRequest = (investmentGoal, currentDataYear) => ({
  type: INVESTMENT_GOAL_ADD_REQUESTED,
  payload: {
    investmentGoal,
    currentDataYear,
  },
});

export const investmentGoalAddSucceess = (investmentGoal, key) => ({
  type: INVESTMENT_GOAL_ADD_SUCCEEDED,
  payload: {
    investmentGoal,
    key,
  },
});

export const investmentGoalAddFailed = (error) => ({
  type: INVESTMENT_GOAL_ADD_FAILED,
  payload: {
    error,
  },
});

export const deleteInvestmentGoalRequest = (key, userId) => ({
  type: INVESTMENT_GOAL_DELETE_REQUESTED,
  payload: {
    key,
    userId,
  },
});

export const deleteInvestmentGoalSucceess = (key) => ({
  type: INVESTMENT_GOAL_DELETE_SUCCEEDED,
  payload: {
    key,
  },
});

export const investmentGoalEditRequest = (key, investmentGoal, userId, currentDataYear) => ({
  type: INVESTMENT_GOAL_EDIT_REQUESTED,
  payload: {
    key,
    investmentGoal,
    userId,
    currentDataYear,
  },
});

export const investmentGoalEditSucceess = (key, investmentGoal) => ({
  type: INVESTMENT_GOAL_EDIT_SUCCEEDED,
  payload: {
    key,
    investmentGoal,
  },
});

export const investmentGoalEditFailed = (error) => ({
  type: INVESTMENT_GOAL_EDIT_FAILED,
  payload: {
    error,
  },
});
