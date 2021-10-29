import { calculatePortfolio } from '../../Functions/functions';
import { call, put } from '@redux-saga/core/effects';

import { calculatePortfolioCost } from '../actions/calculatePortfolioCost';

export const onCalculatePortfolioCostWithSaga = function* (action){
    try {
        const portfolioCost = yield call(calculatePortfolio, action.stock, action.pif, action.etf, action.bonds, action.forex);
        yield put(calculatePortfolioCost(portfolioCost));
    } catch (err) {
        console.log(err);
    };
};