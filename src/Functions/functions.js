import { addFilteredTickers } from "../store/actions/addFilteredTickers";
import { addTickerWithSaga } from "../store/actions/addTicker";

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
                RUBCost: RUBCost.toFixed(2), 
                RUBTotal: RUBTotal.toFixed(2), 
                USDCost: USDCost.toFixed(2), 
                USDTotal: USDTotal.toFixed(2),
                EURCost: EURCost.toFixed(2), 
                EURTotal: EURTotal.toFixed(2),
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
    return({RUBGrandTotal: RUBGrandTotal.toFixed(1), USDGrandTotal: USDGrandTotal.toFixed(1), EURGrandTotal: EURGrandTotal.toFixed(1)});
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


export const getYearProfit = (allTickers) => {

    let yearProfit = {};

    Object.values(allTickers).forEach((type, i) => {
        const tickerNames = Object.keys(type);
        yearProfit = {...yearProfit,
            [Object.keys(allTickers)[i]]: {}
        };
        Object.values(type).forEach((ticker, j) => {
            let sumProfitCurrencyAbsTemp = 0;
            let sumProfitCurrencyRelTemp = 1;
            let sumProfitRubAbsTemp = 0;
            let sumProfitRubRelTemp = 1;
            Object.values(ticker.data).forEach((date) => {
                sumProfitCurrencyAbsTemp += +date.profitCurrencyAbs;
                sumProfitCurrencyRelTemp *= 1 + date.profitCurrencyRel/100;
                sumProfitRubAbsTemp += +date.profitRubAbs;
                sumProfitRubRelTemp *= 1 + date.profitRubRel/100;
            });

            sumProfitCurrencyRelTemp = (sumProfitCurrencyRelTemp - 1) * 100;
            sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;

            yearProfit = {...yearProfit,  
                [Object.keys(allTickers)[i]]: {
                    ...yearProfit[Object.keys(allTickers)[i]],
                    [tickerNames[j]]: {
                        sumProfitCurrencyAbs: sumProfitCurrencyAbsTemp.toFixed(2),
                        sumProfitCurrencyRel: sumProfitCurrencyRelTemp.toFixed(2),
                        sumProfitRubAbs: sumProfitRubAbsTemp.toFixed(2),
                        sumProfitRubRel: sumProfitRubRelTemp.toFixed(2)
                    }
                }
            }
        });
    });

    return yearProfit;
};