import { Link } from 'react-router-dom';

export const Header = () => (
	<header>
		<Link to={'/clients'}>Clients</Link>
		<Link to={'/team'}>Team</Link>
	</header>
);
