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
			removeCookie('access-token');
			setData(data);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				api
					.post('http://localhost:5500/v1/auth/refresh-token')
					.then(res => console.log('token refresh 200', res))
					.catch(e => console.log('token refresh err', e));
			}
		}
	};

	useEffect(() => {
		fetcher();
		console.log(data);
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Router />
		</BrowserRouter>
	);
};
