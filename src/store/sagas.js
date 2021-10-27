import { takeLatest, takeEvery } from 'redux-saga/effects';
import { ADD_BONDS_TICKER_WITH_SAGA, ADD_FOREX_TICKER_WITH_SAGA, ADD_PIFS_TICKER_WITH_SAGA, ADD_STOCK_TICKER_WITH_SAGA, ADD_TICKER_WITH_SAGA } from './actions/addTicker';
import { AUTOCOMPLETE_TICKER_WITH_SAGA } from './actions/autoComplete';
import { DEL_TICKER_WITH_SAGA } from './actions/delTicker';

import { INIT_INIT_USER_DATA_WITH_SAGA } from './actions/initUserData';
import { onAddBondsTickerWithSaga, onAddForexTickerWithSaga, onAddPifsTickerWithSaga, onAddStockTickerWithSaga, onAddTickerWithSaga, onAutoCompleteTickersWithSaga, onDelTickerWithSaga } from './sagas/tickersSaga';
import { onInitUserDataWithSaga } from './sagas/userDataSaga';

function* mySaga() {
	yield takeLatest(INIT_INIT_USER_DATA_WITH_SAGA, onInitUserDataWithSaga);
	yield takeLatest(ADD_STOCK_TICKER_WITH_SAGA, onAddStockTickerWithSaga);
	yield takeLatest(ADD_PIFS_TICKER_WITH_SAGA, onAddPifsTickerWithSaga);
	yield takeLatest(ADD_BONDS_TICKER_WITH_SAGA, onAddBondsTickerWithSaga);
	yield takeLatest(ADD_FOREX_TICKER_WITH_SAGA, onAddForexTickerWithSaga);
	yield takeLatest(ADD_TICKER_WITH_SAGA, onAddTickerWithSaga);
	yield takeLatest(DEL_TICKER_WITH_SAGA, onDelTickerWithSaga);
	yield takeEvery(AUTOCOMPLETE_TICKER_WITH_SAGA, onAutoCompleteTickersWithSaga);
};

export default mySaga;