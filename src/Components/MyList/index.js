import React from 'react';
import './MyList.css';

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

function MyList(props) {
	const classes = useStyles();
	
	return (
		<div className={"my-list-container"}>
			<ul className="my-list">
				{props.myList.map((item) => 
					<li key={item.ticker+item.date}>
						<p className="text">{item.ticker}</p>
						<p className="text">{item.quantity}</p>
						<p className="text">{item.cost}</p>
						<p className="text">{item.total}</p>
					</li>
				)}
			</ul>
		</div>
	);
}

export default MyList;
