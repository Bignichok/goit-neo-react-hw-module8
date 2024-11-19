import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectContacts, deleteContact } from '@/redux/contactsSlice';
import { selectNameFilter } from '@/redux/filtersSlice';

import Contact from './Contact';
import styles from './ContactList.module.css';

const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const nameFilter = useSelector(selectNameFilter);

	const onDeleteContact = id => {
		dispatch(deleteContact(id));
	};

	const filteredContacts = useMemo(() => {
		return contacts.filter(contact => contact.name.toLowerCase().includes(nameFilter));
	}, [contacts, nameFilter]);

	return (
		<ul className={styles.contactList}>
			{filteredContacts.map(contact => (
				<Contact key={contact.id} {...{ ...contact, onDeleteContact }} />
			))}
		</ul>
	);
};

export default ContactList;
