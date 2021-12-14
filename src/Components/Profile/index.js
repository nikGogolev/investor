import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import {  getLastBonds, getLastEtf, getLastForex, getLastPif, getLastStock, getMyProfileCost, getMyYearProfit, getPortfolio, getWeeklyPortfolioProfitAndCost } from '../../store/selectors/profileSelectors';
import { auth } from '../../services/firebase';
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

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    const myPortfolioCost = useSelector(getMyProfileCost);
    const weeklyResults = useSelector(getWeeklyPortfolioProfitAndCost);

    const myYearProfit = useSelector(getMyYearProfit);


    const myCurrentStock = useSelector(getLastStock);
    const myCurrentPif = useSelector(getLastPif);
    const myCurrentEtf = useSelector(getLastEtf);
    const myCurrentBonds = useSelector(getLastBonds);
    const myCurrentForex = useSelector(getLastForex);

    useEffect(() => {
        dispatch(calculatePortfolioCostWithSaga(myCurrentStock, myCurrentPif, myCurrentEtf, myCurrentBonds, myCurrentForex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolio]);

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
            <p>Стоимость портфеля, &#8381; <b>{myPortfolioCost ? (+myPortfolioCost.rubGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, &#8381; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, &#8381; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubRel).toFixed(2) : ''}</b></p>
            <p>Стоимость портфеля, $ <b>{myPortfolioCost ? (+myPortfolioCost.usdGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, $; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, $; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdRel).toFixed(2) : ''}</b></p>
            <p>Стоимость портфеля, &euro; <b>{myPortfolioCost ? (+myPortfolioCost.eurGrandTotal).toFixed(2) : ''}</b></p>
            <p>Доходность абс, &euro; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurAbs).toFixed(2) : ''}</b></p>
            <p>Доходность %, &euro; <b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurRel).toFixed(2) : ''}</b></p>
        </div>
    );
}
const ProfilePure = React.memo(Profile);
export default ProfilePure;