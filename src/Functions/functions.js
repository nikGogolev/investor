import { addFilteredTickers } from "../store/actions/addFilteredTickers";
import { addTickerWithSaga } from "../store/actions/addTicker";
import { auth, db } from '../services/firebase';
import { ref, get } from '@firebase/database';

export const getSearchUrl = (query) => {
    return `https://api.bcs.ru/udfdatafeed/v1/search?query=${query}&limit=10&fulldescription=on`;
};

export const getInfoUrl = (ticker) => {
    return `https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}`;
};

export const getHistoryUrl = (ticker, startDate, finishDate) => {
    if (+startDate && +finishDate) {
        return `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date(startDate))) / 1000)}&to=${Math.round((+(new Date(finishDate))) / 1000)}`;
    } else {
        return `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
    }
};

export const addTicker = async (ticker, date, quantity, currency, prevData, isAutoComplete, isManual, manualCourse, manualInfo, bondNominal, couponOrDividend = 0) => {
    let friday = +(new Date(date));
    while ((new Date(friday)).getDay() !== 5) {
        friday += 86400000;
    }

    let bondNominalForTicker = bondNominal;

    if (bondNominal === undefined) { bondNominalForTicker = 0 };

    try {
        let usdCost;
        let usdTotal;
        let rubCost;
        let rubTotal;
        let eurCost;
        let eurTotal;
        let infoData;
        let tickerData;
        let usdCoef = 1;
        let rubCoef = 1;
        let eurCoef = 1;
        let prevDateData = prevData;
        let profitUsdAbs = 0;
        let profitUsdRel = 0;
        let profitRubAbs = 0;
        let profitRubRel = 0;
        let profitEurAbs = 0;
        let profitEurRel = 0;
        let couponOrDividendUsd = 0;
        let couponOrDividendRub = 0;
        let couponOrDividendEur = 0;

        const usdUrl = getHistoryUrl('RUR', friday, friday + 82800000);
        const usdResponse = await fetch(usdUrl);
        const usdData = await usdResponse.json();
        const usdCurrency = usdData.c[0];

        const eurUrl = getHistoryUrl('EUR_RUB', friday, friday + 82800000);
        const eurResponse = await fetch(eurUrl);
        const uerData = await eurResponse.json();
        const eurCurrency = uerData.c[0];

        if (currency === 'rur') { usdCoef = 1 / usdCurrency } else if (currency === 'usd') { usdCoef = 1 } else if (currency === 'eur') { usdCoef = eurCurrency / usdCurrency };
        if (currency === 'rur') { rubCoef = 1 } else if (currency === 'usd') { rubCoef = usdCurrency } else if (currency === 'eur') { rubCoef = eurCurrency };
        if (currency === 'rur') { eurCoef = 1 / eurCurrency } else if (currency === 'usd') { eurCoef = usdCurrency / eurCurrency } else if (currency === 'eur') { eurCoef = 1 };

        couponOrDividendUsd = couponOrDividend * usdCoef;
        couponOrDividendRub = couponOrDividend * rubCoef;
        couponOrDividendEur = couponOrDividend * eurCoef;

        if (!isManual) {
            const infoUrl = getInfoUrl(ticker);
            const infoResponse = await fetch(infoUrl);
            infoData = await infoResponse.json();

            const tickerUrl = getHistoryUrl(ticker, friday, friday + 82800000);
            const tickerResponse = await fetch(tickerUrl);
            tickerData = await tickerResponse.json();

            if (tickerData.s === 'no_data' || isNaN(tickerData.c[0])) { throw new Error('Нет данных') }

            usdCost = (infoData.type !== 'bonds') ? tickerData.c[0] * usdCoef : tickerData.c[0] * usdCoef * bondNominalForTicker / 100;
            usdTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * usdCoef * quantity : tickerData.c[0] * usdCoef * quantity * bondNominalForTicker / 100;
            rubCost = (infoData.type !== 'bonds') ? tickerData.c[0] * rubCoef : tickerData.c[0] * rubCoef * bondNominalForTicker / 100;
            rubTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * rubCoef * quantity : tickerData.c[0] * rubCoef * quantity * bondNominalForTicker / 100;
            eurCost = (infoData.type !== 'bonds') ? tickerData.c[0] * eurCoef : tickerData.c[0] * eurCoef * bondNominalForTicker / 100;
            eurTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * eurCoef * quantity : tickerData.c[0] * eurCoef * quantity * bondNominalForTicker / 100;
        } else {
            usdCost = manualCourse * usdCoef;
            usdTotal = manualCourse * usdCoef * quantity;
            rubCost = manualCourse * rubCoef;
            rubTotal = manualCourse * rubCoef * quantity;
            eurCost = manualCourse * eurCoef;
            eurTotal = manualCourse * eurCoef * quantity;
            infoData = manualInfo;
        };

        if (!isAutoComplete) {
            const tickerCurrent = ref(db, `${auth.currentUser.uid}/tickers/${infoData.type}/${ticker}/data/${(new Date(friday - 604800000)).toISOString().slice(0, 10)}`);
            const snapshot = await get(tickerCurrent);
            if (snapshot.exists()) {
                const data = snapshot.val();
                prevDateData.ticker = data.ticker;
                prevDateData.rubCost = data.rubCost;
                prevDateData.usdCost = data.usdCost;
                prevDateData.eurCost = data.eurCost;
                prevDateData.quantity = data.quantity;
            };
        }

        if (prevDateData.ticker === undefined) {
            profitUsdAbs = 0
            profitUsdRel = 0;
            profitRubAbs = 0
            profitRubRel = 0;
            profitEurAbs = 0
            profitEurRel = 0;
        } else {
            const isCorrect = (usdCost - prevDateData.usdCost) / prevDateData.usdCost * 100 > -90 && (usdCost - prevDateData.usdCost) / prevDateData.usdCost * 100 < 90;
            profitUsdRel = isCorrect ? (usdCost - prevDateData.usdCost + couponOrDividendUsd / prevDateData.quantity) / prevDateData.usdCost * 100 : 0;
            profitUsdAbs = isCorrect ? (usdCost - prevDateData.usdCost) * prevDateData.quantity + couponOrDividendUsd : 0;

            profitRubRel = isCorrect ? (rubCost - prevDateData.rubCost + couponOrDividendRub / prevDateData.quantity) / prevDateData.rubCost * 100 : 0;
            profitRubAbs = isCorrect ? (rubCost - prevDateData.rubCost) * prevDateData.quantity + couponOrDividendRub : 0;

            profitEurRel = isCorrect ? (eurCost - prevDateData.eurCost + couponOrDividendEur / prevDateData.quantity) / prevDateData.eurCost * 100 : 0;
            profitEurAbs = isCorrect ? (eurCost - prevDateData.eurCost) * prevDateData.quantity + couponOrDividendEur : 0;
        }

        return addTickerWithSaga(ticker,
            infoData.description,
            (new Date(friday)).toISOString().slice(0, 10),
            quantity,
            usdCost,
            usdTotal,
            rubCost,
            rubTotal,
            eurCost,
            eurTotal,
            profitUsdAbs,
            profitUsdRel,
            profitRubAbs,
            profitRubRel,
            profitEurAbs,
            profitEurRel,
            currency,
            infoData.type,
            isManual,
            bondNominalForTicker,
            couponOrDividendUsd,
            couponOrDividendRub,
            couponOrDividendEur
        );
    }
    catch (err) {
        console.log(err.message + date);
    }
};

export const calculatePortfolio = (...args) => {
    let rubGrandTotal = 0;
    let usdGrandTotal = 0;
    let eurGrandTotal = 0;
    args.forEach((list) => {
        Object.values(list).forEach((item) => {
            rubGrandTotal += +item.rubTotal;
            usdGrandTotal += +item.usdTotal;
            eurGrandTotal += +item.eurTotal;
        })
    });
    return ({ rubGrandTotal: rubGrandTotal, usdGrandTotal: usdGrandTotal, eurGrandTotal: eurGrandTotal });
};

export const filterData = (data, year, month) => {

    let filteredData = {};
    const tickerTypes = Object.keys(data);
    tickerTypes.forEach((tickerType) => {
        const tickerItems = Object.keys(data[tickerType]);
        filteredData = {
            ...filteredData,
            [tickerType]: {}
        };
        tickerItems.forEach((tickerItem) => {
            const dates = Object.keys(data[tickerType][tickerItem].data);
            filteredData = {
                ...filteredData,
                [tickerType]: {
                    ...filteredData[tickerType],
                    [tickerItem]: { data: {} }
                }
            };
            const filteredDates = dates.filter(date => ((new Date(date).getMonth() === month) && (new Date(date).getFullYear() === year)));
            filteredDates.forEach((date) => {
                filteredData = {
                    ...filteredData,
                    [tickerType]: {
                        ...filteredData[tickerType],
                        [tickerItem]: {
                            data: {
                                ...filteredData[tickerType][tickerItem].data,
                                [date]: data[tickerType][tickerItem].data[date]
                            }
                        }
                    }
                };
            });
        });
    });
    return addFilteredTickers(filteredData);
};

export const filterWeeklyResult = (data, year, month) => {
    let filteredData = {};
    const dates = Object.keys(data);
    let filteredDates = [];

    if (month !== undefined) {
        filteredDates = dates.filter(date => ((new Date(date).getMonth() === month) && (new Date(date).getFullYear() === year)));
    } else {
        filteredDates = dates.filter(date => ((new Date(date).getFullYear() === year)));
    }

    filteredDates.forEach((date) => {
        filteredData = {
            ...filteredData,
            [date]: data[date]
        }
    });

    return filteredData;
};


export const getYearProfit = (allTickers) => {

    let yearProfit = {};

    Object.values(allTickers).forEach((type, i) => {
        const tickerNames = Object.keys(type);
        yearProfit = {
            ...yearProfit,
            [Object.keys(allTickers)[i]]: {}
        };
        Object.values(type).forEach((ticker, j) => {
            let sumProfitUsdAbsTemp = 0;
            let sumProfitUsdRelTemp = 1;
            let sumProfitRubAbsTemp = 0;
            let sumProfitRubRelTemp = 1;
            let sumProfitEurAbsTemp = 0;
            let sumProfitEurRelTemp = 1;
            Object.values(ticker.data).forEach((date) => {
                sumProfitUsdAbsTemp += +date.profitUsdAbs;
                sumProfitUsdRelTemp *= 1 + +date.profitUsdRel / 100;
                sumProfitRubAbsTemp += +date.profitRubAbs;
                sumProfitRubRelTemp *= 1 + +date.profitRubRel / 100;
                sumProfitEurAbsTemp += +date.profitEurAbs;
                sumProfitEurRelTemp *= 1 + +date.profitEurRel / 100;
            });

            sumProfitUsdRelTemp = (sumProfitUsdRelTemp - 1) * 100;
            sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;
            sumProfitEurRelTemp = (sumProfitEurRelTemp - 1) * 100;

            yearProfit = {
                ...yearProfit,
                [Object.keys(allTickers)[i]]: {
                    ...yearProfit[Object.keys(allTickers)[i]],
                    [tickerNames[j]]: {
                        sumProfitUsdAbs: sumProfitUsdAbsTemp,
                        sumProfitUsdRel: sumProfitUsdRelTemp,
                        sumProfitRubAbs: sumProfitRubAbsTemp,
                        sumProfitRubRel: sumProfitRubRelTemp,
                        sumProfitEurAbs: sumProfitEurAbsTemp,
                        sumProfitEurRel: sumProfitEurRelTemp
                    }
                }
            }
        });
    });

    return yearProfit;
};

export const getWekklyPortfolioProfitAndCost = (allTickers, dates) => {
    let wekklyPortfolioProfitAndCost = {};
    if (dates.no_data) { return wekklyPortfolioProfitAndCost };
    let prevPortfolioUsdTotal = undefined;
    let prevPortfolioRubTotal = undefined;
    let prevPortfolioEurTotal = undefined;

    Object.keys(dates).forEach((date) => {
        let portfolioUsdTotal = 0;
        let portfolioUsdProfitAbs = 0;
        let portfolioUsdProfitRel = 0;
        let portfolioRubTotal = 0;
        let portfolioRubProfitAbs = 0;
        let portfolioRubProfitRel = 0;
        let portfolioEurTotal = 0;
        let portfolioEurProfitAbs = 0;
        let portfolioEurProfitRel = 0;

        Object.values(allTickers).forEach((type, i) => {

            Object.values(type).forEach((ticker, j) => {
                if (ticker.data[date] !== undefined) {
                    portfolioUsdTotal += +ticker.data[date].usdTotal;
                    portfolioUsdProfitAbs += +ticker.data[date].profitUsdAbs;
                    portfolioRubTotal += +ticker.data[date].rubTotal;
                    portfolioRubProfitAbs += +ticker.data[date].profitRubAbs;
                    portfolioEurTotal += +ticker.data[date].eurTotal;
                    portfolioEurProfitAbs += +ticker.data[date].profitEurAbs;

                }
            });
        });

        if (prevPortfolioUsdTotal !== undefined && prevPortfolioUsdTotal !== 0) {
            portfolioUsdProfitRel = portfolioUsdProfitAbs / prevPortfolioUsdTotal * 100;
            portfolioRubProfitRel = portfolioRubProfitAbs / prevPortfolioRubTotal * 100;
            portfolioEurProfitRel = portfolioEurProfitAbs / prevPortfolioEurTotal * 100;
        }

        prevPortfolioUsdTotal = portfolioUsdTotal;
        prevPortfolioRubTotal = portfolioRubTotal;
        prevPortfolioEurTotal = portfolioEurTotal;

        wekklyPortfolioProfitAndCost = {
            ...wekklyPortfolioProfitAndCost,
            [date]: {
                portfolioUsdTotal: portfolioUsdTotal,
                portfolioUsdProfitAbs: portfolioUsdProfitAbs,
                portfolioUsdProfitRel: portfolioUsdProfitRel,
                portfolioRubTotal: portfolioRubTotal,
                portfolioRubProfitAbs: portfolioRubProfitAbs,
                portfolioRubProfitRel: portfolioRubProfitRel,
                portfolioEurTotal: portfolioEurTotal,
                portfolioEurProfitAbs: portfolioEurProfitAbs,
                portfolioEurProfitRel: portfolioEurProfitRel,
            }
        }
    });

    return wekklyPortfolioProfitAndCost;
};

export const calculateYearPortfolioProfit = (wekklyPortfolioProfitAndCost, year) => {
    let yearPortfolioProfit = {};

    const yearResult = filterWeeklyResult(wekklyPortfolioProfitAndCost, year);
    let yearProfitUsdAbs = 0;
    let yearProfitUsdRel = 1;
    let yearProfitRubAbs = 0;
    let yearProfitRubRel = 1;
    let yearProfitEurAbs = 0;
    let yearProfitEurRel = 1;

    Object.values(yearResult).forEach((date) => {
        yearProfitUsdAbs += +date.portfolioUsdProfitAbs;
        yearProfitUsdRel *= 1 + +date.portfolioUsdProfitRel / 100;
        yearProfitRubAbs += +date.portfolioRubProfitAbs;
        yearProfitRubRel *= 1 + +date.portfolioRubProfitRel / 100;
        yearProfitEurAbs += +date.portfolioEurProfitAbs;
        yearProfitEurRel *= 1 + +date.portfolioEurProfitRel / 100;
    });

    yearProfitUsdRel = (yearProfitUsdRel - 1) * 100;
    yearProfitRubRel = (yearProfitRubRel - 1) * 100;
    yearProfitEurRel = (yearProfitEurRel - 1) * 100;

    yearPortfolioProfit = {
        yearProfitUsdAbs: yearProfitUsdAbs,
        yearProfitUsdRel: yearProfitUsdRel,
        yearProfitRubAbs: yearProfitRubAbs,
        yearProfitRubRel: yearProfitRubRel,
        yearProfitEurAbs: yearProfitEurAbs,
        yearProfitEurRel: yearProfitEurRel
    }

    return yearPortfolioProfit;
};

export const getLastTickers = (tickers) => {
    let tickerTable = {};

    Object.keys(tickers).forEach((ticker) => {
        const date = Object.keys(tickers[ticker].data)[Object.keys(tickers[ticker].data).length - 1];
        tickerTable = {
            ...tickerTable,
            [ticker]: {
                quantity: tickers[ticker].data[date].quantity,
                rubCost: tickers[ticker].data[date].rubCost,
                rubTotal: tickers[ticker].data[date].rubTotal,
                usdCost: tickers[ticker].data[date].usdCost,
                usdTotal: tickers[ticker].data[date].usdTotal,
                eurCost: tickers[ticker].data[date].eurCost,
                eurTotal: tickers[ticker].data[date].eurTotal,
                currency: tickers[ticker].data[date].currency,
                description: tickers[ticker].data[date].description
            },
        }
    });

    return tickerTable;
};

export const getTickerInfo = async (ticker) => {
    const tickerInfo = {};
    try {

        const infoUrl = getInfoUrl(ticker);
        const infoResponse = await fetch(infoUrl);
        const infoData = await infoResponse.json();
        tickerInfo.type = infoData.type;
        tickerInfo.description = infoData.description;
        const tickerUrl = getHistoryUrl(ticker, +new Date() - 8400000, new Date());
        const tickerResponse = await fetch(tickerUrl);
        const tickerData = await tickerResponse.json();
        if (tickerData.s === 'no_data' || isNaN(tickerData.c[0])) { throw new Error('Нет данных') }

        tickerInfo.cost = tickerData.c[0];
        return tickerInfo;
    } catch (err) {
        console.log(err.message);
        return { ...tickerInfo, noData: true };
    }
}