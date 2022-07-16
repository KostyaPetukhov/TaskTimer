import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: JSON.parse(localStorage.getItem('tasks')) || [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTasks: (state, action) => {
			state.data = action.payload;
			localStorage.setItem('tasks', JSON.stringify(action.payload));
		},
		addTask: (state, action) => {
			localStorage.setItem(
				'tasks',
				JSON.stringify(state.data.concat(action.payload))
			);
			state.data.push(action.payload);
		},
		deleteTask: (state, action) => {
			state.data = state.data.filter(
				(task) => task.id !== action.payload
			);
			localStorage.setItem(
				'tasks',
				JSON.stringify(
					state.data.filter((task) => task.id !== action.payload)
				)
			);
		},
	},
});

const { actions, reducer } = tasksSlice;

export default reducer;
export const { addTasks, addTask, deleteTask } = actions;
