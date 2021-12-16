import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { getLastBonds, getLastEtf, getLastForex, getLastPif, getLastStock, getMyProfileCost, getMyYearProfit, getPortfolio, getWeeklyPortfolioProfitAndCost } from '../../store/selectors/profileSelectors';
import { auth } from '../../services/firebase';
import MyTickers from '../MyTickers';
import { calculatePortfolioCostWithSaga } from '../../store/actions/calculatePortfolioCost';
import { calculateYearPortfolioProfit, filterWeeklyResult } from '../../Functions/functions';



const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        backgroundColor: '#EEE',
        margin: '10px',
    },
    rightPart: {
        display: 'flex',
        flexDirection: 'column',

    },
    chart: {
        width: '1000px',
        height: '500px',
        marginTop: '50px',
    },
    portfolioSummaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: '50px',
        alignItems: 'center',
    },
    portfolioSummary: {
        display: 'flex',
    },
    portfolioSummaryHeaders: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
        marginRight: '10px',
    },
    portfolioSummaryValues: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
}));

function Profile() {
    const [currency, setCurrency] = useState('rur');
    const [yearPortfolioProfit, setYearPortfolioProfit] = useState({});
    const [portfolioRelProfitRub, setPortfolioRelProfitRub] = useState([]);
    const [portfolioRelProfitUsd, setPortfolioRelProfitUsd] = useState([]);
    const [portfolioRelProfitEur, setPortfolioRelProfitEur] = useState([]);
    const [portfolioRelProfit, setPortfolioRelProfit] = useState([]);
    const [yearWeekleResult, setYearWeeklyResult] = useState({});
    const [currentYear, setCurrentYear] = useState((new Date()).toISOString().slice(0, 4));

    const portfolio = useSelector(getPortfolio);

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    const handleDate = (event) => {
        setCurrentYear(event.target.value);
    };

    console.log(currentYear);

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
        setYearPortfolioProfit(calculateYearPortfolioProfit(weeklyResults, +currentYear));
    }, [weeklyResults, currentYear]);

    useEffect(() => {
        setYearWeeklyResult(filterWeeklyResult(weeklyResults, +currentYear));
    }, [weeklyResults, currentYear]);

    // console.log(Object.entries(weeklyResults).map((current, i) => { return { date: current[0], value: current[1].portfolioRubProfitRel } }));

    useEffect(() => {
        setPortfolioRelProfitRub(
            Object.entries(yearWeekleResult).map((current, i, arr) => { return { date: current[0], value: (arr.slice(0, i + 1).reduce((previousValue, currentValue) => (previousValue * (1 + currentValue[1].portfolioRubProfitRel / 100)), 1) - 1) * 100 } })
        );

        setPortfolioRelProfitUsd(
            Object.entries(yearWeekleResult).map((current, i, arr) => { return { date: current[0], value: (arr.slice(0, i + 1).reduce((previousValue, currentValue) => (previousValue * (1 + currentValue[1].portfolioUsdProfitRel / 100)), 1) - 1) * 100 } })
        );

        setPortfolioRelProfitEur(
            Object.entries(yearWeekleResult).map((current, i, arr) => { return { date: current[0], value: (arr.slice(0, i + 1).reduce((previousValue, currentValue) => (previousValue * (1 + currentValue[1].portfolioEurProfitRel / 100)), 1) - 1) * 100 } })
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearWeekleResult]);

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (currency) {
            case 'rur':
                setPortfolioRelProfit(portfolioRelProfitRub);
                break;
            case 'usd':
                setPortfolioRelProfit(portfolioRelProfitUsd);
                break;
            case 'eur':
                setPortfolioRelProfit(portfolioRelProfitEur);
                break;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portfolioRelProfitRub, currency]);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.leftPart}>
                <select required onChange={handleCurrency} className={classes.searchItem}>
                    <option value='rur'>rur</option>
                    <option value='usd'>usd</option>
                    <option value='eur'>eur</option>
                </select>
                <select required onChange={handleDate} value={currentYear} className={classes.searchItem}>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                </select>
                <div>Currency</div>
                <MyTickers tickers={myCurrentForex} myProfit={myYearProfit.forex} type='forex' currency={currency} />
                <div>Stocks</div>
                <MyTickers tickers={myCurrentStock} myProfit={myYearProfit.stock} type='stock' currency={currency} />
                <div>Funds</div>
                <MyTickers tickers={myCurrentPif} myProfit={myYearProfit.pif} type='pif' currency={currency} />
                <MyTickers tickers={myCurrentEtf} myProfit={myYearProfit.etf} type='etf' currency={currency} />
                <div>Bonds</div>
                <MyTickers tickers={myCurrentBonds} myProfit={myYearProfit.bonds} type='bonds' currency={currency} />
                <h1>{auth.currentUser ? auth.currentUser.email : ''}</h1>
            </div>
            <div className={classes.rightPart}>
                <div className={classes.chart}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={portfolioRelProfit}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={classes.portfolioSummaryContainer}>
                    <h3>Portfolio summary</h3>
                    <div className={classes.portfolioSummary}>
                        <div className={classes.portfolioSummaryHeaders}>
                            <span>Portfolio total, &#8381;</span>
                            <span>Profit abs, &#8381;</span>
                            <span>Profit rel, &#8381;</span>
                            <span>Portfolio total, $</span>
                            <span>Profit abs, $</span>
                            <span>Profit rel, $</span>
                            <span>Portfolio total, &euro;</span>
                            <span>Profit abs, &euro;</span>
                            <span>Profit rel, &euro;</span>
                        </div>
                        <div className={classes.portfolioSummaryValues}>
                            <span><b>{myPortfolioCost ? (+myPortfolioCost.rubGrandTotal).toFixed(2) : ''}, &#8381;</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubAbs).toFixed(2) : ''}, &#8381;</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitRubRel).toFixed(2) : ''}, %</b></span>
                            <span><b>{myPortfolioCost ? (+myPortfolioCost.usdGrandTotal).toFixed(2) : ''}, $</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdAbs).toFixed(2) : ''}, $</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitUsdRel).toFixed(2) : ''}, %</b></span>
                            <span><b>{myPortfolioCost ? (+myPortfolioCost.eurGrandTotal).toFixed(2) : ''}, &euro;</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurAbs).toFixed(2) : ''}, &euro;</b></span>
                            <span><b>{yearPortfolioProfit ? (+yearPortfolioProfit.yearProfitEurRel).toFixed(2) : ''}, %</b></span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
const ProfilePure = React.memo(Profile);
export default ProfilePure;