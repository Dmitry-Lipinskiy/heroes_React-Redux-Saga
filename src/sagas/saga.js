import { all } from 'redux-saga/effects';

import { getHeroesWatcher } from './heroesSaga';
import { getFiltersWatcher } from './filtersSaga';

export function* rootSaga() {
  yield all([getHeroesWatcher(), getFiltersWatcher()]);
};