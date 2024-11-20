import { createSlice, createSelector } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './contactsOperations.js';
import { selectNameFilter } from './filtersSlice.js';

const initialState = {
	items: [],
	loading: false,
	error: null,
};

const handlePending = state => {
	state.isLoading = true;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
};

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, handlePending)
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, handleRejected)
			.addCase(addContact.pending, handlePending)
			.addCase(addContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, handleRejected)
			.addCase(deleteContact.pending, handlePending)
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.items = state.items.filter(({ id }) => id !== action.payload.id);
			})
			.addCase(deleteContact.rejected, handleRejected);
	},
});

export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
	selectContacts,
	selectNameFilter,

	(contacts, nameFilter) =>
		contacts.filter(contact => contact.name.toLowerCase().includes(nameFilter))
);

export default contactsSlice.reducer;
