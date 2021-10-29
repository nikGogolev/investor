export const AUTOCOMPLETE_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_TICKER_WITH_SAGA';

export const autoCompleteTickerWithSaga = (ticker, date, quantity, currency ) => {
    return {
        type: AUTOCOMPLETE_TICKER_WITH_SAGA,
        ticker, date, quantity, currency
    };
};