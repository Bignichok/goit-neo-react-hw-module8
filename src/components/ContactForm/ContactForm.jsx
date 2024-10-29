import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
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

const ContactForm = ({ addContact }) => {
	const nameFieldId = useId();
	const numberFieldId = useId();

	const handleSubmit = (values, actions) => {
		addContact({
			id: nanoid(),
			name: values.name,
			number: values.number,
		});
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
