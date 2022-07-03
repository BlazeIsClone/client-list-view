import axios from 'axios';

const { REACT_APP_API_ENTRY_POINT } = process.env;

export const api = axios.create({
	baseURL: REACT_APP_API_ENTRY_POINT || undefined,
	headers: { 'content-type': 'application/json' },
});
