import { addTickerWithSaga } from "../store/actions/addTicker";
    /*
    SEARCH
    https://api.bcs.ru/udfdatafeed/v1/search?query=${query}&limit=10&fulldescription=on
    */

    /*
    INFO
    https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}
    */

    /*
    HISTORY
    https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date)))/1000}&to=${(+(new Date(date))+82800000)/1000}
    */

export const addTicker = (ticker, date, quantity, currency) => {
    const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;
    const infoUrl = `https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}`;
    let currencyTicker = '';
    if (currency === 'rur') {currencyTicker = ''} else if (currency === 'usd') {currencyTicker = 'RUR'} else if (currency === 'eur') {currencyTicker = 'EUR_RUB'};
    const currencyUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${currencyTicker}&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;
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
                    return fetch(infoUrl)
                        .then(result => result.json())
                        .then((info) => {
                            const cost = (info.type !== 'bonds') ? data.c[0] : data.c[0] * 10;
                            const total = (info.type !== 'bonds') ? data.c[0] * quantity : data.c[0] * quantity * 10;
                            const roubleCost = (info.type !== 'bonds') ? data.c[0] * currencyCourse : data.c[0] * currencyCourse * 10;
                            const roubleTotal = (info.type !== 'bonds') ? data.c[0] * currencyCourse * quantity : data.c[0] * currencyCourse * quantity * 10;
                            if (isNaN(data.c[0])) {throw new Error('Нет данных')};
                            return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
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
    const USDUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=RUR&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
    const EURUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=EUR_RUB&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
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
        const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
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
    console.log(args);
    args.forEach((list) => {
        Object.values(list).forEach((item) => {
            RUBGrandTotal += +item.RUBTotal;
            USDGrandTotal += +item.USDTotal;
            EURGrandTotal += +item.EURTotal;
        })
    });
    return({RUBGrandTotal: RUBGrandTotal.toFixed(1), USDGrandTotal: USDGrandTotal.toFixed(1), EURGrandTotal: EURGrandTotal.toFixed(1)});
};

