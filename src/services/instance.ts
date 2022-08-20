import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { endpoints } from './endpoints';

const { APP_API_ENTRYPOINT } = import.meta.env;

export const instance = axios.create({
	baseURL: APP_API_ENTRYPOINT || undefined,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

let refresh = false;

const refreshToken = async (): Promise<AxiosResponse> => {
	const response = await axios.post(
		endpoints.refreshToken,
		{},
		{ withCredentials: true }
	);

	return response;
};

const onRequest = async (
	request: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
	try {
		const response = await refreshToken();

		if (response.status === 200) {
			request.headers = {
				Authorization: `Bearer ${response.data.access_token}`,
			};
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			window.location.href = endpoints.login;
		}
	}

	return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	return response;
};

const onResponseError = async (
	error: AxiosError
): Promise<AxiosError | AxiosResponse> => {
	if (error.response?.status === 401 && !refresh) {
		refresh = true;
		try {
			const response = await refreshToken();

			if (response.status === 200) {
				error.config.headers = {
					Authorization: `Bearer ${response.data.access_token}`,
				};

				return axios(error.config);
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				window.location.href = endpoints.login;
			}
		}
	}

	refresh = false;
	return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);
