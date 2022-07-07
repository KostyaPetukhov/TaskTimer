import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import InputTaskName from './inputTaskName';
import ModalTaskName from './modalTaskName';
import formatTimeHelper from '../../helpers/formatTimeHelper';
import { addTask } from '../../redux/reducers/taskReducer';

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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'default',
	},
	button: {
		width: 75,
	},
	inputStyle: {
		color: '#1976d2 !important',
		textAlign: 'center',
	},
});

const Timer = () => {
	const classes = useStyles();

	const active = !!localStorage.getItem('startTime');
	const startTime = JSON.parse(localStorage.getItem('startTime'));
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

	const [timerActive, setTimerActive] = useState(active);
	const [taskTime, setTaskTime] = useState('00:00:00');
	const [errorOpen, setErrorOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (timerActive) {
			const addSecondInterval = setInterval(() => {
				const currentTime = Date.now();
				const timer = currentTime - startTime;
				setTaskTime(formatTimeHelper(timer));
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
		if (document.getElementById('taskName').value.length === 0) {
			setErrorOpen(true);
		} else {
			setTimerActive(false);
			const taskName = document.getElementById('taskName').value;
			const finishTime = Date.now();
			const spendTime = finishTime - startTime;

			const task = {
				id: uuidv4(),
				taskName,
				startTime,
				finishTime,
				spendTime,
			};

			localStorage.setItem('tasks', JSON.stringify(tasks.concat(task)));
			dispatch(addTask(task));

			setTaskTime('00:00:00');
			localStorage.removeItem('startTime');
			document.getElementById('taskName').value = '';
		}
	};

	const handleTimer = () => {
		timerActive ? handleStopTimer() : handleStartTimer();
	};

	const handleErrorClose = () => {
		setErrorOpen(false);
	};

	return (
		<div className={classes.timer}>
			<InputTaskName />
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
			<Paper>
				<Button className={classes.button} onClick={handleTimer}>
					{timerActive ? 'STOP' : 'START'}
				</Button>
			</Paper>
			<ModalTaskName open={errorOpen} handleClose={handleErrorClose} />
		</div>
	);
};

export default Timer;
