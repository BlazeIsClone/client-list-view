import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Clients, ClientSingle, Login, Team } from 'views';
import { Header } from 'components';

export const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<Login />} />
				<Route path="/team" element={<Team />} />
				<Route path="/clients">
					<Route index element={<Clients />} />
					<Route path={':clientId'} element={<ClientSingle />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
