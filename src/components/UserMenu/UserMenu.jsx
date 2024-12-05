import { useDispatch, useSelector } from 'react-redux';

import { logout } from '@/redux/auth/operations';
import { selectUser } from '@/redux/auth/selectors';

import css from './UserMenu.module.css';

const UserMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={css.wrapper}>
			<p className={css.username}>Welcome, {user.name}</p>
			<button type="button" onClick={onLogout}>
				Logout
			</button>
		</div>
	);
};

export default UserMenu;
