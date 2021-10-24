import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addBondsTickerWithSaga, addForexTickerWithSaga, addPifsTickerWithSaga, addStockTickerWithSaga } from '../../store/actions/addTicker';
import { makeStyles } from '@material-ui/core';
import SearchList from '../SearchList'

const useStyles = makeStyles((theme) => ({
    form: {
        maxWidth: '400px',
        border: '1px solid black',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
    },
    formSubmit: {
        display: 'block',
    },
    searchItem: {
        margin: '5px 10px',
        marginBottom: '5px'
    },
}));

function SearchForm() {

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

    const submitTicker = (searchedTicker) => {
        setTicker(searchedTicker);
    }

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

    const addTicker = (event) => {
        event.preventDefault();
        const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date))) / 1000}&to=${(+(new Date(date)) + 82800000) / 1000}`;
        const infoUrl = `https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}`;
        fetch(tickerUrl)
            .then(result => result.json())
            .then(data => {
                fetch(infoUrl)
                    .then(result => result.json())
                    .then((info) => {
                        if (info.type === 'stock') {
                            const cost = data.c[0];
                            const total = data.c[0] * quantity;
                            dispatch(addStockTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                        } else if (info.type === 'pif') {
                            const cost = data.c[0];
                            const total = data.c[0] * quantity;
                            dispatch(addPifsTickerWithSaga(ticker, info.description, date, quantity, cost.toFixed(2), total.toFixed(2)));
                        } else if (info.type === 'bonds') {
                            const cost = data.c[0] * 10;
                            const total = data.c[0] * quantity * 10;
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

    const classes = useStyles();

    return (
        <form action="" onSubmit={addTicker} className={classes.form} label="Ticker">
            <input type="text" disabled className={classes.searchItem} value={ticker} onChange={handleTicker} required></input>
            <input type="number" className={classes.searchItem} value={quantity} onChange={handleQuantity} required></input>
            <input type="date" className={classes.searchItem} value={date} onChange={handleDate} required></input>
            <input type="submit" className={classes.formSubmit + ' ' + classes.searchItem} value="Add"></input>
            <input type="text" className={classes.searchItem} value={search} onChange={handleSearch}></input>
            <SearchList className={classes.searchItem} searchResult={searchResult} submitTicker={submitTicker} />
        </form>

    );
}

export default SearchForm;
