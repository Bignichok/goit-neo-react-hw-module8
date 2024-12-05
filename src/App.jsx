import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { refreshUser } from '@/redux/auth/operations';
import { selectIsRefreshing } from '@/redux/auth/selectors';

import PrivateRoute from '@/components/PrivateRoute';
import RestrictedRoute from '@/components/RestrictedRoute';
import AppBar from '@/components/AppBar';

const HomePage = lazy(() => import('@/pages/HomePage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ContactsPage = lazy(() => import('@/pages/ContactsPage'));

const App = () => {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refreshUser());
	}, []);

	return isRefreshing ? (
		<b>Refreshing user...</b>
	) : (
		<div>
			<AppBar />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/register"
						element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />}
					/>
					<Route
						path="/login"
						element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
					/>
					<Route
						path="/contacts"
						element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
