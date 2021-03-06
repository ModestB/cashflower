import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';
import { formatDateToYear } from '../../../shared/utilities';

export function* setIncomeDataSaga(action) {
  const { year } = { ...action.payload };
  let url = `/income?startYear=${year}&endYear=${year}`;
  if (year === 'All') {
    url = '/income';
  }

  const res = yield axios.get(url);

  yield put(actions.setIncomeData(res.data.income));
}

export function* addIncomeDataSaga(action) {
  const { currentDataYear } = { ...action.payload };
  try {
    const promise = new Promise((resolve, reject) => {
      axios.post('/income', action.payload.income)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;
    const resultDataYear = formatDateToYear(new Date(results.data.date));

    yield put(actions.incomeAddSucceess(results.data, results.data.id));

    if (currentDataYear !== resultDataYear && currentDataYear !== 'All') {
      yield put(actions.getIncomeData(resultDataYear));
    }
  } catch (error) {
    yield put(actions.incomeAddFailed(error.response.data.message));
  }
}

export function* editIncomeDataSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.patch(`/income/${action.payload.key}`, action.payload.income)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    const result = yield promise;
    yield put(actions.incomeEditSucceess(action.payload.key, result));
  } catch (error) {
    yield put(actions.incomeEditFailed(error.response.data.message));
  }
}

export function* deleteIncomeDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/income/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteIncomeSucceess(action.payload.key, result));
}

export function* addIncomeTypeSaga(action) {
  const promise = new Promise((resolve) => {
    const body = {
      value: action.payload.type.value,
      label: action.payload.type.label,
    };
    axios.post('/incomeType', body)
      .then((response) => {
        resolve(response);
      });
  });
  const results = yield promise;
  yield put(
    actions.incomeTypeAddSuccess(
      action.payload.type,
      results.data.id,
    ),
  );
}

export function* deleteIncomeTypeSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/incomeType/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  yield promise;

  yield put(actions.incomeTypeDeleteSucceess(action.payload.key));
}
