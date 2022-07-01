import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	chart: {
		width: 800,
		fontSize: 20,
	},
});

const TasksChart = () => {
	const classes = useStyles();

	useEffect(() => {
		ourTasks.forEach((task) => {
			chartData(task);
		});
	});

	const tasks = useSelector((state) => state.tasks.data);

	const lastDay = Date.now() - 86400000;

	const ourTasks = tasks.filter((task) => task.startTime > lastDay);

	const data = new Array(24).fill(0);

	const [chart, setChart] = useState(data);

	const chartData = (task) => {
		const startTime = task.startTime;
		const startHour = moment(startTime).hour();
		const startMinute = moment(startTime).minute();

		const finishTime = task.finishTime;
		const finishHour = moment(finishTime).hour();
		const finishMinute = moment(finishTime).minute();
		let spendHours;
		let spendMinutes;

		if (startHour === finishHour) {
			spendMinutes = finishMinute - startMinute;
			spendMinutes === 0
				? (data[startHour] = 1)
				: (data[startHour] = spendMinutes);
		}

		if (finishHour > startHour) {
			if (finishMinute >= startMinute) {
				spendHours = finishHour - startHour;
				spendMinutes = spendHours * 60 + finishMinute - startMinute;
			} else {
				spendHours = finishHour - startHour - 1;
				spendMinutes =
					spendHours * 60 + (60 + finishMinute - startMinute);
			}
			const timeInFirstHour = 60 - startMinute;
			let restTime = spendMinutes - timeInFirstHour;
			data[startHour] = timeInFirstHour;
			for (let i = startHour + 1; i <= finishHour; i++) {
				if (restTime > 60) {
					data[i] = 60;
					restTime = restTime - 60;
				} else {
					data[i] = restTime;
				}
			}
		}

		if (finishHour < startHour) {
			if (finishMinute >= startMinute) {
				spendHours = 24 + finishHour - startHour;
				spendMinutes = spendHours * 60 + finishMinute - startMinute;
			} else {
				spendHours = 23 + finishHour - startHour;
				spendMinutes =
					spendHours * 60 + (60 + finishMinute - startMinute);
			}
			const timeInFirstHour = 60 - startMinute;
			let restTime = spendMinutes - timeInFirstHour;
			data[startHour] = timeInFirstHour;
			for (let i = startHour + 1; i <= 23; i++) {
				if (restTime > 60) {
					data[i] = 60;
					restTime = restTime - 60;
				}
			}
			for (let i = 0; i <= finishHour; i++) {
				if (restTime > 60) {
					data[i] = 60;
					restTime = restTime - 60;
				} else {
					data[i] = restTime;
				}
			}
		}
		setChart(data);
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
		</div>
	);
};

export default TasksChart;
