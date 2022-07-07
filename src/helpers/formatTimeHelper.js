import moment from 'moment';

const formatTimeHelper = (totalMilliseconds) => {
	const minutesSeconds = moment.utc(totalMilliseconds).format('mm:ss');
	const mins = Math.round(totalMilliseconds / 60000);
	const hours = Math.floor(mins / 60);
	const parsedHours = hours <= 9 ? '0' + hours : hours;
	const formatted = `${parsedHours}:${minutesSeconds}`;
	return formatted;
};

export default formatTimeHelper;
