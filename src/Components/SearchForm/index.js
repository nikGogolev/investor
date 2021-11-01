import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SearchList from '../SearchList'
import {addTicker, getSearchUrl} from '../../Functions/functions.js';

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
    const [currency, setCurrency] = useState('rur');

    const handleTicker = (event) => {
        setTicker(event.target.value);
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const submitTicker = (event, searchedTicker) => {
        event.preventDefault();
        setTicker(searchedTicker);
    }

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    const dispatch = useDispatch();

    const handleSearch = (event) => {
        setSearch(event.target.value);
        const search = getSearchUrl(event.target.value);
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

    const buyTicker = async (event) => {
        event.preventDefault();
        setSearchResult([]);
        const addAction = await addTicker(ticker, date, quantity, currency, {});
        addAction && dispatch(addAction);
    };

    const classes = useStyles();

    return (
        <form action="" onSubmit={buyTicker} className={classes.form} label="Ticker">
            <input type="text" disabled className={classes.searchItem} value={ticker} onChange={handleTicker} required></input>
            <select required onChange={handleCurrency} className={classes.searchItem}>
                <option value='rur'>rur</option>
                <option value='usd'>usd</option>
                <option value='eur'>eur</option>
            </select>
            <input type="number" className={classes.searchItem} value={quantity} onChange={handleQuantity} required></input>
            <input type="date" className={classes.searchItem} value={date} onChange={handleDate} required></input>
            <input type="submit" className={classes.formSubmit + ' ' + classes.searchItem} value="Add"></input>
            <input type="text" className={classes.searchItem} value={search} onChange={handleSearch}></input>
            <SearchList className={classes.searchItem} searchResult={searchResult} submitTicker={submitTicker} />
        </form>

    );
}

export default SearchForm;
