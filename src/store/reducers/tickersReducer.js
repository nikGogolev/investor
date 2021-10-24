import { INIT_TICKERS } from '../actions/initTickers';
import initialState from '../initialState';

const { tickers } = initialState;

function tickersReducer(state = tickers, action) {
    switch (action.type) {
        case INIT_TICKERS:
            return {
                ...action.tickers
            };

        default: return state;
    }
};

export default tickersReducer;