import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
	paper: {
		padding: '20px 20px',
		margin: '150px auto',
	},
	header: {
		fontSize: '36px !important',
		color: '#9fa0a1',
		textAlign: 'center',
		padding: 10,
	},
	info: {
		fontSize: '20px !important',
		textAlign: 'center',
		padding: 10,
	},
	closeButton: {
		color: '#35baf6 !important',
		fontSize: '16px !important',
	},
	link: {
		display: 'flex',
		justifyContent: 'right',
		textDecoration: 'none',
	},
});

const TaskInfo = () => {
	const { id } = useParams();
	const classes = useStyles();
	const tasks = useSelector((state) => state.tasks.data);
	const task = tasks.find((task) => task.id === id);

	return (
		<div>
			<Paper elevation={16} className={classes.paper}>
				{task ? (
					<>
						<Typography className={classes.header}>
							{task.taskName}
						</Typography>
						<Typography className={classes.info}>
							Start time: {task.startTime}
						</Typography>
						<Typography className={classes.info}>
							Finish time: {task.finishTime}
						</Typography>
						<Typography className={classes.info}>
							Spend time: {task.spendTime}
						</Typography>
					</>
				) : (
					<Typography className={classes.info}>
						Sorry, task not found. Please, go back and repeat you
						request.
					</Typography>
				)}
				<Link className={classes.link} to='/tasks/log'>
					<Button className={classes.closeButton}>GO BACK</Button>
				</Link>
			</Paper>
		</div>
	);
};

export default TaskInfo;
