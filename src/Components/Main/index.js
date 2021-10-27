import React, { useEffect } from 'react';
import SearchForm from '../SearchForm'

import Tickers from '../Tickers'

import { useDispatch, useSelector } from 'react-redux';
import { initUserDataWithSaga } from '../../store/actions/initUserData';
import { getBonds, getForex, getPifs, getStocks } from '../../store/selectors/tickersSelectors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    App: {
        margin: '0 auto'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EEE'
    },
}));

function Main() {

    const dispatch = useDispatch();

    const forex = useSelector(getForex);
    const stocks = useSelector(getStocks);
    const pifs = useSelector(getPifs);
    const bonds = useSelector(getBonds);

    useEffect(() => {
        dispatch(initUserDataWithSaga());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.App + ' ' + classes.mainContainer}>
            <SearchForm />
            <div>Валюта</div>
            <Tickers tickers={forex} type ='forex'/>
            <div>Акции</div>
            <Tickers tickers={stocks} type ='stock'/>
            <div>Фонды</div>
            <Tickers tickers={pifs} type ='pif'/>
            <div>Облигации</div>
            <Tickers tickers={bonds} type ='bonds'/>
        </div>
    );
}

export default Main;