import ContactForm from '@/components/ContactForm';
import SearchBox from '@/components/SearchBox';
import ContactList from '@/components/ContactList';

import styles from './App.module.css';

const App = () => {
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
