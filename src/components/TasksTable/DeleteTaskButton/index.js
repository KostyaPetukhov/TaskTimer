import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { deleteTask } from '../../../redux/reducers/tasksSlice';

const DeleteTaskButton = (props) => {
	const { taskId } = props;
	const dispatch = useDispatch();

	const handleDeleteTask = () => {
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
