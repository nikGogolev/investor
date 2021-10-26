import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';
import { autoCompleteStockTickerWithSaga } from '../../store/actions/autoComplete';

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
	tickerName: {
		display: 'flex',
		flexDirection: 'column',
		width: '110px',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '5px',
		flexShrink: '0'
	},
	tickerTable: {
		display: 'flex',
		flexDirection: 'row'
	},
	tickerDate: {
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid black',
		'&:last-child': {
			borderRight: '1px solid black'
		}
	},
	tickerDateCell: {
		borderBottom: '1px solid black',
		margin: '0',
		padding: '5px',
		'&:last-child': {
			borderBottom: 'none'
		}
	},
}));

function Stocks(props) {
	const dispatch = useDispatch();

	const delTicker = (ticker, marketType) => {
		dispatch(delTickerWithSaga(ticker, marketType));
	};

	const classes = useStyles();

	const tickers = Object.keys(props.stocks || {});

	useEffect(() => {
		tickers.forEach((ticker, i) =>  {
			const lastDate = Object.keys(props.stocks[ticker].data)[Object.keys(props.stocks[ticker].data).length - 1];
			if (+(new Date(lastDate)) < (+(new Date()) - 604800000)) {
				dispatch(autoCompleteStockTickerWithSaga(ticker, new Date(+(new Date(lastDate)) + 604800000), props.stocks[ticker].data[lastDate].quantity, props.stocks[ticker].data[lastDate].currency));
			}
		} )
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.stocks]);

	return (
		<div>
			<div className={classes.table}>
				{tickers.map((ticker) =>
					<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
							<p>{props.stocks[ticker].description}</p>
							<button onClick={() => delTicker(ticker, 'stocks')}>del</button>
						</div>
						<div className={classes.tickerTable}>
							{Object.keys(props.stocks[ticker].data).map((date) =>
								<div key={props.stocks[ticker].data[date].ticker + date} className={classes.tickerDate}>
									<p className={classes.tickerDateCell}>{date}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker].data[date].quantity}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker].data[date].cost}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker].data[date].total}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker].data[date].currency}</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Stocks;