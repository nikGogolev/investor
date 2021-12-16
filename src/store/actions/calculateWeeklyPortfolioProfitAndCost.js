export const CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST = 'PROFILE::CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST';

export const calculateWeeklyPortfolioProfitAndCost = ( weeklyPortfolioProfitAndCost ) => {
    return {
        type: CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST,
        weeklyPortfolioProfitAndCost
    };
};

export const CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST_WITH_SAGA = 'PROFILE::CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST_WITH_SAGA';

export const calculateWeeklyPortfolioProfitAndCostWithSaga = (allTickers, dates ) => {
    return {
        type: CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST_WITH_SAGA,
        allTickers,
        dates  
    };
};