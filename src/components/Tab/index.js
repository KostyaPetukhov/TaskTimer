import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabComponent = () => {
	const navigate = useNavigate();

	const urlElements = useLocation().pathname.split('/');
	const path = urlElements[2];

	const [selectedTab, setSelectedTab] = useState(path);

	const handleChange = (event, newValue) => {
		navigate(`/tasks/${newValue}`, { replace: true });
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
					<Tab label='TASKS LOG' value='log' />
					<Tab label='TASKS CHART' value='chart' />
				</Tabs>
			</AppBar>
		</div>
	);
};

export default TabComponent;
