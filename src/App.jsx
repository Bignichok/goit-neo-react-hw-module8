import { useState, useEffect, useMemo } from 'react';

import ContactForm from '@/components/ContactForm';
import SearchBox from '@/components/SearchBox';
import ContactList from '@/components/ContactList';

import styles from './App.module.css';

const App = () => {
	const [contacts, setContacts] = useState(() => {
		const storedContacts = localStorage.getItem('contacts');
		return storedContacts
			? JSON.parse(storedContacts)
			: [
					{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
					{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
					{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
					{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
			  ];
	});
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

	const onSearchInputChange = e => {
		setSearchValue(e.target.value.trim().toLowerCase());
	};

	const filteredContacts = useMemo(() => {
		return contacts.filter(contact => contact.name.toLowerCase().includes(searchValue));
	}, [contacts, searchValue]);

	const addContact = contact => {
		const duplicate = contacts.some(
			existing => existing.name === contact.name || existing.number === contact.number
		);
		if (duplicate) {
			alert('Contact with the same name or number already exists!');
			return;
		}
		setContacts(prevContacts => [...prevContacts, contact]);
	};

	const deleteContact = id => {
		setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
	};

	return (
		<div className={styles.appContainer}>
			<h1 className={styles.title}>Phonebook</h1>
			<ContactForm addContact={addContact} />
			<SearchBox onSearchInputChange={onSearchInputChange} />
			<ContactList contacts={filteredContacts} deleteContact={deleteContact} />
		</div>
	);
};

export default App;
