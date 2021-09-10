import React from 'react';
import './SearchList.css';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
	
  
}));

function SearchList(props) {
	const classes = useStyles();
	
	return (
		<div className={"search-list-container"}>
			<ul className="search-list">
				{props.searchResult.map((item) => 
					<li key={item.ticker+item.classcode}><button onClick={() => props.submitTicker(item.ticker)} className="add-button">{item.descr}</button></li>
				)}
			</ul>
		</div>
	);
}

export default SearchList;
