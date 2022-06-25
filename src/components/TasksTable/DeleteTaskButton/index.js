import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { deleteTask } from '../../../redux/reducers/taskReducer';

const DeleteTaskButton = (props) => {
	const { taskId } = props;
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	const dispatch = useDispatch();

	const handleDeleteTask = () => {
		localStorage.setItem(
			'tasks',
			JSON.stringify(tasks.filter((task) => task.id !== taskId))
		);
		dispatch(deleteTask(taskId));
	};

	return (
		<div>
			<Paper>
				<Button onClick={handleDeleteTask}>DELETE</Button>
			</Paper>
		</div>
	);
};

DeleteTaskButton.propTypes = {
	taskId: PropTypes.string.isRequired,
};

export default DeleteTaskButton;
