import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import filters from '../slices/filters';
import heroes from '../slices/heroes';
import { rootSaga } from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, sagaMiddleware),
  davTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);