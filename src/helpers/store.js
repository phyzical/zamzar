import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    createLogger
} from 'redux-logger';

import reducers from '../reducers';
import {
    isDev
} from './config';

const logger = createLogger({
    predicate: () => isDev
});

let store;

const storeMiddleware = store => next => action => {
    // continue processing this action
    return next(action);
};

export function getStore() {
    if (!store) {
        if (
            typeof window !== 'undefined' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
        ) {
            const composeEnhancers =
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
            store = createStore(
                reducers,
                composeEnhancers(applyMiddleware(logger, storeMiddleware)),
            );
        } else {
            store = createStore(
                reducers,
                applyMiddleware(logger, storeMiddleware),
            );
        }
    }
    return store;
}

store = getStore();

export default store;
