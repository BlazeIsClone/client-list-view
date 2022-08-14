import { BrowserRouter } from 'react-router-dom';

import { Header } from '@components';
import { Router } from '@router';

export const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Router />
		</BrowserRouter>
	);
};
