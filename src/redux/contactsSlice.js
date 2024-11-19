import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		addContact: (state, action) => {
			state.items.push(action.payload);
		},
		deleteContact: (state, action) => {
			state.items = state.items.filter(({ id }) => id !== action.payload);
		},
	},
});

export const selectContacts = state => state.contacts.items;

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
