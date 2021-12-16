
import { ADD_FILTERED_TICKERS } from '../actions/addFilteredTickers';
import initialState from '../initialState';

const { filteredTickers } = initialState;

function filteredTickersReducer(state = filteredTickers, action) {
    switch (action.type) {
        case ADD_FILTERED_TICKERS:
            return {
                ...action.filteredTickers
            };

        default: return state;
    }
};

export default filteredTickersReducer;