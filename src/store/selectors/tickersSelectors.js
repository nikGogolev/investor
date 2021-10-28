import { auth } from "../../services/firebase"

export function getStocks(state) { if (state.userData[auth.currentUser.uid]) { return state.userData[auth.currentUser.uid].tickers.stock} else { return {} } };
export function getPif(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.pif}  else {return {}} };
export function getEtf(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.etf}  else {return {}} };
export function getBonds(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.bonds} else {return {}} };
export function getForex(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.forex} else { return {}} };