import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';
import Ticker from '../Ticker';
import { Link, Outlet } from 'react-router-dom';
import { HOMEPAGE } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
	table: {
		maxWidth: '100%'
	},
	ticker: {
		display: 'flex',
		flexDirection: 'row',
		border: '1px solid black',
		margin: '10px',
		overflow: 'auto'
	},
	description: {
		margin: '5px'
	},
	tickerName: {
		display: 'flex',
		flexDirection: 'column',
		width: '110px',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '5px',
		flexShrink: '0'
	},
}));

function Tickers(props) {
	const dispatch = useDispatch();

	const delTicker = (ticker, marketType) => {
		const answer = window.confirm('Are you sure you want to delete this?');
		if (answer) {
			dispatch(delTickerWithSaga(ticker, marketType));
		};

	};

	const classes = useStyles();

	const filteredTickers = Object.values(props.filteredTickers || {});
	const filteredTickersNames = Object.keys(props.filteredTickers || {});

	return (
		<div>
			<div className={classes.table}>
				{filteredTickers.map((ticker, i) =>
					(Object.keys(ticker.data).length !== 0) && (<div key={filteredTickersNames[i]} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p className={classes.description}><Link to={`${HOMEPAGE}/${filteredTickersNames[i]}`} key={filteredTickersNames[i]}>{filteredTickersNames[i]}</Link></p>
							<p className={classes.description}>{ticker.data[Object.keys(ticker.data)[Object.keys(ticker.data).length - 1]].description}</p>
							<p className={classes.description}>{ticker.data[Object.keys(ticker.data)[Object.keys(ticker.data).length - 1]].currency}</p>
							<button onClick={() => delTicker(filteredTickersNames[i], props.type)}>del</button>
						</div>
						<Ticker ticker={ticker} currency={props.currency} type={props.type} />
					</div>)
				)}
			</div>
			<Outlet />
		</div>
	);
}
const TickersPure = React.memo(Tickers);
export default TickersPure;