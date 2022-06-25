import React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	chart: {
		width: 500,
		fontSize: 20,
	},
});

const TasksChart = () => {
	const classes = useStyles();
	return <div className={classes.chart}>Tasks chart</div>;
};

// TasksChart.propTypes = {

// };

export default TasksChart;
