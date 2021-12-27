import { createSlice } from '@reduxjs/toolkit';
import {
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { firestore } from '../../contexts/AuthContext';
const initialState = {
	list: [],
	loading: false,
};
export const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			state.list = action.payload;
		},
		addTask: (state, action) => {
			state.list = [{ ...action.payload }, ...state.list];
		},
		deleteTask: (state, action) => {
			state.list = state.list.filter((task) => task.id !== action.payload);
		},
		toggleTaskLocal: (state, action) => {
			state.list = state.list.map((task) =>
				task.id === action.payload.id
					? {
							...task,
							completed: action.payload.completed,
							finishedAt: action.payload.completed
								? new Date().getTime()
								: null,
					  }
					: task
			);
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

const { setTasks, addTask, deleteTask, toggleTaskLocal } = slice.actions;

export const { setLoading } = slice.actions;

export const loadTasks = (uid) => async (dispatch) => {
	dispatch(setLoading(true));
	const q = query(
		collection(firestore, 'tasks', uid, 'list'),
		orderBy('createdAt', 'desc')
	);

	const subcollection = await getDocs(q);

	const res = [];

	subcollection.forEach((doc) => {
		res.push({
			...doc.data(),
		});
	});

	dispatch(setTasks(res));
	dispatch(setLoading(false));
};

export const createTask = (uid, task) => async (dispatch) => {
	dispatch(setLoading(true));
	await addDoc(collection(firestore, 'tasks', uid, 'list'), task);

	dispatch(addTask(task));
	dispatch(setLoading(false));
};

export const removeTask = (uid, id) => async (dispatch) => {
	dispatch(setLoading(true));
	const q = query(
		collection(firestore, 'tasks', uid, 'list'),
		where('id', '==', id)
	);

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		deleteDoc(doc.ref);
	});

	dispatch(deleteTask(id));
	dispatch(setLoading(false));
};

export const toggleTask = (uid, id, completed) => async (dispatch) => {
	dispatch(setLoading(true));
	const q = query(
		collection(firestore, 'tasks', uid, 'list'),
		where('id', '==', id)
	);

	const querySnapshot = await getDocs(q);
	for (const doc of querySnapshot.docs) {
		await updateDoc(doc.ref, {
			completed,
			finishedAt: completed ? new Date().getTime() : null,
		});
	}
	dispatch(toggleTaskLocal({ id, completed }));
	dispatch(setLoading(false));
};

export const selectTasks = (state) => state.tasks.list;
export const selectLoading = (state) => state.tasks.loading;

export default slice.reducer;
