export const SET_TICKERS_INFO = 'PROFILE::SET_TICKERS_INFO';

export const setTickersInfo = ( tickerTable, tickerType) => {
    return {
        type: SET_TICKERS_INFO,
        tickerTable,
        tickerType
    };
};

export const SET_TICKERS_INFO_WITH_SAGA = 'PROFILE::SET_TICKERS_INFO_WITH_SAGA';

export const setTickersInfoWithSaga = (tickers, tickerType ) => {
    return {
        type: SET_TICKERS_INFO_WITH_SAGA,
        tickers,
        tickerType   
    };
};