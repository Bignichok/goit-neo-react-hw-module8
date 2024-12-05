import { useSelector, useDispatch } from 'react-redux';

import { selectFilteredContacts } from '@/redux/contacts/selectors';
import { deleteContact } from '@/redux/contacts/operations';

import Contact from './Contact';
import styles from './ContactList.module.css';

const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectFilteredContacts);

	const onDeleteContact = id => {
		dispatch(deleteContact(id));
	};

	return (
		<ul className={styles.contactList}>
			{contacts.map(contact => (
				<Contact key={contact.id} {...{ ...contact, onDeleteContact }} />
			))}
		</ul>
	);
};

export default ContactList;
