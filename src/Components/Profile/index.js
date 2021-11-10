import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {  getMyCurrentBonds, getMyCurrentEtf, getMyCurrentForex, getMyCurrentPif, getMyCurrentStock, getMyProfileCost, getMyYearProfit, getPortfolio, getWeeklyPortfolioProfitAndCost } from '../../store/selectors/profileSelectors';
import { auth } from '../../services/firebase';
import { setTickersInfoWithSaga } from '../../store/actions/setTickersInfo';
import MyTickers from '../MyTickers';
import { calculatePortfolioCostWithSaga } from '../../store/actions/calculatePortfolioCost';
import { calculateYearPortfolioProfit } from '../../Functions/functions';

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
    const [yearPortfolioProfit, setYearPortfolioProfit] = useState({});
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
    const weeklyResults = useSelector(getWeeklyPortfolioProfitAndCost);

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
    }, [myCurrentStock, myCurrentPif, myCurrentEtf, myCurrentBonds, myCurrentForex]);

    useEffect(() => {
        setYearPortfolioProfit(calculateYearPortfolioProfit(weeklyResults, 2021));
    }, [weeklyResults]);

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
            <p>Стоимость портфеля, &#8381; <b>{myPortfolioCost ? (+myPortfolioCost.RUBGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, &#8381; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, &#8381; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubRel).toFixed(2) : ''}</b></p>
            <p>Стоимость портфеля, $ <b>{myPortfolioCost ? (+myPortfolioCost.USDGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, $; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, $; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdRel).toFixed(2) : ''}</b></p>
            <p>Стоимость портфеля, &euro; <b>{myPortfolioCost ? (+myPortfolioCost.EURGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, &euro; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, &euro; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurRel).toFixed(2) : ''}</b></p>
        </div>
    );
}

export default Profile;