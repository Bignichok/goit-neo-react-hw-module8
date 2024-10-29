import styles from './SearchBox.module.css';

const SearchBox = ({ onSearchInputChange }) => {
	return (
		<div className={styles.searchContainer}>
			<p className={styles.label}>Find contacts by name</p>
			<input
				type="text"
				onChange={onSearchInputChange}
				className={styles.input}
				placeholder="Search contacts..."
			/>
		</div>
	);
};

export default SearchBox;
