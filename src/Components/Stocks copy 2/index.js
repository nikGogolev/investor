import React from 'react';
import './MyList.css';

import { makeStyles } from '@material-ui/core/styles';

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
		width: '50px',
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

function MyList(props) {
	const classes = useStyles();

	const tickers = Object.keys(props.stocks || {});
	console.log(tickers);

	
	return (
		<div className={"my-list-container"}>
			<div className={classes.table}>
				{tickers.map((ticker) => 
					<div key={ticker} className={classes.ticker}>
						<div className={classes.tickerName}>
							<p>{ticker}</p>
						</div>
						<div className={classes.tickerTable}>
							{Object.keys(props.stocks[ticker]).map((date) => 
								<div key={props.stocks[ticker][date].ticker+date} className={classes.tickerDate}>
									<p className={classes.tickerDateCell}>{date}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker][date].quantity}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker][date].cost}</p>
									<p className={classes.tickerDateCell}>{props.stocks[ticker][date].total}</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MyList;
