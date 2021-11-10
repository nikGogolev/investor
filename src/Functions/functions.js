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
        return `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date(startDate)))/1000)}&to=${Math.round((+(new Date(finishDate)))/1000)}`;
    } else {
        return `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date()))/1000)}&to=${Math.round((+(new Date()))/1000)}`;
    }
    
};

export const addTicker = async (ticker, date, quantity, currency, prevData, isAutoComplete, isManual) => {
    let friday = +(new Date(date));
    while ((new Date(friday)).getDay() !== 5){
        friday += 86400000;
    }

    try {
        if(!isManual){
            const usdUrl = getHistoryUrl('RUR',friday,friday + 82800000);
            const usdResponse = await fetch(usdUrl);
            const usdData = await usdResponse.json();
            const usdCurrency = usdData.c[0];

            const eurUrl = getHistoryUrl('EUR_RUB',friday,friday + 82800000);
            const eurResponse = await fetch(eurUrl);
            const uerData = await eurResponse.json();
            const eurCurrency = uerData.c[0];

            const infoUrl = getInfoUrl(ticker);
            const infoResponse = await fetch(infoUrl);
            const infoData = await infoResponse.json();

            const tickerUrl = getHistoryUrl(ticker, friday, friday + 82800000);
            const tickerResponse = await fetch(tickerUrl);
            const tickerData = await tickerResponse.json();

            if(tickerData.s === 'no_data' || isNaN(tickerData.c[0])){ throw new Error ('Нет данных')}

            let usdCoef = 1;
            if (currency === 'rur') {usdCoef = 1/usdCurrency} else if (currency === 'usd') {usdCoef = 1} else if (currency === 'eur') {usdCoef = eurCurrency/usdCurrency};
            let rubCoef = 1;
            if (currency === 'rur') {rubCoef = 1} else if (currency === 'usd') {rubCoef = usdCurrency} else if (currency === 'eur') {rubCoef = eurCurrency};
            let eurCoef = 1;
            if (currency === 'rur') {eurCoef = 1/eurCurrency} else if (currency === 'usd') {eurCoef = usdCurrency/eurCurrency} else if (currency === 'eur') {eurCoef = eurCurrency/usdCurrency};
            
            const usdCost = (infoData.type !== 'bonds') ? tickerData.c[0] * usdCoef : tickerData.c[0] * usdCoef * 10;
            const usdTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * usdCoef * quantity : tickerData.c[0] * usdCoef * quantity * 10;
            const rubCost = (infoData.type !== 'bonds') ? tickerData.c[0] * rubCoef : tickerData.c[0] * rubCoef * 10;
            const rubTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * rubCoef * quantity : tickerData.c[0] * rubCoef * quantity * 10;
            const eurCost = (infoData.type !== 'bonds') ? tickerData.c[0] * eurCoef : tickerData.c[0] * eurCoef * 10;
            const eurTotal = (infoData.type !== 'bonds') ? tickerData.c[0] * eurCoef * quantity : tickerData.c[0] * eurCoef * quantity * 10;
            let prevDateData = prevData;
            if (!isAutoComplete){
                const tickerCurrent = ref(db, `${auth.currentUser.uid}/tickers/${infoData.type}/${ticker}/data/${(new Date(friday - 604800000)).toISOString().slice(0, 10)}`);
                const snapshot = await get(tickerCurrent);
                if (snapshot.exists()){
                    const data = snapshot.val();
                    prevDateData.ticker = data.ticker;
                    prevDateData.rubCost = data.rubCost;
                    prevDateData.usdCost = data.usdCost;
                    prevDateData.eurCost = data.eurCost;
                    prevDateData.quantity = data.quantity;
                };
            }

            if(prevDateData.ticker === undefined){
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
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    currency, 
                    infoData.type,
                );
            } else {
                const profitUsdAbs = (usdCost - prevDateData.usdCost) * prevDateData.quantity;
                const profitUsdRel = (usdCost - prevDateData.usdCost) / prevDateData.usdCost * 100;
                const profitRubAbs = (rubCost - prevDateData.rubCost) * prevDateData.quantity;
                const profitRubRel = (rubCost - prevDateData.rubCost) / prevDateData.rubCost * 100;
                const profitEurAbs = (eurCost - prevDateData.eurCost) * prevDateData.quantity;
                const profitEurRel = (eurCost - prevDateData.eurCost) / prevDateData.eurCost * 100;
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
                );
            }                           
        };
        

    }

    catch(err) {
        console.log(err.message);
    }
};

