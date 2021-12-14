import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm';

import Tickers from '../Tickers';
import WeeklyResult from '../WeeklyResult';

import { useDispatch, useSelector } from 'react-redux';
import { initUserDataWithSaga } from '../../store/actions/initUserData';
import { getAlltickers, getDates, getFilteredBonds, getFilteredEtf, getFilteredForex, getFilteredPif, getFilteredStocks } from '../../store/selectors/tickersSelectors';
import { makeStyles } from '@material-ui/core';
import { filterData, filterWeeklyResult } from '../../Functions/functions';
import { autoCompleteTickerWithSaga } from '../../store/actions/autoComplete';
import { calculateYearProfitWithSaga } from '../../store/actions/calculateYearProfit';
import { calculateWeeklyPortfolioProfitAndCostWithSaga } from '../../store/actions/calculateWeeklyPortfolioProfitAndCost';
import { getWeeklyPortfolioProfitAndCost } from '../../store/selectors/profileSelectors';

const useStyles = makeStyles((theme) => ({
    App: {
        margin: '0 auto'
    },
    mainContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EEE'
    },
    chooseDisplayOptions: {
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: '240px',
        position: 'sticky',
        top: '0',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '10px',
        backgroundColor: 'lightgray',
    },
    chooseCurrency: {
        maxWidth: '150px',
        margin: '5px 0',
        boxSizing: 'border-box',
    },
    chooseMonth: {
        maxWidth: '150px',
        margin: '5px 0',
        boxSizing: 'border-box',
    },
}));

function Main() {

    const dispatch = useDispatch();

    const filteredForex = useSelector(getFilteredForex);
    const filteredStocks = useSelector(getFilteredStocks);
    const filteredPif = useSelector(getFilteredPif);
    const filteredEtf = useSelector(getFilteredEtf);
    const filteredBonds = useSelector(getFilteredBonds);
    const allTickers = useSelector(getAlltickers);
    const dates = useSelector(getDates);
    const weeklyResults = useSelector(getWeeklyPortfolioProfitAndCost);

    const [currency, setCurrency] = useState('rur');
    const [date, setDate] = useState((new Date()).toISOString().slice(0, 7));
    const [filteredWeeklyResult, setFilteredWeeklyResult] = useState({});

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    useEffect(() => {
        dispatch(initUserDataWithSaga());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        Object.values(allTickers).forEach((type) => {
            Object.values(type).forEach((ticker, i) => {
                const prevData = {
                    ticker: Object.keys(type)[i],
                    quantity: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].quantity,
                    usdCost: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].usdCost,
                    usdTotal: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].usdTotal,
                    rubCost: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].rubCost,
                    rubTotal: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].rubTotal,
                    eurCost: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].eurCost,
                    eurTotal: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].eurTotal,
                };
                dispatch(
                    autoCompleteTickerWithSaga(
                        Object.keys(type)[i],
                        Object.keys(ticker.data)[Object.keys(ticker.data).length - 1],
                        Object.values(ticker.data)[Object.keys(ticker.data).length - 1].quantity,
                        Object.values(ticker.data)[Object.keys(ticker.data).length - 1].currency,
                        prevData,
                        Object.values(ticker.data)[Object.keys(ticker.data).length - 1].bondNominal
                    )
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(
            filterData(
                allTickers,
                new Date(date).getFullYear(),
                new Date(date).getMonth()
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, allTickers]);

    useEffect(() => {
        setFilteredWeeklyResult(
            filterWeeklyResult(
                weeklyResults,
                new Date(date).getFullYear(),
                new Date(date).getMonth()
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    useEffect(() => {
        dispatch(calculateYearProfitWithSaga(allTickers));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        dispatch(calculateWeeklyPortfolioProfitAndCostWithSaga(allTickers, dates));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dates]);


    const classes = useStyles();

    return (
        <div className={classes.App + ' ' + classes.mainContainer}>
            <div className={classes.chooseDisplayOptions}>
                <select required onChange={handleCurrency} className={classes.chooseCurrency}>
                    <option value='rur'>rur</option>
                    <option value='usd'>usd</option>
                    <option value='eur'>eur</option>
                </select>
                <input type='month' onChange={handleDate} value={date} className={classes.chooseMonth} />
            </div>
            <SearchForm />
            <div>Валюта</div>
            <Tickers filteredTickers={filteredForex} type='forex' currency={currency} date={date} />
            <div>Акции</div>
            <Tickers filteredTickers={filteredStocks} type='stock' currency={currency} date={date} />
            <div>Фонды</div>
            <Tickers filteredTickers={filteredPif} type='pif' currency={currency} date={date} />
            <Tickers filteredTickers={filteredEtf} type='etf' currency={currency} date={date} />
            <div>Облигации</div>
            <Tickers filteredTickers={filteredBonds} type='bonds' currency={currency} date={date} />
            <div>Сумма</div>
            <WeeklyResult weeklyResult={filteredWeeklyResult} currency={currency} date={date} />
        </div>
    );
}
const MainPure = React.memo(Main);
export default MainPure;