import { db } from '../../services/firebase';
import { ref, onValue, set, remove } from '@firebase/database';

import { store } from '../store';
import { initTickers } from '../actions/initTickers';

export const onInitTickersWithSaga = function* () {
    try {
        const tickers = yield ref(db, `tickers`);
        yield onValue(tickers, (snapshot) => {
            const data = snapshot.val();
            store.dispatch(initTickers(data || {}));
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const onAddTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `tickers/${action.ticker}/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, quantity: action.quantity, cost: action.cost, total: action.total });
    } catch (err) {
        console.log(err);
    };
};

export const onAddStockTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `tickers/stocks/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total });
        const tickerDescription = yield ref(db, `tickers/stocks/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
    } catch (err) {
        console.log(err);
    };
};

export const onAddPifsTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `tickers/pifs/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total });
        const tickerDescription = yield ref(db, `tickers/pifs/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
    } catch (err) {
        console.log(err);
    };
};

export const onAddBondsTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `tickers/bonds/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total });
        const tickerDescription = yield ref(db, `tickers/bonds/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
    } catch (err) {
        console.log(err);
    };
};

export const onAddForexTickerWithSaga = function* (action) {
    try {
        const newTicker = yield ref(db, `tickers/forex/${action.ticker}/data/${action.date}`);
        yield set(newTicker, { ticker: action.ticker, description: action.description, quantity: action.quantity, cost: action.cost, total: action.total });
        const tickerDescription = yield ref(db, `tickers/forex/${action.ticker}/description`);
        yield set(tickerDescription, action.description);
    } catch (err) {
        console.log(err);
    };
};

export const onDelTickerWithSaga = function* (action) {
    try {
        const ticker = yield ref(db, `tickers/${action.marketType}/${action.ticker}`);
        yield remove(ticker);
    } catch (err) {
        console.log(err);
    };
};
/*
export const onRemoveChatWithSaga = function* (action) {
    try {
        const chatId = yield ref(db, `chats/${action.chatId}`);
        const myChat = yield ref(db, `profile/${auth.currentUser.uid}/myChats/${action.chatId}`);
        yield remove(chatId);
        yield remove(myChat);
    } catch (err) {
        console.log(err);
    }
};
*/