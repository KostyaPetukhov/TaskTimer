import PropTypes from 'prop-types';
import moment from 'moment';

const FormatTimeHelper = (totalMilliseconds) => {
	const minutesSeconds = moment.utc(totalMilliseconds).format('mm:ss');
	const mins = Math.round(totalMilliseconds / 60000);
	const hours = Math.floor(mins / 60);
	const parsedHours = hours <= 9 ? '0' + hours : hours;
	const formatted = `${parsedHours}:${minutesSeconds}`;
	return formatted;
};

FormatTimeHelper.propTypes = {
	totalMilliseconds: PropTypes.number.isRequired,
};

export default FormatTimeHelper;
