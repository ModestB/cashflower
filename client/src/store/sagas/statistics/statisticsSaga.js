import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export default function* setStatisticsSaga() {
  const url = '/statistics';

  const res = yield axios.get(url);

  yield put(actions.setStatisticsData(res.data));
}
