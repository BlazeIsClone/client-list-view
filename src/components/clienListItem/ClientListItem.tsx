import axios from 'axios';
import { Link } from 'react-router-dom';

export const ClientListItem = ({ data }: any) => {
	const deleteUser = (id: any, e: any) => {
		e.preventDefault();
		axios
			.post(`http://localhost/v1/clients/${id}`)
			.then(res => console.log(res));
	};

	const {
		id,
		title,
		first_name,
		last_name,
		avatar,
		job_title,
		primary_phone,
		email,
		company,
	} = data;

	return (
		<div>
			<div>
				<img width={50} height={50} src={avatar} alt={first_name} />
				<div>Name: {`${title} ${first_name} ${last_name}`}</div>
				<div>Position: {job_title}</div>
			</div>
			<br />
			<div>
				<div>
					<img width={50} height={50} src={company.logo} alt={company.name} />
					<div>Company: {company.name}</div>
				</div>
				<div>
					<div>
						Phone: <a href={'tel:' + primary_phone}>{primary_phone}</a>
					</div>
					<div>
						Email: <a href={'mailto:' + email}>{email}</a>
					</div>
				</div>
			</div>
			<br />

			<Link to={id}>
				<button onClick={e => null}>View</button>
			</Link>
			<button onClick={e => deleteUser(id, e)}>Delete</button>
			<hr />
		</div>
	);
};
