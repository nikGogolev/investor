import { auth } from "../../services/firebase"

export function getPortfolio(state) { if (state.userData[auth.currentUser.uid]) { return state.userData[auth.currentUser.uid].portfolio} else { return {} } };

export function getMyCurrentStock(state) { if (state.currentUserData) { return state.currentUserData.stock} else { return {} } };
export function getMyCurrentPif(state) { if (state.currentUserData) { return state.currentUserData.pif} else { return {} } };
export function getMyCurrentEtf(state) { if (state.currentUserData) { return state.currentUserData.etf} else { return {} } };
export function getMyCurrentBonds(state) { if (state.currentUserData) { return state.currentUserData.bonds} else { return {} } };
export function getMyCurrentForex(state) { if (state.currentUserData) { return state.currentUserData.forex} else { return {} } };

export function getMyProfileCost(state) { if (state.currentUserData) { return state.currentUserData.portfolioCost} else { return {} } };