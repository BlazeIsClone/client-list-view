import { Route, Routes } from 'react-router-dom';
import * as View from '@views';

export const Router = () => (
	<Routes>
		<Route index element={<View.Login />} />
		<Route path="/team" element={<View.Team />} />
		<Route path="/clients">
			<Route index element={<View.Clients />} />
			<Route path={':clientId'} element={<View.ClientSingle />} />
		</Route>
	</Routes>
);
