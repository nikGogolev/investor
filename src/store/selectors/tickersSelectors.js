import { auth } from "../../services/firebase"

export function getStocks(state) { if (state.userData[auth.currentUser.uid]) { return state.userData[auth.currentUser.uid].tickers.stocks} else { return {} } };
export function getPifs(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.pifs}  else {return {}} };
export function getBonds(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.bonds} else {return {}} };
export function getForex(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.forex} else { return {}} };