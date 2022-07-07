import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const getRandomNumber = (min, max) => {
	return Math.random() * (max - min) + min;
};

const generateTasksHelper = () => {
	const tasks = [];
	for (let i = 1; i <= 10; i++) {
		const taskName = `Task #${i}`;
		const start = moment({
			hour: `${i + i}`,
			minute: getRandomNumber(0, 40),
			second: getRandomNumber(0, 60),
		});
		const startTime = Number(moment(start).format('x'));
		const spendTime = getRandomNumber(600000, 5400000);
		const finishTime = startTime + spendTime;

		const task = {
			id: uuidv4(),
			taskName,
			startTime,
			finishTime,
			spendTime,
		};
		tasks.push(task);
	}
	return tasks;
};

export default generateTasksHelper;
