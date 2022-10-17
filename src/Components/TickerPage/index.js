import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { getTickerInfo } from '../../Functions/functions';
import { useSelector } from 'react-redux';
import { getAlltickers } from '../../store/selectors/tickersSelectors';

const useStyles = makeStyles((theme) => ({
    header: {
        margin: '0 auto'
    },
    chart: {
        width: '1000px',
        height: '500px'
    },

}));

function TickerPage() {

    const classes = useStyles();

    const { ticker } = useParams();

    const [tickerType, setTickerType] = useState();
    const [tickerDescription, setTickerDescription] = useState();
    const [tickerCost, setTickerCost] = useState();
    const [tickerCosts, setTickerCosts] = useState([]);
    const [rubCosts, setRubCosts] = useState([]);
    const [usdCosts, setUsdCosts] = useState([]);
    const [eurCosts, setEurCosts] = useState([]);
    const [currency, setCurrency] = useState('rur');
    const [profitRel, setProfitRel] = useState(0);

    const tickers = useSelector(getAlltickers);

    useEffect(() => {
        (async () => {
            const tickerInfo = await getTickerInfo(ticker);
            setTickerType(tickerInfo.type);
            setTickerDescription(tickerInfo.description);
            if (tickerInfo.noData) {
                setTickerCost('No data');
            } else {
                setTickerCost(tickerInfo.cost);
            };

        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const neddedTicker =
            tickers.bonds[ticker] ? tickers.bonds[ticker].data :
                tickers.stock[ticker] ? tickers.stock[ticker].data :
                    tickers.etf[ticker] ? tickers.etf[ticker].data :
                        tickers.pif[ticker] ? tickers.pif[ticker].data :
                            tickers.forex[ticker] ? tickers.forex[ticker].data :
                                {};

        setRubCosts(Object.entries(neddedTicker).map((current, i) => {
            return { date: current[0], value: current[1].rubCost };
        }));
        setUsdCosts(Object.entries(neddedTicker).map((current, i) => {
            return { date: current[0], value: current[1].usdCost };
        }));
        setEurCosts(Object.entries(neddedTicker).map((current, i) => {
            return { date: current[0], value: current[1].eurCost };
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCurrency = (event) => {
        setCurrency(event.target.value);
    };

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (currency) {
            case 'rur':
                setTickerCosts(rubCosts);
                rubCosts.length && setProfitRel(((rubCosts[rubCosts.length - 1].value - rubCosts[0].value) / rubCosts[0].value * 100).toFixed(2));
                break;
            case 'usd':
                setTickerCosts(usdCosts);
                usdCosts.length && setProfitRel(((usdCosts[usdCosts.length - 1].value - usdCosts[0].value) / usdCosts[0].value * 100).toFixed(2));
                break;
            case 'eur':
                setTickerCosts(eurCosts);
                eurCosts.length && setProfitRel(((eurCosts[eurCosts.length - 1].value - eurCosts[0].value) / eurCosts[0].value * 100).toFixed(2));
                break;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rubCosts, currency]);

    return (
        <div>
            <h2 className={classes.header}>{ticker}</h2>
            <p>{tickerType}</p>
            <p>{tickerDescription}</p>
            <p>{tickerCost}</p>
            <p>{profitRel} %</p>
            <select required onChange={handleCurrency} className={classes.chooseCurrency}>
                <option value='rur'>rur</option>
                <option value='usd'>usd</option>
                <option value='eur'>eur</option>
            </select>
            <div className={classes.chart}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={tickerCosts}
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
        </div>
    );
}

export default TickerPage;