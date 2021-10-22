export const INIT_TICKERS = 'TICKERS::INIT_TICKERS';

export const initTickers = (tickers) => {
    return {
        type: INIT_TICKERS,
        tickers
    };
};

export const INIT_TICKERSS_WITH_SAGA = 'TICKERS::INIT_TICKERS_WITH_SAGA';

export const initTickersWithSaga = () => {
    return {
        type: INIT_TICKERSS_WITH_SAGA,
    };
};