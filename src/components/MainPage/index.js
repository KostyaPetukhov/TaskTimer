import { Outlet } from 'react-router-dom';

import Tab from '../Tab';
import Timer from '../Timer';

const MainPage = () => {
	return (
		<>
			<Timer />
			<Tab />
			<Outlet />
		</>
	);
};

export default MainPage;
