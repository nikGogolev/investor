import { takeLatest, takeEvery } from 'redux-saga/effects';
import { ADD_TICKER_WITH_SAGA } from './actions/addTicker';
import { AUTOCOMPLETE_TICKER_WITH_SAGA } from './actions/autoComplete';
import { CALCULATE_PORTFOLIO_COST_WITH_SAGA } from './actions/calculatePortfolioCost';
import { CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST_WITH_SAGA } from './actions/calculateWeeklyPortfolioProfitAndCost';
import { CALCULATE_YEAR_PROFIT_WITH_SAGA } from './actions/calculateYearProfit';
import { DEL_TICKER_DATE_WITH_SAGA, DEL_TICKER_WITH_SAGA } from './actions/delTicker';

import { INIT_INIT_USER_DATA_WITH_SAGA } from './actions/initUserData';
import { SELL_TICKER_WITH_SAGA } from './actions/sellTicker';
import { onCalculatePortfolioCostWithSaga, onCalculateWeeklyPortfolioProfitAndCostWithSaga, onCalculateYearProfitWithSaga } from './sagas/profileSaga';
import { onAddTickerWithSaga, onAutoCompleteTickersWithSaga, onDelTickerDateWithSaga, onDelTickerWithSaga, onSellTickerWithSaga } from './sagas/tickersSaga';
import { onInitUserDataWithSaga } from './sagas/userDataSaga';

function* mySaga() {
	yield takeLatest(INIT_INIT_USER_DATA_WITH_SAGA, onInitUserDataWithSaga);
	yield takeEvery(ADD_TICKER_WITH_SAGA, onAddTickerWithSaga);
	yield takeLatest(DEL_TICKER_WITH_SAGA, onDelTickerWithSaga);
	yield takeLatest(DEL_TICKER_DATE_WITH_SAGA, onDelTickerDateWithSaga);
	yield takeLatest(SELL_TICKER_WITH_SAGA, onSellTickerWithSaga);
	yield takeEvery(AUTOCOMPLETE_TICKER_WITH_SAGA, onAutoCompleteTickersWithSaga);
	yield takeLatest(CALCULATE_PORTFOLIO_COST_WITH_SAGA, onCalculatePortfolioCostWithSaga);
	yield takeLatest(CALCULATE_YEAR_PROFIT_WITH_SAGA, onCalculateYearProfitWithSaga);
	yield takeLatest(CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST_WITH_SAGA, onCalculateWeeklyPortfolioProfitAndCostWithSaga);

};

export default mySaga;