import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';

import ChartDataHelper from '../../helpers/chartDataHelper';

const useStyles = makeStyles({
	chart: {
		width: 800,
		fontSize: 20,
	},
});

const TasksChart = () => {
	const classes = useStyles();

	const tasks = useSelector((state) => state.tasks.data);

	const lastDay = Date.now() - 86400000;

	const ourTasks = tasks.filter((task) => task.startTime > lastDay);

	const options = {
		chart: {
			type: 'column',
		},
		credits: {
			enabled: false,
		},
		colors: ['#314cc5'],
		title: '',
		xAxis: {
			categories: [
				0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
				18, 19, 20, 21, 22, 23,
			],
		},
		yAxis: {
			title: {
				text: '',
			},
		},
		series: [
			{
				name: 'Minutes in this hours',
				id: 'hours',
				data: ChartDataHelper(ourTasks),
			},
		],
	};

	return (
		<div id='container' className={classes.chart}>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default TasksChart;
