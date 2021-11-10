export const ADD_TICKER_WITH_SAGA = 'TICKERS::ADD_TICKER_WITH_SAGA';

export const addTickerWithSaga = (
    ticker, 
    description, 
    date, 
    quantity, 
    usdCost, 
    usdTotal,
    rubCost, 
    rubTotal,
    eurCost, 
    eurTotal,
    profitUsdAbs,
    profitUsdRel,
    profitRubAbs,
    profitRubRel,
    profitEurAbs,
    profitEurRel,
    currency, 
    tickerType
    ) => {
    return {
        type: ADD_TICKER_WITH_SAGA,
        ticker, 
        description, 
        date, 
        quantity, 
        usdCost, 
        usdTotal,
        rubCost, 
        rubTotal,
        eurCost, 
        eurTotal,
        profitUsdAbs,
        profitUsdRel,
        profitRubAbs,
        profitRubRel,
        profitEurAbs,
        profitEurRel,
        currency, 
        tickerType
    };
};