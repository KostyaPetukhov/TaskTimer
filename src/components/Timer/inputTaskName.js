import React from 'react';
import PropTypes from 'prop-types';

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
	const { inputValue, handleChange } = props;
	const classes = useStyles();

	return (
		<>
			<TextField
				placeholder='Name of your task'
				color='primary'
				size='small'
				value={inputValue}
				onChange={(e) => handleChange(e.target.value)}
				className={classes.taskName}
				inputProps={{
					className: classes.inputStyle,
				}}
			/>
		</>
	);
};

InputTaskName.propTypes = {
	inputValue: PropTypes.string,
	handleChange: PropTypes.func,
};

export default InputTaskName;
