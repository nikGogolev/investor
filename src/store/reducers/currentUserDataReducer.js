
import { CALCULATE_PORTFOLIO_COST } from '../actions/calculatePortfolioCost';
import { SET_TICKERS_INFO } from '../actions/setTickersInfo';
import initialState from '../initialState';

const { currentUserData } = initialState;

function currentUserDataReducer(state = currentUserData, action) {
    switch (action.type) {
        case SET_TICKERS_INFO:
            return {
                ...state,
                [action.tickerType]: action.tickerTable
            };

        case CALCULATE_PORTFOLIO_COST:
            return{
                ...state,
                portfolioCost: action.portfolioCost
            }

        default: return state;
    }
};

export default currentUserDataReducer;