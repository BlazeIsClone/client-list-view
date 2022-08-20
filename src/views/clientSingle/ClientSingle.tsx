import { useParams } from 'react-router-dom';

import { useHttp } from '@hooks';
import { endpoints } from '@services';

export const ClientSingle = () => {
	const { clientId } = useParams<{ clientId: string }>();

	const { data }: any = useHttp('get', endpoints.client(clientId));

	return (
		<main>
			<img width={80} height={80} src={data?.avatar} alt={data?.first_name} />
			<h2>First Name: {data?.first_name}</h2>
			<h2>Last Name: {data?.last_name}</h2>
			<p>Title: {data?.title}</p>
			<p>Primary Phone: {data?.primary_phone}</p>
			<p>Secondary Phone: {data?.secondary_phone}</p>
			<p>Email: {data?.email}</p>
			<p>Position: {data?.job_title}</p>
			<p>Timezone: {data?.timezone}</p>
			<p>Created: {data?.created_at}</p>
			<p>Last Update: {data?.updated_at}</p>
			<div key={data?.company.id}>
				<p>ID: {data?.company.id}</p>
				<p>Name: {data?.company.id}</p>
				<img
					width={80}
					height={80}
					src={data?.company.logo}
					alt={data?.company.name}
				/>
				<p>Domain: {data?.company.domain}</p>
				<p>{data?.company.description}</p>
				<p>Primary Phone: {data?.company.primary_phone}</p>
				<p>Secondary Phone: {data?.company.secondary_phone}</p>
				<p>Address: {data?.company.address}</p>
			</div>
		</main>
	);
};
