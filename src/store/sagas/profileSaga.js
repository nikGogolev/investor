import { calculatePortfolio, getYearProfit } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';

import { calculatePortfolioCost } from '../actions/calculatePortfolioCost';
import { calculateYearProfit } from '../actions/calculateYearProfit';

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