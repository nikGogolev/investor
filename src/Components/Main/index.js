import React, { useEffect } from 'react';
import SearchForm from '../SearchForm'

import Forex from '../Forex'
import Stocks from '../Stocks'
import Pifs from '../Pifs'
import Bonds from '../Bonds'

import { useDispatch, useSelector } from 'react-redux';
import { initTickersWithSaga } from '../../store/actions/initTickers';
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
        dispatch(initTickersWithSaga());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.App + classes.mainContainer}>
            <SearchForm />
            <div>Валюта</div>
            <Forex forex={forex} />
            <div>Акции</div>
            <Stocks stocks={stocks} />
            <div>Фонды</div>
            <Pifs pifs={pifs} />
            <div>Облигации</div>
            <Bonds bonds={bonds} />
        </div>
    );
}

export default Main;