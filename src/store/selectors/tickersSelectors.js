import { auth } from "../../services/firebase"

export function getStocks(state) { if (state.userData[auth.currentUser.uid]) { return state.userData[auth.currentUser.uid].tickers.stock} else { return {} } };
export function getPif(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.pif}  else {return {}} };
export function getEtf(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.etf}  else {return {}} };
export function getBonds(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.bonds} else {return {}} };
export function getForex(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers.forex} else { return {}} };
export function getAlltickers(state) { if (state.userData[auth.currentUser.uid]) {return state.userData[auth.currentUser.uid].tickers} else { return {}} };

export function getFilteredStocks(state) { if (state.filteredTickers) { return state.filteredTickers.stock} else { return {} } };
export function getFilteredPif(state) { if (state.filteredTickers) {return state.filteredTickers.pif}  else {return {}} };
export function getFilteredEtf(state) { if (state.filteredTickers) {return state.filteredTickers.etf}  else {return {}} };
export function getFilteredBonds(state) { if (state.filteredTickers) {return state.filteredTickers.bonds} else {return {}} };
export function getFilteredForex(state) { if (state.filteredTickers) {return state.filteredTickers.forex} else { return {}} };