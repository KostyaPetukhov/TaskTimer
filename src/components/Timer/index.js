import { useEffect, useState } from 'react';
import moment from 'moment';

import { TextField, Paper, Button, Typography } from '@mui/material';
import './timer.css';

const Timer = () => {
	const active = localStorage.getItem('timerActive') ? true : false;
	const [timerActive, setTimerActive] = useState(active);
	const [taskTime, setTaskTime] = useState('00:00:00');

	useEffect(() => {
		const startTime = JSON.parse(localStorage.getItem('startTime'));
		if (timerActive) {
			const addSecondInterval = setInterval(() => {
				const currentTime = Date.now();
				const timer = currentTime - startTime;
				setTaskTime(formatTime(timer));
			}, 1000);

			return () => {
				clearInterval(addSecondInterval);
			};
		}
	}, [timerActive]);

	const formatTime = (totalMilliseconds) => {
		const minutesSeconds = moment.utc(totalMilliseconds).format('mm:ss');
		const hours = moment.duration(totalMilliseconds).asHours().toFixed();
		const formatted =
			hours <= 9
				? '0' + hours + ':' + minutesSeconds
				: hours + ':' + minutesSeconds;

		return formatted;
	};

	const handleStartTimer = () => {
		setTimerActive(true);
		localStorage.setItem('timerActive', true);
		const start = Date.now();
		localStorage.setItem('startTime', JSON.stringify(start));
	};

	const handleStopTimer = () => {
		setTimerActive(false);
		localStorage.removeItem('timerActive');
		const startTimeMS = JSON.parse(localStorage.getItem('startTime'));
		const startTime = moment(startTimeMS).format('hh:mm:ss');
		const finishTimeMS = Date.now();
		const finishTime = moment().format('hh:mm:ss');
		const spendTimeMS = finishTimeMS - startTimeMS;
		const spendTime = formatTime(spendTimeMS);
		setTaskTime('00:00:00');

		console.log(
			'start: ',
			startTime,
			'finish: ',
			finishTime,
			'spend time: ',
			spendTime
		);
	};

	return (
		<div className='timer'>
			<TextField
				id='outlined-name'
				label='Name of your task'
				size='small'
				// onChange={handleChange}
				className='taskName'
				// inputProps={{ style: { textAlign: 'center' } }}
			/>
			<Paper
				elevation={3}
				className='timerClock'
				sx={{
					borderRadius: 40,
				}}
			>
				<Typography fontSize={30}>{taskTime}</Typography>
			</Paper>
			{timerActive ? (
				<Button variant='outlined' onClick={handleStopTimer}>
					STOP
				</Button>
			) : (
				<Button variant='outlined' onClick={handleStartTimer}>
					START
				</Button>
			)}
		</div>
	);
};

export default Timer;