export const getTickerInfo = async (tickers, type) => {
    const USDUrl = getHistoryUrl('RUR',null,null);
    const EURUrl = getHistoryUrl('EUR_RUB',null,null);
    const USDresult = await fetch(USDUrl);
    const USDData = await USDresult.json();
    const USDCurrency = USDData.c[0];
    const EURresult = await fetch(EURUrl);
    const EURData = await EURresult.json();
    const EURCurrency = EURData.c[0];
    let RUBCost;
    let RUBTotal; 
    let USDCost;
    let USDTotal;
    let EURCost;
    let EURTotal;

    let tickerTable = {};
    for (let ticker in tickers) {
        const tickerUrl = getHistoryUrl(ticker,null,null);
        const result = await fetch(tickerUrl);
        const data = await result.json(); 
        
        if (tickers[ticker].currency === 'rur'){
            RUBCost = data.c[0];
            RUBTotal = RUBCost * tickers[ticker].quantity; 
            USDCost = RUBCost / USDCurrency;
            USDTotal = USDCost * tickers[ticker].quantity;
            EURCost = RUBCost / EURCurrency;
            EURTotal = EURCost  * tickers[ticker].quantity;
        } else if (tickers[ticker].currency === 'usd') {
            USDCost = data.c[0];
            USDTotal = USDCost * tickers[ticker].quantity;
            RUBCost = USDCost * USDCurrency;
            RUBTotal = RUBCost * tickers[ticker].quantity; 
            EURCost = RUBCost / EURCurrency;
            EURTotal = EURCost  * tickers[ticker].quantity;
        } else if (tickers[ticker].currency === 'eur') {
            EURCost = data.c[0];
            EURTotal = EURCost * tickers[ticker].quantity;
            RUBCost = EURCost * EURCurrency;
            RUBTotal = RUBCost * tickers[ticker].quantity; 
            USDCost = RUBCost / USDCurrency;
            USDTotal = USDCost  * tickers[ticker].quantity;
        }
        if (type === 'bonds'){
            RUBCost *= 10;
            RUBTotal *= 10; 
            USDCost *= 10;
            USDTotal *= 10;
            EURCost *= 10;
            EURTotal *= 10;
        }
        
        tickerTable = {...tickerTable, 
            [ticker]: {
                quantity: tickers[ticker].quantity, 
                RUBCost: RUBCost, 
                RUBTotal: RUBTotal, 
                USDCost: USDCost, 
                USDTotal: USDTotal,
                EURCost: EURCost, 
                EURTotal: EURTotal,
                currency: tickers[ticker].currency,
                description: tickers[ticker].description
            },
                }
    }
    return tickerTable;
};

