import { AxiosError, AxiosRequestHeaders } from 'axios';
import { useEffect, useState } from 'react';
import { instance } from 'services';

export const useHttp = (
	method: string,
	resource: string,
	data?: object,
	extraHeaders?: AxiosRequestHeaders
): object => {
	const [headers, setHeaders] = useState<AxiosRequestHeaders>({});
	const [response, setResponse] = useState({});
	const [error, setError] = useState<AxiosError>();

	useEffect(() => {
		if (extraHeaders) setHeaders({ ...extraHeaders });

		instance(resource, { method, headers, data })
			.then(response => setResponse(response.data))
			.catch(reason => setError(reason));
	}, [data, extraHeaders, headers, method, resource]);

	if (!response || error) return { data: null, error };

	return { ...response, error };
};
