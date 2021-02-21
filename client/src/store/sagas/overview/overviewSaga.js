import { put } from 'redux-saga/effects';
import axios from '../../../axios';
import * as actions from '../../actions/actions';

export default function* setOverviewSaga() {
  const url = '/overview';

  const res = yield axios.get(url);

  yield put(actions.setOverviewData(res.data));
}
