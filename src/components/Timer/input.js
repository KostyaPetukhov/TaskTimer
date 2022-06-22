import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles({
	taskName: {
		width: 250,
		textAlign: 'center',
	},
	inputStyle: {
		color: '#1976d2 !important',
		textAlign: 'center',
	},
});

const InputTaskName = (props) => {
	const classes = useStyles();
	const { open, handleClose } = props;

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
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title' color='secondary'>
					Empty task name
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						You art trying close your task without name, enter the
						title and try again!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

InputTaskName.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default InputTaskName;
