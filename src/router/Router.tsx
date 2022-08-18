import { Route, Routes } from 'react-router-dom';
import * as View from '@views';

export const Router = () => (
	<Routes>
		<Route path="/">
			<Route index element={<View.Clients />} />
			<Route path={':clientId'} element={<View.ClientSingle />} />
		</Route>
	</Routes>
);
