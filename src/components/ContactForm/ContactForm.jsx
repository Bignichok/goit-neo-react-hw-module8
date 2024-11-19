import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import { selectContacts, addContact } from '@/redux/contactsSlice';

import styles from './ContactForm.module.css';

const FeedbackSchema = Yup.object().shape({
	name: Yup.string().min(3, 'Too Short!').max(30, 'Too Long!').required('Required'),
	number: Yup.string()
		.matches(/^[0-9]+$/, 'Phone number must only contain digits')
		.min(10, 'Phone number must be at least 10 digits')
		.max(15, 'Phone number must be at most 15 digits')
		.required('Phone number is required'),
});

const initialValues = {
	name: '',
	number: '',
};

const ContactForm = () => {
	const nameFieldId = useId();
	const numberFieldId = useId();
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);

	const handleSubmit = (values, actions) => {
		const newContact = {
			id: nanoid(),
			name: values.name,
			number: values.number,
		};
		const duplicate = contacts.some(
			existing => existing.name === newContact.name || existing.number === newContact.number
		);
		if (duplicate) {
			alert('Contact with the same name or number already exists!');
		} else {
			dispatch(addContact(newContact));
		}

		actions.resetForm();
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
			<Form className={styles.formContainer}>
				<label htmlFor={nameFieldId} className={styles.label}>
					Name
				</label>
				<Field type="text" name="name" id={nameFieldId} className={styles.field} />
				<ErrorMessage name="name" component="div" className={styles.errorMessage} />

				<label htmlFor={numberFieldId} className={styles.label}>
					Number
				</label>
				<Field type="string" name="number" id={numberFieldId} className={styles.field} />
				<ErrorMessage name="number" component="div" className={styles.errorMessage} />

				<button type="submit" className={styles.submitButton}>
					Add contact
				</button>
			</Form>
		</Formik>
	);
};

export default ContactForm;
