import { useQuery } from '@hooks';
import { ClientListItem } from 'components';
import { OptionsBar } from 'components/optionsBar';
import { useState } from 'react';

export const Clients = () => {
	const [page, setPage] = useState(1);

	const { response, loading }: { response: any; loading: boolean } = useQuery(
		`/clients?page=${page}`
	);

	const handlePage = (e: any, change: 'prev' | 'next') => {
		e.preventDefault();

		if (change === 'next' && page < response.meta?.last_page) {
			setPage(page + 1);
		}

		if (change === 'prev' && page > 1) {
			setPage(page - 1);
		}
	};

	if (loading) return <h1>Loading</h1>;

	return (
		<main>
			<input type="text" placeholder="search" />
			<OptionsBar />
			<ol>
				{response.data ? (
					response.data.map((data: any) => (
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
