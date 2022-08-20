import axios from 'axios';

const { APP_API_ENTRYPOINT } = import.meta.env;

export const instance = axios.create({
	baseURL: APP_API_ENTRYPOINT || undefined,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

let refresh = false;

instance.interceptors.request.use(async req => {
	const response = await axios.post(
		'http://localhost:5500/v1/auth/refresh-token',
		{},
		{ withCredentials: true }
	);

	if (response.status === 200) {
		req.headers = { Authorization: `Bearer ${response.data.access_token}` };
	}
	return req;
});

instance.interceptors.response.use(
	resp => resp,
	async error => {
		if (error.response.status === 401 && !refresh) {
			refresh = true;

			const response = await axios.post(
				'http://localhost:5500/v1/auth/refresh-token',
				{},
				{ withCredentials: true }
			);

			if (response.status === 200) {
				error.config.headers.Authorization = `Bearer ${response.data.access_token}`;

				return axios(error.config);
			}
		}

		if (error.response.status === 401) {
			window.location.href = `http://localhost:5000/login?callback=${window.location.href}`;
		}
		refresh = false;
		return error;
	}
);
