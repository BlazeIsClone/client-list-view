import ReactDOM from 'react-dom/client';
import React from 'react';

import { App } from './App';

let app = document.getElementById('app');
ReactDOM.createRoot(app as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
