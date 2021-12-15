import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import initialState from './initialState';

import mySaga from './sagas.js';
import userData from './reducers/userDataReducer';
import currentUserData from './reducers/currentUserDataReducer';
import filteredTickers from './reducers/filteredTickersReducer';

export const combine = combineReducers({ userData, currentUserData, filteredTickers });

const onErrorSaga = (error, stack) => { console.log('qqq' + error); console.log(stack) };
const options = { onError: onErrorSaga };
const sagaMiddleware = createSagaMiddleware(options);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, combine);

export const store = createStore(
	persistedReducer,
	initialState,
	composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);

