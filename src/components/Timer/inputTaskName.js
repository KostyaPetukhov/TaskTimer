import React from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';

const useStyles = makeStyles({
	taskName: {
		width: 250,
		textAlign: 'center',
	},
	inputStyle: {
		color: '#314cc5 !important',
		textAlign: 'center',
	},
});

const InputTaskName = (props) => {
	const classes = useStyles();

	return (
		<>
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
		</>
	);
};

export default InputTaskName;
