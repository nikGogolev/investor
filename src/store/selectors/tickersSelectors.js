export function getStocks(state) { if (state.userData.stock) { return state.userData.tickers.stock} else { return {} } };
export function getPif(state) { if (state.userData.pif) {return state.userData.tickers.pif}  else {return {}} };
export function getEtf(state) { if (state.userData.etf) {return state.userData.tickers.etf}  else {return {}} };
export function getBonds(state) { if (state.userData.bonds) {return state.userData.tickers.bonds} else {return {}} };
export function getForex(state) { if (state.userData.forex) {return state.userData.tickers.forex} else { return {}} };
export function getAlltickers(state) { if (state.userData.tickers) {return state.userData.tickers} else { return {}} };

export function getFilteredStocks(state) { if (state.filteredTickers.stock) { return state.filteredTickers.stock} else { return {} } };
export function getFilteredPif(state) { if (state.filteredTickers.pif) {return state.filteredTickers.pif}  else {return {}} };
export function getFilteredEtf(state) { if (state.filteredTickers.etf) {return state.filteredTickers.etf}  else {return {}} };
export function getFilteredBonds(state) { if (state.filteredTickers.bonds) {return state.filteredTickers.bonds} else {return {}} };
export function getFilteredForex(state) { if (state.filteredTickers.forex) {return state.filteredTickers.forex} else { return {}} };

export function getDates(state) { if (state.userData.dates) {return state.userData.dates} else { return {}} };