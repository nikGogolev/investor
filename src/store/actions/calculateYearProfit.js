export const CALCULATE_YEAR_PROFIT = 'PROFILE::CALCULATE_YEAR_PROFIT';

export const calculateYearProfit = ( yearProfit ) => {
    return {
        type: CALCULATE_YEAR_PROFIT,
        yearProfit
    };
};

export const CALCULATE_YEAR_PROFIT_WITH_SAGA = 'PROFILE::CALCULATE_YEAR_PROFIT_WITH_SAGA';

export const calculateYearProfitWithSaga = (allTickers ) => {
    return {
        type: CALCULATE_YEAR_PROFIT_WITH_SAGA,
        allTickers  
    };
};