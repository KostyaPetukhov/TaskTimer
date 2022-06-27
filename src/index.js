import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';

import './index.css';
import store from './redux/store';
import MainPage from './components/MainPage';
import TasksTable from './components/TasksTable';
import TaskChart from './components/TasksChart';
import TaskInfo from './components/TaskInfo';

const theme = createTheme({
	palette: {
		primary: {
			main: '#314cc5',
		},
		secondary: pink,
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={<Navigate to='tasks/log' replace />}
						/>
						<Route path='tasks/' element={<MainPage />}>
							<Route index element={<TasksTable />} />
							<Route path='log' element={<TasksTable />} />
							<Route path='chart' element={<TaskChart />} />
						</Route>
						<Route path='tasks/:id' element={<TaskInfo />} />
						<Route
							path='*'
							element={<Navigate to='tasks/log' replace />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
