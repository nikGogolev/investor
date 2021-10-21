import { auth, db } from '../../services/firebase';
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