import { getLastTickers } from "../../Functions/functions"
import { EMPTY_OBJECT } from "../../utils/constants"

export function getPortfolio(state) { if (state.userData.portfolio) { return state.userData.portfolio} else { return EMPTY_OBJECT } };

export function getMyProfileCost(state) { if (state.currentUserData.portfolioCost) { return state.currentUserData.portfolioCost} else { return EMPTY_OBJECT } };

export function getMyYearProfit(state) { if (state.currentUserData.yearProfit) { return state.currentUserData.yearProfit} else { return EMPTY_OBJECT } }

export function getWeeklyPortfolioProfitAndCost(state) { if (state.currentUserData.weeklyPortfolioProfitAndCost) { return state.currentUserData.weeklyPortfolioProfitAndCost} else { return EMPTY_OBJECT } }

export function getLastStock(state) { if (state.userData.tickers.stock) { return getLastTickers(state.userData.tickers.stock)} else { return EMPTY_OBJECT } };
export function getLastPif(state) { if (state.userData.tickers.pif) { return getLastTickers(state.userData.tickers.pif)} else { return EMPTY_OBJECT } };
export function getLastEtf(state) { if (state.userData.tickers.etf) { return getLastTickers(state.userData.tickers.etf)} else { return EMPTY_OBJECT } };
export function getLastBonds(state) { if (state.userData.tickers.bonds) { return getLastTickers(state.userData.tickers.bonds)} else { return EMPTY_OBJECT } };
export function getLastForex(state) { if (state.userData.tickers.forex) { return getLastTickers(state.userData.tickers.forex)} else { return EMPTY_OBJECT } };