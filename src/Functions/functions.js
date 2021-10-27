import { addBondsTickerWithSaga, addForexTickerWithSaga, addPifsTickerWithSaga, addStockTickerWithSaga, addTickerWithSaga } from "../store/actions/addTicker";
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
                            return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
                            /*
                            if (info.type === 'stock') {
                                const cost = (info.type !== 'bonds') ? data.c[0] : data.c[0] * 10;
                                const total = (info.type !== 'bonds') ? data.c[0] * quantity : data.c[0] * quantity * 10;
                                const roubleCost = (info.type !== 'bonds') ? data.c[0] * currencyCourse : data.c[0] * currencyCourse * 10;
                                const roubleTotal = (info.type !== 'bonds') ? data.c[0] * currencyCourse * quantity : data.c[0] * currencyCourse * quantity * 10;
                                return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
                            } else if (info.type === 'pif') {
                                const cost = data.c[0];
                                const total = data.c[0] * quantity;
                                const roubleCost = data.c[0] * currencyCourse;
                                const roubleTotal = data.c[0] * currencyCourse * quantity;
                                return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
                            } else if (info.type === 'bonds') {
                                const cost = data.c[0] * 10;
                                const total = data.c[0] * quantity * 10;
                                const roubleCost = data.c[0] * currencyCourse * 10;
                                const roubleTotal = data.c[0] * currencyCourse * quantity * 10;
                                return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
                            } else if (info.type === 'forex') {
                                const cost = data.c[0];
                                const total = data.c[0] * quantity;
                                const roubleCost = data.c[0] * currencyCourse;
                                const roubleTotal = data.c[0] * currencyCourse * quantity;
                                return addTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), roubleCost.toFixed(2), roubleTotal.toFixed(2), currency, info.type);
                            }
                            */
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

