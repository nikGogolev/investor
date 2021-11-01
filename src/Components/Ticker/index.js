import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

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
		width: '100px',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid black',
		'&:last-child': {
			borderRight: '1px solid black'
		}
	},
    tickerHeader: {
        width:'170px',
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
	green: {
		backgroundColor: '	#66CC66',
	},
	red: {
		backgroundColor: '#FF6666',
	},
}));



function Ticker(props) {

    const lastDate = Object.keys(props.ticker.data)[Object.keys(props.ticker.data).length - 1];

	const [sumProfitCurrencyAbs, setSumProfitCurrencyAbs] = useState(0);
	const [sumProfitCurrencyRel, setSumProfitCurrencyRel] = useState(1);
	const [sumProfitRubAbs, setSumProfitRubAbs] = useState(0);
	const [sumProfitRubRel, setSumProfitRubRel] = useState(1);

	useEffect(() => {
		let sumProfitCurrencyAbsTemp = 0;
		let sumProfitCurrencyRelTemp = 1;
		let sumProfitRubAbsTemp = 0;
		let sumProfitRubRelTemp = 1;
		Object.values(props.ticker.data).forEach((date) => {
			sumProfitCurrencyAbsTemp += +date.profitCurrencyAbs;
			sumProfitCurrencyRelTemp *= 1 + date.profitCurrencyRel/100;
			sumProfitRubAbsTemp += +date.profitRubAbs;
			sumProfitRubRelTemp *= 1 + date.profitRubRel/100;
		});
		sumProfitCurrencyRelTemp = (sumProfitCurrencyRelTemp - 1) * 100;
		sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;

		setSumProfitCurrencyAbs(sumProfitCurrencyAbsTemp);
		setSumProfitCurrencyRel(sumProfitCurrencyRelTemp);
		setSumProfitRubAbs(sumProfitRubAbsTemp);
		setSumProfitRubRel(sumProfitRubRelTemp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = useStyles();

	return (
		<div className={classes.tickerTable}>
            <div className={classes.tickerHeader}>
                <p className={classes.tickerDateCell}>Дата</p>
				<p className={classes.tickerDateCell}>Количество</p>
				<p className={classes.tickerDateCell}>Стоимость</p>
				<p className={classes.tickerDateCell}>Общая стоимость</p>
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>Стоимость в Р</p> : '')}
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>Общая стоимость в Р</p> : '')}
				<p className={classes.tickerDateCell}>Доходность, абс</p>
				<p className={classes.tickerDateCell}>Доходность, %</p>
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>Доходность в Р, абс</p> : '')}
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>Доходность в Р, %</p> : '')}
            </div>
			{Object.values(props.ticker.data).map((date, i) =>
				<div key={date.ticker + Object.keys(props.ticker.data)[i]} className={classes.tickerDate}>
					<p className={classes.tickerDateCell}>{Object.keys(props.ticker.data)[i]}</p>
					<p className={classes.tickerDateCell}>{date.quantity}</p>
					<p className={classes.tickerDateCell}>{date.cost}</p>
					<p className={classes.tickerDateCell}>{date.total}</p>
					{((date.currency !== 'rur') ? <p className={classes.tickerDateCell}>{date.roubleCost}</p> : '')}
					{((date.currency !== 'rur') ? <p className={classes.tickerDateCell}>{date.roubleTotal}</p> : '')}
					<p className={classes.tickerDateCell + ' ' + (date.profitCurrencyAbs >= 0 ? classes.green : classes.red)}>{date.profitCurrencyAbs + ' ' + date.currency}</p>
					<p className={classes.tickerDateCell + ' ' + (date.profitCurrencyAbs >= 0 ? classes.green : classes.red)}>{date.profitCurrencyRel + ' %'}</p>
					{((date.currency !== 'rur') ? <p className={classes.tickerDateCell + ' ' + (date.profitRubAbs >= 0 ? classes.green : classes.red)}>{date.profitRubAbs + ' Р'}</p> : '')}
					{((date.currency !== 'rur') ? <p className={classes.tickerDateCell + ' ' + (date.profitRubAbs >= 0 ? classes.green : classes.red)}>{date.profitRubRel + ' %'}</p> : '')}
				</div>
	    	)}
			<div className={classes.tickerHeader}>
                <p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>-</p> : '')}
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell}>-</p> : '')}
				<p className={classes.tickerDateCell + ' ' + (sumProfitCurrencyAbs >= 0 ? classes.green : classes.red)}>{sumProfitCurrencyAbs.toFixed(2) + ' ' + props.ticker.data[lastDate].currency}</p>
				<p className={classes.tickerDateCell + ' ' + (sumProfitCurrencyAbs >= 0 ? classes.green : classes.red)}>{sumProfitCurrencyRel.toFixed(2) + ' %'}</p>
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubAbs.toFixed(2) + ' Р'}</p> : '')}
				{((props.ticker.data[lastDate].currency !== 'rur') ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubRel.toFixed(2) + ' %'}</p> : '')}
            </div>
    	</div>
	);
}

export default Ticker;