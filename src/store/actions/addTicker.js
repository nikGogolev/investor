export const ADD_TICKER = 'TICKERS::ADD_TICKER';

export const addTicker = () => {
    return {
        type: ADD_TICKER
    };
};

export const ADD_TICKER_WITH_SAGA = 'TICKERS::ADD_TICKER_WITH_SAGA';

export const addTickerWithSaga = (ticker, date, quantity, cost, total) => {
    return {
        type: ADD_TICKER_WITH_SAGA,
        ticker, date, quantity, cost, total
    };
};