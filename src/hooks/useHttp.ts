import { useEffect, useState } from 'react';
import { api } from 'services';

export const useHttp = (
	method: string,
	resource: string,
	data?: object,
	extraHeaders?: object
): object => {
	const [headers, setHeaders] = useState({});
	const [response, setResponse] = useState({});
	const [error, setError] = useState('');

	useEffect(() => {
		if (extraHeaders) setHeaders({ ...extraHeaders });

		api(resource, { method, headers, data })
			.then(response => setResponse(response.data))
			.catch(reason => setError(reason));
	}, [data, extraHeaders, headers, method, resource]);

	if (!response) return { data: null, error };

	return { ...response, error };
};
