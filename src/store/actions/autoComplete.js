export const AUTOCOMPLETE_STOCK_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_STOCK_TICKER_WITH_SAGA';

export const autoCompleteStockTickerWithSaga = (ticker, date, quantity, currency ) => {
    return {
        type: AUTOCOMPLETE_STOCK_TICKER_WITH_SAGA,
        ticker, date, quantity, currency
    };
};

export const AUTOCOMPLETE_PIFS_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_PIFS_TICKER_WITH_SAGA';

export const autoCompletePifsTickerWithSaga = (ticker, description, date, quantity, cost, total) => {
    return {
        type: AUTOCOMPLETE_PIFS_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total
    };
};

export const AUTOCOMPLETE_BONDS_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_BONDS_TICKER_WITH_SAGA';

export const autoCompleteBondsTickerWithSaga = (ticker, description, date, quantity, cost, total) => {
    return {
        type: AUTOCOMPLETE_BONDS_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total
    };
};

export const AUTOCOMPLETE_FOREX_TICKER_WITH_SAGA = 'TICKERS::AUTOCOMPLETE_FOREX_TICKER_WITH_SAGA';

export const autoCompleteForexTickerWithSaga = (ticker, description, date, quantity, cost, total) => {
    return {
        type: AUTOCOMPLETE_FOREX_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total
    };
};