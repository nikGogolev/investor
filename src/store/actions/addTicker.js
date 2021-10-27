export const ADD_TICKER_WITH_SAGA = 'TICKERS::ADD_TICKER_WITH_SAGA';

export const addTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency, tickerType) => {
    return {
        type: ADD_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency, tickerType
    };
};

export const ADD_STOCK_TICKER_WITH_SAGA = 'TICKERS::ADD_STOCK_TICKER_WITH_SAGA';

export const addStockTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency) => {
    return {
        type: ADD_STOCK_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency
    };
};

export const ADD_PIFS_TICKER_WITH_SAGA = 'TICKERS::ADD_PIFS_TICKER_WITH_SAGA';

export const addPifsTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency) => {
    return {
        type: ADD_PIFS_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency
    };
};

export const ADD_BONDS_TICKER_WITH_SAGA = 'TICKERS::ADD_BONDS_TICKER_WITH_SAGA';

export const addBondsTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency) => {
    return {
        type: ADD_BONDS_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency
    };
};

export const ADD_FOREX_TICKER_WITH_SAGA = 'TICKERS::ADD_FOREX_TICKER_WITH_SAGA';

export const addForexTickerWithSaga = (ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency) => {
    return {
        type: ADD_FOREX_TICKER_WITH_SAGA,
        ticker, description, date, quantity, cost, total, roubleCost, roubleTotal, currency
    };
};