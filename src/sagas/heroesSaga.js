import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../slices/heroes';

function* getHeroesWorker() {
  try {
    const { data } = yield call(axios.get, 'http://localhost:3001/heroes');
    yield put(heroesFetched(data));
  } catch {
    yield put(heroesFetchingError());
  }
};

export function* getHeroesWatcher() {
  yield takeEvery(heroesFetching, getHeroesWorker);
};
