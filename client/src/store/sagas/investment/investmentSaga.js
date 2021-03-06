import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';
import { formatDateToYear } from '../../../shared/utilities';

export function* setInvestmentDataSaga(action) {
  const { year } = { ...action.payload };
  let url = `/investment?startYear=${year}&endYear=${year}`;
  if (year === 'All') {
    url = '/investment';
  }

  const res = yield axios.get(url);

  yield put(actions.setInvestmentData(res.data.investment));
}

export function* addInvestmentDataSaga(action) {
  const { currentDataYear } = { ...action.payload };

  try {
    const promise = new Promise((resolve, reject) => {
      axios.post('/investment', action.payload.investment)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    const results = yield promise;
    const resultDataYear = formatDateToYear(new Date(results.data.date));

    yield put(actions.investmentAddSucceess(results.data, results.data.id));

    if (currentDataYear !== resultDataYear && currentDataYear !== 'All') {
      yield put(actions.getInvestmentData(resultDataYear));
    }
  } catch (error) {
    yield put(actions.investmentAddFailed(error.response.data.message));
  }
}

export function* editInvestmentDataSaga(action) {
  try {
    const promise = new Promise((resolve, reject) => {
      axios.patch(`/investment/${action.payload.key}`, action.payload.investment)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

    const result = yield promise;
    yield put(actions.investmentEditSucceess(action.payload.key, result));
  } catch (error) {
    yield put(actions.investmentEditFailed(error.response.data.message));
  }
}

export function* deleteInvestmentDataSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/investment/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  const result = yield promise;

  yield put(actions.deleteInvestmentSucceess(action.payload.key, result));
}

export function* addInvestmentTypeSaga(action) {
  const promise = new Promise((resolve) => {
    const body = {
      value: action.payload.type.value,
      label: action.payload.type.label,
    };
    axios.post('/investmentType', body)
      .then((response) => {
        resolve(response);
      });
  });
  const results = yield promise;
  yield put(
    actions.investmentTypeAddSuccess(
      action.payload.type,
      results.data.id,
    ),
  );
}

export function* deleteInvestmentTypeSaga(action) {
  const promise = new Promise((resolve) => {
    axios.delete(`/investmentType/${action.payload.key}`)
      .then((response) => {
        resolve(response);
      });
  });

  yield promise;

  yield put(actions.investmentTypeDeleteSucceess(action.payload.key));
}
