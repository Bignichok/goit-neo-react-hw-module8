import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ContactForm from '@/components/ContactForm';
import SearchBox from '@/components/SearchBox';
import ContactList from '@/components/ContactList';

import { fetchContacts } from '@/redux/contactsOperations';

import styles from './App.module.css';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchContacts());
	}, []);
	
	return (
		<div className={styles.appContainer}>
			<h1 className={styles.title}>Phonebook</h1>
			<ContactForm />
			<SearchBox />
			<ContactList />
		</div>
	);
};

export default App;
