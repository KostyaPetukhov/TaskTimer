import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import DeleteTaskButton from './DeleteTaskButton';
const useStyles = makeStyles({
	table: {
		width: 800,
	},
	tableHead: {
		background: 'white',
		color: '#9fa0a1 !important',
	},
	cell: {
		backgroundColor: '#ebf6ff',
		color: '#314cc5 !important',
	},
	link: {
		textDecoration: 'none',
	},
});

const TasksTable = () => {
	const classes = useStyles();

	const tasks = useSelector((state) => state.tasks.data);
	return (
		<div className={classes.table}>
			<TableContainer component={Paper}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHead}>
								№
							</TableCell>
							<TableCell
								align='left'
								className={classes.tableHead}
							>
								Task
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableHead}
							>
								Time start
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableHead}
							>
								Time finish
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableHead}
							>
								Time spend
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableHead}
							>
								Info
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableHead}
							>
								Delete
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.map((task, index) => (
							<TableRow key={task.id}>
								<TableCell
									component='th'
									scope='row'
									className={classes.cell}
								>
									{index + 1}
								</TableCell>
								<TableCell
									align='left'
									className={classes.cell}
								>
									{task.taskName}
								</TableCell>
								<TableCell
									align='center'
									className={classes.cell}
								>
									{task.startTime}
								</TableCell>
								<TableCell
									align='center'
									className={classes.cell}
								>
									{task.finishTime}
								</TableCell>
								<TableCell
									align='center'
									className={classes.cell}
								>
									{task.spendTime}
								</TableCell>
								<TableCell
									align='center'
									className={classes.cell}
								>
									<Paper>
										<Link
											className={classes.link}
											to={`/tasks/${task.id}`}
										>
											<Button>INFO</Button>
										</Link>
									</Paper>
								</TableCell>
								<TableCell
									align='center'
									className={classes.cell}
								>
									<DeleteTaskButton taskId={task.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default TasksTable;
