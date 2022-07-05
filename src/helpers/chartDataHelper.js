import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ChartDataHelper = (tasks) => {
	const data = new Array(24).fill(0);

	const [chart, setChart] = useState(data);

	useEffect(() => {
		drawChart();
	}, []);

	const drawChart = () => {
		tasks.map((task) => chartData(task));
	};

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
				? (data[startHour] = data[startHour] + 1)
				: (data[startHour] = data[startHour] + spendMinutes);
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
			data[startHour] = data[startHour] + timeInFirstHour;
			for (let i = startHour + 1; i <= finishHour; i++) {
				if (restTime > 60) {
					data[i] = 60;
					restTime = restTime - 60;
				} else {
					data[i] = data[i] + restTime;
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
			data[startHour] = data[startHour] + timeInFirstHour;
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
					data[i] = data[i] + restTime;
				}
			}
		}
		setChart(data);
	};

	return chart;
};

ChartDataHelper.propTypes = {
	tasks: PropTypes.array,
};

export default ChartDataHelper;
