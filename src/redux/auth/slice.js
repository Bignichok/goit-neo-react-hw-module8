import { createSlice } from '@reduxjs/toolkit';

import { register, login, logout, refreshUser } from './operations';

const initialState = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	isLoggedIn: false,
	isRefreshing: false,
	isLoading: false,
	error: null,
};

const handlePending = state => {
	state.isLoading = true;
	state.error = initialState.error;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
};

export const authSlice = createSlice({
	name: 'contacts',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(register.pending, handlePending)
			.addCase(register.fulfilled, (state, action) => {
				const { user, token } = action.payload;
				state.isLoading = false;
				state.user = user;
				state.token = token;
				state.isLoggedIn = true;
			})
			.addCase(register.rejected, handleRejected)
			.addCase(login.pending, handlePending)
			.addCase(login.fulfilled, (state, action) => {
				const { user, token } = action.payload;
				state.isLoading = false;
				state.user = user;
				state.token = token;
				state.isLoggedIn = true;
			})
			.addCase(login.rejected, handleRejected)
			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, state => {
				state.isLoading = initialState.isLoading;
				state.user = initialState.user;
				state.token = initialState.token;
				state.isLoggedIn = initialState.isLoggedIn;
			})
			.addCase(logout.rejected, handleRejected)
			.addCase(refreshUser.pending, state => {
				state.isRefreshing = true;
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoggedIn = true;
				state.isRefreshing = false;
			})
			.addCase(refreshUser.rejected, state => {
				state.isRefreshing = false;
			});
	},
});

export default authSlice.reducer;
