import { auth, db } from '../../services/firebase';
import { ref, onValue } from '@firebase/database';

import { store } from '../store';
import { initUserData } from '../actions/initUserData';

export const onInitUserDataWithSaga = function* () {
    try {
        const tickers = yield ref(db, `${auth.currentUser.uid}`);
        yield onValue(tickers, (snapshot) => {
            const data = snapshot.val();
            store.dispatch(initUserData(data || {}));
        });
    } catch (err) {
        console.log(err.message);
    }
};