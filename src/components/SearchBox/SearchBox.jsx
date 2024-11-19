import { useDispatch } from 'react-redux';

import { changeFilter } from '@/redux/filtersSlice';

import styles from './SearchBox.module.css';

const SearchBox = () => {
	const dispatch = useDispatch();

	const onSearchInputChange = e => {
		dispatch(changeFilter(e.target.value.trim().toLowerCase()));
	};

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
