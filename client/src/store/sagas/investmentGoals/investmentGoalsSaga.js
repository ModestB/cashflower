import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';
import { formatDateToYear } from '../../../shared/utilities';

export function* setInvestmentGoalsDataSaga(action) {
  const { year } = { ...action.payload };
  const url = `/investmentGoal?startYear=${year}&endYear=${year}`;

  const res = yield axios.get(url);

  yield put(actions.setInvestmentGoalsData(res.data.investmentGoals));
}

export function* addInvestmentGoalDataSaga(action) {
  const { currentDataYear } = { ...action.payload };
  action.payload.investmentGoal.year = formatDateToYear(
    new Date(action.payload.investmentGoal.year), 'yyyy',
  );

  try {
    const promise = new Promise((resolve, reject) => {
      axios.post('/investmentGoal', action.payload.investmentGoal)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;
    const resultDataYear = results.data.year;

    yield put(actions.investmentGoalAddSucceess(results.data, results.data.id));

    if (currentDataYear !== resultDataYear) {
      yield put(actions.getInvestmentGoalsData(resultDataYear));
    }
  } catch (error) {
    yield put(actions.investmentGoalAddFailed(error.response.data.message));
  }
}

export function* editInvestmentGoalDataSaga(action) {
  const { currentDataYear } = { ...action.payload };
  action.payload.investmentGoal.year = formatDateToYear(
    new Date(action.payload.investmentGoal.year), 'yyyy',
  );
  try {
    const promise = new Promise((resolve, reject) => {
      axios.patch(`/investmentGoal/${action.payload.key}`, action.payload.investmentGoal)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    const result = yield promise;
    yield put(actions.investmentGoalEditSucceess(action.payload.key, result));

    if (currentDataYear !== result.year) {
      yield put(actions.getInvestmentGoalsData(result.year));
    }
  } catch (error) {
    yield put(actions.investmentGoalEditFailed(error.response.data.message));
  }
}

export function* deleteInvestmentGoalDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/investmentGoal/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteInvestmentGoalSucceess(action.payload.key, result));
}
