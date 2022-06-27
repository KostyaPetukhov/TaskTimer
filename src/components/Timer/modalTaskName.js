import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles({
	closeButton: {
		color: '#35baf6 !important',
	},
});

const ModalTaskName = (props) => {
	const classes = useStyles();
	const { open, handleClose } = props;

	return (
		<>
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
					<Button
						onClick={handleClose}
						className={classes.closeButton}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

ModalTaskName.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default ModalTaskName;
