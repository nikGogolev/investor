import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	searchListContainer: {
		maxWidth: '500px',
	},
	searchList: {
		listStyle: 'none',
		padding: '0',
		margin: '0',
	},
	addButton: {
		border: 'none',
		'&:hover': {
			color: '#fff',
			backgroundColor: '#222',
		}
	},
}));

function SearchList(props) {
	const classes = useStyles();

	return (
		<div className={classes.searchListContainer}>
			<ul className={classes.searchList}>
				{props.searchResult.map((item) =>
					<li key={item.ticker + item.classcode}><button onClick={(event) => props.submitTicker(event, item.ticker)} className={classes.addButton}>{item.descr}</button></li>
				)}
			</ul>
		</div>
	);
}

export default SearchList;
