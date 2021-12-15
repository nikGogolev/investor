import { auth, db } from '../../services/firebase';
import { ref, set, remove, get } from '@firebase/database';
import { addTicker } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';
import { autoCompleteTickerWithSaga } from '../actions/autoComplete';

export const onAddTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.tickerType}/${action.ticker}/data/${action.date}`);
        yield set(newTicker, {
            ticker: action.ticker,
            description: action.description,
            quantity: action.quantity,
            usdCost: action.usdCost,
            usdTotal: action.usdTotal,
            rubCost: action.rubCost,
            rubTotal: action.rubTotal,
            eurCost: action.eurCost,
            eurTotal: action.eurTotal,
            profitUsdAbs: action.profitUsdAbs,
            profitUsdRel: action.profitUsdRel,
            profitRubAbs: action.profitRubAbs,
            profitRubRel: action.profitRubRel,
            profitEurAbs: action.profitEurAbs,
            profitEurRel: action.profitEurRel,
            currency: action.currency,
            bondNominal: action.bondNominal,
            couponOrDividendUsd: action.couponOrDividendUsd,
            couponOrDividendRub: action.couponOrDividendRub,
            couponOrDividendEur: action.couponOrDividendEur

        });
        const tickerCurrent = yield ref(db, `${auth.currentUser.uid}/portfolio/${action.tickerType}/${action.ticker}/`);
        yield set(tickerCurrent, { ticker: action.ticker, quantity: action.quantity, currency: action.currency, description: action.description });
        const dates = yield ref(db, `${auth.currentUser.uid}/dates/${action.date}`);
        yield set(dates, 'yes');
        const prevData = yield {
            ticker: action.ticker,
            quantity: action.quantity,
            usdCost: action.usdCost,
            usdTotal: action.usdTotal,
            rubCost: action.rubCost,
            rubTotal: action.rubTotal,
            eurCost: action.eurCost,
            eurTotal: action.eurTotal
        };
        if (!action.isManual) {
            yield put(autoCompleteTickerWithSaga(action.ticker, action.date, action.dateTill, action.quantity, action.currency, prevData, action.bondNominal));
        }

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

export const onDelTickerDateWithSaga = function* (action) {
    try {
        const ticker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.marketType}/${action.ticker}/data/${action.date}`);
        yield remove(ticker);
    } catch (err) {
        console.log(err);
    };
};

export const onSellTickerWithSaga = function* (action) {
    try {
        const ticker = yield ref(db, `${auth.currentUser.uid}/tickers/${action.marketType}/${action.ticker}/data/${action.date}`);
        yield get(ticker).then((snapshot) => {
            const updated = { ...snapshot.val(), sold: true }
            set(ticker, updated);
        });
        //yield remove(ticker);
    } catch (err) {
        console.log(err);
    };
};

export const onAutoCompleteTickersWithSaga = function* (action) {
    try {
        if (+(new Date(action.date)) < (+(new Date(action.dateTill)) - 432000000) && !action.sold) {
            const autoCompleteAction = yield call(addTicker, action.ticker, new Date(+(new Date(action.date)) + 604800000), action.dateTill, action.quantity, action.currency, action.prevData, true, false, 0, {}, action.bondNominal, 0);
            yield put(autoCompleteAction);
        }
    } catch (err) {
        console.log(err, action.ticker);
    };
};