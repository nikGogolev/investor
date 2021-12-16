export const SELL_TICKER_WITH_SAGA = 'TICKERS::SELL_TICKER_WITH_SAGA';

export const sellTickerWithSaga = (marketType, ticker, date) => {
    return {
        type: SELL_TICKER_WITH_SAGA,
        marketType, ticker, date
    };
};