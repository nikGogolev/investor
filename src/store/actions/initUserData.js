export const INIT_USER_DATA = 'USER::INIT_USER_DATA';

export const initUserData = (userData) => {
    return {
        type: INIT_USER_DATA,
        userData
    };
};

export const INIT_INIT_USER_DATA_WITH_SAGA = 'USER::INIT_USER_DATA_WITH_SAGA';

export const initUserDataWithSaga = () => {
    return {
        type: INIT_INIT_USER_DATA_WITH_SAGA,
    };
};