import { addBondsTickerWithSaga, addForexTickerWithSaga, addPifsTickerWithSaga, addStockTickerWithSaga } from "../store/actions/addTicker";
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
    if (currency === 'rur'){
        return fetch(tickerUrl)
            .then(result => result.json())
            .then(data => {
                if (data.s === 'no_data'){throw new Error('Нет данных по данному инструменту')};
                return fetch(infoUrl)
                    .then(result => result.json())
                    .then((info) => {
                        if (info.type === 'stock') {
                            const cost = data.c[0];
                            const total = data.c[0] * quantity;
                            return addStockTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                        } else if (info.type === 'pif') {
                            const cost = data.c[0];
                            const total = data.c[0] * quantity;
                            return addPifsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                        } else if (info.type === 'bonds') {
                            const cost = data.c[0] * 10;
                            const total = data.c[0] * quantity * 10;
                            return addBondsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                        } else if (info.type === 'forex') {
                            const cost = data.c[0];
                            const total = data.c[0] * quantity;
                            return addForexTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    } else if (currency === 'usd'){
        const USDUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=RUR&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;;
        return fetch(USDUrl)
            .then(result => result.json())
            .then(course =>{
                const USDcourse = course.c[0];
                return fetch(tickerUrl)
                .then(result => result.json())
                .then(data => {
                    return fetch(infoUrl)
                        .then(result => result.json())
                        .then((info) => {
                            if (info.type === 'stock') {
                                const cost = data.c[0] * USDcourse;
                                const total = data.c[0] * USDcourse * quantity;
                                return addStockTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'pif') {
                                const cost = data.c[0] * USDcourse;
                                const total = data.c[0] * USDcourse * quantity;
                                return addPifsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'bonds') {
                                const cost = data.c[0] * USDcourse * 10;
                                const total = data.c[0] * USDcourse * quantity * 10;
                                return addBondsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'forex') {
                                const cost = data.c[0] * USDcourse;
                                const total = data.c[0] * USDcourse * quantity;
                                return addForexTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
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
        
    } else if (currency === 'eur'){
        const EURUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=EUR_RUB&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;;
        return fetch(EURUrl)
            .then(result => result.json())
            .then(course =>{
                const EURcourse = course.c[0];
                return fetch(tickerUrl)
                .then(result => result.json())
                .then(data => {
                    return fetch(infoUrl)
                        .then(result => result.json())
                        .then((info) => {
                            if (info.type === 'stock') {
                                const cost = data.c[0] * EURcourse;
                                const total = data.c[0] * EURcourse * quantity;
                                return addStockTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'pif') {
                                const cost = data.c[0] * EURcourse;
                                const total = data.c[0] * EURcourse * quantity;
                                return addPifsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'bonds') {
                                const cost = data.c[0] * EURcourse * 10;
                                const total = data.c[0] * EURcourse * quantity * 10;
                                return addBondsTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
                            } else if (info.type === 'forex') {
                                const cost = data.c[0] * EURcourse;
                                const total = data.c[0] * EURcourse * quantity;
                                return addForexTickerWithSaga(ticker, info.description, (new Date(date)).toISOString().slice(0, 10), quantity, cost.toFixed(2), total.toFixed(2), currency);
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
        
    }
};