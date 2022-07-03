import { Link } from 'react-router-dom';

export const Login = () => {
	return (
		<main>
			<h1>Login</h1>
			<form>
				<label>
					email
					<input type="email" />
				</label>
				<label>
					password
					<input type="password" />
				</label>
				<Link to={'clients'}>
					<button>Login</button>
				</Link>
			</form>
		</main>
	);
};
