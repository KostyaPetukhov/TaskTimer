import { useState, useEffect } from 'react';
import moment from 'moment';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	timer: {
		marginTtop: 10,
		maxWidth: 1000,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	taskName: {
		width: 250,
		textAlign: 'center',
	},
	timerClock: {
		margin: '30px 0',
		width: 200,
		height: 200,
		borderRadius: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 75,
	},
	inputStyle: {
		color: '#1976d2 !important',
		textAlign: 'center',
	},
});

const formatTime = (totalMilliseconds) => {
	const minutesSeconds = moment.utc(totalMilliseconds).format('mm:ss');
	const hours = moment.duration(totalMilliseconds).asHours().toFixed();
	const parsedHours = hours <= 9 ? '0' + hours : hours;
	const formatted = `${parsedHours}:${minutesSeconds}`;
	return formatted;
};

const Timer = () => {
	const active = !!localStorage.getItem('startTime');
	const startTime = JSON.parse(localStorage.getItem('startTime'));
	const [timerActive, setTimerActive] = useState(active);
	const [taskTime, setTaskTime] = useState('00:00:00');
	const classes = useStyles();

	useEffect(() => {
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

	const handleStartTimer = () => {
		setTimerActive(true);
		const start = Date.now();
		localStorage.setItem('startTime', JSON.stringify(start));
	};

	const handleStopTimer = () => {
		setTimerActive(false);
		const start = moment(startTime).format('hh:mm:ss');
		const finishTimeMS = Date.now();
		const finishTime = moment(finishTimeMS).format('hh:mm:ss');
		const spendTimeMS = finishTimeMS - startTime;
		const spendTime = formatTime(spendTimeMS);
		setTaskTime('00:00:00');

		console.log(
			'start: ',
			start,
			'finish: ',
			finishTime,
			'spend time: ',
			spendTime
		);
	};

	return (
		<div className={classes.timer}>
			<TextField
				id='taskName'
				placeholder='Name of your task'
				color='primary'
				size='small'
				className={classes.taskName}
				inputProps={{
					className: classes.inputStyle,
				}}
			/>
			<Paper
				elevation={3}
				className={classes.timerClock}
				sx={{
					borderRadius: 40,
				}}
			>
				<Typography fontSize={30} color='primary'>
					{taskTime}
				</Typography>
			</Paper>
			<Button
				variant='outlined'
				className={classes.button}
				onClick={timerActive ? handleStopTimer : handleStartTimer}
			>
				{timerActive ? 'STOP' : 'START'}
			</Button>
		</div>
	);
};

export default Timer;
