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
		width: '200px',
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

	const [sumProfitUsdAbs, setSumProfitUsdAbs] = useState(0);
	const [sumProfitUsdRel, setSumProfitUsdRel] = useState(1);
	const [sumProfitRubAbs, setSumProfitRubAbs] = useState(0);
	const [sumProfitRubRel, setSumProfitRubRel] = useState(1);
	const [sumProfitEurAbs, setSumProfitEurAbs] = useState(0);
	const [sumProfitEurRel, setSumProfitEurRel] = useState(1);

	useEffect(() => {
		let sumProfitUsdAbsTemp = 0;
		let sumProfitUsdRelTemp = 1;
		let sumProfitRubAbsTemp = 0;
		let sumProfitRubRelTemp = 1;
		let sumProfitEurAbsTemp = 0;
		let sumProfitEurRelTemp = 1;
		Object.values(props.ticker.data).forEach((date) => {
			sumProfitUsdAbsTemp += +date.profitUsdAbs;
			sumProfitUsdRelTemp *= 1 + date.profitUsdRel / 100;
			sumProfitRubAbsTemp += +date.profitRubAbs;
			sumProfitRubRelTemp *= 1 + date.profitRubRel / 100;
			sumProfitEurAbsTemp += +date.profitEurAbs;
			sumProfitEurRelTemp *= 1 + date.profitEurRel / 100;
		});
		sumProfitUsdRelTemp = (sumProfitUsdRelTemp - 1) * 100;
		sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;
		sumProfitEurRelTemp = (sumProfitEurRelTemp - 1) * 100;

		setSumProfitUsdAbs(sumProfitUsdAbsTemp);
		setSumProfitUsdRel(sumProfitUsdRelTemp);
		setSumProfitRubAbs(sumProfitRubAbsTemp);
		setSumProfitRubRel(sumProfitRubRelTemp);
		setSumProfitEurAbs(sumProfitEurAbsTemp);
		setSumProfitEurRel(sumProfitEurRelTemp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	const classes = useStyles();

	return (
		<div className={classes.tickerTable}>
			<div className={classes.tickerHeader}>
				<p className={classes.tickerDateCell}>Дата</p>
				<p className={classes.tickerDateCell}>Количество</p>
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Стоимость в $</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Общая стоимость в $</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Стоимость в ₽</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Общая стоимость в ₽</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Стоимость в €</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Общая стоимость в €</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Доходность в $, абс</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Доходность в $, %</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Доходность в ₽, абс</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Доходность в ₽, %</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Доходность в €, абс</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Доходность в €, %</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Дивиденды/Купоны в $, абс</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Дивиденды/Купоны в ₽, абс</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Дивиденды/Купоны в €, абс</p> : '')}

			</div>
			{Object.values(props.ticker.data).map((date, i) =>
				<div key={date.ticker + Object.keys(props.ticker.data)[i]} className={classes.tickerDate}>
					<p className={classes.tickerDateCell}>{Object.keys(props.ticker.data)[i]}</p>
					<p className={classes.tickerDateCell}>{date.quantity}</p>
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>{(+date.usdCost).toFixed(4)}</p> : '')}
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>{(+date.usdTotal).toFixed(2)}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>{(+date.rubCost).toFixed(4)}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>{(+date.rubTotal).toFixed(2)}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>{(+date.eurCost).toFixed(4)}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>{(+date.eurTotal).toFixed(2)}</p> : '')}
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (date.profitUsdAbs >= 0 ? classes.green : classes.red)}>{(+date.profitUsdAbs).toFixed(2) + ' $'}</p> : '')}
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (date.profitUsdAbs >= 0 ? classes.green : classes.red)}>{(+date.profitUsdRel).toFixed(2) + ' %'}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (date.profitRubAbs >= 0 ? classes.green : classes.red)}>{(+date.profitRubAbs).toFixed(2) + ' ₽'}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (date.profitRubAbs >= 0 ? classes.green : classes.red)}>{(+date.profitRubRel).toFixed(2) + ' %'}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (date.profitEurAbs >= 0 ? classes.green : classes.red)}>{(+date.profitEurAbs).toFixed(2) + ' €'}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (date.profitEurAbs >= 0 ? classes.green : classes.red)}>{(+date.profitEurRel).toFixed(2) + ' %'}</p> : '')}
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>{(+date.couponOrDividendUsd).toFixed(2)}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>{(+date.couponOrDividendRub).toFixed(2)}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>{(+date.couponOrDividendEur).toFixed(2)}</p> : '')}

				</div>
			)}
			<div className={classes.tickerDate}>
				<p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				<p className={classes.tickerDateCell}>-</p>
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (sumProfitUsdAbs >= 0 ? classes.green : classes.red)}>{sumProfitUsdAbs.toFixed(2) + ' $'}</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (sumProfitUsdAbs >= 0 ? classes.green : classes.red)}>{sumProfitUsdRel.toFixed(2) + ' %'}</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubAbs.toFixed(2) + ' ₽'}</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubRel.toFixed(2) + ' %'}</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitEurAbs >= 0 ? classes.green : classes.red)}>{sumProfitEurAbs.toFixed(2) + ' €'}</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitEurAbs >= 0 ? classes.green : classes.red)}>{sumProfitEurRel.toFixed(2) + ' %'}</p> : '')}
			</div>
		</div>
	);
}
const TickerPure = React.memo(Ticker);
export default TickerPure;