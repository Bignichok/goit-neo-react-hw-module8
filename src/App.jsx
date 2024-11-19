import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from '@/components/ContactForm';
import SearchBox from '@/components/SearchBox';
import ContactList from '@/components/ContactList';

import { selectContacts, addContact, deleteContact } from '@/redux/contactsSlice';
import { selectNameFilter, changeFilter } from '@/redux/filtersSlice';

import styles from './App.module.css';

const App = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const nameFilter = useSelector(selectNameFilter);

	const onSearchInputChange = e => {
		dispatch(changeFilter(e.target.value.trim().toLowerCase()));
	};

	const filteredContacts = useMemo(() => {
		return contacts.filter(contact => contact.name.toLowerCase().includes(nameFilter));
	}, [contacts, nameFilter]);

	const onAddContact = contact => {
		const duplicate = contacts.some(
			existing => existing.name === contact.name || existing.number === contact.number
		);
		if (duplicate) {
			alert('Contact with the same name or number already exists!');
			return;
		}
		dispatch(addContact(contact));
	};

	const onDeleteContact = id => {
		dispatch(deleteContact(id));
	};

	return (
		<div className={styles.appContainer}>
			<h1 className={styles.title}>Phonebook</h1>
			<ContactForm addContact={onAddContact} />
			<SearchBox onSearchInputChange={onSearchInputChange} />
			<ContactList contacts={filteredContacts} deleteContact={onDeleteContact} />
		</div>
	);
};

export default App;
