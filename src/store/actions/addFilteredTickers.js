export const ADD_FILTERED_TICKERS = 'TICKERS::ADD_FILTERED_TICKERS';

export const addFilteredTickers = (filteredTickers) => {
    return {
        type: ADD_FILTERED_TICKERS,
        filteredTickers
    };
};