import { auth, db } from '../../services/firebase';
import { ref, set, remove } from '@firebase/database';
import { addTicker, getTickerInfo } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';
import { setTickersInfo } from '../actions/setTickersInfo';
import { autoCompleteTickerWithSaga } from '../actions/autoComplete';

export const onAddTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.tickerType}/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total, roubleCost: action.roubleCost, roubleTotal: action.roubleTotal, currency: action.currency});
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/${action.tickerType}/${action.ticker}/`);
        yield set(tickerCurrent, {ticker: action.ticker, quantity: action.quantity, currency: action.currency, description: action.description});
        yield put(autoCompleteTickerWithSaga(action.ticker, action.date, action.quantity, action.currency));
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

export const onAutoCompleteTickersWithSaga = function* (action) {
    try {
        if (+(new Date(action.date)) < (+(new Date()) - 604800000)){
            const autoCompleteAction = yield call(addTicker, action.ticker,  new Date(+(new Date(action.date)) + 604800000), action.quantity, action.currency);
            yield put(autoCompleteAction);
        }
    } catch (err) {
        console.log(err);
    };
};

export const onSetTickersInfoWithSaga = function* (action){
    try {
        const tickerTable = yield call(getTickerInfo, action.tickers, action.tickerType);
        yield put(setTickersInfo(tickerTable, action.tickerType));
    } catch (err) {
        console.log(err);
    };
};