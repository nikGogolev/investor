import { takeLatest } from 'redux-saga/effects';
import { ADD_BONDS_TICKER_WITH_SAGA, ADD_FOREX_TICKER_WITH_SAGA, ADD_PIFS_TICKER_WITH_SAGA, ADD_STOCK_TICKER_WITH_SAGA, ADD_TICKER_WITH_SAGA } from './actions/addTicker';
import { DEL_TICKER_WITH_SAGA } from './actions/delTicker';

import { INIT_TICKERSS_WITH_SAGA } from './actions/initTickers';
import { onAddBondsTickerWithSaga, onAddForexTickerWithSaga, onAddPifsTickerWithSaga, onAddStockTickerWithSaga, onAddTickerWithSaga, onDelTickerWithSaga, onInitTickersWithSaga } from './sagas/tickersSaga';

function* mySaga() {
	yield takeLatest(INIT_TICKERSS_WITH_SAGA, onInitTickersWithSaga);
	yield takeLatest(ADD_TICKER_WITH_SAGA, onAddTickerWithSaga);
	yield takeLatest(ADD_STOCK_TICKER_WITH_SAGA, onAddStockTickerWithSaga);
	yield takeLatest(ADD_PIFS_TICKER_WITH_SAGA, onAddPifsTickerWithSaga);
	yield takeLatest(ADD_BONDS_TICKER_WITH_SAGA, onAddBondsTickerWithSaga);
	yield takeLatest(ADD_FOREX_TICKER_WITH_SAGA, onAddForexTickerWithSaga);
	yield takeLatest(DEL_TICKER_WITH_SAGA, onDelTickerWithSaga);
};

export default mySaga;