import { createSelector } from '@reduxjs/toolkit';

import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
	selectContacts,
	selectNameFilter,

	(contacts, nameFilter) =>
		contacts.filter(contact => contact.name.toLowerCase().includes(nameFilter))
);
