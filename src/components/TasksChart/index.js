import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import chartDataHelper from '../../helpers/chartDataHelper';
import generateTasksHelper from '../../helpers/generateTasksHelper';
import { useDispatch } from 'react-redux';
import { addTasks } from '../../redux/reducers/tasksSlice';

const useStyles = makeStyles({
	chart: {
		width: 800,
		fontSize: 20,
	},
	button: {
		margin: '0 10px 10px 10px',
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

const TasksChart = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [chart, setChart] = useState(new Array(24).fill(0));

	useEffect(() => {
		setChart(drawChart);
	}, []);

	const tasks = useSelector((state) => state.tasks.data);

	const lastDay = Date.now() - 86400000;

	const ourTasks = tasks.filter((task) => task.startTime > lastDay);

	const drawChart = () => {
		ourTasks.map((task) => chartDataHelper(task, chart));
	};

	const handleTaskGenerate = () => {
		const tasks = generateTasksHelper();
		dispatch(addTasks(tasks));
		navigate('/taskslog');
	};

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
				data: chart,
			},
		],
	};

	return (
		<div id='container' className={classes.chart}>
			<HighchartsReact highcharts={Highcharts} options={options} />
			<div className={classes.button}>
				<Button onClick={handleTaskGenerate} variant='contained'>
					GENERATE
				</Button>
			</div>
		</div>
	);
};

export default TasksChart;
