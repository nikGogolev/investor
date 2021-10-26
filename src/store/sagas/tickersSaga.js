import { auth, db } from '../../services/firebase';
import { ref, set, remove } from '@firebase/database';
import { addTicker } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';

export const onAddTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.ticker}/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, quantity: action.quantity, cost: action.cost, total: action.total });
    } catch (err) {
        console.log(err);
    };
};

export const onAddStockTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/stocks/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total, currency: action.currency });
        const tickerDescription = yield ref(db, `${auth.currentUser.uid}/tickers/stocks/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/stocks/${action.ticker}/`);
        yield set(tickerCurrent, {ticker: action.ticker, quantity: action.quantity});
    } catch (err) {
        console.log(err);
    };
};

export const onAddPifsTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/pifs/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total, currency: action.currency });
        const tickerDescription = yield ref(db, `${auth.currentUser.uid}/tickers/pifs/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/pifs/${action.ticker}/`);
        yield set(tickerCurrent, {ticker: action.ticker, quantity: action.quantity});
    } catch (err) {
        console.log(err);
    };
};

export const onAddBondsTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/bonds/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total, currency: action.currency });
        const tickerDescription = yield ref(db, `${auth.currentUser.uid}/tickers/bonds/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/bonds/${action.ticker}/`);
        yield set(tickerCurrent, {ticker: action.ticker, quantity: action.quantity});
    } catch (err) {
        console.log(err);
    };
};

export const onAddForexTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/forex/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total, currency: action.currency });
        const tickerDescription = yield ref(db, `${auth.currentUser.uid}/tickers/forex/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/bonds/${action.ticker}/`);
        yield set(tickerCurrent, {ticker: action.ticker, quantity: action.quantity});
    } catch (err) {
        console.log(err);
    };
};

export const onDelTickerWithSaga = function* (action) {
    try {
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/${action.marketType}/${action.ticker}`);
        yield remove(tickerCurrent);
        const ticker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.marketType}/${action.ticker}`);
        yield remove(ticker);
        
    } catch (err) {
        console.log(err);
    };
};

export const onAutoCompleteStocksTickersWithSaga = function* (action) {
    try {
        const autoCompleteAction = yield call(addTicker, action.ticker, action.date, action.quantity, action.currency);
        yield put(autoCompleteAction);
    } catch (err) {
        console.log(err);
    };
};