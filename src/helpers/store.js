import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  createLogger,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'redux-logger';

import reducers from '../reducers';
import {
  isDev,
} from './config';

const logger = createLogger({
  predicate: () => isDev,
});

// eslint-disable-next-line import/no-mutable-exports
let store;

const storeMiddleware = () => (next) => (action) => next(action);
export function getStore() {
  if (!store) {
    if (
      typeof window !== 'undefined' &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
    ) {
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(logger, storeMiddleware))
      );
    } else {
      store = createStore(
        reducers,
        applyMiddleware(logger, storeMiddleware)
      );
    }
  }
  return store;
}

store = getStore();

export default store;
