import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabComponent = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const urlElements = pathname.split('/');
	const path = urlElements[2];

	const tabNameToIndex = {
		0: 'log',
		1: 'chart',
	};

	const indexToTabName = {
		log: 0,
		chart: 1,
	};

	const [selectedTab, setSelectedTab] = useState(indexToTabName[path]);

	const handleChange = (event, newValue) => {
		navigate(`/tasks/${tabNameToIndex[newValue]}`, { replace: true });
		setSelectedTab(newValue);
	};

	return (
		<div>
			<AppBar
				position='static'
				style={{ width: 800, backgroundColor: '#35baf6' }}
			>
				<Tabs
					value={selectedTab}
					onChange={handleChange}
					indicatorColor='secondary'
					textColor='inherit'
					variant='fullWidth'
				>
					<Tab label='TASKS LOG' />
					<Tab label='TASKS CHART' />
				</Tabs>
			</AppBar>
		</div>
	);
};

export default TabComponent;
