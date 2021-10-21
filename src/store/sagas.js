import { takeEvery, takeLatest } from 'redux-saga/effects';
import { firebaseInitialize } from '../services/firebase';
import { ADD_TICKER_WITH_SAGA } from './actions/addTicker';

import { INIT_TICKERSS_WITH_SAGA } from './actions/initTickers';
import { onAddTickerWithSaga, onInitTickersWithSaga } from './sagas/tickersSaga';

function* mySaga() {
	yield takeLatest(INIT_TICKERSS_WITH_SAGA, onInitTickersWithSaga);
	yield takeLatest(ADD_TICKER_WITH_SAGA, onAddTickerWithSaga);
};

export default mySaga;