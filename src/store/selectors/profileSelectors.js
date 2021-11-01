export function getPortfolio(state) { if (state.userData.portfolio) { return state.userData.portfolio} else { return {} } };

export function getMyCurrentStock(state) { if (state.currentUserData.stock) { return state.currentUserData.stock} else { return {} } };
export function getMyCurrentPif(state) { if (state.currentUserData.pif) { return state.currentUserData.pif} else { return {} } };
export function getMyCurrentEtf(state) { if (state.currentUserData.etf) { return state.currentUserData.etf} else { return {} } };
export function getMyCurrentBonds(state) { if (state.currentUserData.bonds) { return state.currentUserData.bonds} else { return {} } };
export function getMyCurrentForex(state) { if (state.currentUserData.forex) { return state.currentUserData.forex} else { return {} } };

export function getMyProfileCost(state) { if (state.currentUserData.portfolioCost) { return state.currentUserData.portfolioCost} else { return {} } };

export function getMyYearProfit(state) { if (state.currentUserData.yearProfit) { return state.currentUserData.yearProfit} else { return {} } }