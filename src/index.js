import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthContextProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
