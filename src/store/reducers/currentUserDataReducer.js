
import { CALCULATE_PORTFOLIO_COST } from '../actions/calculatePortfolioCost';
import { CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST } from '../actions/calculateWeeklyPortfolioProfitAndCost';
import { CALCULATE_YEAR_PROFIT } from '../actions/calculateYearProfit';
import initialState from '../initialState';

const { currentUserData } = initialState;

function currentUserDataReducer(state = currentUserData, action) {
    switch (action.type) {
        case CALCULATE_PORTFOLIO_COST:
            return{
                ...state,
                portfolioCost: action.portfolioCost
            }

        case CALCULATE_YEAR_PROFIT:
            return {
                ...state,
                yearProfit: action.yearProfit,
            }

        case CALCULATE_WEEKLY_PORTFOLIO_PROFIT_AND_COST:
            return {
                ...state,
                weeklyPortfolioProfitAndCost: action.weeklyPortfolioProfitAndCost,
            }

        default: return state;
    }
};

export default currentUserDataReducer;