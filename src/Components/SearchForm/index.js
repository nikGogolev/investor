import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SearchList from '../SearchList'
import { addTicker, getSearchUrl } from '../../Functions/functions.js';

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
    hidden: {
        display: 'none',
    },
}));

function SearchForm() {



    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currency, setCurrency] = useState('rur');
    const [manualCourse, setManualCourse] = useState(0);
    const [isManual, setIsManual] = useState(false);
    const [manualType, setManualType] = useState('bonds');
    const [manualDescription, setManualDescription] = useState('');
    const [manualHidden, setManualHidden] = useState(true);
    const [bondNominal, setBondNominal] = useState(0);
    const [couponOrDividend, setCouponOrDividend] = useState(0);

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

    const handleManualCourse = (event) => {
        setManualCourse(event.target.value);
    };

    const handleManualType = (event) => {
        setManualType(event.target.value);
    };

    const handleManualDescription = (event) => {
        setManualDescription(event.target.value);
    };

    const handleBondNominal = (event) => {
        setBondNominal(event.target.value);
    };

    const handleCouponOrDividend = (event) => {
        setCouponOrDividend(event.target.value);
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

    const switchToManual = () => {
        setIsManual(true);
        setManualHidden(false);
    };

    const switchToAuto = () => {
        setIsManual(false);
        setManualHidden(true);
    };


    const buyTicker = async (event) => {
        event.preventDefault();
        setSearchResult([]);
        const addAction = await addTicker(ticker, date, quantity, currency, {}, false, isManual, manualCourse, { type: manualType, description: manualDescription }, bondNominal, couponOrDividend);
        addAction && dispatch(addAction);
    };

    const classes = useStyles();

    return (
        <form action="" onSubmit={buyTicker} className={classes.form} label="Ticker">
            Ticker: <input type="text" disabled={manualHidden} className={classes.searchItem} value={ticker} onChange={handleTicker} required></input>
            <select required onChange={handleCurrency} className={classes.searchItem}>
                <option value='rur'>rur</option>
                <option value='usd'>usd</option>
                <option value='eur'>eur</option>
            </select>
            Quantity: <input type="number" className={classes.searchItem} value={quantity} onChange={handleQuantity} required></input>
            Bond nominal: <input type="number" className={classes.searchItem} value={bondNominal} onChange={handleBondNominal} required></input>
            Coupon or dividend: <input type="number" className={classes.searchItem} value={couponOrDividend} onChange={handleCouponOrDividend}></input>
            <div className={classes.form + ' ' + (manualHidden ? classes.hidden : '')}>
                Manual course: <input type="number" className={classes.searchItem} value={manualCourse} onChange={handleManualCourse}></input>
                
                Manual description: <input type="text" className={classes.searchItem} value={manualDescription} onChange={handleManualDescription}></input>
                Manual type:
                <select required onChange={handleManualType} className={classes.searchItem}>
                    <option value='bonds'>bonds</option>
                    <option value='stock'>stock</option>
                    <option value='pif'>pif</option>
                    <option value='etf'>etf</option>
                    <option value='forex'>forex</option>
                </select>
                
            </div>
            Date: <input type="date" className={classes.searchItem} value={date} onChange={handleDate} required></input>
            <input type="submit" className={classes.formSubmit + ' ' + classes.searchItem} value="Add"></input>
            <input type="button" className={classes.formSubmit + ' ' + classes.searchItem + ' ' + (manualHidden ? '' : classes.hidden)} value="Manual" onClick={switchToManual}></input>
            <input type="button" className={classes.formSubmit + ' ' + classes.searchItem + ' ' + (manualHidden ? classes.hidden : '')} value="Auto" onClick={switchToAuto}></input>
            Search: <input type="text" disabled={!manualHidden} className={classes.searchItem} value={search} onChange={handleSearch}></input>
            <SearchList className={classes.searchItem} searchResult={searchResult} submitTicker={submitTicker} />
        </form>

    );
}

export default SearchForm;
