import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { useEffect, useState } from 'react';
import { instance } from 'services';

interface RequestConfigI<ResponseType> {
	(
		resource: string,
		data?: object,
		extraHeaders?: AxiosRequestHeaders
	): ResponseType;
}

type ResponseT = {
	response: object;
	loading: boolean;
	error: AxiosError | false;
};

export const useQuery: RequestConfigI<ResponseT> = (
	resource,
	data,
	extraHeaders
) => {
	const [headers, setHeaders] = useState<AxiosRequestHeaders>({});
	const [error, setError] = useState<AxiosError | false>(false);
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState({});
	const [payload, setPayload] = useState({});
	const [url, setUrl] = useState('/');

	useEffect(() => {
		const controller = new AbortController();

		if (resource) setUrl(resource);
		if (data) setPayload({ ...data });
		if (extraHeaders) setHeaders({ ...extraHeaders });

		(async () => {
			try {
				const { data } = await instance(url, {
					signal: controller.signal,
					data: payload,
					headers,
				});
				setResponse(data);
			} catch (error) {
				axios.isAxiosError(error) && setError(error);
			} finally {
				setLoading(false);
			}
		})();

		return () => controller.abort();
	}, [data, extraHeaders, headers, payload, resource, url]);

	return { response, loading, error };
};
