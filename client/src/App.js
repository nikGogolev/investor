import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Greeting from './Greeting'

import SearchList from './SearchList'
import MyList from './MyList'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import {
 ThemeProvider,
 createTheme,
} from "@material-ui/core/styles";

let url = 'https://api.bcs.ru/udfdatafeed/v1/history?symbol=gazp&resolution=60&from=1450772216&to=1450858616'

url = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=rur&resolution=1440&from=${(+(new Date(2021, 8, 1, 0)))/1000}&to=${(+(new Date(2021, 8, 1,23)))/1000}`;

const mainTheme = createTheme({
 palette: {
   primary: {
     main: "#708238",
   },
   secondary: {
     main: "#0098FF",
   },
 },
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 10px',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
	
	const classes = useStyles();
	
	const [ticker, setTicker] = useState('');
	const [quantity, setQuantity] = useState('');
	const [date, setDate] = useState('');
	const [cost, setCost] = useState('');
	const [total, setTotal] = useState('');
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [myList, setMyList] = useState([]);
	
	
	const handleTicker = (event) => {
		setTicker(event.target.value);
	};
	
	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};
	
	const handleDate = (event) => {
		setDate(event.target.value);
	};
	
	const handleSearch = (event) => {
		setSearch(event.target.value);
		url = `https://api.bcs.ru/udfdatafeed/v1/search?query=${event.target.value}&limit=10`;
		fetch(url)
            .then(result => result.json())
			.then(data => {
				let temp = [];
				data.forEach((item, i) => {
					temp.push({ticker: item.symbol,
								descr: item.description,
								classcode: item.classcode});
				});
				setSearchResult(temp);
			})
            .catch(error => {
                console.log(error);
            })
			
	};
	
	const getJson = (url) => {
            return fetch(url)
                .then(result => {
					return result.json()})
                .catch(error => {
                    console.log(error);
                })
        };
    const postJson = (url, data) => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
			.then(result => result.json())
            .catch(error => {
                console.log(error);
            });
        };
    const putJson = (url, data) => {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        };
    const deleteJson = (url, data) => {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        };
	
	/*
	SEARCH
	https://api.bcs.ru/udfdatafeed/v1/search?query=${query}&limit=10&fulldescription=on
	*/
	
	/*
	INFO
	https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=${ticker}
	*/
	
	/*
	HISTORY
	https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date)))/1000}&to=${(+(new Date(date))+82800000)/1000}
	*/

	const addTicker = (event) => {
		let dbItem = {};
		event.preventDefault();
		url = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=${ticker}&resolution=d&from=${(+(new Date(date)))/1000}&to=${(+(new Date(date))+82800000)/1000}`;
		getJson(`/db/getItem/${ticker}/${date}`)
		.then(data => {
			if (data.result === 0) {
				fetch(url)
				.then(result => result.json())
				.then(data => {
					dbItem[date] = {
						ticker: ticker,
						cost: data.c[0],
						quantity: quantity,
						total: data.c[0]*quantity
					};
					postJson(`/db/postItem/${ticker}/${date}`, dbItem)
					.then(
						setTimeout(() => getJson(`/db/getItem/${ticker}/${date}`)
							.then(data => {
								setCost(data.cost);
								setTotal(data.cost*data.quantity);
								setMyList([...myList, {ticker:data.ticker, quantity: data.quantity, cost: data.cost, total: data.cost*data.quantity, date: date}]);
							})
							.catch(error => {
								console.log(error);
							})
						,100)
					)
					.catch(error => {
						console.log(error);
					});
				})
				.catch(error => {
					console.log(error);
				})
			}
			else {
				console.log('Есть такой');
			}
		})
		.catch(error => {
			console.log(error);
		});
		
	};
	
	const submitTicker = (searchedTicker) => {
		setTicker(searchedTicker);
	}

  return (
    <div className="App main-container">
		<MyList myList={myList}/>
		<form action="" onSubmit={addTicker} className="form" label="Ticker">
			<input type="text" disabled value={ticker} onChange={handleTicker} required></input>
			<input type="number" value={quantity} onChange={handleQuantity} required></input>
			<input type="date" value={date} onChange={handleDate} required></input>
			<input type="submit" className="form-submit" value="Add"></input>
			<p>{cost}</p>
			<p>{total}</p>
		</form>
		<input type="text" value={search} onChange={handleSearch}></input>
			<SearchList searchResult={searchResult} submitTicker={submitTicker}/>
	</div>
  );
}

export default App;
