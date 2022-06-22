import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';

import './index.css';
import App from './App';
import store from './redux/store';

const theme = createTheme({
	palette: {
		secondary: pink,
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
