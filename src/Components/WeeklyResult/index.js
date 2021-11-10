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
		flexDirection: 'row',
        margin: '10px',
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
        width:'321px',
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



function WeeklyResult(props) {

	const classes = useStyles();

    const [portfolioUsdTotal, setPortfolioUsdTotal] = useState(0);
    const [sumProfitUsdAbs, setSumProfitUsdAbs] = useState(0);
	const [sumProfitUsdRel, setSumProfitUsdRel] = useState(1);
    const [portfolioRubTotal, setPortfolioRubTotal] = useState(0);
	const [sumProfitRubAbs, setSumProfitRubAbs] = useState(0);
	const [sumProfitRubRel, setSumProfitRubRel] = useState(1);
    const [portfolioEurTotal, setPortfolioEurTotal] = useState(0);
	const [sumProfitEurAbs, setSumProfitEurAbs] = useState(0);
	const [sumProfitEurRel, setSumProfitEurRel] = useState(1);

	useEffect(() => {
        let portfolioUsdTotalTemp = 0;
		let sumProfitUsdAbsTemp = 0;
		let sumProfitUsdRelTemp = 1;
        let portfolioRubTotalTemp = 0;
		let sumProfitRubAbsTemp = 0;
		let sumProfitRubRelTemp = 1;
        let portfolioEurTotalTemp = 0;
		let sumProfitEurAbsTemp = 0;
		let sumProfitEurRelTemp = 1;
		Object.values(props.weeklyResult).forEach((date) => {
            portfolioUsdTotalTemp = +date.portfolioUsdTotal;
			sumProfitUsdAbsTemp += +date.portfolioUsdProfitAbs;
			sumProfitUsdRelTemp *= 1 + date.portfolioUsdProfitRel/100;
            portfolioRubTotalTemp = +date.portfolioRubTotal;
			sumProfitRubAbsTemp += +date.portfolioRubProfitAbs;
			sumProfitRubRelTemp *= 1 + date.portfolioRubProfitRel/100;
            portfolioEurTotalTemp = +date.portfolioEurTotal;
			sumProfitEurAbsTemp += +date.portfolioEurProfitAbs;
			sumProfitEurRelTemp *= 1 + date.portfolioEurProfitRel/100;
		});
		sumProfitUsdRelTemp = (sumProfitUsdRelTemp - 1) * 100;
		sumProfitRubRelTemp = (sumProfitRubRelTemp - 1) * 100;
		sumProfitEurRelTemp = (sumProfitEurRelTemp - 1) * 100;

        setPortfolioUsdTotal(portfolioUsdTotalTemp);
		setSumProfitUsdAbs(sumProfitUsdAbsTemp);
		setSumProfitUsdRel(sumProfitUsdRelTemp);
        setPortfolioRubTotal(portfolioRubTotalTemp);
		setSumProfitRubAbs(sumProfitRubAbsTemp);
		setSumProfitRubRel(sumProfitRubRelTemp);
        setPortfolioEurTotal(portfolioEurTotalTemp);
		setSumProfitEurAbs(sumProfitEurAbsTemp);
		setSumProfitEurRel(sumProfitEurRelTemp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	return (
		<div className={classes.tickerTable}>
            <div className={classes.tickerHeader}>
                <p className={classes.tickerDateCell}>Дата</p>
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Стоимость в $</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Доходность абс в $ </p> : '')}
                {(props.currency === 'usd' ? <p className={classes.tickerDateCell}>Доходность % в $ </p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Стоимость в ₽</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Доходность абс в ₽</p> : '')}
                {(props.currency === 'rur' ? <p className={classes.tickerDateCell}>Доходность % в ₽</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Стоимость в €</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Доходность абс в €</p> : '')}
                {(props.currency === 'eur' ? <p className={classes.tickerDateCell}>Доходность % в €</p> : '')}
            </div>
			{Object.values(props.weeklyResult).map((date, i) =>
				<div key={Object.keys(props.weeklyResult)[i]} className={classes.tickerDate}>
					<p className={classes.tickerDateCell}>{Object.keys(props.weeklyResult)[i]}</p>
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell}>{date.portfolioUsdTotal.toFixed(2) + ' $'}</p> : '')}
					{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioUsdProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioUsdProfitAbs.toFixed(2) + ' $'}</p> : '')}
                    {(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioUsdProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioUsdProfitRel.toFixed(2) + ' %'}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell}>{date.portfolioRubTotal.toFixed(2) + ' ₽'}</p> : '')}
					{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioRubProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioRubProfitAbs.toFixed(2) + ' ₽'}</p> : '')}
                    {(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioRubProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioRubProfitRel.toFixed(2) + ' %'}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell}>{date.portfolioEurTotal.toFixed(2) + ' €'}</p> : '')}
					{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioEurProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioEurProfitAbs.toFixed(2) + ' €'}</p> : '')}
                    {(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (date.portfolioEurProfitAbs >= 0 ? classes.green : classes.red)}>{date.portfolioEurProfitRel.toFixed(2) + ' %'}</p> : '')}
				</div>
	    	)}
            <div className={classes.tickerDate}>
				<p className={classes.tickerDateCell}>-</p>
                {(props.currency === 'usd' ? <p className={classes.tickerDateCell}>{portfolioUsdTotal.toFixed(2) + ' $'}</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (sumProfitUsdAbs >= 0 ? classes.green : classes.red)}>{sumProfitUsdAbs.toFixed(2) + ' $'}</p> : '')}
				{(props.currency === 'usd' ? <p className={classes.tickerDateCell + ' ' + (sumProfitUsdAbs >= 0 ? classes.green : classes.red)}>{sumProfitUsdRel.toFixed(2) + ' %'}</p> : '')}
                {(props.currency === 'rur' ? <p className={classes.tickerDateCell}>{portfolioRubTotal.toFixed(2) + ' ₽'}</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubAbs.toFixed(2) + ' ₽'}</p> : '')}
				{(props.currency === 'rur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitRubAbs >= 0 ? classes.green : classes.red)}>{sumProfitRubRel.toFixed(2) + ' %'}</p> : '')}
                {(props.currency === 'eur' ? <p className={classes.tickerDateCell}>{portfolioEurTotal.toFixed(2) + ' €'}</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitEurAbs >= 0 ? classes.green : classes.red)}>{sumProfitEurAbs.toFixed(2) + ' €'}</p> : '')}
				{(props.currency === 'eur' ? <p className={classes.tickerDateCell + ' ' + (sumProfitEurAbs >= 0 ? classes.green : classes.red)}>{sumProfitEurRel.toFixed(2) + ' %'}</p> : '')}
            </div>
    	</div>
	);
}
const WeeklyResultPure = React.memo(WeeklyResult);
export default WeeklyResultPure;