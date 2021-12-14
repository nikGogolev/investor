import { INIT_USER_DATA } from '../actions/initUserData';
import initialState from '../initialState';

const { userData } = initialState;

function userDataReducer(state = userData, action) {
    switch (action.type) {
        case INIT_USER_DATA:
            return {
                ...action.userData
            };

        default: return state;
    }
};

export default userDataReducer;