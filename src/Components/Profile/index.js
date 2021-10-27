import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { getPortfolio } from '../../store/selectors/profileSelectors';
import { auth } from '../../services/firebase';

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
    const [ myStocks, setMyStocks ] = useState({});
    const [ myBonds, setMyBonds ] = useState({});
    const [ myPifs, setMyPifs ] = useState({});
    const [ myForex, setMyForex ] = useState({});

    const portfolio = useSelector(getPortfolio);
    const { stocks, bonds, forex, pifs } = portfolio;
    const classes = useStyles();
    const getStocks = async (tickers) => {
        let tickerTable = {};
        for (let ticker in tickers) {
            const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
            const result = await fetch(tickerUrl);
            const data = await result.json(); 
            const cost = data.c[0];
            const total = data.c[0] * tickers[ticker].quantity;
            tickerTable = {...tickerTable, [ticker]: {quantity: tickers[ticker].quantity, cost: cost.toFixed(2), total: total.toFixed(2)}}
        }
        setMyStocks(tickerTable);
    };
    const getBonds = async (tickers) => {
        let tickerTable = {};
        for (let ticker in tickers) {
            const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
            const result = await fetch(tickerUrl);
            const data = await result.json(); 
            const cost = data.c[0];
            const total = data.c[0] * tickers[ticker].quantity;
            tickerTable = {...tickerTable, [ticker]: {quantity: tickers[ticker].quantity, cost: cost.toFixed(2), total: total.toFixed(2)}}
        }
        setMyBonds(tickerTable);
    };
    const getPifs = async (tickers) => {
        let tickerTable = {};
        for (let ticker in tickers) {
            const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
            const result = await fetch(tickerUrl);
            const data = await result.json(); 
            const cost = data.c[0];
            const total = data.c[0] * tickers[ticker].quantity;
            tickerTable = {...tickerTable, [ticker]: {quantity: tickers[ticker].quantity, cost: cost.toFixed(2), total: total.toFixed(2)}}
        }
        setMyPifs(tickerTable);
    };
    const getForex = async (tickers) => {
        let tickerTable = {};
        for (let ticker in tickers) {
            const tickerUrl = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${Math.round((+(new Date())) / 1000)}&to=${Math.round((+(new Date())) / 1000)}`;
            const result = await fetch(tickerUrl);
            const data = await result.json(); 
            const cost = data.c[0];
            const total = data.c[0] * tickers[ticker].quantity;
            tickerTable = {...tickerTable, [ticker]: {quantity: tickers[ticker].quantity, cost: cost.toFixed(2), total: total.toFixed(2)}}
        }
        setMyForex(tickerTable);
    };
    useEffect(() => {
        getStocks(stocks);
        getBonds(bonds);
        getPifs(pifs);
        getForex(forex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <h1>{auth.currentUser ? auth.currentUser.email : ''}</h1>
    );
}

export default Profile;