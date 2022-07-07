const initialState = {
	data: JSON.parse(localStorage.getItem('tasks')) || [],
};

const ADD_TASK = 'ADD_TASK';
const ADD_TASKS = 'ADD_TASKS';
const DELETE_TASK = 'DELETE_TASK';

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TASK:
			return { ...state, data: [...state.data, action.payload] };
		case ADD_TASKS:
			return { data: action.payload };
		case DELETE_TASK:
			return {
				...state,
				data: state.data.filter((task) => task.id !== action.payload),
			};

		default:
			return state;
	}
};

export const addTask = (payload) => ({
	type: ADD_TASK,
	payload,
});

export const addTasks = (payload) => ({
	type: ADD_TASKS,
	payload,
});

export const deleteTask = (payload) => ({
	type: DELETE_TASK,
	payload,
});
