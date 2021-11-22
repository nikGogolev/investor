import { EMPTY_OBJECT } from "../../utils/constants"


export function getStocks(state) { if (state.userData.stock) { return state.userData.tickers.stock} else { return EMPTY_OBJECT } };
export function getPif(state) { if (state.userData.pif) {return state.userData.tickers.pif}  else {return EMPTY_OBJECT} };
export function getEtf(state) { if (state.userData.etf) {return state.userData.tickers.etf}  else {return EMPTY_OBJECT} };
export function getBonds(state) { if (state.userData.bonds) {return state.userData.tickers.bonds} else {return EMPTY_OBJECT} };
export function getForex(state) { if (state.userData.forex) {return state.userData.tickers.forex} else { return EMPTY_OBJECT} };
export function getAlltickers(state) { if (state.userData.tickers) {return state.userData.tickers} else { return EMPTY_OBJECT} };

export function getFilteredStocks(state) { if (state.filteredTickers.stock) { return state.filteredTickers.stock} else { return EMPTY_OBJECT } };
export function getFilteredPif(state) { if (state.filteredTickers.pif) {return state.filteredTickers.pif}  else {return EMPTY_OBJECT} };
export function getFilteredEtf(state) { if (state.filteredTickers.etf) {return state.filteredTickers.etf}  else {return EMPTY_OBJECT} };
export function getFilteredBonds(state) { if (state.filteredTickers.bonds) {return state.filteredTickers.bonds} else {return EMPTY_OBJECT} };
export function getFilteredForex(state) { if (state.filteredTickers.forex) {return state.filteredTickers.forex} else { return EMPTY_OBJECT} };

export function getDates(state) { if (state.userData.dates) {return state.userData.dates} else { return EMPTY_OBJECT} };