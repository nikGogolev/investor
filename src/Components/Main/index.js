import React, { useState, useEffect } from 'react';

import SearchList from '../SearchList'
import Forex from '../Forex'
import Stocks from '../Stocks'
import Pifs from '../Pifs'
import Bonds from '../Bonds'

import { useDispatch, useSelector } from 'react-redux';
import { initTickersWithSaga } from '../../store/actions/initTickers';
import { addBondsTickerWithSaga, addForexTickerWithSaga, addPifsTickerWithSaga, addStockTickerWithSaga } from '../../store/actions/addTicker';
import { getBonds, getForex, getPifs, getStocks } from '../../store/selectors/tickersSelectors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
    root: {
        '& > *': {
            color: theme.palette.primary.main,
        },
    },
    App: {
        margin: '0 auto'
    },
    mainContainer: {
        display: 'flex',
	    flexDirection: 'column',
	    backgroundColor: '#EEE'
    },
    form: {
        border: '1px solid black',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    formSubmit: {
        display: 'block',
	    margin: '0 10px',
    },
}));

function Main() {

    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleTicker = (event) => {
        setTicker(event.target.value);
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        const search = `https://api.bcs.ru/udfdatafeed/v1/search?query=${event.target.value}&limit=10`;
        fetch(search)
            .then(result => result.json())
            .then(data => {
                let temp = [];
                data.forEach((item, i) => {
                    temp.push({
                        ticker: item.symbol,
                        descr: item.description,
                        classcode: item.classcode
                    });
                });
                setSearchResult(temp);
            })
            .catch(error => {
                console.log(error);
            })

    };

    const dispatch = useDispatch();

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

    const addTicker = (event) => {
        event.preventDefault();
        const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;
        const infoUrl = `https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}`;
        fetch(tickerUrl)
            .then(result => result.json())
            .then(data => {
                fetch(infoUrl)
                .then(result => result.json())
                .then((info)=>{
                    if (info.type === 'stock'){
                        const cost = data.c[0];
                        const total = data.c[0] * quantity;
                        dispatch(addStockTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                    } else if (info.type === 'pif') {
                        const cost = data.c[0];
                        const total = data.c[0] * quantity;
                        dispatch(addPifsTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                    } else if (info.type === 'bonds') {
                        const cost = data.c[0]*10;
                        const total = data.c[0] * quantity*10;
                        dispatch(addBondsTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                    } else if (info.type === 'forex') {
                        const cost = data.c[0];
                        const total = data.c[0] * quantity;
                        dispatch(addForexTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                
            })
            .catch(error => {
                console.log(error);
            })
    };
    const submitTicker = (searchedTicker) => {
        setTicker(searchedTicker);
    }

    const forex = useSelector(getForex);
    const stocks = useSelector(getStocks);
    const pifs = useSelector(getPifs);
    const bonds = useSelector(getBonds);

    useEffect(() => {
        dispatch(initTickersWithSaga());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.App + classes.mainContainer}>
            <div>Валюта</div>
            <Forex forex={forex} />
            <div>Акции</div>
            <Stocks stocks={stocks} />
            <div>Фонды</div>
            <Pifs pifs={pifs} />
            <div>Облигации</div>
            <Bonds bonds={bonds} />
            <form action="" onSubmit={addTicker} className={classes.form} label="Ticker">
                <input type="text" disabled value={ticker} onChange={handleTicker} required></input>
                <input type="number" value={quantity} onChange={handleQuantity} required></input>
                <input type="date" value={date} onChange={handleDate} required></input>
                <input type="submit" className={classes.formSubmit} value="Add"></input>
            </form>
            <input type="text" value={search} onChange={handleSearch}></input>
            <SearchList searchResult={searchResult} submitTicker={submitTicker} />
        </div>
    );
}

export default Main;
