import axios from 'axios';

const { APP_API_ENTRYPOINT } = import.meta.env;

export const api = axios.create({
	baseURL: APP_API_ENTRYPOINT || undefined,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
