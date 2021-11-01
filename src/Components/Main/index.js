import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm'

import Tickers from '../Tickers'

import { useDispatch, useSelector } from 'react-redux';
import { initUserDataWithSaga } from '../../store/actions/initUserData';
import { getAlltickers, getFilteredBonds, getFilteredEtf, getFilteredForex, getFilteredPif, getFilteredStocks } from '../../store/selectors/tickersSelectors';
import { makeStyles } from '@material-ui/core';
import { filterData } from '../../Functions/functions';
import { autoCompleteTickerWithSaga } from '../../store/actions/autoComplete';
import { calculateYearProfitWithSaga } from '../../store/actions/calculateYearProfit';

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

    const filteredForex = useSelector(getFilteredForex);
    const filteredStocks = useSelector(getFilteredStocks);
    const filteredPif = useSelector(getFilteredPif);
    const filteredEtf = useSelector(getFilteredEtf);
    const filteredBonds = useSelector(getFilteredBonds);
    const allTickers = useSelector(getAlltickers);

    const [date, setDate] = useState((new Date()).toISOString().slice(0, 7));

    const handleDate = (event) => {
        setDate(event.target.value);
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
                    cost: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].cost,
                    total:Object.values(ticker.data)[Object.keys(ticker.data).length - 1].total,
                    roubleCost: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].roubleCost,
                    roubleTotal: Object.values(ticker.data)[Object.keys(ticker.data).length - 1].roubleTotal
                };
                dispatch(autoCompleteTickerWithSaga(Object.keys(type)[i], 
                Object.keys(ticker.data)[Object.keys(ticker.data).length - 1], 
                Object.values(ticker.data)[Object.keys(ticker.data).length - 1].quantity, 
                Object.values(ticker.data)[Object.keys(ticker.data).length - 1].currency),
                prevData);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(filterData(allTickers, new Date(date).getFullYear(), new Date(date).getMonth()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    useEffect(() => {
        dispatch(calculateYearProfitWithSaga(allTickers));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.App + ' ' + classes.mainContainer}>
            <input type='month' onChange={handleDate} value={date}/>
            <SearchForm />
            <div>Валюта</div>
            <Tickers  filteredTickers={filteredForex} type ='forex'/>
            <div>Акции</div>
            <Tickers  filteredTickers={filteredStocks} type ='stock'/>
            <div>Фонды</div>
            <Tickers filteredTickers={filteredPif} type ='pif'/>
            <Tickers filteredTickers={filteredEtf} type ='etf'/>
            <div>Облигации</div>
            <Tickers filteredTickers={filteredBonds} type ='bonds'/>
        </div>
    );
}

export default Main;