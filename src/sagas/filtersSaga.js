import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { filtersFetching, filtersFetched, filtersFetchingError } from '../slices/filters';

function* getFiltersWorker() {
  try {
    const { data } = yield call(axios.get, 'http://localhost:3001/filters');
    yield put(filtersFetched(data));
  } catch {
    yield put(filtersFetchingError());
  }
};

export function* getFiltersWatcher() {
  yield takeEvery(filtersFetching, getFiltersWorker);
};