import React, { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { ThemeProvider, makeStyles, createTheme } from '@material-ui/core/styles';

import Router from './Components/Router';
import { store } from './store/store';
import { persistor } from './store/store';

let url = 'https://api.bcs.ru/udfdatafeed/v1/history?symbol=gazp&resolution=60&from=1450772216&to=1450858616'

url = `https://api.bcs.ru/udfdatafeed/v1/history?symbol=rur&resolution=1440&from=${(+(new Date(2021, 8, 1, 0))) / 1000}&to=${(+(new Date(2021, 8, 1, 23))) / 1000}`;

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

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider theme={mainTheme}>
					<div className="App">
						<Router />
					</div>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
