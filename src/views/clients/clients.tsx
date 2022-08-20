import { ClientListItem } from 'components';
import { useEffect, useState } from 'react';
import { instance } from 'services';

export const Clients = () => {
	const [data, setData] = useState<any>([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		instance.get(`/clients?page=${page}`).then(({ data }) => setData(data));
	}, [page]);

	const handlePage = (e: any, change: 'prev' | 'next') => {
		e.preventDefault();

		if (change === 'next' && page < data.meta?.last_page) {
			setPage(page + 1);
		}

		if (change === 'prev' && page > 1) {
			setPage(page - 1);
		}
	};

	return (
		<main>
			<input type="text" placeholder="search" />
			<ol>
				{data.data ? (
					data.data.map((data: any) => (
						<ClientListItem key={data.id} data={data} />
					))
				) : (
					<h2>No Clients</h2>
				)}
			</ol>
			<button onClick={e => handlePage(e, 'prev')}>Prev</button>
			<button onClick={e => handlePage(e, 'next')}>Next</button>
		</main>
	);
};
