import { calculatePortfolio, getWekklyPortfolioProfitAndCost, getYearProfit } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';

import { calculatePortfolioCost } from '../actions/calculatePortfolioCost';
import { calculateYearProfit } from '../actions/calculateYearProfit';
import { calculateWeeklyPortfolioProfitAndCost } from '../actions/calculateWeeklyPortfolioProfitAndCost';

export const onCalculatePortfolioCostWithSaga = function* (action){
    try {
        const portfolioCost = yield call(calculatePortfolio, action.stock, action.pif, action.etf, action.bonds, action.forex);
        yield put(calculatePortfolioCost(portfolioCost));
    } catch (err) {
        console.log(err);
    };
};

export const onCalculateYearProfitWithSaga = function* (action){
    try {
        const yearProfit = yield call(getYearProfit, action.allTickers);
        yield put(calculateYearProfit(yearProfit));
    } catch (err) {
        console.log(err);
    };
};

export const onCalculateWeeklyPortfolioProfitAndCostWithSaga = function* (action){
    try {
        const wekklyPortfolioProfitAndCost = yield call(getWekklyPortfolioProfitAndCost, action.allTickers, action.dates);
        yield put(calculateWeeklyPortfolioProfitAndCost(wekklyPortfolioProfitAndCost));
    } catch (err) {
        console.log(err);
    };
};