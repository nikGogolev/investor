import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {  getMyCurrentBonds, getMyCurrentEtf, getMyCurrentForex, getMyCurrentPif, getMyCurrentStock, getMyProfileCost, getMyYearProfit, getPortfolio } from '../../store/selectors/profileSelectors';
import { auth } from '../../services/firebase';
import { setTickersInfoWithSaga } from '../../store/actions/setTickersInfo';
import MyTickers from '../MyTickers';
import { calculatePortfolioCostWithSaga } from '../../store/actions/calculatePortfolioCost';

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

function Profile() {
    const [currency, setCurrency] = useState('rur');
    const portfolio = useSelector(getPortfolio);
    const { stock, bonds, forex, pif, etf } = portfolio;

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    const myCurrentStock = useSelector(getMyCurrentStock);
    const myCurrentPif = useSelector(getMyCurrentPif);
    const myCurrentEtf = useSelector(getMyCurrentEtf);
    const myCurrentBonds = useSelector(getMyCurrentBonds);
    const myCurrentForex = useSelector(getMyCurrentForex);
    const myPortfolioCost = useSelector(getMyProfileCost);

    const myYearProfit = useSelector(getMyYearProfit);

    useEffect(() => {
        dispatch(setTickersInfoWithSaga(stock, 'stock'));
        dispatch(setTickersInfoWithSaga(pif, 'pif'));
        dispatch(setTickersInfoWithSaga(etf, 'etf'));
        dispatch(setTickersInfoWithSaga(bonds, 'bonds'));
        dispatch(setTickersInfoWithSaga(forex, 'forex'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(calculatePortfolioCostWithSaga(myCurrentStock, myCurrentPif, myCurrentEtf, myCurrentBonds, myCurrentForex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <select required onChange={handleCurrency} className={classes.searchItem}>
                <option value='rur'>rur</option>
                <option value='usd'>usd</option>
                <option value='eur'>eur</option>
            </select>
            <div>Валюта</div>
            <MyTickers tickers={myCurrentForex} myProfit={myYearProfit.forex} type='forex' currency={currency}/>
            <div>Акции</div>
            <MyTickers tickers={myCurrentStock} myProfit={myYearProfit.stock} type='stock' currency={currency}/>
            <div>Фонды</div>
            <MyTickers tickers={myCurrentPif} myProfit={myYearProfit.pif} type='pif' currency={currency}/>
            <MyTickers tickers={myCurrentEtf} myProfit={myYearProfit.etf} type='etf' currency={currency}/>
            <div>Облигации</div>
            <MyTickers tickers={myCurrentBonds} myProfit={myYearProfit.bonds} type='bonds' currency={currency}/>
            <h1>{auth.currentUser ? auth.currentUser.email : ''}</h1>
            <p>&#8381; {myPortfolioCost ? myPortfolioCost.RUBGrandTotal : ''}</p>
            <p>$ {myPortfolioCost ? myPortfolioCost.USDGrandTotal : ''}</p>
            <p>&euro; {myPortfolioCost ? myPortfolioCost.EURGrandTotal : ''}</p>

        </div>
    );
}

export default Profile;