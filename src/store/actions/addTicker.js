export const ADD_TICKER_WITH_SAGA = 'TICKERS::ADD_TICKER_WITH_SAGA';

export const addTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency, tickerType) => {
    return {
        type: ADD_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency, tickerType
    };
};