export const calculatePortfolio = (...args) => {
    let RUBGrandTotal = 0;
    let USDGrandTotal = 0;
    let EURGrandTotal = 0;
    args.forEach((list) => {
        Object.values(list).forEach((item) => {
            RUBGrandTotal += +item.RUBTotal;
            USDGrandTotal += +item.USDTotal;
            EURGrandTotal += +item.EURTotal;
        })
    });
    return({RUBGrandTotal: RUBGrandTotal, USDGrandTotal: USDGrandTotal, EURGrandTotal: EURGrandTotal});
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
                    [tickerItem]: {data:{}}
                }
            };
            const filteredDates = dates.filter(date => ((new Date(date).getMonth() === month) && (new Date(date).getFullYear() === year)));
            filteredDates.forEach((date) => {
                filteredData = {
                    ...filteredData,
                    [tickerType]: {
                        ...filteredData[tickerType],
                        [tickerItem]: {data:{
                            ...filteredData[tickerType][tickerItem].data,
                            [date]: data[tickerType][tickerItem].data[date]
                        }}
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
    if (month !== undefined){
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
        yearProfit = {...yearProfit,
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
                sumProfitUsdRelTemp *= 1 + +date.profitUsdRel/100;
                sumProfitRubAbsTemp += +date.profitRubAbs;
                sumProfitRubRelTemp *= 1 + +date.profitRubRel/100;
                sumProfitEurAbsTemp += +date.profitEurAbs;
                sumProfitEurRelTemp *= 1 + +date.profitEurRel/100;
            });

            sumProfitUsdRelTemp = (sumProfitUsdRelTemp - 1) * 100;
            sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;
            sumProfitEurRelTemp = (sumProfitEurRelTemp - 1) * 100;

            yearProfit = {...yearProfit,  
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
                if(ticker.data[date] !== undefined){
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
            portfolioUsdProfitRel = portfolioUsdProfitAbs/ prevPortfolioUsdTotal * 100;
            portfolioRubProfitRel = portfolioRubProfitAbs/ prevPortfolioRubTotal * 100;
            portfolioEurProfitRel = portfolioEurProfitAbs/ prevPortfolioEurTotal * 100;
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
        yearProfitUsdRel *= 1 + +date.portfolioUsdProfitRel/100;
        yearProfitRubAbs += +date.portfolioRubProfitAbs;
        yearProfitRubRel *= 1 + +date.portfolioRubProfitRel/100;
        yearProfitEurAbs += +date.portfolioEurProfitAbs;
        yearProfitEurRel *= 1 + +date.portfolioEurProfitRel/100;
    });

    yearProfitUsdRel = (yearProfitUsdRel - 1)*100;
    yearProfitRubRel = (yearProfitRubRel - 1)*100;
    yearProfitEurRel = (yearProfitEurRel - 1)*100;

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















/*
export const addTicker = (ticker, date, quantity, currency, prevData) => {
    let friday = +(new Date(date));
    while ((new Date(friday)).getDay() !== 5){
        friday += 86400000;
    }
    const tickerUrl = getHistoryUrl(ticker, friday, friday + 82800000);
    const infoUrl = getInfoUrl(ticker);
    let currencyTicker = '';
    if (currency === 'rur') {currencyTicker = ''} else if (currency === 'usd') {currencyTicker = 'RUR'} else if (currency === 'eur') {currencyTicker = 'EUR_RUB'};
    const currencyUrl = getHistoryUrl(currencyTicker, friday, friday + 82800000);
    let currencyCourse = 1;
    
        return fetch(currencyUrl)
            .then(result => result.json())
            .then(course =>{
                if (course.errmsg === 'unknown_symbol'){
                    currencyCourse = 1;
                } else {
                    currencyCourse = course.c[0];
                }
                return fetch(tickerUrl)
                .then(result => result.json())
                .then(data => {
                    if(data.s === 'no_data'){ throw new Error ('Нет данных')}
                    return fetch(infoUrl)
                        .then(result => result.json())
                        .then((info) => {
                            if(prevData.ticker === undefined){
                                const cost = (info.type !== 'bonds') ? data.c[0] : data.c[0] * 10;
                                const total = (info.type !== 'bonds') ? data.c[0] * quantity : data.c[0] * quantity * 10;
                                const roubleCost = (info.type !== 'bonds') ? data.c[0] * currencyCourse : data.c[0] * currencyCourse * 10;
                                const roubleTotal = (info.type !== 'bonds') ? data.c[0] * currencyCourse * quantity : data.c[0] * currencyCourse * quantity * 10;
                                if (isNaN(data.c[0])) {throw new Error('Нет данных')};
                                return addTickerWithSaga(ticker, 
                                    info.description, 
                                    (new Date(friday)).toISOString().slice(0, 10), 
                                    quantity, 
                                    cost.toFixed(2), 
                                    total.toFixed(2), 
                                    roubleCost.toFixed(2), 
                                    roubleTotal.toFixed(2), 
                                    currency, 
                                    info.type,
                                    0,
                                    0,
                                    0,
                                    0);
                            } else {
                                const cost = (info.type !== 'bonds') ? data.c[0] : data.c[0] * 10;
                                const total = (info.type !== 'bonds') ? data.c[0] * quantity : data.c[0] * quantity * 10;
                                const roubleCost = (info.type !== 'bonds') ? data.c[0] * currencyCourse : data.c[0] * currencyCourse * 10;
                                const roubleTotal = (info.type !== 'bonds') ? data.c[0] * currencyCourse * quantity : data.c[0] * currencyCourse * quantity * 10;
                                const profitCurrencyAbs = (cost - prevData.cost) * prevData.quantity;
                                const profitCurrencyRel = (cost - prevData.cost) / prevData.cost * 100;
                                const profitRubAbs = (roubleCost - prevData.roubleCost) * prevData.quantity;
                                const profitRubRel = (roubleCost - prevData.roubleCost) / prevData.roubleCost * 100;
                                if (isNaN(data.c[0])) {throw new Error('Нет данных')};
                                return addTickerWithSaga(ticker, 
                                    info.description, 
                                    (new Date(friday)).toISOString().slice(0, 10), 
                                    quantity, cost.toFixed(2), 
                                    total.toFixed(2), 
                                    roubleCost.toFixed(2), 
                                    roubleTotal.toFixed(2), 
                                    currency, 
                                    info.type,
                                    profitCurrencyAbs.toFixed(2),
                                    profitCurrencyRel.toFixed(2),
                                    profitRubAbs.toFixed(2),
                                    profitRubRel.toFixed(2));
                            }
                            
                            
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
            })
};
*/