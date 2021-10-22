import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { delTickerWithSaga } from '../../store/actions/delTicker';

const useStyles = makeStyles((theme) => ({
	button: {
		position: 'absolute',
		top: '0',
		right: '0',
	},
	root: {
		'& > *': {
			color: theme.palette.primary.main,
		},
	},
	table: {

	},
	ticker: {
		display: 'flex',
		flexDirection: 'row',
		border: '1px solid black',
		margin: '10px'
	},
	tickerName:{
		display: 'flex',
		flexDirection: 'column',
		width: '110px',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '5px'
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

function Pifs(props) {
	const dispatch = useDispatch();

	const delTicker = (ticker, marketType) => {
		dispatch(delTickerWithSaga(ticker, marketType));
	};

	const classes = useStyles();

	const tickers = Object.keys(props.pifs || {});
	
	return (
		<div>
			<div className={classes.table}>
				{tickers.map((ticker) => 
					<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
							<p>{props.pifs[ticker].description}</p>
							<button onClick={() => delTicker(ticker, 'pifs')}>del</button>
						</div>
						<div className={classes.tickerTable}>
							{Object.keys(props.pifs[ticker].data).map((date) => 
								<div key={props.pifs[ticker].data[date].ticker+date} className={classes.tickerDate}>
									<p className={classes.tickerDateCell}>{date}</p>
									<p className={classes.tickerDateCell}>{props.pifs[ticker].data[date].quantity}</p>
									<p className={classes.tickerDateCell}>{props.pifs[ticker].data[date].cost}</p>
									<p className={classes.tickerDateCell}>{props.pifs[ticker].data[date].total}</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Pifs;