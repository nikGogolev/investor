export const CALCULATE_PORTFOLIO_COST = 'PROFILE::CALCULATE_PORTFOLIO_COST';

export const calculatePortfolioCost = ( portfolioCost ) => {
    return {
        type: CALCULATE_PORTFOLIO_COST,
        portfolioCost
    };
};

export const CALCULATE_PORTFOLIO_COST_WITH_SAGA = 'PROFILE::CALCULATE_PORTFOLIO_COST_WITH_SAGA';

export const calculatePortfolioCostWithSaga = (stock, pif, etf, bonds, forex ) => {
    return {
        type: CALCULATE_PORTFOLIO_COST_WITH_SAGA,
        stock,
        pif,
        etf,
        bonds,
        forex   
    };
};