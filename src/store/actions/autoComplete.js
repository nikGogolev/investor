export const AUTOCOMPLETE_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_TICKER_WITH_SAGA';

export const autoCompleteTickerWithSaga = (ticker, date, dateTill, quantity, currency, prevData, bondNominal, sold) => {
    return {
        type: AUTOCOMPLETE_TICKER_WITH_SAGA,
        ticker, date, dateTill, quantity, currency, prevData, bondNominal, sold
    };
};