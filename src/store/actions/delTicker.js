export const DEL_TICKER_WITH_SAGA = 'TICKERS::DEL_TICKER_WITH_SAGA';

export const delTickerWithSaga = (ticker, marketType) => {
    return {
        type: DEL_TICKER_WITH_SAGA,
        ticker, marketType
    };
};

export const DEL_TICKER_DATE_WITH_SAGA = 'TICKERS::DEL_TICKER_DATE_WITH_SAGA';

export const delTickerDateWithSaga = (marketType, ticker, date) => {
    return {
        type: DEL_TICKER_DATE_WITH_SAGA,
        marketType, ticker, date
    };
};