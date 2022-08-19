import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { Header } from '@components';
import { Router } from '@router';
import { api } from '@services';

export const App = () => {
	const [data, setData] = useState({});
	const [cookies, setCookie, removeCookie] = useCookies([
		'access-token',
		'refresh-token',
	]);

	const fetcher = async () => {
		try {
			await api.get('http://localhost:5500/v1/users/me', {
				headers: {
					Authorization: 'Bearer ' + cookies['access-token'],
				},
			});
			setData(data);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401) {
					//window.location.href = `http://localhost:5000/login?callback=${window.location.href}`;
					api
						.post('http://localhost:5500/v1/auth/refresh-token')
						.then(res => console.log('token refresh 200', res))
						.catch(e => console.log('token refresh err', e));

					console.log('401', err);
				}
				if (err.response?.status === 403) {
					//window.location.href = `http://localhost:5000/login?callback=${window.location.href}`;
					console.log('403', err);
				}
			}
		}
	};

	useEffect(() => {
		fetcher();
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Router />
		</BrowserRouter>
	);
};
