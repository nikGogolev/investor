import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';
import { autoCompleteTickerWithSaga } from '../../store/actions/autoComplete';

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

	const tickers = Object.keys(props.tickers || {});

	useEffect(() => {
		tickers.forEach((ticker, i) =>  {
			const lastDate = Object.keys(props.tickers[ticker].data)[Object.keys(props.tickers[ticker].data).length - 1];
			if (+(new Date(lastDate)) < (+(new Date()) - 604800000)) {
				dispatch(autoCompleteTickerWithSaga(ticker, new Date(+(new Date(lastDate)) + 604800000), props.tickers[ticker].data[lastDate].quantity, props.tickers[ticker].data[lastDate].currency));
			}
		} )
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.tickers]);

	return (
		<div>
			<div className={classes.table}>
				{tickers.map((ticker) =>
					<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
							<p>{props.tickers[ticker].description ? props.tickers[ticker].description.description : ''}</p>
							<button onClick={() => delTicker(ticker, props.type)}>del</button>
						</div>
						<div className={classes.tickerTable}>
							{Object.keys(props.tickers[ticker].data).map((date) =>
								<div key={props.tickers[ticker].data[date].ticker + date} className={classes.tickerDate}>
									<p className={classes.tickerDateCell}>{date}</p>
									<p className={classes.tickerDateCell}>{props.tickers[ticker].data[date].quantity}</p>
									<p className={classes.tickerDateCell}>{props.tickers[ticker].data[date].cost}</p>
									<p className={classes.tickerDateCell}>{props.tickers[ticker].data[date].total}</p>
									{props.tickers[ticker].description ? ((props.tickers[ticker].description.currency !== 'rur') ? <p className={classes.tickerDateCell}>{props.tickers[ticker].data[date].roubleCost}</p> : '') : ''}
									{props.tickers[ticker].description ? ((props.tickers[ticker].description.currency !== 'rur') ? <p className={classes.tickerDateCell}>{props.tickers[ticker].data[date].roubleCost}</p> : '') : ''}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Tickers;