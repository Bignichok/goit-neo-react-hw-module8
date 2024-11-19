import styles from './Contact.module.css';

const Contact = ({ id, name, number, onDeleteContact }) => {
	return (
		<li className={styles.contactItem}>
			<div className={styles.contactInfo}>
				<span className={styles.contactName}>{name}</span>
				<button className={styles.deleteButton} onClick={() => onDeleteContact(id)}>
					Delete
				</button>
			</div>
			<span className={styles.contactNumber}>{number}</span>
		</li>
	);
};

export default Contact;
