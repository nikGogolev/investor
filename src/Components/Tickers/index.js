import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';

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

function Tickers(props) {
	const dispatch = useDispatch();

	const delTicker = (ticker, marketType) => {
		dispatch(delTickerWithSaga(ticker, marketType));
	};

	const classes = useStyles();

	const filteredTickers = Object.keys(props.filteredTickers || {});

	return (
		<div>
			<div className={classes.table}>
				{filteredTickers.map((ticker) =>
					(Object.keys(props.filteredTickers[ticker].data).length !== 0)&&(<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
							<p>{props.filteredTickers[ticker].data[Object.keys(props.filteredTickers[ticker].data)[Object.keys(props.filteredTickers[ticker].data).length - 1]].description}</p>
							<p>{props.filteredTickers[ticker].data[Object.keys(props.filteredTickers[ticker].data)[Object.keys(props.filteredTickers[ticker].data).length - 1]].currency}</p>
							<button onClick={() => delTicker(ticker, props.type)}>del</button>
						</div>
						<div className={classes.tickerTable}>
							{Object.keys(props.filteredTickers[ticker].data).map((date) =>
								<div key={props.filteredTickers[ticker].data[date].ticker + date} className={classes.tickerDate}>
									<p className={classes.tickerDateCell}>{date}</p>
									<p className={classes.tickerDateCell}>{props.filteredTickers[ticker].data[date].quantity}</p>
									<p className={classes.tickerDateCell}>{props.filteredTickers[ticker].data[date].cost}</p>
									<p className={classes.tickerDateCell}>{props.filteredTickers[ticker].data[date].total}</p>
									{((props.filteredTickers[ticker].data[date].currency !== 'rur') ? <p className={classes.tickerDateCell}>{props.filteredTickers[ticker].data[date].roubleCost}</p> : '')}
									{((props.filteredTickers[ticker].data[date].currency !== 'rur') ? <p className={classes.tickerDateCell}>{props.filteredTickers[ticker].data[date].roubleTotal}</p> : '')}
								</div>
							)}
						</div>
					</div>)
				)}
			</div>
		</div>
	);
}

export default Tickers;