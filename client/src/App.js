import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Register from './components/auth/Register/index';
import Login from './components/auth/Login/index';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);

	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = './login';
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Switch>
						<PrivateRoute path="/dashboard" component={Dashboard} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
