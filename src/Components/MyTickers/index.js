import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';

const useStyles = makeStyles((theme) => ({
	table: {
		maxWidth: '400px'
	},
	ticker: {
		display: 'flex',
		flexDirection: 'row',
		border: '1px solid black',
		margin: '10px',
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
	tickerData: {
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid black',
        flexGrow: '1'
	},
	tickerDataCell: {
		borderBottom: '1px solid black',
		margin: '0',
		padding: '5px',
		'&:last-child': {
			borderBottom: 'none'
		}
	},
    tickerHeaders: {
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid black',
        flexGrow: '0'
	},
	tickerHeader: {
		borderBottom: '1px solid black',
		margin: '0',
		padding: '5px',
		'&:last-child': {
			borderBottom: 'none'
		}
	},
}));

function MyTickers(props) {
	const dispatch = useDispatch();

	const delTicker = (ticker, marketType) => {
		dispatch(delTickerWithSaga(ticker, marketType));
	};

	const classes = useStyles();

	const tickers = Object.keys(props.tickers || {});

	return (
		<div>
			<div className={classes.table}>
				{tickers.map((ticker) =>
					<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
                            <p>{props.tickers[ticker].description}</p>
							<button onClick={() => delTicker(ticker, props.type)}>del</button>
						</div>
                        <div className={classes.tickerHeaders}>
							<p className={classes.tickerHeader}>Количество</p>
							<p className={classes.tickerHeader}>Цена,  {(((props.currency === 'rur') && <span>&#8381;</span>) || ((props.currency === 'usd') && <span>$</span>) || ((props.currency === 'eur') && <span>&euro;</span>))}</p>
							<p className={classes.tickerHeader}>Сумма,  {(((props.currency === 'rur') && <span>&#8381;</span>) || ((props.currency === 'usd') && <span>$</span>) || ((props.currency === 'eur') && <span>&euro;</span>))}</p>
						</div>
						<div className={classes.tickerData}>
							<p className={classes.tickerDataCell}>{props.tickers[ticker].quantity}</p>
							<p className={classes.tickerDataCell}>{(((props.currency === 'rur') && <span>{props.tickers[ticker].RUBCost}</span>) || ((props.currency === 'usd') && <span>{props.tickers[ticker].USDCost}</span>) || ((props.currency === 'eur') && <span>{props.tickers[ticker].EURCost}</span>))}</p>
							<p className={classes.tickerDataCell}>{(((props.currency === 'rur') && <span>{props.tickers[ticker].RUBTotal}</span>) || ((props.currency === 'usd') && <span>{props.tickers[ticker].USDTotal}</span>) || ((props.currency === 'eur') && <span>{props.tickers[ticker].EURTotal}</span>))}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MyTickers;