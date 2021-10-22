import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import Router from './Components/Router';
import { store } from './store/store';
import { persistor } from './store/store';

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

function App() {

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider theme={mainTheme}>
						<Router />
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;