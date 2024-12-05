import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = token => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
	axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		const response = await axios.post('/users/signup', user);
		setAuthHeader(response.data.token);
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		const response = await axios.post('/users/login', user);
		setAuthHeader(response.data.token);
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		await axios.post('/users/logout');
		clearAuthHeader();
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const refreshUser = createAsyncThunk('auth/refresh', async (i_, thunkAPI) => {
	const state = thunkAPI.getState();
	const persistedToken = state.auth.token;

	if (persistedToken === null) {
		return thunkAPI.rejectWithValue('Unable to fetch user');
	}

	try {
		setAuthHeader(persistedToken);
		const response = await axios.get('/users/current');
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});